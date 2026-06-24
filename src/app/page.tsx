"use client";

import { motion, useInView } from "framer-motion";
import {
  Leaf,
  Shield,
  Globe,
  Zap,
  BarChart3,
  Users,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Lock,
  Layers,
  Play,
  ChevronRight,
  ExternalLink,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ end, duration = 2, prefix = "", suffix = "" }: { end: number; duration?: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const inc = end / (duration * 60);
    const timer = setInterval(() => {
      start += inc;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

function FeatureCard({ icon: Icon, title, description, delay }: { icon: React.ElementType; title: string; description: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group p-6 rounded-2xl bg-white border border-gray-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-50 transition-all duration-300"
    >
      <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
        <Icon className="w-5 h-5 text-emerald-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default function LandingPage() {
  const features = [
    { icon: Sparkles, title: "AI-Powered Verification", description: "Autonomous satellite analysis with NDVI monitoring and 97.3% accuracy carbon quantification." },
    { icon: Shield, title: "Blockchain Transparency", description: "Every carbon credit verified on Polygon blockchain with immutable audit trails and Carbon Passport NFTs." },
    { icon: TrendingUp, title: "Carbon Marketplace", description: "Buy, sell, and retire tokenized carbon credits with real-time pricing and institutional-grade trading." },
    { icon: Users, title: "Community First", description: "Direct financial inclusion for 2,847+ coastal communities, NGOs, and MSMEs with multilingual AI copilot." },
    { icon: Lock, title: "Fraud Detection", description: "Advanced anomaly detection engine preventing duplicate claims and ensuring carbon market integrity." },
    { icon: Layers, title: "Digital Public Infrastructure", description: "Aadhaar for Carbon, UPI for Green Value — scalable architecture for national carbon markets." },
  ];

  return (
    <div className="relative min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">CarbonRush AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">How It Works</a>
            <a href="#impact" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Impact</a>
            <Link href="/login" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Sign In</Link>
            <Link href="/login" className="px-5 py-2 rounded-full bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium mb-6">
              <Zap className="w-3 h-3" />
              India&apos;s Digital Public Infrastructure for Carbon
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-[1.1] mb-6 tracking-tight">
              Building the<br />
              <span className="gradient-text">trust layer</span> for carbon
            </h1>

            <p className="text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl">
              AI-powered carbon verification, blockchain-backed transparency, and tokenized carbon markets for a sustainable future.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/login" className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors">
                Launch Dashboard
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                <Play className="w-4 h-4 text-emerald-600" />
                Watch Demo
              </button>
            </div>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: 847532, label: "Tonnes CO₂ Verified", suffix: "+" },
              { value: 512, label: "Active Projects", suffix: "+" },
              { value: 2847, label: "Communities Impacted", suffix: "+" },
              { value: 18, label: "Million $ Carbon Value", prefix: "$", suffix: "M+" },
            ].map((stat, i) => (
              <div key={i} className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  <AnimatedCounter end={stat.value} prefix={stat.prefix || ""} suffix={stat.suffix || ""} />
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-gray-50/50">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-medium mb-4">
              <Globe className="w-3 h-3" />
              Platform Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              End-to-end carbon infrastructure
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              From satellite verification to tokenized trading — everything needed to build trust in carbon markets.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => <FeatureCard key={i} {...f} delay={i * 0.08} />)}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium mb-4">
                  <BarChart3 className="w-3 h-3" />
                  How It Works
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Four steps to verified carbon
                </h2>
                <p className="text-gray-500 mb-10">
                  Our autonomous pipeline transforms satellite data into verified, tradeable carbon credits.
                </p>
              </motion.div>

              <div className="space-y-6">
                {[
                  { n: 1, title: "Satellite Capture", desc: "AI continuously monitors blue carbon ecosystems via satellite imagery with NDVI analysis." },
                  { n: 2, title: "AI Verification", desc: "Machine learning models estimate carbon sequestration with 97.3% accuracy." },
                  { n: 3, title: "Blockchain Certification", desc: "Verified carbon data is recorded on Polygon blockchain as immutable Carbon Passport NFTs." },
                  { n: 4, title: "Market & Trade", desc: "Tokenized credits enter the marketplace where buyers and communities transact directly." },
                ].map((step, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-4">
                    <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {step.n}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-8 rounded-3xl bg-gray-50 border border-gray-100">
              <div className="space-y-4">
                {[
                  { label: "Carbon Sequestered", value: "847,532 tCO₂", width: "92%", color: "bg-emerald-500" },
                  { label: "Credits Tokenized", value: "623,841", width: "76%", color: "bg-sky-500" },
                  { label: "Blockchain Verified", value: "99.8%", width: "99%", color: "bg-teal-500" },
                  { label: "Community Payouts", value: "₹14.2 Cr", width: "68%", color: "bg-lime-500" },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }} className="p-4 rounded-xl bg-white border border-gray-100">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-500">{item.label}</span>
                      <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: item.width }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }} className={`h-full rounded-full ${item.color}`} />
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <div className="text-emerald-700 text-sm font-medium">All Systems Verified</div>
                  <div className="text-emerald-600/60 text-xs">Polygon Block #48,291,034</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DPI Vision */}
      <section id="impact" className="py-24 px-6 bg-gray-50/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              &quot;Aadhaar for Carbon.<br />UPI for Green Value.&quot;
            </h2>
            <p className="text-gray-500 text-lg max-w-3xl mx-auto mb-10">
              Inspired by India&apos;s DPI revolution, CarbonRush AI creates the trust layer that carbon markets need.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Identity Layer", "Verification Layer", "Settlement Layer", "Inclusion Layer"].map((layer, i) => (
                <div key={i} className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-gray-700 text-sm font-medium">
                  <ChevronRight className="w-3 h-3 inline mr-1 text-emerald-600" />
                  {layer}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-gray-400 text-sm mb-8 uppercase tracking-wider">Trusted by leading organizations</p>
          <div className="flex flex-wrap justify-center gap-10 md:gap-16">
            {["IUCN", "UNDP", "World Bank", "NABARD", "ISRO", "MoEFCC", "NITI Aayog", "Verra"].map((p, i) => (
              <span key={i} className="text-lg font-semibold text-gray-300 hover:text-gray-500 transition-colors cursor-default">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to transform carbon markets?
          </h2>
          <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto">
            Join the next generation of climate infrastructure. Start verifying, tokenizing, and trading carbon credits today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/login" className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors">
              Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="https://github.com/s-angad/carbon_rush" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
              <ExternalLink className="w-5 h-5" /> View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center">
              <Leaf className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-gray-900">CarbonRush AI</span>
          </div>
          <p className="text-gray-400 text-sm">© 2025 CarbonRush AI. Building trust in carbon markets.</p>
          <div className="flex gap-3">
            {[ExternalLink, Globe, Mail].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-all">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
