"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { TreePine, Plus, MapPin, CheckCircle2, Clock, AlertCircle, X } from "lucide-react";

const demoProjects = [
  { id: "PRJ-042", name: "Sundarbans East Restoration", location: "South 24 Parganas, West Bengal", ecosystem: "Mangrove", area: 45, trees: 12500, status: "pending_ngo_review", created: "Mar 15, 2025" },
  { id: "PRJ-043", name: "Hooghly River Wetland", location: "Howrah, West Bengal", ecosystem: "Wetland", area: 22, trees: 5800, status: "pending_ai_review", created: "May 2, 2025" },
  { id: "PRJ-038", name: "Digha Coastal Mangrove", location: "East Midnapore, West Bengal", ecosystem: "Mangrove", area: 18, trees: 4200, status: "verified", created: "Jan 10, 2025" },
  { id: "PRJ-029", name: "Bakkhali Seagrass Zone", location: "South 24 Parganas, West Bengal", ecosystem: "Seagrass", area: 12, trees: 0, status: "rejected", created: "Nov 5, 2024" },
];

const ecosystemTypes = ["Mangrove", "Wetland", "Seagrass", "Forest", "Saltmarsh"];
const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  pending_ai_review: { bg: "bg-sky-50", text: "text-sky-700", label: "AI Review" },
  pending_ngo_review: { bg: "bg-amber-50", text: "text-amber-700", label: "NGO Review" },
  verified: { bg: "bg-emerald-50", text: "text-emerald-700", label: "Verified" },
  rejected: { bg: "bg-red-50", text: "text-red-700", label: "Rejected" },
};

export default function GrowerProjectsPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "", state: "", district: "", lat: "", lng: "", ecosystem: "Mangrove", area: "", trees: "", startDate: "", ngo: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Project "${formData.name}" registered successfully! Status: pending_ai_review`);
    setShowForm(false);
    setFormData({ name: "", state: "", district: "", lat: "", lng: "", ecosystem: "Mangrove", area: "", trees: "", startDate: "", ngo: "" });
  };

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
          <p className="text-sm text-gray-500">Register and manage your restoration projects</p>
        </div>
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors">
          <Plus className="w-4 h-4" />
          Register New Project
        </button>
      </div>

      {/* Projects List */}
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
        {demoProjects.map((project) => {
          const status = statusColors[project.status];
          return (
            <motion.div key={project.id} variants={item}
              className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <TreePine className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {project.location}
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span>{project.ecosystem}</span>
                      <span>•</span>
                      <span>{project.area} ha</span>
                      {project.trees > 0 && <><span>•</span><span>{project.trees.toLocaleString()} trees</span></>}
                      <span>•</span>
                      <span>{project.created}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text} flex items-center gap-1`}>
                  {project.status === "verified" && <CheckCircle2 className="w-3 h-3" />}
                  {(project.status === "pending_ai_review" || project.status === "pending_ngo_review") && <Clock className="w-3 h-3" />}
                  {project.status === "rejected" && <AlertCircle className="w-3 h-3" />}
                  {status.label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Register New Project Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowForm(false)} />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-gray-900 mb-1">Register New Project</h3>
            <p className="text-sm text-gray-500 mb-4">Submit a restoration project for AI verification</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name *</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., Sundarbans East Restoration"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                  <input type="text" required value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})}
                    placeholder="e.g., West Bengal" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">District *</label>
                  <input type="text" required value={formData.district} onChange={(e) => setFormData({...formData, district: e.target.value})}
                    placeholder="e.g., South 24 Parganas" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                  <input type="text" value={formData.lat} onChange={(e) => setFormData({...formData, lat: e.target.value})}
                    placeholder="e.g., 21.9497" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                  <input type="text" value={formData.lng} onChange={(e) => setFormData({...formData, lng: e.target.value})}
                    placeholder="e.g., 88.8977" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ecosystem Type *</label>
                <select value={formData.ecosystem} onChange={(e) => setFormData({...formData, ecosystem: e.target.value})}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 bg-white">
                  {ecosystemTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Area (hectares) *</label>
                  <input type="number" required value={formData.area} onChange={(e) => setFormData({...formData, area: e.target.value})}
                    placeholder="e.g., 45" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trees Planted</label>
                  <input type="number" value={formData.trees} onChange={(e) => setFormData({...formData, trees: e.target.value})}
                    placeholder="e.g., 12500" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input type="date" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supporting NGO</label>
                <input type="text" value={formData.ngo} onChange={(e) => setFormData({...formData, ngo: e.target.value})}
                  placeholder="e.g., GreenEarth Foundation" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400" />
              </div>

              <button type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors">
                Register Project
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
