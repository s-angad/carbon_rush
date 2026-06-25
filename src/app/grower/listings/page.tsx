"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { Plus, MapPin, CheckCircle2, AlertCircle, Clock, Loader2, Calendar } from "lucide-react";
import PostLandForm from "@/components/grower/PostLandForm";

interface LandListing {
  id: string;
  title: string;
  district: string;
  state: string;
  ecosystem_type: string;
  area_hectares: number;
  status: string;
  estimated_carbon_tons: number | null;
  created_at: string;
}

export default function MyListingsPage() {
  const { user } = useAuth();
  const [listings, setListings] = useState<LandListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchListings = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("land_listings")
        .select("*")
        .eq("grower_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setListings(data || []);
    } catch (err) {
      console.error("Error fetching listings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [user]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "listed":
        return <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium border border-gray-200">Available</span>;
      case "booked":
        return <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-200">Booked by company</span>;
      case "ngo_assigned":
        return <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium border border-purple-200">NGO assigned</span>;
      case "under_review":
        return <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium border border-amber-200">Being verified</span>;
      case "verified":
        return <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Verified</span>;
      case "rejected":
        return <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-medium border border-red-200">Rejected</span>;
      case "more_evidence":
        return <span className="px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-medium border border-orange-200">More evidence needed</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium border border-gray-200">{status}</span>;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Land Listings</h1>
          <p className="text-gray-500 mt-1">Manage your posted land and track verification status.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          {showForm ? "Cancel" : <><Plus className="w-4 h-4" /> Post New Land</>}
        </button>
      </div>

      {showForm && (
        <div className="animate-in slide-in-from-top-4 fade-in duration-300">
          <PostLandForm onSuccess={(id) => {
            setShowForm(false);
            fetchListings();
          }} />
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        </div>
      ) : listings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No listings yet</h3>
          <p className="text-gray-500 max-w-sm mx-auto mb-6">Post your first plot of land to start the verification process and earn carbon credits.</p>
          <button onClick={() => setShowForm(true)} className="px-6 py-2.5 bg-emerald-50 text-emerald-700 font-medium rounded-xl hover:bg-emerald-100 transition-colors">
            Post Land
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="text-lg font-bold text-gray-900 truncate">{listing.title}</h3>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{listing.district}, {listing.state}</span>
                    </div>
                  </div>
                  {getStatusBadge(listing.status)}
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <span className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700 text-xs font-semibold uppercase tracking-wider">
                    {listing.ecosystem_type}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-gray-50 text-gray-600 text-xs font-medium border border-gray-100">
                    {listing.area_hectares} ha
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(listing.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="text-sm font-semibold text-emerald-700">
                    {listing.estimated_carbon_tons ? `${listing.estimated_carbon_tons} tCO₂e` : 'TBD'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
