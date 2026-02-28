"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  Cpu, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Cloud, 
  Database,
  Box,
  Network,
  ChevronRight
} from "lucide-react";

// Components (Replace with your actual paths)
import { SpotlightNavbar } from "../components/common/navbar";
import Footer from "../components/common/landingFooter";
import MeshBackground from "../components/common/mesh";

const EXTREME_BEZIER = [0.19, 1, 0.22, 1];

const ArchitecturePage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 25 });

  // Parallax altitude layers
  const orbitRotation = useTransform(smoothProgress, [0, 1], [0, 45]);
  const heroTranslateY = useTransform(smoothProgress, [0, 0.5], [0, -200]);
  const backgroundScale = useTransform(smoothProgress, [0, 1], [1, 1.2]);
  const midLayerY = useTransform(smoothProgress, [0, 1], [0, -400]);

  return (
    <div ref={containerRef} className="relative bg-[#ffffff] dark:bg-[#030304] text-zinc-900 dark:text-zinc-100 transition-colors duration-500 overflow-hidden font-sans">
      <SpotlightNavbar />
      
      {/* 1. HERO: SYSTEM CORE */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <motion.div style={{ scale: backgroundScale }} className="absolute inset-0 z-0">
          <MeshBackground />
        </motion.div>

        <motion.div 
          style={{ y: heroTranslateY }}
          className="relative z-10 text-center px-6"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md"
          >
            <Box size={14} className="text-blue-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Infrastructure v4.0</span>
          </motion.div>
          
          <h1 className="text-[12vw] font-black tracking-tighter leading-[0.85] uppercase mb-8">
            The <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-800">BluePrint.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-zinc-500 dark:text-zinc-400 font-medium">
            A distributed micro-kernel architecture built for extreme scalability, 
            zero-latency data syncing, and multi-tenant security.
          </p>
        </motion.div>
      </section>

      {/* 2. THE STACK: BENTO GRID PARALLAX */}
      <section className="relative py-40 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
          
          {/* Main Engine Block */}
          <motion.div 
            style={{ y: midLayerY }}
            className="md:col-span-8 p-12 rounded-[3rem] bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20 backdrop-blur-3xl relative overflow-hidden"
          >
            <div className="relative z-10">
              <Cpu size={48} className="text-blue-500 mb-6" />
              <h2 className="text-5xl font-black italic uppercase mb-4">Neural Processing Unit</h2>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-md">Our proprietary engine handles 50,000+ concurrent requests with sub-10ms response times using edge-computing nodes.</p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          </motion.div>

          {/* Side Performance Block */}
          <div className="md:col-span-4 p-12 rounded-[3rem] bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 flex flex-col justify-end">
             <Zap size={32} className="text-amber-500 mb-6" />
             <h3 className="text-2xl font-bold mb-2 uppercase italic">Turbo Sync</h3>
             <p className="text-sm text-zinc-500">Real-time database reconciliation via WebSockets.</p>
          </div>

          {/* Infrastructure Stats Block */}
          <div className="md:col-span-4 p-12 rounded-[3rem] bg-zinc-900 dark:bg-white text-white dark:text-black">
             <span className="text-[6rem] font-black leading-none tracking-tighter italic">99.9</span>
             <p className="text-xs font-black uppercase tracking-widest mt-2 opacity-60">Uptime SLA Guaranteed</p>
          </div>

          {/* Scalability Block */}
          <motion.div 
            style={{ y: useTransform(smoothProgress, [0, 1], [0, -150]) }}
            className="md:col-span-8 p-12 rounded-[3rem] bg-gradient-to-tr from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800 border border-zinc-200 dark:border-white/10"
          >
             <Network size={40} className="text-zinc-400 mb-6" />
             <h3 className="text-4xl font-black uppercase italic mb-4">Multi-Region Redundancy</h3>
             <p className="text-zinc-500 max-w-md font-medium">Auto-scaling clusters deployed across AWS, Google Cloud, and Azure for absolute global availability.</p>
          </motion.div>
        </div>
      </section>

      {/* 3. SECURITY: ENCRYPTED LAYER */}
      <section className="py-40 relative bg-[#08080a] text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <ShieldCheck size={64} className="text-emerald-500 mb-8" />
            <h2 className="text-6xl font-black italic uppercase tracking-tighter mb-8 leading-none">Hardened <br /> Security Tier.</h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-10">
              Our architecture utilizes an isolated "Security Enclave." Even if the main server is compromised, user credentials remain encrypted at the hardware level.
            </p>
            <ul className="space-y-4">
              {['End-to-End AES 256', 'SOC2 Type II Compliance', 'Regular Penetration Testing'].map(item => (
                <li key={item} className="flex items-center gap-3 font-bold text-sm uppercase italic">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative group">
            <div className="aspect-video bg-zinc-900 rounded-[2.5rem] border border-white/10 overflow-hidden flex items-center justify-center">
               <motion.div 
                style={{ rotate: orbitRotation }}
                className="w-48 h-48 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full" 
               />
               <div className="absolute font-mono text-[10px] text-zinc-600 top-8 left-8">system.auth_gate()</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE DATA FLOW (VISUAL REPRESENTATION) */}
      <section className="py-40">
         <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-5xl font-black uppercase italic mb-20 tracking-tighter">Liquid Data Flow.</h2>
            <div className="flex flex-col items-center gap-8 relative">
               <ArchNode icon={<Cloud />} label="Client Interface" />
               <div className="h-20 w-[2px] bg-gradient-to-b from-blue-500 to-transparent" />
               <ArchNode icon={<Layers />} label="API Gateway" highlight />
               <div className="h-20 w-[2px] bg-gradient-to-b from-blue-500 to-transparent" />
               <ArchNode icon={<Database />} label="Elastic Storage" />
            </div>
         </div>
      </section>

      {/* 5. API DOCS PREVIEW */}
      <section className="py-40 border-t border-zinc-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <h2 className="text-5xl font-black italic uppercase mb-6">Built for <br /> Developers.</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8">Our RESTful API and GraphQL endpoints are documented to the highest standard. Integrate with any existing HRMS or ERP in minutes.</p>
            <button className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">
               Access Developer Hub <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex-1 w-full p-8 bg-zinc-900 rounded-3xl font-mono text-xs text-zinc-400 shadow-2xl">
             <div className="flex gap-2 mb-4">
               <div className="w-3 h-3 rounded-full bg-red-500/50" />
               <div className="w-3 h-3 rounded-full bg-amber-500/50" />
               <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
             </div>
             <p className="text-blue-400">GET /v4/system/health</p>
             <p className="mt-2 text-zinc-500">{'{'}</p>
             <p className="ml-4">"status": "operational",</p>
             <p className="ml-4">"latency": "8ms",</p>
             <p className="ml-4">"clusters": ["us-east-1", "eu-central-1"]</p>
             <p className="text-zinc-500">{'}'}</p>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-60 text-center">
        <motion.div 
          whileHover={{ scale: 0.95 }}
          className="relative inline-block cursor-pointer"
        >
          <h2 className="text-8xl md:text-[10rem] font-black italic uppercase tracking-tighter leading-none mb-12">
            Build the <br /> <span className="text-blue-500 underline decoration-8">Future.</span>
          </h2>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

// HELPER
const ArchNode = ({ icon, label, highlight }) => (
  <motion.div 
    whileHover={{ scale: 1.1 }}
    className={`p-6 rounded-2xl flex items-center gap-6 border transition-all ${highlight ? 'bg-blue-600 text-white border-blue-400' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/10'}`}
  >
    <div className={highlight ? 'text-white' : 'text-blue-500'}>{icon}</div>
    <span className="font-black uppercase tracking-widest text-xs italic">{label}</span>
  </motion.div>
);

export default ArchitecturePage;