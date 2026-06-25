"use client";

import { motion } from "framer-motion";
import { Leaf, ExternalLink, CheckCircle2, Clock, TrendingUp } from "lucide-react";

const portfolioCredits = [
  { passportId: "CR-2025-001", project: "Sundarbans Mangrove Delta", tons: 500, status: "active", value: "₹12,25,000", purchaseDate: "Jun 22, 2025", type: "Mangrove" },
  { passportId: "CR-2025-004", project: "Chilika Lake Reserve", tons: 300, status: "active", value: "₹6,60,000", purchaseDate: "Jun 18, 2025", type: "Wetland" },
  { passportId: "CR-2025-005", project: "Bhitarkanika Corridor", tons: 200, status: "active", value: "₹5,35,000", purchaseDate: "Jun 15, 2025", type: "Mangrove" },
  { passportId: "CR-2025-002", project: "Gulf of Kutch Marine", tons: 150, status: "active", value: "₹3,22,500", purchaseDate: "Jun 10, 2025", type: "Wetland" },
  { passportId: "CR-2025-003", project: "Pichavaram Seagrass Bed", tons: 100, status: "retired", value: "₹2,80,000", purchaseDate: "Jun 5, 2025", type: "Seagrass" },
];

const retirementHistory = [
  { passportId: "CR-2025-003", project: "Pichavaram Seagrass Bed", tons: 100, retiredDate: "Jun 20, 2025", txHash: "0xa1b2c3...d4e5f6" },
  { passportId: "CR-2024-012", project: "Ratnagiri Saltmarsh", tons: 50, retiredDate: "May 12, 2025", txHash: "0xf6e5d4...c3b2a1" },
];

export default function BuyerPortfolioPage() {
  const totalCredits = portfolioCredits.filter(c => c.status === "active").reduce((s, c) => s + c.tons, 0);
  const totalValue = "₹27,42,500";
  const retiredCredits = portfolioCredits.filter(c => c.status === "retired").reduce((s, c) => s + c.tons, 0);

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Portfolio</h1>
        <p className="text-sm text-gray-500">Your carbon credit holdings and retirement history</p>
      </div>

      {/* Summary Cards */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div variants={item} className="p-5 rounded-2xl bg-white border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Credits</p>
              <p className="text-2xl font-bold text-gray-900">{totalCredits.toLocaleString()} tCO₂</p>
            </div>
          </div>
        </motion.div>
        <motion.div variants={item} className="p-5 rounded-2xl bg-white border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Portfolio Value</p>
              <p className="text-2xl font-bold text-gray-900">{totalValue}</p>
            </div>
          </div>
        </motion.div>
        <motion.div variants={item} className="p-5 rounded-2xl bg-white border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Retired Credits</p>
              <p className="text-2xl font-bold text-gray-900">{retiredCredits} tCO₂</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Credits Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Credits Owned</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 pr-4">Passport ID</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 pr-4">Project</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 pr-4">Type</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 pr-4">Tons CO₂</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 pr-4">Value</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 pr-4">Status</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {portfolioCredits.map((credit, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 pr-4"><span className="text-sm font-mono text-emerald-600">{credit.passportId}</span></td>
                  <td className="py-3 pr-4"><span className="text-sm font-medium text-gray-900">{credit.project}</span></td>
                  <td className="py-3 pr-4"><span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{credit.type}</span></td>
                  <td className="py-3 pr-4"><span className="text-sm font-medium text-gray-900">{credit.tons}</span></td>
                  <td className="py-3 pr-4"><span className="text-sm text-gray-900">{credit.value}</span></td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${credit.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                      {credit.status === "active" ? "Active" : "Retired"}
                    </span>
                  </td>
                  <td className="py-3"><span className="text-sm text-gray-500">{credit.purchaseDate}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Retirement History */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Retirement History</h3>
        <div className="space-y-3">
          {retirementHistory.map((r, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 border border-gray-100">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{r.project}</p>
                <p className="text-xs text-gray-500">{r.passportId} • {r.tons} tCO₂ • {r.retiredDate}</p>
              </div>
              <a href="#" className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 font-medium">
                <ExternalLink className="w-3 h-3" />
                <span className="hidden sm:inline">Tx: {r.txHash}</span>
              </a>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
