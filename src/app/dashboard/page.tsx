"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Leaf, Loader2 } from "lucide-react";

export default function DashboardRouter() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    switch (user.role) {
      case "buyer":
        router.replace("/buyer");
        break;
      case "grower":
        router.replace("/grower");
        break;
      case "ngo_verifier":
        router.replace("/ngo");
        break;
      default:
        router.replace("/login");
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center mx-auto mb-4">
          <Leaf className="w-7 h-7 text-white" />
        </div>
        <div className="flex items-center gap-2 justify-center mb-2">
          <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
          <span className="text-gray-600 font-medium">Loading your dashboard...</span>
        </div>
        <p className="text-sm text-gray-400">Detecting your role and redirecting</p>
      </div>
    </div>
  );
}
