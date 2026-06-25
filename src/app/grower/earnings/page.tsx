"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { IndianRupee, TrendingUp, Clock, CheckCircle2, Wallet, ArrowDownToLine } from "lucide-react";

const payouts = [
  { date: "Jun 15, 2025", project: "Digha Coastal Mangrove", credits: 280, amount: "₹68,600", method: "UPI", status: "paid" },
  { date: "May 20, 2025", project: "Digha Coastal Mangrove", credits: 200, amount: "₹49,000", method: "Bank Transfer", status: "paid" },
  { date: "Apr 10, 2025", project: "Sundarbans East Restoration", credits: 350, amount: "₹85,750", method: "UPI", status: "paid" },
  { date: "Mar 5, 2025", project: "Sundarbans East Restoration", credits: 180, amount: "₹44,100", method: "Bank Transfer", status: "paid" },
  { date: "Jun 25, 2025", project: "Sundarbans East Restoration", credits: 150, amount: "₹37,500", method: "UPI", status: "pending" },
];

export default function GrowerEarningsPage() {
  const [payoutMethod, setPayoutMethod] = useState("upi");
  const [upiId, setUpiId] = useState("rajesh@upi");
  const [bankLast4, setBankLast4] = useState("8842");

  const totalEarned = 285000;
  const pendingPayout = 37500;
  const withdrawn = 247500;

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
        <p className="text-sm text-gray-500">Your carbon credit earnings and payout history</p>
      </div>

      {/* Summary Cards */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div variants={item} className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-5 h-5 text-emerald-200" />
            <span className="text-sm font-medium text-emerald-100">Total Earned</span>
          </div>
          <div className="text-3xl font-bold">₹{totalEarned.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-sm text-emerald-200 mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            +18.4% this season
          </div>
        </motion.div>

        <motion.div variants={item} className="p-5 rounded-2xl bg-white border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-medium text-gray-500">Pending Payout</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">₹{pendingPayout.toLocaleString()}</div>
          <p className="text-xs text-gray-400 mt-1">Expected within 3-5 days</p>
        </motion.div>

        <motion.div variants={item} className="p-5 rounded-2xl bg-white border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <ArrowDownToLine className="w-5 h-5 text-sky-500" />
            <span className="text-sm font-medium text-gray-500">Withdrawn</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">₹{withdrawn.toLocaleString()}</div>
          <p className="text-xs text-gray-400 mt-1">Across 4 payouts</p>
        </motion.div>
      </motion.div>

      {/* Payout History */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payout History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 pr-4">Date</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 pr-4">Project</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 pr-4">Credits</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 pr-4">Amount</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 pr-4">Method</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((p, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 pr-4"><span className="text-sm text-gray-500">{p.date}</span></td>
                  <td className="py-3 pr-4"><span className="text-sm font-medium text-gray-900">{p.project}</span></td>
                  <td className="py-3 pr-4"><span className="text-sm text-gray-900">{p.credits} tCO₂</span></td>
                  <td className="py-3 pr-4"><span className="text-sm font-medium text-gray-900">{p.amount}</span></td>
                  <td className="py-3 pr-4"><span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{p.method}</span></td>
                  <td className="py-3">
                    <span className={`flex items-center gap-1 text-xs font-medium ${p.status === "paid" ? "text-emerald-600" : "text-amber-600"}`}>
                      {p.status === "paid" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {p.status === "paid" ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Payout Settings */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payout Settings</h3>
        <div className="max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Method</label>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setPayoutMethod("upi")}
                className={`p-3 rounded-xl border-2 text-left transition-all ${payoutMethod === "upi" ? "border-emerald-500 bg-emerald-50" : "border-gray-200 hover:border-gray-300"}`}>
                <div className={`text-sm font-semibold ${payoutMethod === "upi" ? "text-emerald-900" : "text-gray-700"}`}>UPI</div>
                <div className="text-xs text-gray-500">Instant transfer</div>
              </button>
              <button onClick={() => setPayoutMethod("bank")}
                className={`p-3 rounded-xl border-2 text-left transition-all ${payoutMethod === "bank" ? "border-emerald-500 bg-emerald-50" : "border-gray-200 hover:border-gray-300"}`}>
                <div className={`text-sm font-semibold ${payoutMethod === "bank" ? "text-emerald-900" : "text-gray-700"}`}>Bank Transfer</div>
                <div className="text-xs text-gray-500">1-3 business days</div>
              </button>
            </div>
          </div>

          {payoutMethod === "upi" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
              <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)}
                placeholder="e.g., yourname@upi"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400" />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account (Last 4 digits)</label>
              <input type="text" value={bankLast4} onChange={(e) => setBankLast4(e.target.value)}
                placeholder="e.g., 8842" maxLength={4}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400" />
            </div>
          )}

          <button className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors">
            Save Payout Details
          </button>
        </div>
      </motion.div>
    </div>
  );
}
