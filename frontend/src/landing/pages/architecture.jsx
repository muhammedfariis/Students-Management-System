"use client";

import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { 
  Target, Cpu, Zap, ShieldCheck, Users, Code2, Globe, 
  Layers, MousePointer2, Fingerprint, Database, Binary,
  Rocket, Lightbulb, Workflow, Radio, Sparkles, Terminal
} from "lucide-react";

import { SpotlightNavbar } from "../components/common/navbar";
import Footer from "../components/common/landingFooter";

// --- EXTREME PARALLAX WRAPPER ---
const ParallaxLayer = ({ children, speed = 1, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);
  const springY = useSpring(y, { stiffness: 40, damping: 15 });

  return (
    <motion.div ref={ref} style={{ y: springY }} className={className}>
      {children}
    </motion.div>
  );
};

const ArchitecturePage = () => {
  const mode = useSelector((state) => state.theme?.mode || 'dark');
  const containerRef = useRef(null);

  return (
    <div 
      ref={containerRef}
      className={`${mode === "dark" ? "dark" : ""} bg-white dark:bg-[#020203] text-black dark:text-white transition-colors duration-700 overflow-hidden font-sans`}
    >
      <SpotlightNavbar />

      {/* --- 1. HYPER-PARALLAX HERO --- */}
      <section className="relative h-[120vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 pointer-events-none">
          <ParallaxLayer speed={-5} className="absolute top-10 left-0 text-[30vw] font-black italic text-zinc-400">
            SYSTEM
          </ParallaxLayer>
          <ParallaxLayer speed={4} className="absolute bottom-0 right-0 text-[25vw] font-black italic text-cyan-500">
            01
          </ParallaxLayer>
        </div>

        <div className="relative z-10 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-[14vw] font-black italic uppercase leading-[0.75] tracking-tighter">
              Hard <br /> <span className="text-transparent bg-clip-text bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600">Forged.</span>
            </h1>
            <p className="mt-8 text-sm font-black uppercase tracking-[1.2em] opacity-40">Architectural Integrity_v4.0</p>
          </motion.div>
        </div>
      </section>

      {/* --- 2. THE BENTO MANIFESTO (Extreme Gradients) --- */}
      <section className="px-6 py-40 max-w-[1500px] mx-auto relative">
        <div className="grid grid-cols-12 gap-8">
          
          {/* Section: The Computational Core */}
          <div className="col-span-12 lg:col-span-7">
            <ParallaxLayer speed={0.4}>
              <div className="relative group rounded-[4rem] p-16 h-[450px] flex flex-col justify-end overflow-hidden border border-black/5 dark:border-white/10 bg-gradient-to-br from-cyan-500/30 via-transparent to-blue-500/10 backdrop-blur-3xl shadow-[0_0_100px_rgba(6,182,212,0.1)]">
                <Terminal size={300} className="absolute -top-10 -right-10 text-cyan-500 opacity-5 group-hover:rotate-12 transition-transform duration-1000" />
                <div className="relative z-10">
                  <h3 className="text-6xl font-black italic uppercase tracking-tighter mb-6 text-cyan-400">Neural Core</h3>
                  <p className="text-xl font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
                    Our architecture isn't built on standard request-response cycles. We utilize a <span className="text-black dark:text-white font-bold">Reactive Event Mesh</span> that treats every clock-in as a unique cryptographic event. By decoupling the database from the auth-layer, we ensure that even during peak campus traffic of 10k+ concurrent users, latency never exceeds 12ms.
                  </p>
                </div>
              </div>
            </ParallaxLayer>
          </div>

          {/* Section: The Vault (Darker/Security Focus) */}
          <div className="col-span-12 lg:col-span-5">
            <ParallaxLayer speed={1.2}>
              <div className="relative rounded-[4rem] p-16 h-[550px] bg-gradient-to-b from-purple-900/40 to-black dark:to-[#08080a] border border-white/5 shadow-2xl">
                <ShieldCheck size={48} className="text-purple-500 mb-8" />
                <h3 className="text-4xl font-black italic uppercase text-purple-400 mb-8">Isolated Enclave</h3>
                <p className="text-zinc-400 leading-loose">
                  Privacy is hard-coded into our silicon. We utilize <span className="text-white italic">Zero-Knowledge Proofs (ZKP)</span> for biometric verification. This means the server verifies your identity without ever "seeing" your biometric hash. It’s an asymmetric wall that keeps sensitive PII (Personally Identifiable Information) locked in a 256-bit encrypted vacuum.
                </p>
                <div className="mt-12 flex flex-wrap gap-3">
                  {["AES-256", "SHA-3", "JWT-RSA"].map(t => (
                    <span key={t} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-purple-300">{t}</span>
                  ))}
                </div>
              </div>
            </ParallaxLayer>
          </div>

          {/* Section: Distributed Sync */}
          <div className="col-span-12">
            <ParallaxLayer speed={-0.8}>
              <div className="relative rounded-[4rem] p-16 bg-gradient-to-r from-emerald-500/20 via-zinc-100 dark:via-zinc-900 to-transparent border border-emerald-500/20 flex flex-col lg:flex-row items-center gap-16">
                <div className="lg:w-1/2">
                  <Zap size={64} className="text-emerald-500 mb-8 animate-pulse" />
                  <h3 className="text-6xl font-black italic uppercase tracking-tighter mb-6 text-emerald-400">Liquid Synchronization</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">
                    Data flow shouldn't be a bottleneck. Our <span className="text-emerald-500 font-bold">Hyper-Sync Engine</span> uses horizontal sharding to spread load across multiple global nodes. When a student clocks in, the record is immediately propagated to the cloud, administrative dashboards, and parent notification triggers simultaneously, ensuring zero drift between system states.
                  </p>
                </div>
                <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                  <div className="h-40 bg-black/40 rounded-3xl border border-white/5 p-8 flex flex-col justify-end">
                    <span className="text-4xl font-black italic">99.9%</span>
                    <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Global Uptime</span>
                  </div>
                  <div className="h-40 bg-emerald-500 rounded-3xl p-8 flex flex-col justify-end text-black">
                    <span className="text-4xl font-black italic">14ms</span>
                    <span className="text-[10px] uppercase font-bold opacity-60 tracking-widest">Avg Sync Speed</span>
                  </div>
                </div>
              </div>
            </ParallaxLayer>
          </div>
        </div>
      </section>

      {/* --- 3. THE "HARD-SIGNED" SECTION --- */}
      <section className="relative py-60">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5" />
        <div className="max-w-7xl mx-auto px-6 text-center">
          <ParallaxLayer speed={-2}>
            <h2 className="text-[10vw] font-black italic uppercase leading-none tracking-tighter mb-20">
              Architectural <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Integrity.</span>
            </h2>
          </ParallaxLayer>

          <div className="flex flex-col md:flex-row justify-center items-center gap-20">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition duration-1000" />
              <div className="relative h-64 w-64 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-950 flex items-center justify-center overflow-hidden">
                <Users size={100} className="text-zinc-300 dark:text-zinc-800 absolute opacity-20" />
                <span className="text-8xl font-black italic text-cyan-500">F.</span>
              </div>
            </div>
            
            <div className="text-left max-w-md">
              <h4 className="text-4xl font-black italic uppercase mb-4 tracking-tighter">Muhammed Faris</h4>
              <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-6">Lead Systems Architect</p>
              <p className="text-zinc-400 leading-relaxed mb-8">
                "We didn't just build an app; we engineered a failsafe environment where data loss is mathematically improbable. Every line of code is a commitment to institutional transparency."
              </p>
              <a href="#" className="inline-flex items-center gap-4 text-cyan-500 font-black italic uppercase tracking-widest text-xs border-b-2 border-cyan-500 pb-2 hover:gap-8 transition-all">
                Full Technical Portfolio <MousePointer2 size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. DATA INFRASTRUCTURE FEED --- */}
      <section className="py-40 bg-zinc-100 dark:bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-10">
              <h2 className="text-7xl font-black italic uppercase tracking-tighter leading-none">The <br /> Pipeline.</h2>
              <div className="space-y-6">
                <InfraItem label="Auth Handshake" val="8ms" />
                <InfraItem label="Database I/O" val="124 ops/s" />
                <InfraItem label="Edge Propagation" val="Active" />
              </div>
            </div>
            <div className="relative aspect-square rounded-[4rem] bg-black border border-white/10 p-12 overflow-hidden shadow-2xl">
               <div className="absolute inset-0 opacity-20 flex flex-wrap gap-4 p-4 font-mono text-[8px] text-cyan-500">
                  {Array.from({length: 100}).map((_, i) => <span key={i}>0x{Math.random().toString(16).slice(2,6)}</span>)}
               </div>
               <div className="relative h-full flex flex-col justify-center items-center text-center">
                  <Database size={80} className="text-cyan-500 mb-8 animate-bounce" />
                  <p className="text-xs font-bold uppercase tracking-[0.5em] text-zinc-500">Encrypted Ledger v.2.06</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        ::selection { background: #22d3ee; color: #000; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
      `}</style>
    </div>
  );
};

const InfraItem = ({ label, val }) => (
  <div className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-4">
    <span className="text-xs font-black uppercase tracking-widest text-zinc-400">{label}</span>
    <span className="text-xl font-black italic text-cyan-500">{val}</span>
  </div>
);

export default ArchitecturePage;