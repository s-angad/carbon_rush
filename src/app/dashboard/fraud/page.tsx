"use client";

import { motion } from "framer-motion";
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Search,
  Eye,
  TrendingDown,
  Activity,
  Shield,
  FileWarning,
  Clock,
  ArrowRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ScatterChart,
  Scatter,
  Cell,
} from "recharts";

// Demo Data
const anomalyData = Array.from({ length: 30 }, (_, i) => ({
  day: `Day ${i + 1}`,
  score: Math.random() * 0.3 + (i > 20 ? 0.4 : 0.05),
  baseline: 0.15,
}));

const scatterData = Array.from({ length: 40 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  risk: Math.random(),
}));

const riskHeatmap = [
  { region: "West Bengal", mangrove: 0.08, wetland: 0.12, seagrass: 0.05, coral: 0.03, saltmarsh: 0.06 },
  { region: "Gujarat", mangrove: 0.15, wetland: 0.09, seagrass: 0.04, coral: 0.02, saltmarsh: 0.11 },
  { region: "Tamil Nadu", mangrove: 0.06, wetland: 0.04, seagrass: 0.03, coral: 0.07, saltmarsh: 0.05 },
  { region: "Odisha", mangrove: 0.10, wetland: 0.08, seagrass: 0.02, coral: 0.01, saltmarsh: 0.09 },
  { region: "Kerala", mangrove: 0.04, wetland: 0.06, seagrass: 0.08, coral: 0.05, saltmarsh: 0.03 },
  { region: "A.P.", mangrove: 0.07, wetland: 0.11, seagrass: 0.06, coral: 0.04, saltmarsh: 0.08 },
  { region: "Karnataka", mangrove: 0.05, wetland: 0.03, seagrass: 0.02, coral: 0.06, saltmarsh: 0.04 },
];

const alerts = [
  { id: "FRD-00001", severity: "critical" as const, type: "Duplicate area claim detected", project: "CRP-00234", projectName: "Kutch Coastal Zone B", time: "12 min ago", status: "investigating" as const },
  { id: "FRD-00002", severity: "high" as const, type: "NDVI anomaly — possible deforestation", project: "CRP-00189", projectName: "Ratnagiri Mangrove Belt", time: "45 min ago", status: "investigating" as const },
  { id: "FRD-00003", severity: "high" as const, type: "Carbon estimate exceeds baseline", project: "CRP-00312", projectName: "Godavari Delta East", time: "2 hr ago", status: "investigating" as const },
  { id: "FRD-00004", severity: "medium" as const, type: "Suspicious ownership transfer", project: "CRP-00156", projectName: "Mumbai Coastal Project", time: "3 hr ago", status: "investigating" as const },
  { id: "FRD-00005", severity: "medium" as const, type: "Historical imagery mismatch", project: "CRP-00401", projectName: "Hooghly Estuary Zone", time: "5 hr ago", status: "resolved" as const },
  { id: "FRD-00006", severity: "low" as const, type: "Verification data inconsistency", project: "CRP-00298", projectName: "Chilika South Sector", time: "8 hr ago", status: "resolved" as const },
  { id: "FRD-00007", severity: "low" as const, type: "Overlapping project boundaries", project: "CRP-00445", projectName: "Kochi Backwater Edge", time: "12 hr ago", status: "dismissed" as const },
  { id: "FRD-00008", severity: "low" as const, type: "Unverified sequestration claim", project: "CRP-00367", projectName: "Diu Coastal Saltmarsh", time: "1 day ago", status: "resolved" as const },
];

const investigations = {
  new: alerts.filter(a => a.status === "investigating" && (a.severity === "critical" || a.severity === "high")),
  inProgress: alerts.filter(a => a.status === "investigating" && (a.severity === "medium")),
  resolved: alerts.filter(a => a.status === "resolved" || a.status === "dismissed"),
};

const severityColors = {
  critical: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", dot: "bg-red-500" },
  high: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", dot: "bg-orange-500" },
  medium: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500" },
  low: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
};

function getRiskColor(val: number) {
  if (val >= 0.12) return "bg-red-100 text-red-700";
  if (val >= 0.08) return "bg-orange-100 text-orange-700";
  if (val >= 0.05) return "bg-amber-100 text-amber-700";
  return "bg-emerald-100 text-emerald-700";
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-3">
      <p className="text-gray-400 text-xs mb-1">{label}</p>
      {payload.map((e, i) => (
        <p key={i} className="text-sm font-medium" style={{ color: e.color }}>
          {e.name}: {typeof e.value === "number" ? e.value.toFixed(3) : e.value}
        </p>
      ))}
    </div>
  );
}

export default function FraudDetectionPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: "easeOut" }} className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
          <ShieldAlert className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fraud Intelligence Center</h1>
          <p className="text-sm text-gray-500">Advanced anomaly detection and carbon market integrity</p>
        </div>
      </motion.div>

      {/* KPI Row */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, ease: "easeOut" }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Overall Risk Score", value: "12.3%", sub: "Low Risk", icon: Shield, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Active Alerts", value: "7", sub: "2 Critical, 1 High", icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Cases Resolved", value: "23/30", sub: "This month", icon: CheckCircle2, color: "text-sky-600", bg: "bg-sky-50" },
          { label: "Detection Accuracy", value: "99.1%", sub: "+0.3% improvement", icon: Activity, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.05, ease: "easeOut" }}
            className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`w-9 h-9 rounded-xl ${kpi.bg} flex items-center justify-center mb-3`}>
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
            <div className="text-sm text-gray-500">{kpi.label}</div>
            <div className={`text-xs mt-1 ${kpi.color}`}>{kpi.sub}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Risk Heatmap + Anomaly Chart */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Risk Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ease: "easeOut" }}
          className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Risk Heatmap</h3>
          <p className="text-sm text-gray-500 mb-4">Fraud risk by region and ecosystem type</p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left text-xs text-gray-400 uppercase tracking-wider font-medium pb-2 pr-3">Region</th>
                  {["Mangrove", "Wetland", "Seagrass", "Coral", "Saltmarsh"].map(h => (
                    <th key={h} className="text-center text-xs text-gray-400 uppercase tracking-wider font-medium pb-2 px-1">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {riskHeatmap.map((row, i) => (
                  <tr key={i}>
                    <td className="text-sm text-gray-900 py-1.5 pr-3 font-medium">{row.region}</td>
                    {[row.mangrove, row.wetland, row.seagrass, row.coral, row.saltmarsh].map((val, j) => (
                      <td key={j} className="py-1.5 px-1">
                        <div className={`w-full text-center py-1.5 rounded-lg text-xs font-medium ${getRiskColor(val)}`}>
                          {(val * 100).toFixed(1)}%
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Anomaly Detection Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, ease: "easeOut" }}
          className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Anomaly Detection</h3>
          <p className="text-sm text-gray-500 mb-4">30-day anomaly score timeline</p>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={anomalyData}>
              <defs>
                <linearGradient id="anomalyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" tick={{ fill: "#9CA3AF", fontSize: 10 }} axisLine={false} tickLine={false} interval={4} />
              <YAxis tick={{ fill: "#9CA3AF", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="baseline" name="Baseline" stroke="#10B981" strokeWidth={1} strokeDasharray="5 5" fill="none" />
              <Area type="monotone" dataKey="score" name="Anomaly Score" stroke="#EF4444" strokeWidth={2} fill="url(#anomalyGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Active Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, ease: "easeOut" }}
        className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Active Alerts</h3>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200">
            <Search className="w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search alerts..." className="bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none w-40" />
          </div>
        </div>
        <div className="space-y-3">
          {alerts.map((alert, i) => {
            const sc = severityColors[alert.severity];
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.05, ease: "easeOut" }}
                className={`flex items-center gap-4 p-4 rounded-xl bg-gray-50 border ${sc.border} hover:bg-gray-100 transition-all group`}
              >
                <div className={`w-2 h-8 rounded-full ${sc.dot}`} />
                <div className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${sc.bg} ${sc.text}`}>
                  {alert.severity}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 font-medium">{alert.type}</p>
                  <p className="text-xs text-gray-500">{alert.projectName} ({alert.project})</p>
                </div>
                <span className="text-xs text-gray-400 hidden md:block">{alert.time}</span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  alert.status === "investigating" ? "bg-amber-50 text-amber-700" :
                  alert.status === "resolved" ? "bg-emerald-50 text-emerald-700" :
                  "bg-gray-100 text-gray-500"
                }`}>
                  {alert.status}
                </span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-gray-700 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-gray-700 transition-colors">
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Investigation Kanban */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, ease: "easeOut" }}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Investigation Workflow</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: "New", items: investigations.new, color: "border-red-200", dotColor: "bg-red-500" },
            { title: "In Progress", items: investigations.inProgress, color: "border-amber-200", dotColor: "bg-amber-500" },
            { title: "Resolved", items: investigations.resolved, color: "border-emerald-200", dotColor: "bg-emerald-500" },
          ].map((col, ci) => (
            <div key={ci} className={`rounded-2xl bg-gray-50 border ${col.color} p-4`}>
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-2.5 h-2.5 rounded-full ${col.dotColor}`} />
                <span className="text-sm font-semibold text-gray-900">{col.title}</span>
                <span className="ml-auto text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full border border-gray-200">{col.items.length}</span>
              </div>
              <div className="space-y-3">
                {col.items.map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer">
                    <div className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold uppercase mb-2 ${severityColors[item.severity].bg} ${severityColors[item.severity].text}`}>
                      {item.severity}
                    </div>
                    <p className="text-sm text-gray-900 mb-1">{item.type}</p>
                    <p className="text-xs text-gray-500">{item.projectName}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400">{item.time}</span>
                      <ArrowRight className="w-3 h-3 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
