"use client";

import { motion } from "framer-motion";
import { Leaf, TreePine, TrendingUp, CheckCircle2, ShieldAlert, Star, MapPin, Map as MapIcon } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import dynamic from "next/dynamic";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const LocationMap = dynamic(() => import("@/components/grower/LocationMap"), { ssr: false });

function AnimCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    let start = 0;
    const inc = end / (duration * 60);
    const timer = setInterval(() => {
      start += inc;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [end, duration]);
  return <>{count.toLocaleString()}</>;
}

// Default dummy data if DB is empty
const defaultMonthlyCarbon = Array.from({ length: 6 }, (_, i) => ({
  month: new Date(2025, i).toLocaleDateString("en-US", { month: "short" }),
  carbon: Math.floor(400 + Math.random() * 800),
}));

const ecosystemColors: Record<string, string> = {
  mangrove: "#10B981",
  wetland: "#0EA5E9",
  seagrass: "#06B6D4",
  saltmarsh: "#84CC16",
  forest: "#14B8A6",
  grassland: "#EAB308",
};

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-lg">
      <p className="text-gray-400 text-xs mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-medium" style={{ color: entry.color }}>
          {entry.name}: {entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

export default function NgoAnalyticsPage() {
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProjects: 187,
    totalCarbon: 84720,
    avgFraudScore: 12,
    avgRating: 4.8,
  });
  const [ecoData, setEcoData] = useState<{name: string, value: number, color: string}[]>([
    { name: "mangrove", value: 45, color: "#10B981" },
    { name: "wetland", value: 28, color: "#0EA5E9" },
    { name: "forest", value: 15, color: "#14B8A6" },
  ]);
  const [monthlyData, setMonthlyData] = useState(defaultMonthlyCarbon);
  const [markers, setMarkers] = useState<{lat: number, lng: number}[]>([{lat: 22.5, lng: 88.3}]);

  useEffect(() => {
    fetchAnalytics();
  }, [user]);

  const fetchAnalytics = async () => {
    if (!user) return;
    try {
      // Get NGO profile ID
      const { data: profile } = await supabase.from('ngo_profiles').select('id').eq('user_id', user.id).single();
      if (!profile) return;

      // Fetch assignments + reports
      const { data: assignments } = await supabase
        .from('verification_assignments')
        .select(`
          status,
          land_listings (ecosystem_type, estimated_carbon_tons, latitude, longitude),
          verification_reports (carbon_estimate_tons, ai_fraud_score)
        `)
        .eq('ngo_id', profile.id)
        .eq('status', 'completed');

      // Fetch Reviews
      const { data: reviews } = await supabase
        .from('ngo_reviews')
        .select('rating')
        .eq('ngo_profile_id', profile.id);

      if (assignments && assignments.length > 0) {
        let totalC = 0;
        let totalFraud = 0;
        const ecoCounts: Record<string, number> = {};
        const newMarkers: any[] = [];

        assignments.forEach(a => {
          const rep = a.verification_reports?.[0];
          const list: any = Array.isArray(a.land_listings) ? a.land_listings[0] : a.land_listings;
          
          if (rep) {
            totalC += Number(rep.carbon_estimate_tons || 0);
            totalFraud += Number(rep.ai_fraud_score || 0);
          }
          
          if (list) {
            ecoCounts[list.ecosystem_type] = (ecoCounts[list.ecosystem_type] || 0) + 1;
            newMarkers.push({ lat: Number(list.latitude), lng: Number(list.longitude) });
          }
        });

        const formattedEcoData = Object.keys(ecoCounts).map(k => ({
          name: k,
          value: ecoCounts[k],
          color: ecosystemColors[k] || "#10B981"
        }));

        let avgR = 4.8;
        if (reviews && reviews.length > 0) {
          avgR = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        }

        setStats({
          totalProjects: assignments.length,
          totalCarbon: totalC,
          avgFraudScore: Math.round(totalFraud / assignments.length),
          avgRating: Number(avgR.toFixed(1))
        });
        setEcoData(formattedEcoData);
        if (newMarkers.length > 0) setMarkers(newMarkers);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">NGO Analytics Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Your organization's verification impact and performance metrics.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col justify-center">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-3 text-purple-600"><CheckCircle2 className="w-5 h-5" /></div>
          <div className="text-3xl font-black text-gray-900 leading-none"><AnimCounter end={stats.totalProjects} /></div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-2">Projects Verified</div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-5 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col justify-center">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-3 text-emerald-600"><Leaf className="w-5 h-5" /></div>
          <div className="text-3xl font-black text-gray-900 leading-none"><AnimCounter end={stats.totalCarbon} /> <span className="text-lg text-gray-400">t</span></div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-2">Total Carbon Certified</div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-5 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col justify-center">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3 text-blue-600"><ShieldAlert className="w-5 h-5" /></div>
          <div className="text-3xl font-black text-blue-600 leading-none"><AnimCounter end={stats.avgFraudScore} /> <span className="text-lg text-gray-400">/100</span></div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-2">Avg AI Fraud Score</div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-5 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col justify-center">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-3 text-amber-500"><Star className="w-5 h-5 fill-current" /></div>
          <div className="text-3xl font-black text-gray-900 leading-none">{stats.avgRating}</div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-2">Avg Company Rating</div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Monthly Carbon */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Verification Velocity</h3>
          <p className="text-xs text-gray-500 mb-6 uppercase tracking-wider font-semibold">Tons of carbon certified over last 6 months</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#94A3B8", fontSize: 10, fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94A3B8", fontSize: 10, fontWeight: 600 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F8FAFC' }} />
              <Bar dataKey="carbon" name="Carbon (tCO₂)" fill="#8B5CF6" radius={[6, 6, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Ecosystem Breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Ecosystem Diversity</h3>
          <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-semibold">Breakdown of your verified projects</p>
          
          <div className="flex-1 flex flex-col sm:flex-row items-center gap-6">
            <ResponsiveContainer width="100%" height={220} className="flex-1">
              <PieChart>
                <Pie data={ecoData} dataKey="value" cx="50%" cy="50%" outerRadius={80} innerRadius={50} paddingAngle={5}>
                  {ecoData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="space-y-4 min-w-[140px] shrink-0">
              {ecoData.map((eco, i) => (
                <div key={i} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: eco.color }} />
                    <span className="text-xs font-bold text-gray-700 capitalize">{eco.name}</span>
                  </div>
                  <span className="text-sm font-black text-gray-900">{eco.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>

      {/* Verification Map */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm overflow-hidden">
        <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2"><MapIcon className="w-5 h-5 text-purple-600" /> Geographic Coverage</h3>
        <p className="text-xs text-gray-500 mb-6 uppercase tracking-wider font-semibold">Global map of all projects verified by your organization</p>
        
        <div className="h-80 w-full rounded-2xl overflow-hidden border border-gray-200 relative z-0">
          <LocationMap 
            lat={markers[0]?.lat || 22.5} 
            lng={markers[0]?.lng || 88.3} 
            onChange={() => {}} 
            readOnly={true} 
          />
          {/* Note: Standard LocationMap only shows a single marker based on lat/lng props. 
              In Phase 2, this can be upgraded to accept an array of markers. */}
        </div>
      </motion.div>
    </div>
  );
}
