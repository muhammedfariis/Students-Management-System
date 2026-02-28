import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {Link} from "react-router-dom"
import { 
  Target, Cpu, Zap, ShieldCheck, Users, Code2, Globe, 
  Layers, MousePointer2, Fingerprint, Database, Binary,
  Rocket, Lightbulb, Workflow, Radio, Sparkles
} from "lucide-react";

import ParallaxElement from "../components/ui/parallaxElament";
import HorizontalModuleSection from "../components/ui/horizontalModule";
import { SpotlightNavbar } from "../components/common/navbar";
import Footer from "../components/common/landingFooter";

const About = () => {
  const mode = useSelector((state) => state.theme?.mode || 'dark');
  const containerRef = useRef(null);

  const modules = ["CORE", "TECH", "DEV", "INFRA", "SYNC", "SECURITY"];

  return (
    <div 
      ref={containerRef}
      className={`${mode === "dark" ? "dark" : ""} bg-white dark:bg-[#050505] text-black dark:text-white transition-colors duration-500 overflow-x-hidden font-sans`}
    >
      <SpotlightNavbar />

      {/* --- 1. THE "FRACTURED" HERO --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ParallaxElement speed={-4} className="absolute top-20 left-10">
            <div className="text-[25vw] font-black text-cyan-500/5 italic leading-none">ALPHA</div>
          </ParallaxElement>
          <ParallaxElement speed={3} className="absolute bottom-20 right-10">
            <div className="text-[20vw] font-black text-purple-500/5 italic leading-none">CORE</div>
          </ParallaxElement>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <h1 className="text-[12vw] md:text-[14vw] font-black italic uppercase leading-[0.75] tracking-tighter">
              Inside <br /> <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">Attendex</span>
            </h1>
            <div className="mt-12 flex items-center gap-4 bg-black/5 dark:bg-white/5 backdrop-blur-xl px-8 py-4 rounded-full border border-black/10 dark:border-white/10">
              <Radio className="text-cyan-500 animate-pulse" size={20} />
              <span className="text-sm font-black uppercase tracking-[0.3em] italic">System Status: Operational</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- 2. GRADIENT BENTO GRID (Asymmetric) --- */}
      <section className="px-6 py-40 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-12 gap-6">
          
          {/* Mission Card - Deep Cyan Gradient */}
          <div className="col-span-12 lg:col-span-8">
            <ParallaxElement speed={0.5}>
              <div className="relative group overflow-hidden rounded-[3.5rem] p-12 h-[500px] flex flex-col justify-end border border-black/5 dark:border-white/10 bg-gradient-to-br from-cyan-500/20 via-blue-600/10 to-transparent backdrop-blur-3xl shadow-2xl shadow-cyan-500/5">
                <div className="absolute top-12 right-12 opacity-20 group-hover:scale-110 transition-transform duration-700">
                  <Target size={180} />
                </div>
                <div className="relative z-10 space-y-4">
                  <h3 className="text-5xl font-black italic uppercase tracking-tighter text-cyan-500">The Mission</h3>
                  <p className="max-w-xl text-xl font-medium text-zinc-600 dark:text-zinc-400">
                    We aren't just tracking names. We are building the <span className="text-black dark:text-white underline decoration-cyan-500 decoration-4">computational layer</span> for institutional trust, eliminating human error through rigid automation.
                  </p>
                </div>
              </div>
            </ParallaxElement>
          </div>

          {/* Logic Card - Purple Pulse Gradient */}
          <div className="col-span-12 lg:col-span-4">
            <ParallaxElement speed={1.2}>
              <div className="relative group overflow-hidden rounded-[3.5rem] p-12 h-[500px] bg-gradient-to-b from-purple-600/20 to-zinc-100 dark:to-zinc-900 border border-black/5 dark:border-white/10">
                <Cpu size={48} className="text-purple-500 mb-8" />
                <h3 className="text-3xl font-black italic uppercase mb-4 text-purple-400">Smart Logic</h3>
                <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest leading-loose">
                  Server-side thresholding <br />
                  JWT Node validation <br />
                  Atomic Transactions
                </p>
                <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                  <Binary size={200} />
                </div>
              </div>
            </ParallaxElement>
          </div>

          {/* Security Card - Emerald Mesh Gradient */}
          <div className="col-span-12 lg:col-span-5">
            <ParallaxElement speed={-0.5}>
              <div className="relative group overflow-hidden rounded-[3.5rem] p-12 h-[450px] bg-gradient-to-tr from-emerald-500/20 via-transparent to-emerald-900/10 border border-black/5 dark:border-white/10">
                <ShieldCheck size={48} className="text-emerald-500 mb-8" />
                <h3 className="text-3xl font-black italic uppercase text-emerald-400">Vault Protocol</h3>
                <p className="mt-4 text-zinc-500 dark:text-zinc-400 font-medium">
                  Zero-knowledge architecture. No password ever hits the disk in plain text. Every transaction is cryptographically signed.
                </p>
              </div>
            </ParallaxElement>
          </div>

          {/* Real-time Card - Amber Mesh Gradient */}
          <div className="col-span-12 lg:col-span-7">
            <ParallaxElement speed={0.8}>
              <div className="relative group overflow-hidden rounded-[3.5rem] p-12 h-[450px] bg-gradient-to-br from-amber-500/20 via-zinc-50 dark:via-zinc-950 to-amber-900/5 border border-black/5 dark:border-white/10">
                <div className="flex justify-between items-start">
                  <Zap size={48} className="text-amber-500" />
                  <div className="px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-black uppercase text-amber-500">42ms Latency</div>
                </div>
                <h3 className="mt-20 text-5xl font-black italic uppercase tracking-tighter text-amber-500">Hyper-Sync</h3>
                <p className="mt-4 text-zinc-500 dark:text-zinc-400 text-lg">
                  Instantaneous propagation across all institutional nodes. From administrative panels to the student PWA.
                </p>
              </div>
            </ParallaxElement>
          </div>
        </div>
      </section>

      {/* --- 3. HORIZONTAL SCROLL INTERRUPT --- */}
      <HorizontalModuleSection modules={modules} />

      {/* --- 4. THE "ENGINEER" SECTION (Gradient Overlays) --- */}
      <section className="relative py-60 flex flex-col items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />
        
        <ParallaxElement speed={-2}>
          <div className="p-4 bg-black dark:bg-white rounded-3xl mb-12">
            <Sparkles className="text-white dark:text-black" size={40} />
          </div>
        </ParallaxElement>

        <h2 className="text-center text-7xl md:text-[10vw] font-black italic uppercase leading-none tracking-tighter">
          Hard <br /> <span className="text-cyan-500">Signed</span> By
        </h2>

        <div className="mt-20 flex flex-col md:flex-row items-center gap-12">
          <ParallaxElement speed={1.5} className="group relative">
             <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
             <div className="relative h-40 w-40 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-black/10 dark:border-white/10 flex items-center justify-center">
                <Users size={60} className="text-cyan-500" />
             </div>
          </ParallaxElement>

          <div className="text-center md:text-left space-y-4">
             <h3 className="text-5xl font-black italic uppercase tracking-tighter">Muhammed Faris</h3>
             <p className="text-zinc-500 font-bold uppercase tracking-[0.4em] text-xs">Architect & Core Developer</p>
             <motion.a 
                whileHover={{ x: 10 }}
                href="https://muhammedfarisportfolio.netlify.app"
                target="_blank"
                className="inline-flex items-center gap-3 text-cyan-500 font-black italic uppercase tracking-widest text-sm"
             >
                Node Credentials <MousePointer2 size={16} />
             </motion.a>
          </div>
        </div>
      </section>

      {/* --- 5. INFRASTRUCTURE FEED --- */}
      <section className="h-screen relative flex items-center justify-center bg-black overflow-hidden">
        <ParallaxElement speed={-8} className="absolute inset-0 flex flex-col gap-10 opacity-10">
           {[...Array(5)].map((_, i) => (
             <div key={i} className="text-[15vw] font-black italic text-white whitespace-nowrap">
               STABILITY SECURITY EFFICIENCY SCALABILITY
             </div>
           ))}
        </ParallaxElement>
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-20 max-w-5xl px-6">
           <div className="p-12 rounded-[4rem] border border-white/10 bg-white/5 backdrop-blur-3xl">
              <h4 className="text-cyan-400 font-black italic uppercase text-3xl mb-6">Scale Node</h4>
              <div className="space-y-4">
                 <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "92%" }} transition={{ duration: 2 }} className="h-full bg-cyan-500" />
                 </div>
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    <span>Performance</span>
                    <span>92.4%</span>
                 </div>
              </div>
           </div>
           <div className="flex flex-col justify-center">
              <h2 className="text-6xl font-black italic uppercase text-white leading-none mb-8">Ready to <br /> Deploy.</h2>
              <Link to="/register">
                   <button className="px-12 py-6 bg-cyan-500 text-black font-black italic uppercase rounded-full hover:bg-white transition-colors">
                 Access API Key
              </button>
              </Link>
            
           </div>
        </div>
      </section>

      <Footer />
      
      <style>{`
        ::selection { background: #06b6d4; color: white; }
        .backdrop-blur-3xl { backdrop-filter: blur(64px); }
      `}</style>
    </div>
  );
};

export default About;