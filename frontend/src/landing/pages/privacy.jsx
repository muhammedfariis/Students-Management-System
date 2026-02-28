"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  Fingerprint, 
  Server, 
  Database, 
  Zap, 
  ShieldAlert,
  Trash2,
  FileLock2,
  Globe,
  RefreshCcw,
  Cpu,
  Download,
  CheckCircle2,
  Loader2
} from "lucide-react";

import { SpotlightNavbar } from "../components/common/navbar";
import Footer from "../components/common/landingFooter";
import MeshBackground from "../components/common/mesh";

const EXTREME_BEZIER = [0.16, 1, 0.3, 1];

const PrivacyPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // 3D Parallax Depth Layers
  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "40%"]);
  const layerDeepY = useTransform(smoothProgress, [0, 1], [0, -600]);
  const layerMidY = useTransform(smoothProgress, [0, 1], [0, -300]);
  const rotation3D = useTransform(smoothProgress, [0, 1], [0, 15]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.8]);

  return (
    <div ref={containerRef} className="relative bg-white dark:bg-[#020203] text-zinc-900 dark:text-zinc-100 transition-colors duration-700 font-sans overflow-hidden">
      <SpotlightNavbar />
      
      {/* ── SECTION 1: HERO MANIFESTO ── */}
      <section className="relative h-screen flex items-center justify-center perspective-1000">
        <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
          <MeshBackground />
        </motion.div>

        <motion.div 
          style={{ scale: heroScale, rotateX: rotation3D }}
          className="relative z-10 text-center px-6"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 mb-8 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-black/40 backdrop-blur-2xl">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 dark:text-zinc-400">Privacy_Core_v26.0</span>
          </div>
          <h1 className="text-[14vw] font-black italic uppercase tracking-tighter leading-[0.75] mb-6">
            Data <br /> <span className="text-cyan-500">Sovereign.</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg font-medium text-zinc-500 dark:text-zinc-400 mt-10">
            We don't just protect data. We eliminate the need to own it. Experience the first zero-knowledge attendance protocol.
          </p>
        </motion.div>

        <motion.div style={{ y: layerDeepY }} className="absolute -left-20 top-1/4 opacity-5 dark:opacity-10 pointer-events-none">
           <ShieldCheck size={800} strokeWidth={0.5} />
        </motion.div>
      </section>

      {/* ── SECTION 2: BIOMETRIC SHIELD ── */}
      <section className="relative py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            whileHover={{ scale: 1.02, rotateY: 2 }}
            transition={{ ease: EXTREME_BEZIER }}
            className="group relative p-12 md:p-24 rounded-[4rem] bg-zinc-100/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 backdrop-blur-3xl overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="z-10">
                <div className="w-20 h-20 rounded-3xl bg-cyan-500 flex items-center justify-center mb-10 shadow-2xl shadow-cyan-500/20">
                  <Fingerprint className="text-black" size={40} />
                </div>
                <h2 className="text-6xl font-black italic uppercase leading-none mb-8">Non-Reversible <br /> Biometrics.</h2>
                <p className="text-xl text-zinc-500 dark:text-zinc-400 font-medium">
                  We never store faces or fingerprints. Our "Jelly" hashing algorithm converts scans into unique mathematical coordinates that cannot be reconstructed.
                </p>
              </div>
              <motion.div style={{ y: layerMidY }} className="relative flex justify-center">
                 <div className="w-80 h-80 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-full blur-[100px] opacity-20 animate-pulse" />
                 <Lock size={300} className="absolute text-zinc-200 dark:text-zinc-800" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 3: THE VAULT MATRIX ── */}
      <section className="relative py-40 px-6 bg-zinc-50 dark:bg-[#040405] border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
              <h2 className="text-7xl font-black italic uppercase tracking-tighter leading-none">
                Privacy <br /> <span className="text-cyan-500">Infrastructure.</span>
              </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Server />, t: "Sovereign Hosting", d: "Data never leaves your legal jurisdiction. GDPR/CCPA compliant by design." },
              { icon: <Database />, t: "Auto-Purge", d: "Logs are wiped every 24 hours. Only aggregate stats remain." },
              { icon: <Cpu />, t: "On-Device Processing", d: "Computation happens on the user's silicon, not our cloud." }
            ].map((item, i) => (
              <JellyCard key={i} icon={item.icon} title={item.t} description={item.d} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: DATA MINIMIZATION ── */}
      <section className="relative py-60 px-6 overflow-hidden">
        <motion.div style={{ x: layerMidY }} className="absolute top-0 right-0 text-[20vw] font-black text-zinc-100 dark:text-white/[0.02] italic uppercase pointer-events-none whitespace-nowrap">
          Zero_Knowledge_System
        </motion.div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <h2 className="text-8xl font-black italic uppercase tracking-tighter leading-[0.8]">What we <br /> <span className="text-transparent text-outline-zinc dark:text-outline-white">don't see.</span></h2>
            <div className="grid grid-cols-2 gap-6">
              {['Location History', 'Device Contacts', 'Personal Media', 'Web Activity'].map(tag => (
                <div key={tag} className="flex items-center gap-4 p-6 rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <EyeOff className="text-red-500" size={20} />
                  <span className="text-xs font-black uppercase tracking-widest">{tag}</span>
                </div>
              ))}
            </div>
          </div>
          <motion.div style={{ y: layerMidY }} className="bg-black p-10 rounded-[3rem] shadow-2xl">
              <div className="font-mono text-[10px] space-y-3">
                <p className="text-cyan-500 uppercase tracking-widest">// SECURE_LOG_DAEMON</p>
                <p className="text-zinc-500">HANDSHAKE INITIALIZED...</p>
                <p className="text-emerald-500">ENCRYPTION: AES-256-GCM [ACTIVE]</p>
                <p className="text-zinc-500">PACKET SENSING: ANONYMIZED</p>
                <p className="text-zinc-500">METADATA SCRUBBING: COMPLETE</p>
                <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ repeat: Infinity, duration: 2 }} className="h-full w-1/2 bg-cyan-500" />
                </div>
              </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 5: USER RIGHTS ── */}
      <section className="py-40 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
           <h3 className="text-2xl font-black italic uppercase tracking-widest mb-20 text-center">Your Universal Rights</h3>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <RightIcon icon={<Trash2 />} title="Erase" />
              <RightIcon icon={<FileLock2 />} title="Export" />
              <RightIcon icon={<Globe />} title="Port" />
              <RightIcon icon={<RefreshCcw />} title="Correct" />
           </div>
        </div>
      </section>

      {/* ── SECTION 6: THE CTA SHIELD ── */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cyan-500/5 pointer-events-none" />
        <div className="relative z-10 text-center space-y-16">
           <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
           >
             <ShieldAlert size={120} className="mx-auto text-cyan-500 mb-8 animate-pulse" />
             <h2 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none">
               Stay <br /> Protected.
             </h2>
           </motion.div>

           {/* --- THE UPGRADED COMPLIANCE BUTTON --- */}
           <DownloadButton />
        </div>
      </section>

      <Footer />
    </div>
  );
};

// --- SUB-COMPONENTS ---

const DownloadButton = () => {
  const [status, setStatus] = useState("idle"); // idle | downloading | complete

  const handleDownload = () => {
    setStatus("downloading");
    
    // Simulate a brief delay before the "actual" download begins
    setTimeout(() => {
      setStatus("complete");
      const link = document.createElement('a');
      link.href = '/pdf/Privacy Manifesto for Attendex v26.0.pdf'; // Path to your file
      link.download = 'Privacy_Compliance_Protocol.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Reset after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <motion.button
      onClick={handleDownload}
      disabled={status !== "idle"}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative group flex items-center justify-center gap-6 px-10 py-6 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full transition-all duration-500 shadow-[0_0_0_0_rgba(6,182,212,0)] hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)] border border-white/10 dark:border-black/10"
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-4"
            >
              <Download size={20} className="group-hover:animate-bounce" />
              <span className="font-black uppercase tracking-[0.3em] text-xs">Download Compliance Protocol</span>
            </motion.div>
          )}

          {status === "downloading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-4 text-cyan-500"
            >
              <Loader2 size={20} className="animate-spin" />
              <span className="font-black uppercase tracking-[0.3em] text-xs">Encrypting Files...</span>
            </motion.div>
          )}

          {status === "complete" && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-4 text-emerald-500"
            >
              <CheckCircle2 size={20} />
              <span className="font-black uppercase tracking-[0.3em] text-xs">Protocol Acquired</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative inner glow */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"
        />
      </div>
    </motion.button>
  );
};

const JellyCard = ({ icon, title, description, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EXTREME_BEZIER, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="p-12 rounded-[3.5rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl hover:shadow-cyan-500/10 transition-all group"
    >
      <div className="text-cyan-500 mb-8 group-hover:scale-125 transition-transform duration-500">{icon}</div>
      <h3 className="text-3xl font-black italic uppercase mb-6 leading-none">{title}</h3>
      <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{description}</p>
    </motion.div>
  );
};

const RightIcon = ({ icon, title }) => (
  <div className="flex flex-col items-center gap-6 group">
    <div className="w-24 h-24 rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shadow-lg group-hover:bg-cyan-500 group-hover:text-black transition-all">
      {icon}
    </div>
    <span className="font-black uppercase tracking-[0.3em] text-[10px] text-zinc-400">{title}</span>
  </div>
);

export default PrivacyPage;