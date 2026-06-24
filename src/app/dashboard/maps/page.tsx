"use client";

import { motion } from "framer-motion";
import { Map, Layers, Eye, Play, Pause, ChevronLeft, ChevronRight, Activity, Droplets, TreePine, Fish, Wind, MapPin, Satellite, Signal } from "lucide-react";
import { useState } from "react";

const markers = [
  { name: "Sundarbans Delta", type: "mangrove", carbon: 12450, health: 94, x: 375, y: 225 },
  { name: "Gulf of Kutch", type: "wetland", carbon: 8920, health: 87, x: 155, y: 210 },
  { name: "Pichavaram", type: "seagrass", carbon: 6340, health: 91, x: 295, y: 390 },
  { name: "Bhitarkanika", type: "mangrove", carbon: 9870, health: 89, x: 355, y: 245 },
  { name: "Coringa", type: "mangrove", carbon: 7650, health: 85, x: 325, y: 310 },
  { name: "Muthupet Lagoon", type: "wetland", carbon: 5430, health: 83, x: 290, y: 405 },
  { name: "Vembanad Lake", type: "wetland", carbon: 4890, health: 88, x: 260, y: 420 },
  { name: "Chilika Lake", type: "wetland", carbon: 15200, health: 92, x: 340, y: 260 },
  { name: "Goa Mangroves", type: "mangrove", carbon: 3420, health: 86, x: 230, y: 330 },
  { name: "Ratnagiri Coast", type: "saltmarsh", carbon: 2890, health: 81, x: 225, y: 310 },
  { name: "Mumbai Mangroves", type: "mangrove", carbon: 4560, health: 79, x: 215, y: 270 },
  { name: "Godavari Delta", type: "mangrove", carbon: 8200, health: 90, x: 320, y: 315 },
];

const typeColors: Record<string, { bg: string; text: string; dot: string }> = {
  mangrove: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "#10B981" },
  wetland: { bg: "bg-sky-50", text: "text-sky-700", dot: "#0EA5E9" },
  seagrass: { bg: "bg-teal-50", text: "text-teal-700", dot: "#14B8A6" },
  coral: { bg: "bg-pink-50", text: "text-pink-700", dot: "#EC4899" },
  saltmarsh: { bg: "bg-lime-50", text: "text-lime-700", dot: "#84CC16" },
};

const layerDefaults = [
  { name: "Mangrove Zones", color: "#10B981", enabled: true },
  { name: "Wetlands", color: "#0EA5E9", enabled: true },
  { name: "Seagrass Beds", color: "#14B8A6", enabled: true },
  { name: "Carbon Density", color: "#84CC16", enabled: false },
  { name: "Satellite Overlay", color: "#F59E0B", enabled: false },
];

export default function MapsPage() {
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [year, setYear] = useState(2025);
  const [layerStates, setLayerStates] = useState(layerDefaults.map(l => l.enabled));

  const toggleLayer = (i: number) => { const n = [...layerStates]; n[i] = !n[i]; setLayerStates(n); };

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center">
          <Map className="w-5 h-5 text-sky-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Maps & Monitoring</h1>
          <p className="text-sm text-gray-500">Real-time blue carbon ecosystem monitoring across India</p>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Map */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, ease: "easeOut" }} className="lg:col-span-3 relative rounded-2xl bg-gray-50 border border-gray-200 overflow-hidden" style={{ minHeight: 560 }}>
          {/* Top-left stats */}
          <div className="absolute top-4 left-4 z-20 space-y-2">
            {[
              { icon: Map, label: "Area Monitored", value: "125,000 ha" },
              { icon: Signal, label: "Active Sensors", value: "1,247" },
              { icon: Satellite, label: "Satellite Passes", value: "12 today" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1, ease: "easeOut" }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/90 border border-gray-200 shadow-sm">
                <s.icon className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-xs text-gray-500">{s.label}:</span>
                <span className="text-xs text-gray-900 font-medium">{s.value}</span>
              </motion.div>
            ))}
          </div>

          {/* Layer controls */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, ease: "easeOut" }}
            className="absolute top-4 right-4 z-20 p-3 rounded-xl bg-white/90 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs text-gray-500 font-medium">Layers</span>
            </div>
            <div className="space-y-1.5">
              {layerDefaults.map((layer, i) => (
                <label key={i} className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" checked={layerStates[i]} onChange={() => toggleLayer(i)} className="sr-only" />
                  <div className={`w-3.5 h-3.5 rounded border transition-all ${layerStates[i] ? "border-transparent" : "border-gray-300"}`}
                    style={{ background: layerStates[i] ? layer.color : "transparent" }}>
                    {layerStates[i] && <svg viewBox="0 0 14 14" className="w-full h-full"><path d="M3 7l3 3 5-5" fill="none" stroke="white" strokeWidth="2" /></svg>}
                  </div>
                  <span className="text-xs text-gray-500 group-hover:text-gray-900 transition-colors">{layer.name}</span>
                </label>
              ))}
            </div>
          </motion.div>

          {/* Grid */}
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(16,185,129,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.04) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />

          {/* India outline SVG */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="coastGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(16,185,129,0.4)" />
                <stop offset="100%" stopColor="rgba(14,165,233,0.4)" />
              </linearGradient>
            </defs>
            <path d="M200,55 L220,45 L250,35 L280,40 L310,50 L330,60 L360,75 L375,90 L385,105 L390,125 L388,145 L382,165 L378,185 L375,205 L370,220 L365,235 L372,255 L378,275 L380,295 L375,315 L368,335 L358,355 L345,375 L330,395 L315,415 L300,435 L285,455 L270,475 L260,495 L255,510 L250,520 L245,510 L240,495 L230,475 L215,455 L200,435 L185,415 L170,395 L158,375 L148,355 L140,335 L135,315 L133,295 L135,275 L130,255 L128,235 L125,220 L128,205 L132,185 L138,165 L145,145 L152,125 L160,105 L170,90 L182,75 L192,65 Z"
              fill="rgba(16,185,129,0.03)" stroke="url(#coastGrad)" strokeWidth="1.5" />
            {markers.map((m, i) => {
              const tc = typeColors[m.type];
              const isHovered = hoveredMarker === i;
              const isSelected = selectedMarker === i;
              return (
                <g key={i}>
                  <circle cx={m.x} cy={m.y} r={isHovered || isSelected ? 14 : 8} fill="none" stroke={tc.dot} strokeWidth="1" opacity="0.3">
                    <animate attributeName="r" values={isHovered ? "14;20;14" : "8;12;8"} dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={m.x} cy={m.y} r={isHovered || isSelected ? 5 : 3.5} fill={tc.dot} className="cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredMarker(i)} onMouseLeave={() => setHoveredMarker(null)}
                    onClick={() => setSelectedMarker(i === selectedMarker ? null : i)} />
                </g>
              );
            })}
          </svg>

          {/* Hover tooltip */}
          {hoveredMarker !== null && (
            <div className="absolute z-30 p-3 rounded-xl bg-white border border-gray-200 shadow-lg pointer-events-none"
              style={{ left: markers[hoveredMarker].x + 15, top: markers[hoveredMarker].y - 20, transform: "translateY(-50%)" }}>
              <p className="text-sm text-gray-900 font-semibold">{markers[hoveredMarker].name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${typeColors[markers[hoveredMarker].type].text} ${typeColors[markers[hoveredMarker].type].bg}`}>{markers[hoveredMarker].type}</span>
                <span className="text-xs text-gray-500">{markers[hoveredMarker].carbon.toLocaleString()} tCO₂</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">Health: {markers[hoveredMarker].health}%</div>
            </div>
          )}

          {/* Health score */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, ease: "easeOut" }}
            className="absolute bottom-4 left-4 z-20 p-4 rounded-xl bg-white/90 border border-gray-200 shadow-sm w-56">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span className="text-sm text-gray-900 font-semibold">Env. Health Score</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-14 h-14">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 60 60">
                  <circle cx="30" cy="30" r="24" fill="none" stroke="#F1F5F9" strokeWidth="4" />
                  <circle cx="30" cy="30" r="24" fill="none" stroke="#10B981" strokeWidth="4" strokeLinecap="round" strokeDasharray={150.8} strokeDashoffset={150.8 * (1 - 0.874)} />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-900">87.4</span>
              </div>
              <div className="text-xs text-emerald-600 font-medium">Good<br /><span className="text-gray-400">+2.1 vs last month</span></div>
            </div>
            <div className="space-y-2">
              {[
                { label: "Water Quality", value: 85, icon: Droplets, color: "#0EA5E9" },
                { label: "Vegetation", value: 92, icon: TreePine, color: "#10B981" },
                { label: "Biodiversity", value: 78, icon: Fish, color: "#14B8A6" },
                { label: "Carbon Density", value: 91, icon: Wind, color: "#84CC16" },
              ].map((m, i) => (
                <div key={i} className="flex items-center gap-2">
                  <m.icon className="w-3 h-3 text-gray-400" />
                  <span className="text-[10px] text-gray-500 w-16">{m.label}</span>
                  <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${m.value}%`, background: m.color }} />
                  </div>
                  <span className="text-[10px] text-gray-700 font-medium w-7 text-right">{m.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, ease: "easeOut" }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/90 border border-gray-200 shadow-sm">
            <button onClick={() => setIsPlaying(!isPlaying)} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button onClick={() => setYear(Math.max(2020, year - 1))} className="text-gray-400 hover:text-gray-700 transition-colors"><ChevronLeft className="w-3.5 h-3.5" /></button>
            <div className="flex gap-1.5">
              {[2020, 2021, 2022, 2023, 2024, 2025].map(y => (
                <button key={y} onClick={() => setYear(y)} className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${year === y ? "bg-emerald-600 text-white" : "text-gray-400 hover:text-gray-700"}`}>{y}</button>
              ))}
            </div>
            <button onClick={() => setYear(Math.min(2025, year + 1))} className="text-gray-400 hover:text-gray-700 transition-colors"><ChevronRight className="w-3.5 h-3.5" /></button>
          </motion.div>
        </motion.div>

        {/* Project Sidebar */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, ease: "easeOut" }} className="p-4 rounded-2xl bg-white border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-semibold text-gray-900">Projects</h3>
            <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{markers.length}</span>
          </div>
          <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
            {markers.map((m, i) => {
              const tc = typeColors[m.type];
              const isActive = selectedMarker === i;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.03, ease: "easeOut" }}
                  onClick={() => setSelectedMarker(isActive ? null : i)}
                  className={`p-3 rounded-xl cursor-pointer transition-all ${isActive ? "bg-emerald-50 border-emerald-200 border" : "bg-gray-50 border border-transparent hover:border-gray-200"}`}>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: tc.dot }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 font-medium truncate">{m.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[10px] font-medium ${tc.text}`}>{m.type}</span>
                        <span className="text-[10px] text-gray-400">{m.carbon.toLocaleString()} tCO₂</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1.5">
                        <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-emerald-500" style={{ width: `${m.health}%` }} />
                        </div>
                        <span className="text-[10px] text-gray-500">{m.health}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
