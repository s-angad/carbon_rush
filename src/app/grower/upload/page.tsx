"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { UploadCloud, FileImage, FileText, MapPin, CheckCircle2, X, Image } from "lucide-react";

interface UploadedFile {
  name: string;
  type: string;
  size: string;
  gpsLat?: number;
  gpsLng?: number;
}

export default function GrowerUploadPage() {
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    { name: "mangrove_sector_A_photo1.jpg", type: "image/jpeg", size: "3.2 MB", gpsLat: 21.9497, gpsLng: 88.8977 },
    { name: "drone_footage_overview.png", type: "image/png", size: "8.1 MB", gpsLat: 21.9512, gpsLng: 88.8993 },
    { name: "field_survey_report.pdf", type: "application/pdf", size: "1.4 MB" },
  ]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    // Mock upload
    const file: UploadedFile = {
      name: "new_upload_" + Date.now() + ".jpg",
      type: "image/jpeg",
      size: "2.8 MB",
      gpsLat: 21.95 + Math.random() * 0.01,
      gpsLng: 88.89 + Math.random() * 0.01,
    };
    setUploadedFiles((prev) => [...prev, file]);
  };

  const handleFileInput = () => {
    const file: UploadedFile = {
      name: "selected_photo_" + Date.now() + ".jpg",
      type: "image/jpeg",
      size: "4.1 MB",
      gpsLat: 21.95 + Math.random() * 0.01,
      gpsLng: 88.89 + Math.random() * 0.01,
    };
    setUploadedFiles((prev) => [...prev, file]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <FileImage className="w-5 h-5 text-sky-500" />;
    return <FileText className="w-5 h-5 text-amber-500" />;
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Upload Evidence</h1>
        <p className="text-sm text-gray-500">Add geo-tagged photos, drone footage, and field surveys for your projects</p>
      </div>

      {/* Project Selector */}
      <div className="p-4 rounded-2xl bg-white border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Project</label>
        <select className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 bg-white max-w-md">
          <option>PRJ-042 — Sundarbans East Restoration</option>
          <option>PRJ-043 — Hooghly River Wetland</option>
          <option>PRJ-038 — Digha Coastal Mangrove</option>
        </select>
      </div>

      {/* Drop Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`p-12 rounded-2xl border-2 border-dashed text-center transition-all cursor-pointer ${
          dragOver ? "border-emerald-400 bg-emerald-50" : "border-gray-300 bg-white hover:border-emerald-300 hover:bg-gray-50"
        }`}
        onClick={handleFileInput}
      >
        <UploadCloud className={`w-12 h-12 mx-auto mb-4 ${dragOver ? "text-emerald-500" : "text-gray-300"}`} />
        <p className="text-lg font-medium text-gray-700 mb-1">
          {dragOver ? "Drop files here" : "Drag & drop files here"}
        </p>
        <p className="text-sm text-gray-400 mb-3">or click to browse</p>
        <div className="flex items-center justify-center gap-3">
          <span className="px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-medium">JPEG</span>
          <span className="px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-medium">PNG</span>
          <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium">PDF</span>
        </div>
      </motion.div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Files ({uploadedFiles.length})</h3>
          <div className="space-y-3">
            {uploadedFiles.map((file, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                {getFileIcon(file.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{file.size}</span>
                    {file.gpsLat && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-0.5 text-emerald-600">
                          <MapPin className="w-3 h-3" />
                          {file.gpsLat.toFixed(4)}, {file.gpsLng?.toFixed(4)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <button onClick={() => removeFile(i)} className="text-gray-400 hover:text-red-500 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Mini Map */}
      {uploadedFiles.some(f => f.gpsLat) && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">GPS Coordinates from Uploads</h3>
          <div className="w-full h-48 rounded-xl bg-gradient-to-br from-emerald-50 to-sky-50 border border-gray-200 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute w-full h-full" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #10B981 1px, transparent 0)", backgroundSize: "24px 24px" }} />
            </div>
            {uploadedFiles.filter(f => f.gpsLat).map((f, i) => (
              <div key={i} className="absolute" style={{ left: `${30 + i * 15}%`, top: `${30 + (i % 3) * 15}%` }}>
                <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 animate-pulse" />
              </div>
            ))}
            <div className="text-center z-10">
              <Image className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-xs text-gray-400">{uploadedFiles.filter(f => f.gpsLat).length} coordinates plotted</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
