"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { CheckCircle2, Circle, Clock, MapPin, Building2, ShieldCheck, AlertTriangle, XCircle, FileText, UploadCloud, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

export default function VerificationStatusPage() {
  const { user } = useAuth();
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      if (!user) return;
      setLoading(true);
      try {
        // Fetch listings and join with assignments, ngo profiles, and reports
        // Since we are growers, we want to see listings that are at least 'booked' or just all listings.
        const { data, error } = await supabase
          .from("land_listings")
          .select(`
            *,
            verification_assignments (
              *,
              ngo_profiles (*),
              verification_reports (*)
            )
          `)
          .eq("grower_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setListings(data || []);
        if (data && data.length > 0) {
          setExpandedId(data[0].id);
        }
      } catch (err) {
        console.error("Error fetching verification status:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [user]);

  const getStageStatus = (listing: any, stage: number) => {
    const status = listing.status;
    const assignment = listing.verification_assignments?.[0];
    const report = assignment?.verification_reports?.[0];

    const stages = {
      1: true, // Always posted
      2: ['booked', 'ngo_assigned', 'under_review', 'verified', 'rejected', 'more_evidence'].includes(status),
      3: ['ngo_assigned', 'under_review', 'verified', 'rejected', 'more_evidence'].includes(status),
      4: ['under_review', 'verified', 'rejected', 'more_evidence'].includes(status),
      5: !!report?.ngo_verdict,
      6: status === 'verified',
    };

    return stages[stage as keyof typeof stages];
  };

  const getActiveStage = (listing: any) => {
    if (getStageStatus(listing, 6)) return 6;
    if (getStageStatus(listing, 5)) return 5;
    if (getStageStatus(listing, 4)) return 4;
    if (getStageStatus(listing, 3)) return 3;
    if (getStageStatus(listing, 2)) return 2;
    return 1;
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Verification Tracker</h1>
        <p className="text-gray-500 mt-1">Track the real-time progress of your land verifications.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div></div>
      ) : listings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <ShieldCheck className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">No projects to track</h3>
          <p className="text-gray-500 mt-2">Post land to the marketplace to begin.</p>
          <Link href="/grower/listings" className="mt-6 inline-block px-6 py-2 bg-emerald-600 text-white rounded-xl">Go to My Listings</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {listings.map((listing) => {
            const isExpanded = expandedId === listing.id;
            const activeStage = getActiveStage(listing);
            const assignment = listing.verification_assignments?.[0];
            const ngo = assignment?.ngo_profiles;
            const report = assignment?.verification_reports?.[0];

            return (
              <div key={listing.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <button 
                  onClick={() => setExpandedId(isExpanded ? null : listing.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{listing.title}</h3>
                      <p className="text-sm text-gray-500">Stage {activeStage} of 6 • {listing.district}, {listing.state}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      listing.status === 'verified' ? 'bg-emerald-100 text-emerald-700' :
                      listing.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      listing.status === 'more_evidence' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {listing.status.replace('_', ' ').toUpperCase()}
                    </span>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                    
                    {/* Status Alerts */}
                    {listing.status === 'more_evidence' && (
                      <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-bold text-amber-800">More Evidence Needed</h4>
                          <p className="text-sm text-amber-700 mt-1">{report?.ngo_comments || "The assigned NGO requires more photos or documentation to proceed."}</p>
                          <Link href="/grower/upload" className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700">
                            <UploadCloud className="w-4 h-4" /> Upload Evidence
                          </Link>
                        </div>
                      </div>
                    )}

                    {listing.status === 'rejected' && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-bold text-red-800">Verification Rejected</h4>
                          <p className="text-sm text-red-700 mt-1">{report?.ngo_comments || "Your listing did not pass the field verification."}</p>
                        </div>
                      </div>
                    )}

                    {/* Timeline */}
                    <div className="relative ml-4 pl-8 space-y-8 before:absolute before:inset-0 before:ml-[5px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                      
                      {/* Stage 1: Posted */}
                      <div className="relative z-10">
                        <div className={`absolute -left-10 w-4 h-4 rounded-full border-2 ${getStageStatus(listing, 1) ? 'bg-emerald-600 border-emerald-600' : 'bg-white border-gray-300'}`}></div>
                        <h4 className={`text-sm font-semibold ${getStageStatus(listing, 1) ? 'text-gray-900' : 'text-gray-400'}`}>1. Land Posted</h4>
                        <p className="text-sm text-gray-500 mt-1">Listing added to the CarbonRush marketplace.</p>
                      </div>

                      {/* Stage 2: Booked */}
                      <div className="relative z-10">
                        <div className={`absolute -left-10 w-4 h-4 rounded-full border-2 ${getStageStatus(listing, 2) ? 'bg-emerald-600 border-emerald-600' : 'bg-white border-gray-300'}`}></div>
                        <h4 className={`text-sm font-semibold ${getStageStatus(listing, 2) ? 'text-gray-900' : 'text-gray-400'}`}>2. Booked by Company</h4>
                        {getStageStatus(listing, 2) ? (
                          <p className="text-sm text-gray-500 mt-1">A corporate buyer has committed to funding this project.</p>
                        ) : (
                          <p className="text-sm text-gray-400 mt-1">Waiting for a buyer...</p>
                        )}
                      </div>

                      {/* Stage 3: NGO Assigned */}
                      <div className="relative z-10">
                        <div className={`absolute -left-10 w-4 h-4 rounded-full border-2 ${getStageStatus(listing, 3) ? 'bg-emerald-600 border-emerald-600' : 'bg-white border-gray-300'}`}></div>
                        <h4 className={`text-sm font-semibold ${getStageStatus(listing, 3) ? 'text-gray-900' : 'text-gray-400'}`}>3. NGO Assigned</h4>
                        {getStageStatus(listing, 3) && ngo && (
                          <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-100 flex items-start gap-3">
                            <Building2 className="w-5 h-5 text-emerald-600" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{ngo.org_name}</p>
                              <p className="text-xs text-gray-500">{ngo.org_type.replace('_', ' ').toUpperCase()} • {ngo.state}</p>
                              <p className="text-xs text-gray-500 mt-1">{ngo.contact_email}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Stage 4: Field Visit */}
                      <div className="relative z-10">
                        <div className={`absolute -left-10 w-4 h-4 rounded-full border-2 ${getStageStatus(listing, 4) ? 'bg-emerald-600 border-emerald-600' : 'bg-white border-gray-300'}`}></div>
                        <h4 className={`text-sm font-semibold ${getStageStatus(listing, 4) ? 'text-gray-900' : 'text-gray-400'}`}>4. Field Visit Underway</h4>
                        {getStageStatus(listing, 4) && (
                          <p className="text-sm text-gray-500 mt-1">NGO is currently analyzing satellite data and conducting field visits.</p>
                        )}
                      </div>

                      {/* Stage 5: Report Submitted */}
                      <div className="relative z-10">
                        <div className={`absolute -left-10 w-4 h-4 rounded-full border-2 ${getStageStatus(listing, 5) ? 'bg-emerald-600 border-emerald-600' : 'bg-white border-gray-300'}`}></div>
                        <h4 className={`text-sm font-semibold ${getStageStatus(listing, 5) ? 'text-gray-900' : 'text-gray-400'}`}>5. Report Submitted</h4>
                        {getStageStatus(listing, 5) && report && (
                          <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div><span className="text-gray-500">Verdict:</span> <span className="font-medium">{report.ngo_verdict.replace('_', ' ')}</span></div>
                              <div><span className="text-gray-500">Carbon:</span> <span className="font-medium">{report.carbon_estimate_tons} tons</span></div>
                              <div className="col-span-2"><span className="text-gray-500">Condition:</span> <span className="font-medium capitalize">{report.ecosystem_condition}</span></div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Stage 6: Verified */}
                      <div className="relative z-10">
                        <div className={`absolute -left-10 w-4 h-4 rounded-full border-2 ${getStageStatus(listing, 6) ? 'bg-emerald-600 border-emerald-600' : 'bg-white border-gray-300'}`}></div>
                        <h4 className={`text-sm font-semibold ${getStageStatus(listing, 6) ? 'text-gray-900' : 'text-gray-400'}`}>6. Credits Issued</h4>
                        {getStageStatus(listing, 6) && (
                          <div className="mt-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-sm">
                            <p className="font-medium">Verification Complete! 🎉</p>
                            <p className="mt-1">Carbon credits have been minted on the blockchain and payouts will be processed.</p>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
