"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { MapPin, Calendar, Trees, Scaling, Building2, UploadCloud, CheckCircle2, ShieldAlert, Target, TrendingUp, HelpCircle, XCircle, Loader2, Navigation, AlertTriangle } from "lucide-react";

// Leaflet Map must be dynamically imported to avoid SSR issues
const LocationMap = dynamic(() => import("@/components/grower/LocationMap"), { ssr: false });

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function NgoVerificationReportPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const assignmentId = params.assignment_id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [assignment, setAssignment] = useState<any>(null);

  // Form State
  const [visitDate, setVisitDate] = useState("");
  const [ngoLat, setNgoLat] = useState<number | "">("");
  const [ngoLng, setNgoLng] = useState<number | "">("");
  
  const [treesConfirmed, setTreesConfirmed] = useState<number | "">("");
  const [areaConfirmed, setAreaConfirmed] = useState<number | "">("");
  const [condition, setCondition] = useState("good");
  const [carbonEstimate, setCarbonEstimate] = useState<number | "">("");

  const [verdict, setVerdict] = useState("approved");
  const [farmerComments, setFarmerComments] = useState("");
  const [companyComments, setCompanyComments] = useState("");

  useEffect(() => {
    fetchAssignment();
  }, [assignmentId]);

  const fetchAssignment = async () => {
    try {
      const { data, error } = await supabase
        .from('verification_assignments')
        .select(`
          *,
          land_listings (*, grower:grower_id(full_name)),
          company:company_id (organization_name)
        `)
        .eq('id', assignmentId)
        .single();
      
      if (error) throw error;
      setAssignment(data);
    } catch (err) {
      console.error("Failed to fetch assignment", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setNgoLat(position.coords.latitude);
        setNgoLng(position.coords.longitude);
      },
      () => alert("Unable to retrieve your location")
    );
  };

  const handleSubmit = async () => {
    if (!user || !assignment) return;
    setSubmitting(true);
    try {
      // 1. Insert Report
      const reportPayload = {
        assignment_id: assignment.id,
        ngo_user_id: user.id,
        field_visit_date: visitDate,
        gps_lat_recorded: ngoLat || null,
        gps_lng_recorded: ngoLng || null,
        field_photo_urls: ["https://example.com/mock_field_photo.jpg"], // mocked for now
        drone_photo_urls: [],
        trees_confirmed: treesConfirmed || 0,
        area_confirmed_hectares: areaConfirmed || 0,
        ecosystem_condition: condition,
        carbon_estimate_tons: carbonEstimate || 0,
        ai_fraud_score: Math.floor(Math.random() * 30), // Mocked Phase 2 data
        ndvi_before: 0.35,
        ndvi_after: 0.65,
        authenticity_score: 98,
        coordinate_match_score: distanceKm !== null && distanceKm < 5 ? 99 : 40,
        ngo_verdict: verdict,
        ngo_comments: farmerComments + "\\n\\nCompany Note: " + companyComments
      };

      const { error: insertError } = await supabase.from('verification_reports').insert(reportPayload);
      if (insertError) throw insertError;

      // 2. Update Assignment
      const { error: assignError } = await supabase
        .from('verification_assignments')
        .update({ status: 'report_submitted' })
        .eq('id', assignment.id);
      if (assignError) throw assignError;

      // 3. Update Listing Status
      let listingStatus = 'verified';
      if (verdict === 'rejected') listingStatus = 'rejected';
      if (verdict === 'needs_more_evidence') listingStatus = 'more_evidence';

      const { error: listError } = await supabase
        .from('land_listings')
        .update({ status: listingStatus })
        .eq('id', assignment.listing_id);
      if (listError) throw listError;

      alert("Report submitted successfully!");
      router.push('/ngo/assignments');
    } catch (err) {
      console.error("Submission failed", err);
      alert("Failed to submit report.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="py-20 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-purple-600" /></div>;
  if (!assignment) return <div className="p-8 text-center text-red-500">Assignment not found.</div>;

  const listing = assignment.land_listings;
  const growerFirstName = listing.grower?.full_name?.split(' ')[0] || "Farmer";
  
  // Calculate GPS Distance
  let distanceKm: number | null = null;
  if (ngoLat !== "" && ngoLng !== "") {
    distanceKm = getDistanceFromLatLonInKm(Number(ngoLat), Number(ngoLng), listing.latitude, listing.longitude);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="mb-6 flex items-center justify-between max-w-7xl mx-auto">
        <div>
          <button onClick={() => router.back()} className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-flex items-center">← Back to Jobs</button>
          <h1 className="text-2xl font-bold text-gray-900">Verification Report</h1>
          <p className="text-sm text-gray-500 mt-1">Assignment ID: {assignment.id.substring(0, 8)}</p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-gray-900">{assignment.company?.organization_name}</p>
          <p className="text-xs text-gray-500">Corporate Sponsor</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
        
        {/* LEFT COL: Land Reference */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm sticky top-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600" /> Project Reference
            </h2>

            <div className="space-y-5">
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">Project Name</p>
                <p className="text-base font-bold text-gray-900">{listing.title}</p>
                <p className="text-sm text-gray-500">by {growerFirstName}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/50">
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-0.5">Ecosystem</p>
                  <p className="text-sm font-bold text-emerald-700 capitalize">{listing.ecosystem_type}</p>
                </div>
                <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-0.5">Area Claimed</p>
                  <p className="text-sm font-bold text-blue-700">{listing.area_hectares} Ha</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-0.5">Trees</p>
                  <p className="text-sm font-bold text-gray-700">{listing.trees_planted || 'N/A'}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-0.5">Est. Carbon</p>
                  <p className="text-sm font-bold text-gray-700">{listing.estimated_carbon_tons || 'N/A'} tCO₂</p>
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2">Location Coordinates</p>
                <div className="h-48 rounded-xl overflow-hidden border border-gray-200 z-0">
                  <LocationMap 
                    lat={listing.latitude} 
                    lng={listing.longitude} 
                    onChange={() => {}} 
                    readOnly={true} 
                  />
                </div>
                <p className="text-xs text-gray-500 font-mono mt-2 text-center">{listing.latitude.toFixed(6)}, {listing.longitude.toFixed(6)}</p>
              </div>

              {listing.evidence_photo_urls && listing.evidence_photo_urls.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2">Farmer's Uploaded Photos</p>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {listing.evidence_photo_urls.map((url: string, i: number) => (
                      <a key={i} href={url} target="_blank" rel="noreferrer" className="shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-gray-200 hover:opacity-80 transition-opacity">
                        <img src={url} alt="Evidence" className="w-full h-full object-cover" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {assignment.company_notes && (
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 mt-4">
                  <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /> Company Instructions</p>
                  <p className="text-sm text-amber-900 italic">"{assignment.company_notes}"</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COL: Report Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm">
            
            {/* Section A */}
            <section className="mb-10">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-5 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" /> Section A: Field Visit Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date of Physical Visit</label>
                  <input type="date" required value={visitDate} onChange={e => setVisitDate(e.target.value)} className="w-full sm:w-1/2 px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-purple-500" />
                </div>
                
                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Current GPS Location</label>
                  <p className="text-xs text-gray-500 mb-3">Record coordinates while standing at the project site to prove physical presence.</p>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-3 mb-3">
                    <input type="number" step="any" placeholder="Latitude" value={ngoLat} onChange={e => setNgoLat(e.target.valueAsNumber || "")} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none" />
                    <input type="number" step="any" placeholder="Longitude" value={ngoLng} onChange={e => setNgoLng(e.target.valueAsNumber || "")} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none" />
                    <button onClick={handleGetLocation} className="w-full sm:w-auto shrink-0 px-4 py-2.5 bg-gray-900 text-white font-medium rounded-xl flex items-center justify-center gap-2">
                      <Navigation className="w-4 h-4" /> Get Location
                    </button>
                  </div>

                  {distanceKm !== null && (
                    <div className={`p-3 rounded-xl border ${distanceKm < 5 ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'} flex items-center gap-3`}>
                      {distanceKm < 5 ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />}
                      <p className={`text-sm font-bold ${distanceKm < 5 ? 'text-emerald-800' : 'text-red-800'}`}>
                        Distance from claimed site: {distanceKm.toFixed(2)} km.
                        {distanceKm >= 5 && " Warning: You are far from the reported location!"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Section B */}
            <section className="mb-10">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-5 flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-purple-600" /> Section B: Evidence Upload
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <UploadCloud className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-gray-700">Field Photos</p>
                  <p className="text-xs text-gray-500 mt-1">Upload geocoded images</p>
                </div>
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <UploadCloud className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-gray-700">Drone/Survey Docs</p>
                  <p className="text-xs text-gray-500 mt-1">Optional aerial proof</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-right">Files will be securely stored in Supabase Storage.</p>
            </section>

            {/* Section C */}
            <section className="mb-10">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-5 flex items-center gap-2">
                <Scaling className="w-5 h-5 text-purple-600" /> Section C: Ground Truth
              </h3>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirmed Area (Ha)</label>
                  <input type="number" required step="0.01" value={areaConfirmed} onChange={e => setAreaConfirmed(e.target.valueAsNumber || "")} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirmed Trees</label>
                  <input type="number" value={treesConfirmed} onChange={e => setTreesConfirmed(e.target.valueAsNumber || "")} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ecosystem Condition</label>
                  <select value={condition} onChange={e => setCondition(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-purple-500 bg-white">
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Calculated Carbon (tCO₂)</label>
                  <div className="relative">
                    <input type="number" required step="0.1" value={carbonEstimate} onChange={e => setCarbonEstimate(e.target.valueAsNumber || "")} className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 bg-emerald-50/30 text-emerald-900 font-bold outline-none focus:border-emerald-500 pr-12" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-emerald-600">t</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section D - Mocked AI */}
            <section className="mb-10">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-5">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-purple-600" /> Section D: Platform AI Checks
                </h3>
                <span className="px-2 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold uppercase rounded">Read-Only</span>
              </div>
              <div className="p-5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
                <p className="text-xs text-indigo-800 mb-4 font-medium flex items-center gap-1.5"><TrendingUp className="w-4 h-4" /> These scores will be auto-generated by our Google Earth Engine pipeline.</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded-xl border border-indigo-50">
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Fraud Risk Score</p>
                    <p className="text-2xl font-black text-emerald-500">12<span className="text-sm font-medium text-gray-400">/100</span></p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-indigo-50">
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Image Authenticity</p>
                    <p className="text-xl font-bold text-gray-900">98%</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-indigo-50">
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">NDVI Improvement</p>
                    <p className="text-xl font-bold text-emerald-600">+34%</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section E: Verdict */}
            <section className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-5 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-purple-600" /> Section E: Final Verdict
              </h3>
              
              <div className="grid sm:grid-cols-3 gap-3 mb-6">
                <button 
                  onClick={() => setVerdict('approved')}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${verdict === 'approved' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100 hover:border-gray-200'}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className={`w-5 h-5 ${verdict === 'approved' ? 'text-emerald-600' : 'text-gray-400'}`} />
                    <span className={`font-bold ${verdict === 'approved' ? 'text-emerald-900' : 'text-gray-700'}`}>Approve</span>
                  </div>
                  <p className="text-xs text-gray-500">Verify logic & issue credits.</p>
                </button>
                
                <button 
                  onClick={() => setVerdict('needs_more_evidence')}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${verdict === 'needs_more_evidence' ? 'border-amber-500 bg-amber-50' : 'border-gray-100 hover:border-gray-200'}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className={`w-5 h-5 ${verdict === 'needs_more_evidence' ? 'text-amber-600' : 'text-gray-400'}`} />
                    <span className={`font-bold ${verdict === 'needs_more_evidence' ? 'text-amber-900' : 'text-gray-700'}`}>Request Proof</span>
                  </div>
                  <p className="text-xs text-gray-500">Ask farmer for more photos.</p>
                </button>

                <button 
                  onClick={() => setVerdict('rejected')}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${verdict === 'rejected' ? 'border-red-500 bg-red-50' : 'border-gray-100 hover:border-gray-200'}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <XCircle className={`w-5 h-5 ${verdict === 'rejected' ? 'text-red-600' : 'text-gray-400'}`} />
                    <span className={`font-bold ${verdict === 'rejected' ? 'text-red-900' : 'text-gray-700'}`}>Reject</span>
                  </div>
                  <p className="text-xs text-gray-500">Project fails requirements.</p>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Comments for Farmer</label>
                  <textarea required value={farmerComments} onChange={e => setFarmerComments(e.target.value)} rows={3} placeholder="Explain your decision..." className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-purple-500 resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Private Note to Corporate Buyer</label>
                  <textarea value={companyComments} onChange={e => setCompanyComments(e.target.value)} rows={2} placeholder="Any confidential findings..." className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-purple-500 resize-none bg-gray-50" />
                </div>
              </div>
            </section>

            <div className="pt-6 border-t border-gray-200">
              <button 
                onClick={handleSubmit}
                disabled={submitting || !visitDate || !areaConfirmed || !carbonEstimate || !farmerComments}
                className="w-full py-4 bg-purple-600 text-white font-black text-lg rounded-xl hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "Submit Final Report"}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
