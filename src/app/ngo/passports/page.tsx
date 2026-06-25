"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, Leaf, CheckCircle2 } from "lucide-react";

const passports = [
  { id: "CR-2025-038", project: "Digha Coastal Mangrove", grower: "Rajesh Kumar", tons: 840, txHash: "0xa1b2c3...d4e5f6", tokenId: "512", issuedAt: "Feb 10, 2025" },
  { id: "CR-2025-021", project: "Sundarbans Phase 1", grower: "Priya Sharma", tons: 2400, txHash: "0xb2c3d4...e5f6a7", tokenId: "489", issuedAt: "Jan 15, 2025" },
  { id: "CR-2024-198", project: "Chilika Lake Reserve", grower: "Vikram Singh", tons: 1580, txHash: "0xc3d4e5...f6a7b8", tokenId: "456", issuedAt: "Dec 5, 2024" },
  { id: "CR-2024-182", project: "Bhitarkanika Corridor", grower: "Ananya Patel", tons: 920, txHash: "0xd4e5f6...a7b8c9", tokenId: "440", issuedAt: "Nov 20, 2024" },
  { id: "CR-2024-165", project: "Gulf of Kutch Marine", grower: "Arjun Reddy", tons: 1840, txHash: "0xe5f6a7...b8c9d0", tokenId: "421", issuedAt: "Oct 8, 2024" },
  { id: "CR-2024-148", project: "Pichavaram Seagrass", grower: "Suresh Babu", tons: 680, txHash: "0xf6a7b8...c9d0e1", tokenId: "398", issuedAt: "Sep 15, 2024" },
  { id: "CR-2024-131", project: "Godavari Delta", grower: "Kavitha Rao", tons: 1120, txHash: "0xa7b8c9...d0e1f2", tokenId: "375", issuedAt: "Aug 22, 2024" },
  { id: "CR-2024-112", project: "Vembanad Wetlands", grower: "Meera Nair", tons: 480, txHash: "0xb8c9d0...e1f2a3", tokenId: "350", issuedAt: "Jul 10, 2024" },
];

export default function NgoPassportsPage() {
  const totalPassports = passports.length;
  const totalTons = passports.reduce((s, p) => s + p.tons, 0);

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Issued Carbon Passports</h1>
        <p className="text-sm text-gray-500">{totalPassports} passports issued • {totalTons.toLocaleString()} tCO₂ total</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-2xl bg-white border border-gray-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
            <Award className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Passports (NFTs)</p>
            <p className="text-2xl font-bold text-gray-900">{totalPassports}</p>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="p-5 rounded-2xl bg-white border border-gray-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center">
            <Leaf className="w-6 h-6 text-sky-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Carbon Certified</p>
            <p className="text-2xl font-bold text-gray-900">{totalTons.toLocaleString()} tCO₂</p>
          </div>
        </motion.div>
      </div>

      {/* Passports List */}
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
        {passports.map((passport) => (
          <motion.div key={passport.id} variants={item}
            className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-emerald-200 hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-sky-500 flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-emerald-600 font-mono">{passport.id}</h3>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 mt-0.5">{passport.project}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <span>Grower: {passport.grower}</span>
                    <span>•</span>
                    <span>{passport.tons.toLocaleString()} tCO₂</span>
                    <span>•</span>
                    <span>Token #{passport.tokenId}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">{passport.issuedAt}</p>
                <a href={`https://polygonscan.com/tx/${passport.txHash}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 font-medium mt-1">
                  <ExternalLink className="w-3 h-3" />
                  {passport.txHash}
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
