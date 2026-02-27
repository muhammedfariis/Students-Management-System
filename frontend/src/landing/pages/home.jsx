import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import HorizontalModuleSection from "../components/ui/horizontalModule";
import ParallaxElement from "../components/ui/parallaxElament";
import { SpotlightNavbar } from "../components/common/navbar";
import Footer from "../components/common/landingFooter";
import LogoSlider from "../components/ui/logoslider";
import {
  Users,
  CheckCircle,
  CreditCard,
  Lock,
  Database,
  BarChart3,
  Fingerprint,
  Code2,
  Smartphone,
  Zap,
  Clock,
  Globe,
  Server,
  Activity,
  ShieldCheck,
} from "lucide-react";

import reactsvg from "../../assets/react.svg";

const LandingPage = () => {
  const containerRef = useRef(null);
  const modules = [
    "BATCHES",
    "FINANCE",
    "LOGS",
    "ROLES",
    "AUTH",
    "API",
    "CLOUD",
    "STREAMS",
  ];

  return (
    <div
      ref={containerRef}
      className="bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 overflow-x-hidden selection:bg-cyan-500 selection:text-black font-sans"
    >
      <SpotlightNavbar />

      {/* 1. HERO SECTION */}
      <section className="relative h-[100vh] md:h-[130vh] flex items-center justify-center overflow-hidden">
        <div className="absolute top-50 inset-0 z-0">
          <ParallaxElement speed={-2}>
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] md:text-[20vw] font-black text-black/5 dark:text-white/5 uppercase italic whitespace-nowrap">
              ATTENDEX
            </div>
          </ParallaxElement>
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "circOut" }}
          >
            <h1 className="text-6xl sm:text-7xl md:text-[12rem] lg:text-[15rem] font-black tracking-tighter leading-none uppercase italic">
              Atten<span className="text-cyan-500">d</span>ex
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mt-6 md:mt-10">
              <p className="text-lg md:text-3xl font-light tracking-widest uppercase text-gray-500 dark:text-gray-400">
                Institutional{" "}
                <span className="text-black dark:text-white">Logic</span> &
                Infrastructure
              </p>
              <button className="w-full md:w-auto px-8 md:px-10 py-4 md:py-5 bg-black dark:bg-white text-white dark:text-black font-black rounded-full hover:bg-cyan-500 dark:hover:bg-cyan-500 transition-colors uppercase tracking-tighter shadow-2xl">
                Launch System
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. CORE BENTO GRID */}
      <section className="relative py-20 md:py-40 px-6 bg-gray-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {[
            {
              title: "Smart Logic",
              desc: "9:00 AM server-side thresholds for total automation.",
              icon: <Clock />,
              color: "bg-cyan-500",
            },
            {
              title: "JWT Vault",
              desc: "Zero-trust encryption for student & staff records.",
              icon: <Lock />,
              color: "bg-purple-600",
            },
            {
              title: "Auto-Cron",
              desc: "11:00 PM nightly sweeps mark absentees instantly.",
              icon: <Zap />,
              color: "bg-emerald-500",
            },
          ].map((item, i) => (
            <ParallaxElement key={i} speed={i * 0.5 + 0.5}>
              <motion.div
                whileHover={{ y: -20 }}
                className="p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-cyan-500/50 transition-all group h-[380px] md:h-[450px] flex flex-col justify-end shadow-sm dark:shadow-none"
              >
                <div
                  className={`w-14 h-14 md:w-16 md:h-16 ${item.color} rounded-2xl mb-6 md:mb-8 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform text-black`}
                >
                  {item.icon}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tighter uppercase italic">
                  {item.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            </ParallaxElement>
          ))}
        </div>
      </section>

      <HorizontalModuleSection modules={modules} />

      {/* 4. FINANCIAL LEDGER */}
      <section className="relative min-h-screen py-20 md:py-40 flex items-center justify-center bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center px-6">
          <div className="z-10 order-2 md:order-1">
            <h2 className="text-6xl md:text-[120px] font-black leading-none uppercase italic mb-8">
              Cash <br /> Flow.
            </h2>
            <p className="text-xl md:text-2xl text-gray-500 mb-12 max-w-md italic leading-relaxed font-light">
              Real-time aggregation pipelines tracking{" "}
              <span className="text-black dark:text-white font-medium">
                $2M+ in revenue
              </span>{" "}
              with 42ms latency.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="px-6 md:px-8 py-3 md:py-4 rounded-full border border-cyan-500/50 text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-widest text-[10px] md:text-xs bg-cyan-500/5">
                MongoDB Aggregation
              </div>
              <div className="px-6 md:px-8 py-3 md:py-4 rounded-full border border-black/10 dark:border-white/10 text-gray-500 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                Ledger v4
              </div>
            </div>
          </div>

          <div className="relative h-[400px] md:h-[600px] w-full order-1 md:order-2">
            <ParallaxElement
              speed={2}
              className="absolute inset-0 bg-cyan-500 rounded-[3rem] md:rounded-[4rem] z-0 opacity-10 blur-[60px] md:blur-[100px]"
            />
            <ParallaxElement
              speed={-1}
              className="absolute inset-0 bg-gray-100 dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-[3rem] md:rounded-[4rem] z-10 p-8 md:p-16 shadow-2xl flex flex-col justify-center"
            >
              <BarChart3 size={80} className="text-cyan-500 dark:text-cyan-400 mb-8 md:mb-12" />
              <div className="space-y-6 md:space-y-8">
                <div className="h-3 md:h-4 w-full bg-black/5 dark:bg-white/5 rounded-full" />
                <div className="h-3 md:h-4 w-[85%] bg-black/5 dark:bg-white/5 rounded-full" />
                <div className="h-3 md:h-4 w-[60%] bg-cyan-500/30 rounded-full" />
              </div>
            </ParallaxElement>
            <ParallaxElement
              speed={3}
              className="absolute -bottom-5 -right-5 md:-bottom-10 md:-right-10 z-20 bg-black dark:bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-2xl rotate-6 text-white dark:text-black"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1 md:mb-2">
                Collection Rate
              </p>
              <h5 className="text-4xl md:text-6xl font-black tracking-tighter italic">
                92.4%
              </h5>
            </ParallaxElement>
          </div>
        </div>
      </section>

      {/* 5. FLOATING STATS */}
      <section className="relative py-24 md:py-48 bg-cyan-600 overflow-hidden">
        <ParallaxElement
          speed={-4}
          className="absolute -right-40 md:-right-60 -top-40 md:-top-60 opacity-20 md:opacity-30"
        >
          <div className="w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] border-[60px] md:border-[120px] border-white rounded-full" />
        </ParallaxElement>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20 relative z-10">
          {[
            { label: "Active Batches", val: "48" },
            { label: "Check-ins/Day", val: "2.5k" },
            { label: "Server Uptime", val: "100%" },
            { label: "API Latency", val: "42ms" },
          ].map((stat, i) => (
            <ParallaxElement
              key={i}
              speed={i * 0.3 + 0.2}
              className="text-center"
            >
              <h2 className="text-5xl md:text-8xl font-black text-white mb-2 italic tracking-tighter">
                {stat.val}
              </h2>
              <p className="text-cyan-100 dark:text-cyan-900 uppercase font-black text-[10px] md:text-sm tracking-widest">
                {stat.label}
              </p>
            </ParallaxElement>
          ))}
        </div>
      </section>

      {/* 6. SECURITY VAULT */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-black">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.03]">
          <ParallaxElement speed={-10}>
            <Fingerprint size={800} className="md:w-[1000px]" />
          </ParallaxElement>
        </div>
        <div className="z-10 text-center max-w-4xl px-6">
          <ShieldCheck className="mx-auto text-cyan-500 mb-8 md:mb-12" size={80} md:size={100} />
          <h2 className="text-6xl md:text-9xl font-black uppercase italic mb-8 md:mb-10 tracking-tighter">
            Secure <br /> Vault.
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-xl md:text-3xl font-light italic leading-relaxed">
            Every request is signed and verified.{" "}
            <span className="text-black dark:text-white font-bold italic">Zero-Trust</span>{" "}
            architecture ensures students only see their journey.
          </p>
        </div>
      </section>

      {/* 7. LIVE LOGS FEED */}
      <section className="py-24 md:py-60 bg-gray-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-6xl md:text-7xl font-black italic mb-8 uppercase leading-none">
              Zero <br /> Friction.
            </h2>
            <p className="text-gray-500 text-xl md:text-2xl max-w-md italic leading-relaxed font-light mb-10">
              The system thinks so you don't have to.
            </p>
            <div className="flex gap-6">
              <Globe className="text-cyan-500" size={32} />
              <Server className="text-purple-500" size={32} />
              <Database className="text-emerald-500" size={32} />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <ParallaxElement speed={1.5}>
              <div className="bg-white dark:bg-black border border-black/5 dark:border-white/5 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 p-8 md:p-12">
                  <Activity size={100} className="text-cyan-500/10" />
                </div>
                <h3 className="text-3xl md:text-4xl font-black mb-8 md:mb-10 italic uppercase text-cyan-500">
                  Live Infrastructure.
                </h3>
                <div className="space-y-4 md:space-y-6 font-mono text-xs md:text-base">
                  <p className="text-emerald-600 dark:text-emerald-400/80 tracking-tighter">
                    &gt; [23:00:00] CRON_SWEEP_EXECUTED
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 tracking-tighter">
                    &gt; [23:00:42] LOGGED: 142 ABSENT_RECORDS
                  </p>
                  <p className="text-cyan-600 dark:text-cyan-400/80 tracking-tighter">
                    &gt; [09:00:10] WEBHOOK: BATCH_AUTH_SUCCESS
                  </p>
                </div>
              </div>
            </ParallaxElement>
          </div>
        </div>
      </section>

      {/* 8. DEVICE SYNC (PWA) */}
      <section className="h-screen flex items-center justify-center bg-white dark:bg-black border-y border-black/5 dark:border-white/5">
        <div className="relative scale-75 md:scale-100">
          <ParallaxElement speed={2} className="z-10 relative">
            <div className="w-[280px] md:w-[320px] h-[580px] md:h-[650px] bg-gray-200 dark:bg-zinc-900 border-[10px] md:border-[12px] border-gray-300 dark:border-zinc-800 rounded-[3rem] md:rounded-[3.5rem] shadow-2xl p-4">
              <div className="w-full h-full bg-cyan-500 rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <Smartphone size={60} md:size={80} className="text-black mb-6 mx-auto" />
                  <p className="text-black font-black italic uppercase tracking-widest text-[10px]">
                    Attendex Mobile
                  </p>
                </div>
              </div>
            </div>
          </ParallaxElement>
          <ParallaxElement speed={-2} className="absolute -top-20 -left-20 md:-top-40 md:-left-60 z-0">
            <div className="w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-black/[0.02] dark:bg-white/[0.02] rounded-full border border-black/5 dark:border-white/5 flex items-center justify-center">
              <p className="text-black/[0.05] dark:text-white/[0.05] font-black text-6xl md:text-8xl rotate-90 uppercase italic whitespace-nowrap">
                RESPONSE ENGINE
              </p>
            </div>
          </ParallaxElement>
        </div>
      </section>

      {/* 9. THE STACK */}
      <section className="py-24 md:py-60 max-w-7xl mx-auto px-6">
        <h2 className="text-6xl md:text-9xl font-black mb-16 md:mb-32 text-center italic uppercase tracking-tighter">
          The Stack.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[
            { name: "Node.js", icon: <Server /> },
            { name: "MongoDB", icon: <Database /> },
            { name: "React", icon: <Code2 /> },
            { name: "Framer", icon: <Activity /> },
          ].map((tech, i) => (
            <ParallaxElement
              key={i}
              speed={i % 2 === 0 ? 0.3 : -0.3}
              className="p-12 md:p-16 bg-gray-50 dark:bg-zinc-900 border border-black/5 dark:border-white/5 rounded-[2.5rem] md:rounded-[3rem] flex flex-col items-center justify-center hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-500 group cursor-pointer shadow-sm md:shadow-xl"
            >
              <div className="mb-6 md:mb-8 text-cyan-500 group-hover:text-white dark:group-hover:text-black transition-colors transform group-hover:scale-125 duration-500">
                {React.cloneElement(tech.icon, { size: 40 })}
              </div>
              <span className="font-black uppercase tracking-[0.3em] text-xs md:text-sm italic text-center">
                {tech.name}
              </span>
            </ParallaxElement>
          ))}
        </div>
      </section>

      <LogoSlider logos={[<img src={reactsvg} className="w-12 h-12 grayscale dark:invert" alt="React" />]} />

      {/* 10. FINAL CTA */}
      <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-white dark:bg-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <ParallaxElement speed={4}>
            <div className="w-[150vw] md:w-[120vw] h-[150vw] md:h-[120vw] border-[1px] border-black/5 dark:border-white/5 rounded-full" />
          </ParallaxElement>
        </div>
        <div className="z-10 text-center px-4">
          <h2 className="text-[18vw] md:text-[12vw] font-black italic tracking-tighter leading-[0.8] mb-12 md:mb-16 uppercase">
            Start <br /> <span className="text-cyan-500">Scaling.</span>
          </h2>
          <button className="group relative px-10 md:px-20 py-6 md:py-10 bg-black dark:bg-white text-white dark:text-black text-xl md:text-4xl font-black rounded-full overflow-hidden transition-all hover:px-12 md:hover:pr-32 shadow-2xl">
            <span className="relative z-10">GET SYSTEM ACCESS</span>
            <span className="hidden md:inline absolute right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all">
              →
            </span>
          </button>
        </div>
      </section>

       <Footer/>

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