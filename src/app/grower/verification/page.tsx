"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, Brain, Shield, AlertCircle } from "lucide-react";

const projects = [
  {
    id: "PRJ-042", name: "Sundarbans East Restoration",
    steps: [
      { label: "Project Registered", status: "done", date: "Mar 15, 2025" },
      { label: "AI Satellite Check", status: "done", date: "Mar 18, 2025", detail: "NDVI: 0.76 • Confidence: 96.2%" },
      { label: "NGO Field Confirmation", status: "pending", date: "Awaiting", detail: "Assigned to GreenEarth Foundation" },
      { label: "Credits Issued", status: "upcoming", date: "", detail: "" },
    ],
  },
  {
    id: "PRJ-043", name: "Hooghly River Wetland",
    steps: [
      { label: "Project Registered", status: "done", date: "May 2, 2025" },
      { label: "AI Satellite Check", status: "pending", date: "In Progress", detail: "Satellite pass scheduled" },
      { label: "NGO Field Confirmation", status: "upcoming", date: "", detail: "" },
      { label: "Credits Issued", status: "upcoming", date: "", detail: "" },
    ],
  },
  {
    id: "PRJ-038", name: "Digha Coastal Mangrove",
    steps: [
      { label: "Project Registered", status: "done", date: "Jan 10, 2025" },
      { label: "AI Satellite Check", status: "done", date: "Jan 14, 2025", detail: "NDVI: 0.82 • Confidence: 98.1%" },
      { label: "NGO Field Confirmation", status: "done", date: "Feb 3, 2025", detail: "Verified by GreenEarth Foundation" },
      { label: "Credits Issued", status: "done", date: "Feb 10, 2025", detail: "840 tCO₂ • CR-2025-038" },
    ],
  },
];

export default function GrowerVerificationPage() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Verification Status</h1>
        <p className="text-sm text-gray-500">Track the verification pipeline for each project</p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        {projects.map((project) => (
          <motion.div key={project.id} variants={item}
            className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                <p className="text-xs text-gray-500">{project.id}</p>
              </div>
            </div>

            <div className="space-y-0">
              {project.steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.status === "done" ? "bg-emerald-500 text-white" :
                      step.status === "pending" ? "bg-amber-100 text-amber-600 border-2 border-amber-300" :
                      "bg-gray-100 text-gray-400 border-2 border-gray-200"
                    }`}>
                      {step.status === "done" ? <CheckCircle2 className="w-4 h-4" /> :
                       step.status === "pending" ? <Clock className="w-4 h-4" /> :
                       <span className="text-xs font-bold">{i + 1}</span>}
                    </div>
                    {i < project.steps.length - 1 && (
                      <div className={`w-0.5 h-12 ${step.status === "done" ? "bg-emerald-300" : "bg-gray-200"}`} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-6 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-medium ${
                        step.status === "done" ? "text-gray-900" :
                        step.status === "pending" ? "text-amber-700" : "text-gray-400"
                      }`}>{step.label}</h4>
                      {step.date && (
                        <span className="text-xs text-gray-400">{step.date}</span>
                      )}
                    </div>
                    {step.detail && (
                      <p className="text-xs text-gray-500 mt-0.5">{step.detail}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
