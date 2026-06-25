"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { UploadCloud, CheckCircle2, Loader2, MapPin } from "lucide-react";
import { supabase } from "@/lib/supabase";
import exifr from "exifr";
import { useAuth } from "@/lib/auth";

// Dynamically import map with SSR disabled
const LocationMap = dynamic(() => import("./LocationMap"), { ssr: false });

export default function PostLandForm({ onSuccess }: { onSuccess: (id: string) => void }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadingProgress, setUploadingProgress] = useState(0);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    state: "",
    district: "",
    village: "",
    ecosystem_type: "mangrove",
    area_hectares: "",
    trees_planted: "",
    planting_start_date: "",
    estimated_carbon_tons: "",
  });

  const [location, setLocation] = useState<{ lat: number | null; lng: number | null }>({ lat: null, lng: null });
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);

      // Extract GPS from first photo with EXIF
      for (const file of selectedFiles) {
        try {
          const gps = await exifr.gps(file);
          if (gps && !location.lat) {
            setLocation({ lat: gps.latitude, lng: gps.longitude });
            break; // Auto-fill with first valid coordinate found
          }
        } catch (err) {
          console.warn("No EXIF GPS in file", file.name);
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!location.lat || !location.lng) {
      setError("Please pick a location on the map.");
      return;
    }
    
    setError("");
    setLoading(true);

    try {
      // Create listing to get an ID
      const { data: listingData, error: dbError } = await supabase
        .from('land_listings')
        .insert({
          grower_id: user.id,
          title: formData.title,
          description: formData.description,
          state: formData.state,
          district: formData.district,
          village: formData.village,
          latitude: location.lat,
          longitude: location.lng,
          area_hectares: parseFloat(formData.area_hectares),
          ecosystem_type: formData.ecosystem_type,
          trees_planted: formData.trees_planted ? parseInt(formData.trees_planted) : null,
          planting_start_date: formData.planting_start_date || null,
          estimated_carbon_tons: formData.estimated_carbon_tons ? parseFloat(formData.estimated_carbon_tons) : null,
          status: 'listed'
        })
        .select()
        .single();

      if (dbError) throw dbError;

      // Upload photos
      const photoUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        setUploadingProgress(Math.round(((i + 1) / files.length) * 100));
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const filePath = `${user.id}/${listingData.id}/${Date.now()}_${i}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('evidence')
          .upload(filePath, file);

        if (!uploadError) {
          const { data: publicUrlData } = supabase.storage.from('evidence').getPublicUrl(filePath);
          photoUrls.push(publicUrlData.publicUrl);
        }
      }

      if (photoUrls.length > 0) {
        await supabase.from('land_listings').update({ evidence_photo_urls: photoUrls }).eq('id', listingData.id);
      }

      onSuccess(listingData.id);

    } catch (err: any) {
      setError(err.message || "An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Post New Land Listing</h2>
        <p className="text-sm text-gray-500">Provide details about your ecosystem restoration project.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {error && <div className="p-3 rounded-xl bg-red-50 text-red-700 text-sm">{error}</div>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
            <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="e.g. Pichavaram Mangrove Restoration" />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Tell buyers about this land..."></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <select required value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-white">
              <option value="">Select State</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Odisha">Odisha</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="West Bengal">West Bengal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
            <input type="text" required value={formData.district} onChange={e => setFormData({...formData, district: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Village (Optional)</label>
            <input type="text" value={formData.village} onChange={e => setFormData({...formData, village: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ecosystem Type</label>
            <select required value={formData.ecosystem_type} onChange={e => setFormData({...formData, ecosystem_type: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-white">
              <option value="mangrove">Mangrove</option>
              <option value="wetland">Wetland</option>
              <option value="seagrass">Seagrass</option>
              <option value="forest">Forest</option>
              <option value="grassland">Grassland</option>
              <option value="saltmarsh">Salt Marsh</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Area (Hectares)</label>
            <input type="number" step="0.01" required value={formData.area_hectares} onChange={e => setFormData({...formData, area_hectares: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trees Planted (Optional)</label>
            <input type="number" value={formData.trees_planted} onChange={e => setFormData({...formData, trees_planted: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Planting Start Date (Optional)</label>
            <input type="date" value={formData.planting_start_date} onChange={e => setFormData({...formData, planting_start_date: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Carbon Tons (Optional)</label>
            <input type="number" step="0.1" value={formData.estimated_carbon_tons} onChange={e => setFormData({...formData, estimated_carbon_tons: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
        </div>

        {/* Map Picker */}
        <div className="pt-4 border-t border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Pick Location on Map
          </label>
          <LocationMap lat={location.lat} lng={location.lng} onChange={(lat, lng) => setLocation({ lat, lng })} />
          <div className="text-xs text-gray-500 mt-2">
            Lat: {location.lat || '--'}, Lng: {location.lng || '--'}
          </div>
        </div>

        {/* Evidence Photos */}
        <div className="pt-4 border-t border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">Evidence Photos</label>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors">
            <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" id="photo-upload" />
            <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
                <UploadCloud className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="text-sm font-medium text-emerald-600">Click to upload photos</span>
              <span className="text-xs text-gray-400 mt-1">JPEG, PNG with GPS data preferred</span>
            </label>
          </div>
          {files.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {files.map((file, i) => (
                <div key={i} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" /> {file.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4 flex justify-end">
          <button type="submit" disabled={loading} className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2 disabled:opacity-50">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> {uploadingProgress > 0 ? `Uploading (${uploadingProgress}%)` : 'Saving...'}</> : 'Post Listing'}
          </button>
        </div>
      </form>
    </div>
  );
}
