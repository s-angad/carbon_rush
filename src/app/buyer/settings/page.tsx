"use client";

import { useAuth } from "@/lib/auth";
import { Save, Building2, Mail, Bell, Shield } from "lucide-react";
import { useState } from "react";

export default function BuyerSettingsPage() {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your company profile and preferences.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <Building2 className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-semibold text-gray-900">Company Profile</h2>
        </div>
        <div className="p-6">
          <form onSubmit={handleSave} className="space-y-4 max-w-2xl">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input 
                  type="text" 
                  defaultValue={user?.organization_name || user?.full_name} 
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                <input 
                  type="text" 
                  defaultValue={user?.full_name} 
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="email" 
                  defaultValue={user?.email} 
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 text-gray-500" 
                  readOnly 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tax ID / GSTIN</label>
              <input 
                type="text" 
                placeholder="Optional" 
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
              />
            </div>

            <button 
              type="submit" 
              disabled={saving}
              className="px-6 py-2 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2"
            >
              {saving ? "Saving..." : <><Save className="w-4 h-4" /> Save Changes</>}
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <Bell className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
        </div>
        <div className="p-6 space-y-4">
          {[
            { title: "New Verified Projects", desc: "Get notified when new projects matching your criteria are listed." },
            { title: "Purchase Receipts", desc: "Receive email receipts and Carbon Passports for successful purchases." },
            { title: "ESG Compliance Reminders", desc: "Monthly reminders to download your updated ESG reports." }
          ].map((item, i) => (
            <label key={i} className="flex items-start gap-3 cursor-pointer p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <input type="checkbox" defaultChecked className="mt-1 rounded text-emerald-600 focus:ring-emerald-500" />
              <div>
                <div className="font-medium text-gray-900">{item.title}</div>
                <div className="text-sm text-gray-500">{item.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <Shield className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-semibold text-gray-900">Security</h2>
        </div>
        <div className="p-6">
          <button className="px-4 py-2 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
