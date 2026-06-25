"use client";

import { motion } from "framer-motion";
import {
  ClipboardList,
  CheckCircle2,
  Leaf,
  AlertTriangle,
  TrendingUp,
  Clock,
  Shield,
  ArrowUpRight,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

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

const verificationsByMonth = Array.from({ length: 12 }, (_, i) => ({
  month: new Date(2025, i).toLocaleDateString("en-US", { month: "short" }),
  verified: Math.floor(12 + Math.random() * 20),
  rejected: Math.floor(1 + Math.random() * 4),
}));

const recentActivity = [
  { grower: "Rajesh Kumar", project: "Sundarbans East Restoration", action: "Submitted for review", time: "5 min ago", icon: ClipboardList },
  { grower: "Ananya Patel", project: "Hooghly River Wetland", action: "Uploaded 3 new evidence files", time: "25 min ago", icon: ArrowUpRight },
  { grower: "Vikram Singh", project: "Bhitarkanika Creek Extension", action: "Registered new project", time: "1 hr ago", icon: Leaf },
  { grower: "Meera Nair", project: "Vembanad Wetlands Phase 2", action: "Submitted for review", time: "2 hr ago", icon: ClipboardList },
  { grower: "Suresh Babu", project: "Muthupet Lagoon North", action: "Uploaded drone imagery", time: "3 hr ago", icon: ArrowUpRight },
];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-lg">
      <p className="text-gray-400 text-xs mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-medium" style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

export default function NgoDashboard() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  const kpis = [
    { label: "Pending Review", value: 8, icon: ClipboardList, color: "from-amber-500 to-amber-600", accent: "text-amber-600" },
    { label: "Verified This Month", value: 23, icon: CheckCircle2, color: "from-emerald-500 to-emerald-600", accent: "text-emerald-600" },
    { label: "Total Credits Issued", value: 84720, icon: Leaf, color: "from-sky-500 to-sky-600", accent: "text-sky-600" },
    { label: "Fraud Alerts", value: 3, icon: AlertTriangle, color: "from-red-400 to-red-500", accent: "text-red-600" },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">NGO Verifier Dashboard</h1>
        <p className="text-sm text-gray-500">Project verification overview and activity</p>
      </div>

      {/* KPI Cards */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={i} variants={item}
            className="p-5 rounded-2xl bg-white border border-gray-200 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center shadow-sm`}>
                <kpi.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900"><AnimCounter end={kpi.value} /></div>
            <div className="text-sm text-gray-500">{kpi.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Verifications Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Verifications by Month</h3>
          <p className="text-sm text-gray-500 mb-4">2025 verification activity</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={verificationsByMonth} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="verified" name="Verified" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="rejected" name="Rejected" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Grower Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.08 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <a.icon className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900"><span className="font-medium">{a.grower}</span> — {a.action}</p>
                  <p className="text-xs text-gray-400">{a.project} • {a.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
