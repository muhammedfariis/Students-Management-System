"use client";

import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  Cpu, Zap, ShieldCheck, Globe, Layers, Database, 
  Binary, Rocket, Workflow, Radio, Sparkles, Terminal,
  Box, Activity, Lock, Share2, ChevronRight, MousePointer2
} from "lucide-react";
import {useNavigate} from "react-router-dom"

// Assuming these components exist based on your previous structure
import { SpotlightNavbar } from "../components/common/navbar";
import Footer from "../components/common/landingFooter";

// --- EXTREME 3D PARALLAX WRAPPER ---
const AdvancedParallax = ({ children, speed = 1, rotate = 0, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 150, speed * -150]);
  const r = useTransform(scrollYProgress, [0, 1], [rotate * -15, rotate * 15]);
  const springY = useSpring(y, { stiffness: 50, damping: 20 });
  const springR = useSpring(r, { stiffness: 50, damping: 20 });

  return (
    <motion.div ref={ref} style={{ y: springY, rotateZ: springR }} className={className}>
      {children}
    </motion.div>
  );
};

const SystemLogicPage = () => {
  // Theme logic - defaults to dark if not found
  const mode = useSelector((state) => state.theme?.mode || 'dark');
  const containerRef = useRef(null);
  const Nav = useNavigate()

  return (
    <div 
      ref={containerRef}
      className={`${mode === "dark" ? "dark" : ""} transition-colors duration-700 font-sans selection:bg-cyan-500 selection:text-white`}
    >
      <div className="bg-white dark:bg-[#020203] text-zinc-900 dark:text-white overflow-hidden">
        <SpotlightNavbar />

        {/* 1. KINETIC HERO: DEPTH LAYERED */}
        <section className="relative h-[120vh] flex items-center justify-center overflow-hidden">
          {/* Parallax Background Text */}
          <div className="absolute inset-0 z-0 pointer-events-none select-none">
            <AdvancedParallax speed={-2} className="absolute top-20 left-[-5%] opacity-[0.03] dark:opacity-[0.07]">
              <h2 className="text-[40vw] font-black italic">CORE</h2>
            </AdvancedParallax>
            <AdvancedParallax speed={1.5} className="absolute bottom-20 right-[-5%] opacity-[0.03] dark:opacity-[0.07]">
              <h2 className="text-[35vw] font-black italic">9.0</h2>
            </AdvancedParallax>
          </div>

          <div className="relative z-10 text-center px-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-block px-6 py-2 mb-8 border border-black/10 dark:border-white/10 rounded-full bg-zinc-100 dark:bg-white/5 backdrop-blur-xl">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-600 dark:text-cyan-400">
                  Logic Gate: Operational
                </span>
              </div>
              <h1 className="text-[12vw] md:text-[10vw] font-black italic uppercase leading-[0.8] tracking-tighter">
                Neural <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600">
                  Substrate
                </span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* 2. BENTO ARCHITECTURE (Glassmorphism) */}
        <section className="py-40 px-6 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-7">
              <AdvancedParallax speed={0.2}>
                <div className="group relative h-[600px] rounded-[4rem] p-16 overflow-hidden border border-black/5 dark:border-white/5 bg-zinc-50 dark:bg-gradient-to-br dark:from-zinc-900 dark:to-black">
                  <Terminal size={400} className="absolute -right-20 -top-20 opacity-5 group-hover:rotate-12 transition-transform duration-1000" />
                  <div className="relative z-10 h-full flex flex-col justify-end">
                    <h3 className="text-6xl font-black italic uppercase tracking-tighter mb-6 text-cyan-500">Async Logic</h3>
                    <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">
                      We utilize <span className="text-black dark:text-white font-bold">Heuristic Threading</span> to fracture complex computations into sub-atomic tasks. This ensures 99.9% uptime even during massive data surges.
                    </p>
                  </div>
                </div>
              </AdvancedParallax>
            </div>

            <div className="col-span-12 lg:col-span-5">
              <AdvancedParallax speed={0.8}>
                <div className="h-[600px] rounded-[4rem] p-16 bg-cyan-600 dark:bg-cyan-500 flex flex-col justify-between text-white group overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-12 opacity-20 group-hover:scale-150 transition-transform duration-1000">
                    <Zap size={200} />
                  </div>
                  <Lock size={48} className="mb-8" />
                  <div>
                    <h3 className="text-4xl font-black italic uppercase mb-6">Quantum <br /> Security</h3>
                    <p className="text-white/80 font-medium">
                      All system logic is hard-signed with SHA-384 encryption. No unauthorized gate execution is mathematically possible.
                    </p>
                  </div>
                </div>
              </AdvancedParallax>
            </div>
          </div>
        </section>

        {/* 3. LOGIC PIPELINE (Telemetry) */}
        <section className="py-40 bg-zinc-100 dark:bg-[#050505] relative">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <h2 className="text-7xl font-black italic uppercase tracking-tighter leading-none">The <br /> Pipeline.</h2>
              <div className="space-y-6">
                <TelemetryRow label="Logic Throughput" value="1.2 GB/s" progress={85} />
                <TelemetryRow label="Gate Latency" value="0.04 ms" progress={15} />
                <TelemetryRow label="Thread Count" value="1024" progress={92} />
              </div>
            </div>
            
            <AdvancedParallax speed={-0.5} rotate={0.5}>
              <div className="relative aspect-square rounded-[4rem] bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 p-12 shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
                <div className="relative h-full flex flex-col items-center justify-center text-center">
                  <Cpu size={120} className="text-cyan-500 mb-8 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[1em] text-zinc-400">Processing Node_01</span>
                </div>
              </div>
            </AdvancedParallax>
          </div>
        </section>

        {/* 4. GLOBAL DEPLOYMENT (3D Feel) */}
        <section className="py-60 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/10" />
          <div className="container mx-auto px-6 text-center">
            <AdvancedParallax speed={-1}>
              <h2 className="text-[10vw] font-black italic uppercase leading-none tracking-tighter mb-20">
                Global <br /> <span className="text-cyan-500">Synchronization.</span>
              </h2>
            </AdvancedParallax>

            <div className="flex flex-wrap justify-center gap-6">
              {['New York', 'London', 'Dubai', 'Tokyo', 'Singapore'].map((city) => (
                <motion.div 
                  key={city}
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  className="px-10 py-5 rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-xl cursor-none group"
                >
                  <span className="text-sm font-black uppercase tracking-widest text-zinc-400 group-hover:text-cyan-500 transition-colors">
                    {city}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. EXPERT ARCHITECT CTA */}
        <section className="py-40 px-6">
          <div className="max-w-5xl mx-auto rounded-[4rem] p-16 md:p-24 bg-zinc-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
               <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,#06b6d4,transparent)]" />
            </div>
            <div className="relative z-10">
              <h4 className="text-5xl md:text-7xl font-black italic uppercase mb-8">Deploy the <br /> Future.</h4>
              <p className="text-xl text-zinc-400 max-w-xl mb-12">
                Join 500+ institutions leveraging our hardware-forged logic for mission-critical operations.
              </p>

              <button onClick={()=>Nav("/register")} className="flex items-center gap-6 bg-cyan-500 hover:bg-white hover:text-black text-black px-12 py-6 rounded-full font-black italic uppercase tracking-tighter transition-all group">
                Request API Access <ChevronRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        <Footer />

        <style jsx global>{`
          .dark ::-webkit-scrollbar-thumb { background: #222; }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: #ddd; border-radius: 10px; }
          body { cursor: default; }
        `}</style>
      </div>
    </div>
  );
};

const TelemetryRow = ({ label, value, progress }) => (
  <div className="py-6 border-b border-black/5 dark:border-white/5">
    <div className="flex justify-between items-end mb-4">
      <div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 block mb-1">Status</span>
        <span className="text-2xl font-black italic uppercase">{label}</span>
      </div>
      <span className="text-2xl font-black italic text-cyan-500">{value}</span>
    </div>
    <div className="h-1 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${progress}%` }}
        transition={{ duration: 2, ease: "circOut" }}
        className="h-full bg-gradient-to-r from-cyan-500 to-blue-600" 
      />
    </div>
  </div>
);

export default SystemLogicPage;