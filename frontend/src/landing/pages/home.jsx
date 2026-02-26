import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Users, CheckCircle, CreditCard, Lock, Database, 
  BarChart3, Fingerprint, Code2, Smartphone, Zap, 
  Clock, Globe, Server, Activity, ShieldCheck 
} from 'lucide-react';

/**
 * CUSTOM PARALLAX COMPONENT
 */
const ParallaxElement = ({ children, speed = 0, className = "", direction = "y" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const range = direction === "y" ? [speed * -100, speed * 100] : [speed * -50, speed * 50];
  const movement = useTransform(scrollYProgress, [0, 1], range);
  const smoothMovement = useSpring(movement, { stiffness: 100, damping: 30 });

  return (
    <motion.div 
      ref={ref} 
      style={{ [direction === "y" ? "y" : "x"]: smoothMovement }} 
      className={className}
    >
      {children}
    </motion.div>
  );
};


const HorizontalModuleSection = ({ modules }) => {
  const targetRef = useRef(null);
  const scrollRef = useRef(null);
  const [xDistance, setXDistance] = useState(0);

  useEffect(() => {
    const calculateDistance = () => {
      if (scrollRef.current) {
        // Total width of the track minus the visible screen width
        setXDistance(scrollRef.current.scrollWidth - window.innerWidth);
      }
    };

    calculateDistance();
    window.addEventListener("resize", calculateDistance);
    return () => window.removeEventListener("resize", calculateDistance);
  }, [modules]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -xDistance]);
  const smoothX = useSpring(x, { stiffness: 100, damping: 100 });

  return (
    <section ref={targetRef} className="relative  h-200 bg-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Background Label */}
        <motion.div 
          style={{ x: useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]) }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <h2 className="text-[35vw] font-black text-white/[0.015] italic uppercase whitespace-nowrap">
            Modules
          </h2>
        </motion.div>

        <motion.div ref={scrollRef} style={{ x: smoothX }} className="flex gap-16 px-[10vw] items-center">
          {modules.map((text, i) => (
            <div 
              key={i} 
              className="group relative w-120 h-120 shrink-0 rounded-[4rem] overflow-hidden bg-zinc-900 border border-white/10 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
              <div className="absolute top-12 right-12 text-[10rem] font-black text-white/[0.02] leading-none">
                0{i + 1}
              </div>
              <div className="absolute bottom-16 left-16 z-20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-[2px] bg-cyan-500" />
                  <p className="text-cyan-500 font-mono text-xs uppercase tracking-[0.5em]">System.Core</p>
                </div>
                <h4 className="text-7xl font-black italic tracking-tighter uppercase mb-6 leading-none">{text}</h4>
                <p className="text-gray-400 text-xl max-w-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  Proprietary logic gate for {text.toLowerCase()} integration.
                </p>
              </div>
            </div>
          ))}

          <div className="w-[50vw] shrink-0 flex flex-col items-center justify-center">
             <div className="w-40 h-40 rounded-full border border-white/5 flex items-center justify-center animate-[spin-slow_15s_linear_infinite]">
                <Activity size={60} className="text-cyan-500/20" />
             </div>
             <p className="mt-10 text-zinc-800 font-black text-xl uppercase tracking-[1.5em]">Deep Data</p>
          </div>
        </motion.div>

      
      </div>
    </section>
  );
};

const LandingPage = () => {
  const containerRef = useRef(null);
  const modules = ["BATCHES", "FINANCE", "LOGS", "ROLES", "AUTH", "API", "CLOUD", "STREAMS"];

  return (
    <div ref={containerRef} className="bg-black text-white overflow-x-hidden selection:bg-cyan-500 selection:text-black font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[130vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ParallaxElement speed={-2}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-white/[0.02] uppercase italic whitespace-nowrap">
              ATTENDEX 2026
            </div>
          </ParallaxElement>
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "circOut" }}
          >
            <h1 className="text-7xl md:text-[15rem] font-black tracking-tighter leading-none uppercase italic">
              Atten<span className="text-cyan-500">d</span>ex
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-10">
              <p className="text-xl md:text-3xl font-light tracking-widest uppercase text-gray-400">
                Institutional <span className="text-white">Logic</span> & Infrastructure
              </p>
              <button className="px-10 py-5 bg-white text-black font-black rounded-full hover:bg-cyan-500 transition-colors uppercase tracking-tighter shadow-2xl">
                Launch System
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. CORE BENTO GRID */}
      <section className="relative py-40 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Smart Logic", desc: "9:00 AM server-side thresholds for total automation.", icon: <Clock />, color: "bg-cyan-500" },
            { title: "JWT Vault", desc: "Zero-trust encryption for student & staff records.", icon: <Lock />, color: "bg-purple-600" },
            { title: "Auto-Cron", desc: "11:00 PM nightly sweeps mark absentees instantly.", icon: <Zap />, color: "bg-emerald-500" }
          ].map((item, i) => (
            <ParallaxElement key={i} speed={i * 0.5 + 0.5}>
              <motion.div 
                whileHover={{ y: -30 }}
                className="p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all group h-[450px] flex flex-col justify-end"
              >
                <div className={`w-16 h-16 ${item.color} rounded-2xl mb-8 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform text-black`}>
                  {item.icon}
                </div>
                <h3 className="text-4xl font-bold mb-4 tracking-tighter uppercase italic">{item.title}</h3>
                <p className="text-gray-500 text-lg leading-relaxed">{item.desc}</p>
              </motion.div>
            </ParallaxElement>
          ))}
        </div>
      </section>

      {/* 3. PINNED HORIZONTAL SECTION (MODULARIZED FIX) */}
      <HorizontalModuleSection modules={modules} />

      {/* 4. FINANCIAL LEDGER */}
      <section className="relative min-h-screen py-40 flex items-center justify-center bg-zinc-950">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-24 items-center px-6">
          <div className="z-10">
             <h2 className="text-8xl md:text-[120px] font-black leading-none uppercase italic mb-8">Cash <br/> Flow.</h2>
             <p className="text-2xl text-gray-500 mb-12 max-w-md italic leading-relaxed font-light">
               Real-time aggregation pipelines tracking <span className="text-white">$2M+ in revenue</span> with 42ms latency.
             </p>
             <div className="flex flex-wrap gap-4">
                <div className="px-8 py-4 rounded-full border border-cyan-500/50 text-cyan-400 font-bold uppercase tracking-widest text-xs bg-cyan-500/5">MongoDB Aggregation</div>
                <div className="px-8 py-4 rounded-full border border-white/10 text-gray-500 font-bold uppercase tracking-widest text-xs">Ledger v4</div>
             </div>
          </div>
          
          <div className="relative h-150 w-full">
            <ParallaxElement speed={2} className="absolute inset-0 bg-cyan-500 rounded-[4rem] z-0 opacity-10 blur-[100px]" />
            <ParallaxElement speed={-1} className="absolute inset-0 bg-zinc-900 border border-white/10 rounded-[4rem] z-10 p-16 shadow-2xl flex flex-col justify-center">
               <BarChart3 size={100} className="text-cyan-400 mb-12" />
               <div className="space-y-8">
                 <div className="h-4 w-full bg-white/5 rounded-full" />
                 <div className="h-4 w-[85%] bg-white/5 rounded-full" />
                 <div className="h-4 w-[60%] bg-cyan-500/30 rounded-full" />
               </div>
            </ParallaxElement>
            <ParallaxElement speed={3} className="absolute -bottom-10 -right-10 z-20 bg-white p-10 rounded-3xl shadow-2xl rotate-6 text-black">
               <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Collection Rate</p>
               <h5 className="text-6xl font-black tracking-tighter italic">92.4%</h5>
            </ParallaxElement>
          </div>
        </div>
      </section>

      {/* 5. FLOATING STATS */}
      <section className="relative py-48 bg-cyan-600 overflow-hidden">
        <ParallaxElement speed={-4} className="absolute -right-60 -top-60 opacity-30">
          <div className="w-[1000px] h-[1000px] border-[120px] border-white rounded-full" />
        </ParallaxElement>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-20 relative z-10">
          {[
            { label: "Active Batches", val: "48" },
            { label: "Check-ins/Day", val: "2.5k" },
            { label: "Server Uptime", val: "100%" },
            { label: "API Latency", val: "42ms" }
          ].map((stat, i) => (
            <ParallaxElement key={i} speed={i * 0.3 + 0.2} className="text-center">
              <h2 className="text-6xl md:text-8xl font-black text-white mb-2 italic tracking-tighter">{stat.val}</h2>
              <p className="text-cyan-900 uppercase font-black text-sm tracking-widest">{stat.label}</p>
            </ParallaxElement>
          ))}
        </div>
      </section>

      {/* 6. SECURITY VAULT */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden bg-black">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
          <ParallaxElement speed={-10}>
            <Fingerprint size={1000} />
          </ParallaxElement>
        </div>
        <div className="z-10 text-center max-w-4xl px-6">
          <ShieldCheck className="mx-auto text-cyan-500 mb-12" size={100} />
          <h2 className="text-7xl md:text-9xl font-black uppercase italic mb-10 tracking-tighter">Secure <br/> Vault.</h2>
          <p className="text-gray-500 text-2xl md:text-3xl font-light italic leading-relaxed">
            Every request is signed and verified. <span className="text-white font-bold italic">Zero-Trust</span> architecture ensures students only see their journey.
          </p>
        </div>
      </section>

      {/* 7. LIVE LOGS FEED */}
      <section className="py-60 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-7xl font-black italic mb-8 uppercase leading-none">Zero <br/> Friction.</h2>
            <p className="text-gray-500 text-2xl max-w-md italic leading-relaxed font-light mb-10">
              The system thinks so you don't have to.
            </p>
            <div className="flex gap-4">
               <Globe className="text-cyan-500" size={32} />
               <Server className="text-purple-500" size={32} />
               <Database className="text-emerald-500" size={32} />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <ParallaxElement speed={1.5}>
              <div className="bg-black border border-white/5 rounded-[4rem] p-16 relative overflow-hidden shadow-3xl">
                 <div className="absolute top-0 right-0 p-12"><Activity size={120} className="text-cyan-500/10" /></div>
                 <h3 className="text-4xl font-black mb-10 italic uppercase text-cyan-500">Live Infrastructure.</h3>
                 <div className="space-y-6 font-mono text-sm md:text-base">
                    <p className="text-emerald-400/80 tracking-tighter">&gt; [23:00:00] CRON_SWEEP_EXECUTED</p>
                    <p className="text-gray-500 tracking-tighter">&gt; [23:00:42] LOGGED: 142 ABSENT_RECORDS</p>
                    <p className="text-cyan-400/80 tracking-tighter">&gt; [09:00:10] WEBHOOK: BATCH_AUTH_SUCCESS</p>
                 </div>
              </div>
            </ParallaxElement>
          </div>
        </div>
      </section>

      {/* 8. DEVICE SYNC (PWA) */}
      <section className="h-screen flex items-center justify-center bg-black border-y border-white/5">
        <div className="relative">
          <ParallaxElement speed={2} className="z-10 relative">
            <div className="w-[320px] h-[650px] bg-zinc-900 border-[12px] border-zinc-800 rounded-[3.5rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] p-4">
              <div className="w-full h-full bg-cyan-500 rounded-[2.5rem] flex items-center justify-center overflow-hidden">
                 <div className="text-center">
                    <Smartphone size={80} className="text-black mb-6 mx-auto" />
                    <p className="text-black font-black italic uppercase tracking-widest text-xs">Attendex Mobile</p>
                 </div>
              </div>
            </div>
          </ParallaxElement>
          <ParallaxElement speed={-2} className="absolute -top-40 -left-60 z-0">
             <div className="w-[600px] h-[600px] bg-white/[0.02] rounded-full border border-white/5 flex items-center justify-center">
               <p className="text-white/[0.05] font-black text-8xl rotate-90 uppercase italic whitespace-nowrap">RESPONSE ENGINE</p>
             </div>
          </ParallaxElement>
        </div>
      </section>

      {/* 9. THE STACK */}
      <section className="py-60 max-w-7xl mx-auto px-6">
        <h2 className="text-6xl md:text-9xl font-black mb-32 text-center italic uppercase tracking-tighter">The Stack.</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: "Node.js", icon: <Server /> },
            { name: "MongoDB", icon: <Database /> },
            { name: "React", icon: <Code2 /> },
            { name: "Framer", icon: <Activity /> }
          ].map((tech, i) => (
            <ParallaxElement key={i} speed={i % 2 === 0 ? 0.5 : -0.5} className="p-16 bg-zinc-900 border border-white/5 rounded-[3rem] flex flex-col items-center justify-center hover:bg-white hover:text-black transition-all duration-500 group cursor-pointer shadow-xl">
              <div className="mb-8 text-cyan-500 group-hover:text-black transition-colors transform group-hover:scale-125 duration-500">
                {React.cloneElement(tech.icon, { size: 48 })}
              </div>
              <span className="font-black uppercase tracking-[0.3em] text-sm italic">{tech.name}</span>
            </ParallaxElement>
          ))}
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <ParallaxElement speed={4}>
            <div className="w-[120vw] h-[120vw] border-[1px] border-white/5 rounded-full" />
          </ParallaxElement>
        </div>
        <div className="z-10 text-center px-4">
          <h2 className="text-[12vw] font-black italic tracking-tighter leading-[0.8] mb-16 uppercase">
            Start <br/> <span className="text-cyan-500">Scaling.</span>
          </h2>
          <button className="group relative px-20 py-10 bg-white text-black text-2xl md:text-4xl font-black rounded-full overflow-hidden transition-all hover:pr-32 shadow-[0_0_50px_rgba(255,255,255,0.2)]">
            <span className="relative z-10">GET SYSTEM ACCESS</span>
            <span className="absolute right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all">→</span>
          </button>
        </div>
      </section>

      <footer className="py-24 border-t border-white/5 text-center px-6">
        <div className="text-3xl font-black italic mb-8 text-white">ATTENDEX</div>
        <p className="text-zinc-700 text-xs tracking-[0.8em] uppercase font-black italic">
          Institutional Infrastructure © 2026
        </p>
      </footer>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;