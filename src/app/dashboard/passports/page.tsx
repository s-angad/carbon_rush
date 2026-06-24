"use client";

import { motion } from "framer-motion";
import {
  Leaf, Shield, CheckCircle2, Clock, ExternalLink,
  MapPin, Calendar, TrendingUp, Search, Filter,
} from "lucide-react";
import { useState } from "react";

const passports = [
  { id: "CRP-00001", project: "Sundarbans Mangrove Delta", type: "Mangrove", location: "West Bengal", carbon: 12450, status: "verified", health: 94, vintage: 2024, nftId: "#4521", color: "emerald" },
  { id: "CRP-00002", project: "Gulf of Kutch Marine", type: "Wetland", location: "Gujarat", carbon: 8920, status: "verified", health: 87, vintage: 2024, nftId: "#4522", color: "sky" },
  { id: "CRP-00003", project: "Pichavaram Seagrass", type: "Seagrass", location: "Tamil Nadu", carbon: 6340, status: "pending", health: 91, vintage: 2024, nftId: "#4523", color: "teal" },
  { id: "CRP-00004", project: "Chilika Lake Reserve", type: "Wetland", location: "Odisha", carbon: 15200, status: "verified", health: 92, vintage: 2024, nftId: "#4524", color: "sky" },
  { id: "CRP-00005", project: "Bhitarkanika Corridor", type: "Mangrove", location: "Odisha", carbon: 9870, status: "verified", health: 89, vintage: 2023, nftId: "#4525", color: "emerald" },
  { id: "CRP-00006", project: "Coringa Wildlife", type: "Mangrove", location: "Andhra Pradesh", carbon: 7650, status: "in_review", health: 85, vintage: 2024, nftId: "#4526", color: "emerald" },
  { id: "CRP-00007", project: "Vembanad Wetlands", type: "Wetland", location: "Kerala", carbon: 4890, status: "verified", health: 88, vintage: 2023, nftId: "#4527", color: "sky" },
  { id: "CRP-00008", project: "Muthupet Lagoon", type: "Wetland", location: "Tamil Nadu", carbon: 5430, status: "verified", health: 83, vintage: 2024, nftId: "#4528", color: "sky" },
  { id: "CRP-00009", project: "Godavari Delta", type: "Mangrove", location: "Andhra Pradesh", carbon: 8200, status: "verified", health: 90, vintage: 2025, nftId: "#4529", color: "emerald" },
];

const typeColors: Record<string, { bg: string; text: string }> = {
  Mangrove: { bg: "bg-emerald-50", text: "text-emerald-700" },
  Wetland: { bg: "bg-sky-50", text: "text-sky-700" },
  Seagrass: { bg: "bg-teal-50", text: "text-teal-700" },
};

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  verified: { bg: "bg-emerald-50", text: "text-emerald-700", label: "Verified" },
  pending: { bg: "bg-amber-50", text: "text-amber-700", label: "Pending" },
  in_review: { bg: "bg-sky-50", text: "text-sky-700", label: "In Review" },
};

export default function PassportsPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");

  const filtered = passports.filter((p) => {
    const matchSearch = p.project.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "All" || p.type === filterType;
    return matchSearch && matchType;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
            <Leaf className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Carbon Passports</h1>
            <p className="text-sm text-gray-500">Blockchain-verified carbon credit certificates</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 w-64">
            <Search className="w-4 h-4 text-gray-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search passports..." className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none flex-1" />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 bg-white">
              <option>All</option>
              <option>Mangrove</option>
              <option>Wetland</option>
              <option>Seagrass</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Passports", value: "512", icon: Leaf, color: "bg-emerald-50 text-emerald-600" },
          { label: "Verified", value: "487", icon: CheckCircle2, color: "bg-sky-50 text-sky-600" },
          { label: "Carbon Certified", value: "847K tCO₂", icon: TrendingUp, color: "bg-teal-50 text-teal-600" },
          { label: "NFTs Minted", value: "512", icon: Shield, color: "bg-violet-50 text-violet-600" },
        ].map((s, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white border border-gray-200 hover:shadow-sm transition-all">
            <div className={`w-9 h-9 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            <div className="text-sm text-gray-500">{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Passport Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p, i) => {
          const tc = typeColors[p.type] || typeColors.Mangrove;
          const sc = statusConfig[p.status];
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.04, ease: "easeOut" }}
              className="rounded-2xl bg-white border border-gray-200 overflow-hidden hover:shadow-md hover:border-gray-300 transition-all group"
            >
              {/* Gradient Header */}
              <div className={`h-3 bg-gradient-to-r ${p.color === "emerald" ? "from-emerald-400 to-teal-400" : p.color === "sky" ? "from-sky-400 to-blue-400" : "from-teal-400 to-cyan-400"}`} />

              <div className="p-5">
                {/* Top Row */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs font-mono text-gray-400 mb-1">{p.id}</p>
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">{p.project}</h3>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${sc.bg} ${sc.text}`}>
                    {p.status === "verified" && <CheckCircle2 className="w-3 h-3" />}
                    {p.status === "pending" && <Clock className="w-3 h-3" />}
                    {sc.label}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${tc.bg} ${tc.text}`}>{p.type}</span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <MapPin className="w-3 h-3" />{p.location}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />{p.vintage}
                  </span>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Carbon Verified</p>
                    <p className="text-sm font-bold text-emerald-600">{p.carbon.toLocaleString()} tCO₂</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Health Score</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-gray-900">{p.health}%</p>
                      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${p.health}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs text-gray-400 font-mono">NFT {p.nftId}</span>
                  </div>
                  <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-emerald-600 transition-colors">
                    <ExternalLink className="w-3 h-3" />
                    View on Chain
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
