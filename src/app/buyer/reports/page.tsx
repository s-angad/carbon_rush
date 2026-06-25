"use client";

import { motion } from "framer-motion";
import { FileText, Download, Leaf, Shield, Globe, Users, CheckCircle2 } from "lucide-react";
import { esgReportData } from "@/lib/demo-data";

export default function BuyerReportsPage() {
  const handleDownload = () => {
    alert("PDF download will be generated. (jsPDF integration placeholder)");
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ESG Reports</h1>
          <p className="text-sm text-gray-500">Environmental, Social & Governance compliance reports</p>
        </div>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>

      {/* Report Sections */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Environmental */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Environmental</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(esgReportData.environmental).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                <span className="text-sm font-medium text-gray-900">{String(value)}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Social */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-sky-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Social</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(esgReportData.social).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                <span className="text-sm font-medium text-gray-900">{String(value)}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Governance */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <Shield className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Governance</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(esgReportData.governance).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                <span className="text-sm font-medium text-gray-900">{Array.isArray(value) ? value.join(", ") : String(value)}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Purchased Credits List */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900">Purchased Credits Summary</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 pr-4">Carbon Passport ID</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 pr-4">Project</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 pr-4">Credits (tCO₂)</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 pr-4">Registry</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "CR-2025-001", project: "Sundarbans Mangrove Delta", tons: 500, registry: "Verra VCS", status: "verified" },
                { id: "CR-2025-002", project: "Gulf of Kutch Marine", tons: 150, registry: "Gold Standard", status: "verified" },
                { id: "CR-2025-003", project: "Pichavaram Seagrass Bed", tons: 100, registry: "Verra VCS", status: "retired" },
                { id: "CR-2025-004", project: "Chilika Lake Reserve", tons: 300, registry: "Verra VCS", status: "verified" },
                { id: "CR-2025-005", project: "Bhitarkanika Corridor", tons: 200, registry: "Gold Standard", status: "verified" },
              ].map((c, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 pr-4"><span className="text-sm font-mono text-emerald-600">{c.id}</span></td>
                  <td className="py-3 pr-4"><span className="text-sm font-medium text-gray-900">{c.project}</span></td>
                  <td className="py-3 pr-4"><span className="text-sm text-gray-900">{c.tons}</span></td>
                  <td className="py-3 pr-4"><span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{c.registry}</span></td>
                  <td className="py-3">
                    <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                      <CheckCircle2 className="w-3 h-3" />
                      {c.status === "retired" ? "Retired" : "Verified"}
                    </span>
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
