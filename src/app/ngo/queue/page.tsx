"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Clock, AlertTriangle, ArrowRight, Shield } from "lucide-react";
import Link from "next/link";

const queueProjects = [
  { id: "PRJ-042", grower: "Rajesh Kumar", name: "Sundarbans East Restoration", location: "South 24 Parganas, WB", hectares: 45, aiCarbon: 1240, fraudScore: 12, submitted: "Jun 22, 2025" },
  { id: "PRJ-043", grower: "Rajesh Kumar", name: "Hooghly River Wetland", location: "Howrah, WB", hectares: 22, aiCarbon: 580, fraudScore: 8, submitted: "Jun 20, 2025" },
  { id: "PRJ-051", grower: "Ananya Patel", name: "Cuddalore Mangrove Belt", location: "Cuddalore, TN", hectares: 38, aiCarbon: 960, fraudScore: 22, submitted: "Jun 18, 2025" },
  { id: "PRJ-054", grower: "Vikram Singh", name: "Bhitarkanika Creek Extension", location: "Kendrapara, OD", hectares: 28, aiCarbon: 720, fraudScore: 45, submitted: "Jun 15, 2025" },
  { id: "PRJ-058", grower: "Meera Nair", name: "Vembanad Wetlands Phase 2", location: "Alappuzha, KL", hectares: 15, aiCarbon: 380, fraudScore: 5, submitted: "Jun 12, 2025" },
  { id: "PRJ-061", grower: "Suresh Babu", name: "Muthupet Lagoon North", location: "Thanjavur, TN", hectares: 20, aiCarbon: 510, fraudScore: 68, submitted: "Jun 10, 2025" },
  { id: "PRJ-063", grower: "Kavitha Rao", name: "Karnataka Coast Restoration", location: "Uttara Kannada, KA", hectares: 32, aiCarbon: 840, fraudScore: 15, submitted: "Jun 8, 2025" },
  { id: "PRJ-065", grower: "Amit Deshmukh", name: "Ratnagiri Tidal Flats", location: "Ratnagiri, MH", hectares: 12, aiCarbon: 290, fraudScore: 72, submitted: "Jun 5, 2025" },
];

export default function NgoQueuePage() {
  const [sortBy, setSortBy] = useState("date");

  const sorted = [...queueProjects].sort((a, b) => {
    if (sortBy === "fraud") return b.fraudScore - a.fraudScore;
    if (sortBy === "size") return b.hectares - a.hectares;
    return 0; // default: date order as listed
  });

  const getFraudColor = (score: number) => {
    if (score < 30) return { bg: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-200" };
    if (score < 60) return { bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-200" };
    return { bg: "bg-red-50", text: "text-red-700", ring: "ring-red-200" };
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Review Queue</h1>
          <p className="text-sm text-gray-500">{queueProjects.length} projects pending NGO review</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Sort by:</span>
          {["date", "fraud", "size"].map((s) => (
            <button key={s} onClick={() => setSortBy(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                sortBy === s ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "text-gray-500 hover:bg-gray-100 border border-transparent"
              }`}>
              {s === "fraud" ? "Fraud Risk" : s === "size" ? "Size" : "Date"}
            </button>
          ))}
        </div>
      </div>

      {/* Queue Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">Grower</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">Project</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">Location</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">Hectares</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">AI Carbon</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">Fraud Risk</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">Submitted</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((project, i) => {
                const fraud = getFraudColor(project.fraudScore);
                return (
                  <motion.tr key={project.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-4"><span className="text-sm font-medium text-gray-900">{project.grower}</span></td>
                    <td className="py-3 px-4">
                      <div>
                        <span className="text-sm font-medium text-gray-900">{project.name}</span>
                        <span className="block text-xs text-gray-400 font-mono">{project.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" />{project.location}</span>
                    </td>
                    <td className="py-3 px-4"><span className="text-sm text-gray-900">{project.hectares}</span></td>
                    <td className="py-3 px-4"><span className="text-sm font-medium text-gray-900">{project.aiCarbon.toLocaleString()} tCO₂</span></td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ring-1 ${fraud.bg} ${fraud.text} ${fraud.ring}`}>
                        {project.fraudScore >= 60 ? <AlertTriangle className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
                        {project.fraudScore}%
                      </span>
                    </td>
                    <td className="py-3 px-4"><span className="text-sm text-gray-500">{project.submitted}</span></td>
                    <td className="py-3 px-4">
                      <Link href={`/ngo/verify/${project.id}`}
                        className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                        Review <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
