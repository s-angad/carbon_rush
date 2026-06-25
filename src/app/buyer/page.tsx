"use client";

import { motion } from "framer-motion";
import {
  Factory,
  Leaf,
  CreditCard,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// ===== Animated Counter =====
function AnimCounter({ end, duration = 2, prefix = "", suffix = "" }: { end: number; duration?: number; prefix?: string; suffix?: string }) {
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
  return <>{prefix}{count.toLocaleString()}{suffix}</>;
}

// ===== Demo Data =====
const emissionsData = Array.from({ length: 12 }, (_, i) => ({
  month: new Date(2025, i).toLocaleDateString("en-US", { month: "short" }),
  emissions: Math.floor(1200 + Math.random() * 400),
  offset: Math.floor(600 + i * 60 + Math.random() * 200),
}));

const kpis = [
  { label: "Total Emissions", value: 14580, suffix: " tCO₂", icon: Factory, color: "from-red-400 to-red-500", change: "+2.1%", up: true, accent: "text-red-600" },
  { label: "Total Offset", value: 9620, suffix: " tCO₂", icon: Leaf, color: "from-emerald-500 to-emerald-600", change: "+18.4%", up: true, accent: "text-emerald-600" },
  { label: "Credits Owned", value: 4230, suffix: "", icon: CreditCard, color: "from-sky-500 to-sky-600", change: "+340", up: true, accent: "text-sky-600" },
  { label: "Amount Spent", value: 1285000, prefix: "₹", suffix: "", icon: IndianRupee, color: "from-amber-500 to-amber-600", change: "+₹2.4L", up: true, accent: "text-amber-600" },
];

const recentPurchases = [
  { project: "Sundarbans Mangrove Delta", passportId: "CR-2025-001", tons: 500, cost: "₹12,25,000", date: "Jun 22, 2025" },
  { project: "Chilika Lake Reserve", passportId: "CR-2025-004", tons: 300, cost: "₹6,60,000", date: "Jun 18, 2025" },
  { project: "Bhitarkanika Corridor", passportId: "CR-2025-005", tons: 200, cost: "₹5,35,000", date: "Jun 15, 2025" },
  { project: "Gulf of Kutch Marine", passportId: "CR-2025-002", tons: 150, cost: "₹3,22,500", date: "Jun 10, 2025" },
  { project: "Pichavaram Seagrass Bed", passportId: "CR-2025-003", tons: 100, cost: "₹2,80,000", date: "Jun 5, 2025" },
];

// ===== Custom Tooltip =====
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-lg">
      <p className="text-gray-400 text-xs mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-medium" style={{ color: entry.color }}>
          {entry.name}: {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value} tCO₂
        </p>
      ))}
    </div>
  );
}

export default function BuyerDashboard() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
  const offsetPercentage = 66;

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Buyer Dashboard</h1>
        <p className="text-sm text-gray-500">Your carbon offset overview and portfolio</p>
      </div>

      {/* KPI Cards */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={i}
            variants={item}
            className="group relative p-5 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center shadow-sm`}>
                <kpi.icon className="w-5 h-5 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${kpi.accent}`}>
                {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {kpi.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              <AnimCounter end={kpi.value} prefix={kpi.prefix || ""} suffix={kpi.suffix || ""} />
            </div>
            <div className="text-sm text-gray-500">{kpi.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Emissions vs Offset */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Emissions vs Offset</h3>
              <p className="text-sm text-gray-500">Monthly comparison for 2025</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={emissionsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="emissions" name="Emissions" stroke="#EF4444" strokeWidth={2} dot={{ r: 3, fill: "#EF4444" }} />
              <Line type="monotone" dataKey="offset" name="Offset" stroke="#10B981" strokeWidth={2} dot={{ r: 3, fill: "#10B981" }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Offset Target */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Annual Offset Target</h3>
          <p className="text-sm text-gray-500 mb-6">Progress toward net-zero goal</p>

          <div className="flex items-center justify-center mb-6">
            <div className="relative w-36 h-36">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#F1F5F9" strokeWidth="8" />
                <motion.circle
                  cx="50" cy="50" r="42" fill="none" stroke="url(#offsetGrad)" strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 42}
                  initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - offsetPercentage / 100) }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="offsetGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#0EA5E9" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">{offsetPercentage}%</span>
                <span className="text-xs text-gray-400">Complete</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Target</span>
              <span className="font-medium text-gray-900">14,580 tCO₂</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Offset so far</span>
              <span className="font-medium text-emerald-600">9,620 tCO₂</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Remaining</span>
              <span className="font-medium text-amber-600">4,960 tCO₂</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Purchases */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Purchases</h3>
          <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
            View All <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 pr-4">Project</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 pr-4">Passport ID</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 pr-4">Tons CO₂</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 pr-4">Cost</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentPurchases.map((purchase, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-medium text-gray-900">{purchase.project}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-sm text-gray-600 font-mono">{purchase.passportId}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-sm font-medium text-gray-900">{purchase.tons}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-sm font-medium text-gray-900">{purchase.cost}</span>
                  </td>
                  <td className="py-3">
                    <span className="text-sm text-gray-500">{purchase.date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
