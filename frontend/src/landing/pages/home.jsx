import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import HorizontalModuleSection from "../components/ui/horizontalModule";
import ParallaxElement from "../components/ui/parallaxElament";
import { SpotlightNavbar } from "../components/common/navbar";
import Footer from "../components/common/landingFooter";
import LogoSlider from "../components/ui/logoslider";
import IPhone17 from "../components/common/iphone";
import MeshBackground from "../components/common/mesh";
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
  TrendingUp,
  Share2,
  Cpu,
  ChevronDown,
} from "lucide-react";

import Attendence from "../../assets/icons8-attendance-96.png";
import Security from "../../assets/icons8-security-96.png";
import Dashboard from "../../assets/icons8-dashboard-96.png";
import Contact from "../../assets/icons8-contacts-96.png";
import Iphone from "../../assets/icons8-iphone-14-96.png";
import { Link } from "react-router-dom";

const GradientCard = ({ children, from, via, to, className = "" }) => (
  <div
    className={`relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden ${className}`}
    style={{
      background: `linear-gradient(135deg, ${from}, ${via ?? from}, ${to})`,
    }}
  >
    <div className="absolute inset-0 bg-white/5 dark:bg-black/10 backdrop-blur-[1px] pointer-events-none" />
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
    {children}
  </div>
);

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
      className="bg-white dark:bg-[#050507] text-black dark:text-white transition-colors duration-300 overflow-x-hidden selection:bg-cyan-500 selection:text-black font-sans"
    >
      <SpotlightNavbar />

      <section className="relative w-full h-screen md:h-[130vh] flex flex-col items-center justify-center overflow-hidden -mt-[80px] pt-[80px]">
        <div className="absolute inset-0 z-0">
          <MeshBackground />
          {/* Subtle Grid Overlay */}
          <div
            className="absolute inset-0 opacity-10 dark:opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,1) 1px,transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="absolute top-1/2 inset-0 z-0 -translate-y-1/2 pointer-events-none">
          <ParallaxElement speed={-2}>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] md:text-[20vw] font-black text-black/[0.04] dark:text-white/[0.04] uppercase italic whitespace-nowrap select-none">
              ATTENDEX
            </div>
          </ParallaxElement>
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-7xl sm:text-8xl md:text-[13rem] lg:text-[16rem] font-black tracking-tighter leading-none uppercase italic">
              Atten<span className="text-cyan-500">d</span>ex
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mt-8">
              <p className="text-lg md:text-3xl font-light tracking-[0.2em] uppercase text-gray-500 dark:text-gray-400">
                Institutional{" "}
                <span className="text-black dark:text-white font-bold">
                  Infrastructure
                </span>
              </p>
               <Link to="/register">
             
              <motion.button
              
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 50px rgba(6,182,212,0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full md:w-auto px-10 py-5 font-black rounded-full uppercase tracking-widest text-white shadow-2xl transition-all"
                style={{
                  background: "linear-gradient(135deg,#06b6d4,#0891b2)",
                }}
              >
                Launch System
              </motion.button>
                </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-0 w-full px-8 md:px-24 flex flex-col md:flex-row justify-between items-end z-20 pointer-events-none font-sans">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-4 bg-white/40 dark:bg-white/[0.03] backdrop-blur-2xl p-6 rounded-[2rem] border border-black/5 dark:border-white/[0.08] shadow-2xl dark:shadow-none"
          >
            <div className="flex items-center gap-3">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-tr from-cyan-500 to-blue-600"></span>
              </div>
              <p className="text-[11px] font-black tracking-[0.3em] bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-violet-400 bg-clip-text text-transparent uppercase">
                Presence_Engine_v5
              </p>
            </div>

            <div className="flex gap-10 items-center">
              <div className="flex flex-col">
                <span className="text-zinc-400 dark:text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">
                  Live_Users
                </span>
                <span className="text-2xl font-black tracking-tighter text-black dark:text-white">
                  14.2k
                </span>
              </div>
              <div className="h-8 w-[1px] bg-black/10 dark:bg-white/10" />
              <div className="flex flex-col">
                <span className="text-zinc-400 dark:text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">
                  Global_Sync
                </span>
                <span className="text-2xl font-black tracking-tighter text-black dark:text-white">
                  99.9%
                </span>
              </div>
            </div>
          </motion.div>

          <div className="hidden md:flex flex-col items-center gap-2 group pointer-events-auto cursor-pointer">
            <motion.div
              animate={{
                y: [0, 15, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
              className="relative flex flex-col items-center"
            >
              <ChevronDown
                size={42}
                strokeWidth={1.5}
                className="text-cyan-600 dark:text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"
              />
              <div className="absolute -bottom-4 w-12 h-6 bg-cyan-500/20 dark:bg-cyan-500/10 blur-xl rounded-full" />
            </motion.div>
            <span className="text-[10px] font-black tracking-[0.6em] text-zinc-400 dark:text-zinc-600 uppercase mt-4 opacity-50">
              Initialize
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-right max-w-[340px] hidden md:block"
          >
            <div className="flex items-center justify-end gap-3 mb-4">
              <span className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-[9px] font-black rounded-full uppercase tracking-widest">
                Enterprise
              </span>
              <p className="text-[10px] font-black tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                Workforce_Protocol
              </p>
            </div>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium">
              Secure attendance verification via{" "}
              <span className="text-black dark:text-white font-bold">
                Encrypted Biometrics
              </span>
              . Eliminate time-theft with Attendex geo-fencing and neural
              synchronization logic.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="relative py-20 md:py-40 px-6 bg-gray-50 dark:bg-[#0a0a0f]">
        <MeshBackground className="opacity-50" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
          {[
            {
              title: "Smart Logic",
              desc: "9:00 AM server-side thresholds for total automation.",
              icon: <Clock />,
              gradient: { from: "#06b6d4", via: "#0891b2", to: "#0284c7" },
              
            },
            {
              title: "JWT Vault",
              desc: "Zero-trust encryption for student & staff records.",
              icon: <Lock />,
              gradient: { from: "#8b5cf6", via: "#7c3aed", to: "#6d28d9" },
            },
            {
              title: "Auto-Cron",
              desc: "11:00 PM nightly sweeps mark absentees instantly.",
              icon: <Zap />,
              gradient: { from: "#10b981", via: "#059669", to: "#047857" },
            },
          ].map((item, i) => (
            <ParallaxElement key={i} speed={i * 0.5 + 0.5}>
              <motion.div
                whileHover={{ y: -16, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden  h-[380px] md:h-[450px] flex flex-col justify-end p-8 md:p-10 group cursor-pointer"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.95) 100%)",
                  boxShadow:
                    "0 4px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-300 rounded-[2.5rem] md:rounded-[3rem]"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255) 100%)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                />
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem] md:rounded-[3rem]"
                  style={{
                    background: `linear-gradient(135deg, ${item.gradient.from}18, ${item.gradient.to}10)`,
                  }}
                />
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${item.gradient.from}, transparent)`,
                  }}
                />
                <div
                  className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ color: item.gradient.from }}
                >
                  {React.cloneElement(item.icon, { size: 140 })}
                </div>
                {/* icon badge */}
                <div
                  className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl mb-6 md:mb-8 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform text-white z-10"
                  style={{
                    background: `linear-gradient(135deg, ${item.gradient.from}, ${item.gradient.to})`,
                    boxShadow: `0 8px 24px ${item.gradient.from}55`,
                  }}
                >
                  {React.cloneElement(item.icon, { size: 24 })}
                </div>
                <h3 className="relative z-10 text-3xl md:text-4xl font-bold mb-4 tracking-tighter uppercase italic text-violet-400 dark:text-violet-500">
                  {item.title}
                </h3>
                <p className="relative z-10 text-gray-500 dark:text-gray-400 text-base md:text-lg leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            </ParallaxElement>
          ))}
        </div>
      </section>

      <HorizontalModuleSection modules={modules} />

      <section className="relative min-h-screen py-20 md:py-40 flex items-center justify-center bg-white dark:bg-[#050507]">
        <MeshBackground />
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center px-6 relative z-10">
          <div className="z-10 order-2 md:order-1">
            <h2
              className="text-6xl md:text-[120px] font-black leading-none uppercase italic mb-8 bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #0f172a 0%, #0891b2 100%)",
              }}
            >
              Cash <br /> Flow.
            </h2>
            <h2
              className="hidden dark:block text-6xl md:text-[120px] font-black leading-none uppercase italic mb-8 bg-clip-text text-transparent -mt-[calc(1em+2rem)] md:-mt-[calc(1em+2rem)]"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #fff 0%, #06b6d4 100%)",
              }}
            >
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
              <div
                className="px-6 md:px-8 py-3 md:py-4 rounded-full font-bold uppercase tracking-widest text-[10px] md:text-xs text-white"
                style={{
                  background: "linear-gradient(135deg,#06b6d4,#0891b2)",
                  boxShadow: "0 4px 16px rgba(6,182,212,0.35)",
                }}
              >
                MongoDB Aggregation
              </div>
              <div className="px-6 md:px-8 py-3 md:py-4 rounded-full border border-black/10 dark:border-white/10 text-gray-500 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                Ledger v4
              </div>
            </div>
          </div>

          <div className="relative h-[400px] md:h-[600px] w-full order-1 md:order-2">
            {/* glow */}
            <div
              className="absolute inset-0 rounded-[3rem] md:rounded-[4rem] blur-[80px] opacity-20"
              style={{
                background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
              }}
            />
            <ParallaxElement
              speed={-1}
              className="absolute inset-0 rounded-[3rem] md:rounded-[4rem] z-10 p-8 md:p-16 flex flex-col justify-center overflow-hidden"
              style={{
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(241,245,249,0.95) 100%)",
                boxShadow:
                  "0 24px 64px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,1)",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <div
                className="absolute inset-0 rounded-[3rem] md:rounded-[4rem] opacity-0 dark:opacity-100"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              />
              <BarChart3
                size={80}
                style={{ color: "#06b6d4" }}
                className="mb-8 md:mb-12 relative z-10"
              />
              <div className="space-y-6 md:space-y-8 relative z-10">
                {[100, 85, 60].map((w, i) => (
                  <motion.div
                    key={i}
                    className="h-3 md:h-4 rounded-full"
                    style={{
                      width: `${w}%`,
                      background:
                        i === 2
                          ? "linear-gradient(90deg,#06b6d4,#0891b2)"
                          : "rgba(0,0,0,0.06)",
                    }}
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{
                      delay: i * 0.15,
                      duration: 0.8,
                      ease: "circOut",
                    }}
                    viewport={{ once: true }}
                  />
                ))}
              </div>
            </ParallaxElement>
            <ParallaxElement
              speed={3}
              className="absolute -bottom-5 -right-5 md:-bottom-10 md:-right-10 z-20 p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-2xl rotate-6 text-white"
              style={{ background: "linear-gradient(135deg,#0f172a,#1e293b)" }}
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

      <section
        className="relative py-24 md:py-48 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0891b2 0%, #06b6d4 50%, #22d3ee 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.6) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <ParallaxElement
          speed={-4}
          className="absolute -right-40 md:-right-60 -top-40 md:-top-60 opacity-10"
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
              <motion.h2
                className="text-5xl md:text-8xl font-black text-white mb-2 italic tracking-tighter"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                viewport={{ once: true }}
              >
                {stat.val}
              </motion.h2>
              <p className="text-white/70 uppercase font-black text-[10px] md:text-sm tracking-widest">
                {stat.label}
              </p>
            </ParallaxElement>
          ))}
        </div>
      </section>

      <section className="h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-[#050507]">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.03]">
          <ParallaxElement speed={-10}>
            <Fingerprint size={800} />
          </ParallaxElement>
        </div>
        <MeshBackground />
        <div className="z-10 text-center max-w-4xl px-6">
          <motion.div
            className="mx-auto mb-8 md:mb-12 w-20 h-20 rounded-3xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg,#06b6d4,#0891b2)",
              boxShadow: "0 12px 40px rgba(6,182,212,0.4)",
            }}
            animate={{ rotate: [0, 3, -3, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <ShieldCheck size={40} className="text-white" />
          </motion.div>
          <h2 className="text-6xl md:text-9xl font-black uppercase italic mb-8 md:mb-10 tracking-tighter">
            Secure <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg,#06b6d4,#8b5cf6)",
              }}
            >
              Vault.
            </span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-xl md:text-3xl font-light italic leading-relaxed">
            Every request is signed and verified.{" "}
            <span className="text-black dark:text-white font-bold italic">
              Zero-Trust
            </span>{" "}
            architecture ensures students only see their journey.
          </p>
        </div>
      </section>
      <section className="relative py-60 px-6 overflow-hidden bg-zinc-50 dark:bg-[#050507]">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <ParallaxElement speed={-1}>
            <h2 className="text-6xl md:text-[10rem] font-black mb-20 italic uppercase tracking-tighter text-center leading-none">
              System <span className="text-cyan-500">Analysis.</span>
            </h2>
          </ParallaxElement>

          <div className="relative w-full h-[600px] md:h-[800px] flex items-center justify-center">
            {/* Background Grid Layer */}
            <ParallaxElement speed={2} className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-12 gap-4 w-full h-full">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="h-full w-[1px] bg-zinc-500/30" />
                ))}
              </div>
            </ParallaxElement>

            <ParallaxElement
              speed={10}
              className="relative z-10 w-full max-w-5xl aspect-video bg-white dark:bg-zinc-900 rounded-[3rem] border border-black/5 dark:border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.2)] p-10 flex flex-col gap-8 overflow-hidden"
            >
              <div className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
                  Live_Network_Payload: 4.8GB/s
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
                <div className="bg-zinc-100 dark:bg-black/40 rounded-3xl p-8 flex flex-col justify-between group hover:bg-cyan-500/10 transition-colors">
                  <Activity className="text-cyan-500" size={40} />
                  <div>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                      Active Uptime
                    </p>
                    <h4 className="text-5xl font-black italic">
                      99.99<span className="text-cyan-500">%</span>
                    </h4>
                  </div>
                </div>
                <div className="col-span-2 bg-zinc-100 dark:bg-black/40 rounded-3xl p-8 overflow-hidden relative">
                  <div className="flex justify-between mb-8">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                      Data Flux
                    </p>
                    <TrendingUp className="text-emerald-500" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-32 flex items-end px-4 gap-2">
                    {[40, 70, 45, 90, 65, 80, 95, 40, 60, 85, 30, 75].map(
                      (h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          transition={{ delay: i * 0.05, duration: 1 }}
                          className="flex-1 bg-cyan-500/20 border-t-2 border-cyan-500 rounded-t-sm"
                        />
                      ),
                    )}
                  </div>
                </div>
              </div>
            </ParallaxElement>

            <ParallaxElement
              speed={10}
              className="absolute -right-16 top-20 z-20 bg-cyan-500 text-black p-10 rounded-[2.5rem] shadow-2xl rotate-6 hidden lg:block"
            >
              <TrendingUp size={48} className="mb-4" />
              <p className="text-xs font-black uppercase tracking-widest">
                Efficiency
              </p>
              <h5 className="text-6xl font-black tracking-tighter">+12.4%</h5>
            </ParallaxElement>

            <ParallaxElement
              speed={6}
              className="absolute -left-16 bottom-20 z-20 bg-black dark:bg-white text-white dark:text-black p-10 rounded-[2.5rem] shadow-2xl -rotate-6 hidden lg:block"
            >
              <Zap size={48} className="mb-4" />
              <p className="text-xs font-black uppercase tracking-widest">
                Latency
              </p>
              <h5 className="text-6xl font-black tracking-tighter">42ms</h5>
            </ParallaxElement>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-60 bg-gray-50 dark:bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-6xl md:text-7xl font-black italic mb-8 uppercase leading-none">
              Zero <br /> Friction.
            </h2>
            <p className="text-gray-500 text-xl md:text-2xl max-w-md italic leading-relaxed font-light mb-10">
              The system thinks so you don't have to.
            </p>
            <div className="flex gap-6">
              {[
                { icon: <Globe size={32} />, color: "#06b6d4" },
                { icon: <Server size={32} />, color: "#8b5cf6" },
                { icon: <Database size={32} />, color: "#10b981" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4, scale: 1.1 }}
                  style={{ color: item.color }}
                >
                  {item.icon}
                </motion.div>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2">
            <ParallaxElement speed={1.5}>
              <div
                className="rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(145deg,rgba(255,255,255,0.95),rgba(248,250,252,0.95))",
                  boxShadow:
                    "0 24px 64px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,1)",
                  border: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                {/* dark bg */}
                <div
                  className="absolute inset-0 rounded-[2.5rem] md:rounded-[4rem] opacity-0 dark:opacity-100"
                  style={{
                    background:
                      "linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                />
                {/* top gradient line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background:
                      "linear-gradient(90deg,transparent,#06b6d4,transparent)",
                  }}
                />
                <div className="absolute top-0 right-0 p-8 md:p-12">
                  <Activity size={100} className="text-cyan-500/10" />
                </div>
                <h3
                  className="text-3xl md:text-4xl font-black mb-8 md:mb-10 italic uppercase bg-clip-text text-transparent relative z-10"
                  style={{
                    backgroundImage: "linear-gradient(135deg,#06b6d4,#0891b2)",
                  }}
                >
                  Live Infrastructure.
                </h3>
                <div className="space-y-4 md:space-y-6 font-mono text-xs md:text-base relative z-10">
                  {[
                    {
                      text: "> [23:00:00] CRON_SWEEP_EXECUTED",
                      color: "#10b981",
                    },
                    {
                      text: "> [23:00:42] LOGGED: 142 ABSENT_RECORDS",
                      color: "#6b7280",
                    },
                    {
                      text: "> [09:00:10] WEBHOOK: BATCH_AUTH_SUCCESS",
                      color: "#06b6d4",
                    },
                  ].map((log, i) => (
                    <motion.p
                      key={i}
                      className="tracking-tighter"
                      style={{ color: log.color }}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                      viewport={{ once: true }}
                    >
                      {log.text}
                    </motion.p>
                  ))}
                </div>
              </div>
            </ParallaxElement>
          </div>
        </div>
      </section>

      <LogoSlider
        logos={[
          <img src={Contact}    className="h-18 w-18"  />,
          <img src={Security}   className="h-18 w-18" />,
          <img src={Dashboard}  className="h-18 w-18" />,
          <img src={Attendence} className="h-18 w-18" />,
          <img src={Iphone}     className="h-18 w-18" />,
        ]}
      />

      <section className="min-h-[160vh] flex flex-col items-center justify-center bg-white dark:bg-[#030303] border-y border-black/5 dark:border-white/5 relative overflow-hidden">
        <MeshBackground />

        <ParallaxElement
          speed={2}
          className="relative z-10 text-center mb-32 px-6"
        >
          <p className="uppercase tracking-[0.5em] text-xs font-black text-cyan-500 mb-6">
            Attendex Engineering · Ultra-Node Handheld
          </p>
          <h2 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-[0.85] mb-8">
            Infrastructure <br />{" "}
            <span className="text-zinc-300 dark:text-zinc-700">
              In Your Pocket.
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-zinc-500 dark:text-zinc-400 text-lg italic font-light">
            The world's first localized hardware gateway for real-time cluster
            management. Zero-latency control for edge nodes.
          </p>
        </ParallaxElement>

        <ParallaxElement speed={4} className="relative z-30">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="drop-shadow-[0_100px_150px_rgba(0,0,0,0.6)]"
          >
            <IPhone17 />
          </motion.div>
        </ParallaxElement>

        <ParallaxElement
          speed={5}
          className="absolute left-[15%] top-[50%] z-40 hidden xl:block"
        >
          <div className="p-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-[2.5rem] shadow-3xl max-w-[280px]">
            <Fingerprint className="text-cyan-500 mb-4" size={32} />
            <p className="text-[11px] font-black uppercase tracking-widest mb-2">
              Secure Enclave
            </p>
            <p className="text-sm text-zinc-500 italic">
              Military-grade biometric hash stored locally on the node
              processor.
            </p>
          </div>
        </ParallaxElement>

        <ParallaxElement
          speed={5}
          className="absolute right-[15%] bottom-[20%] z-40 hidden xl:block"
        >
          <div className="p-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-[2.5rem] shadow-3xl max-w-[280px]">
            <Share2 className="text-purple-500 mb-4" size={32} />
            <p className="text-[11px] font-black uppercase tracking-widest mb-2">
              Cluster Sync
            </p>
            <p className="text-sm text-zinc-500 italic">
              Instant over-the-air deployment to 40+ global regions in one tap.
            </p>
          </div>
        </ParallaxElement>

        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          <ParallaxElement
            speed={-4}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] dark:opacity-[0.05]"
          >
            <h3 className="text-[40vw] font-black uppercase italic whitespace-nowrap">
              RESPONSE
            </h3>
          </ParallaxElement>
        </div>
      </section>
      <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-white dark:bg-[#050507]">
        <MeshBackground />
        <div className="absolute inset-0 flex items-center justify-center">
          <ParallaxElement speed={4}>
            <div className="w-[150vw] md:w-[120vw] h-[150vw] md:h-[120vw] border-[1px] border-black/5 dark:border-white/5 rounded-full" />
          </ParallaxElement>
        </div>
        <div className="z-10 text-center px-4">
          <h2 className="text-[18vw] md:text-[12vw] font-black italic tracking-tighter leading-[0.8] mb-12 md:mb-16 uppercase">
            Start <br />{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg,#06b6d4,#0891b2,#22d3ee)",
              }}
            >
              Scaling.
            </span>
          </h2>
          <Link to="/register"> 
          
            <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="group relative px-10 md:px-20 py-6 md:py-10 text-white text-xl md:text-4xl font-black rounded-full overflow-hidden shadow-2xl"
            style={{
              background: "linear-gradient(135deg,#0f172a,#1e293b)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
            }}
          >
            {/* shimmer */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "linear-gradient(135deg,#06b6d4,#0891b2)",
              }}
            />
            
            <span className="relative z-10">GET SYSTEM ACCESS</span>
            <span className="hidden md:inline relative z-10 ml-4 opacity-0 group-hover:opacity-100 transition-all">
              →
            </span>

          </motion.button>
          
          </Link>
        

        </div>
      </section>

      <Footer />

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
