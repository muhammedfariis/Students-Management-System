import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { 
  Zap, 
  Clock, 
  Users, 
  Layers, 
  Terminal, 
  Cpu, 
  Activity,
  ArrowDownRight,
  ShieldAlert,
  Fingerprint,
  Command,
  Database
} from "lucide-react";

// Components
import { SpotlightNavbar } from "../components/common/navbar";
import Footer from "../components/common/landingFooter";
import MeshBackground from "../components/common/mesh";

const EXTREME_BEZIER = [0.16, 1, 0.3, 1];

const FeaturesPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // 3D Parallax Values
  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const layer1Y = useTransform(smoothProgress, [0, 1], [0, -400]);
  const layer2Y = useTransform(smoothProgress, [0, 1], [0, -150]);
  const rotationZ = useTransform(smoothProgress, [0, 1], [0, 20]);
  const heroScale = useTransform(smoothProgress, [0, 0.3], [1, 0.7]);

  return (
    <div ref={containerRef} className="relative bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 transition-colors duration-700 font-sans overflow-hidden">
      <SpotlightNavbar />
      
      {/* ── SECTION 1: HYPER-PARALLAX HERO ── */}
      <section className="relative h-screen flex items-center justify-center perspective-1000">
        <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
          <MeshBackground />
        </motion.div>

        <motion.div 
          style={{ scale: heroScale, rotateX: rotationZ }}
          className="relative z-10 text-center px-6"
        >
          <div className="inline-block px-6 py-2 mb-8 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-black/50 backdrop-blur-xl">
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-600 dark:text-cyan-400">Engineering_Specs_v2.0</span>
          </div>
          <h1 className="text-[12vw] font-black italic uppercase tracking-tighter leading-[0.8] mb-6">
            Titan <br /> <span className="text-cyan-500">Engine.</span>
          </h1>
          <div className="flex justify-center gap-12 mt-12">
             <div className="text-left border-l-2 border-cyan-500 pl-6">
                <p className="text-[10px] font-bold text-zinc-400 uppercase">Latency</p>
                <p className="text-2xl font-black">14ms</p>
             </div>
             <div className="text-left border-l-2 border-violet-500 pl-6">
                <p className="text-[10px] font-bold text-zinc-400 uppercase">Uptime</p>
                <p className="text-2xl font-black">99.9%</p>
             </div>
          </div>
        </motion.div>

        <motion.div style={{ y: layer1Y }} className="absolute -right-20 top-1/4 opacity-10 dark:opacity-20 pointer-events-none">
           <Command size={600} strokeWidth={0.5} />
        </motion.div>
      </section>

      {/* ── SECTION 2: THE CRONJOB HEARTBEAT (Aligned Parallax) ── */}
      <section className="relative py-60 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24">
          <div className="lg:w-1/2 z-20">
            <motion.div style={{ y: layer2Y }} className="space-y-10">
              <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
                Autonomous <br /> <span className="text-cyan-500">Cron-Sweeps.</span>
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-xl font-medium leading-relaxed max-w-xl">
                The heartbeat of your institution. At exactly <span className="text-zinc-900 dark:text-white font-bold">00:00:00</span>, 
                our engine initializes a global reconciliation of every student, staff, and batch.
              </p>
              <div className="flex flex-wrap gap-4">
                 {['Absence Injection', 'Cache Flushing', 'Analytics Bloom', 'Log Rotation'].map((tag) => (
                   <span key={tag} className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] font-black uppercase tracking-widest">
                     {tag}
                   </span>
                 ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 relative">
             <motion.div 
               style={{ y: layer1Y }}
               className="relative aspect-square bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[4rem] shadow-2xl p-12 overflow-hidden"
             >
                <div className="absolute top-0 right-0 p-8">
                   <Clock className="text-cyan-500 animate-pulse" size={48} />
                </div>
                <div className="space-y-6 mt-20">
                   {[80, 40, 95, 60].map((w, i) => (
                     <div key={i} className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${w}%` }}
                          transition={{ duration: 1.5, ease: EXTREME_BEZIER, delay: i * 0.2 }}
                          className="h-full bg-gradient-to-r from-cyan-500 to-violet-500"
                        />
                     </div>
                   ))}
                </div>
                <div className="mt-12 p-6 rounded-3xl bg-zinc-50 dark:bg-black/50 border border-zinc-100 dark:border-zinc-800">
                   <p className="font-mono text-[10px] text-zinc-400">EXECUTING: midnight_reconcile.sh</p>
                   <p className="font-mono text-[10px] text-emerald-500">STATUS: 42,000 RECORDS SYNCED</p>
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: TRIPLE-TIER ROLE MATRIX ── */}
      <section className="relative py-40 px-6 bg-zinc-50 dark:bg-[#08080a] border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
             <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
               The Role <br /> <span className="text-cyan-500">Matrix.</span>
             </h2>
             <p className="text-zinc-400 font-bold uppercase tracking-[0.3em] text-xs max-w-xs">
               Granular RBAC (Role Based Access Control) architecture for high-security environments.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                title: "Architect", 
                role: "ADMIN", 
                icon: <ShieldAlert size={40} />, 
                color: "text-red-500",
                features: ["Financial Vault", "Batch Injection", "System Config"]
              },
              { 
                title: "Operator", 
                role: "STAFF", 
                icon: <Users size={40} />, 
                color: "text-cyan-500",
                features: ["Daily Validation", "Report Gen", "Student Sync"]
              },
              { 
                title: "Node", 
                role: "STUDENT", 
                icon: <Fingerprint size={40} />, 
                color: "text-emerald-500",
                features: ["Presence Check", "Personal Logs", "Deficiency Alerts"]
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EXTREME_BEZIER, delay: i * 0.1 }}
                whileHover={{ y: -20 }}
                className="group relative p-12 rounded-[3.5rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl hover:shadow-cyan-500/10 transition-all"
              >
                <div className={`${card.color} mb-12 transform group-hover:scale-110 transition-transform`}>
                  {card.icon}
                </div>
                <span className="text-[10px] font-black tracking-widest text-zinc-400 uppercase">{card.title}</span>
                <h3 className="text-4xl font-black italic uppercase mb-8">{card.role}</h3>
                <ul className="space-y-4">
                  {card.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-xs font-bold text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-200">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: BATCH ADD (Differential Scrolling) ── */}
      <section className="relative py-60 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
           <div className="relative order-2 lg:order-1">
              <motion.div style={{ y: layer2Y }} className="p-8 bg-zinc-900 rounded-3xl border border-zinc-800 shadow-2xl font-mono text-xs text-zinc-400">
                 <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
                    <span className="text-cyan-500">batch_uploader.py</span>
                    <Layers size={14} />
                 </div>
                 <p className="text-emerald-500 mb-2">{'>'} Loading students.csv...</p>
                 <p>{'>'} Mapping: [name, id, batch_id, rfid]</p>
                 <p>{'>'} Progress: 88%</p>
                 <div className="w-full h-1 bg-zinc-800 my-4">
                    <motion.div 
                      animate={{ width: ["0%", "88%", "88%", "0%"] }} 
                      transition={{ duration: 4, repeat: Infinity }}
                      className="h-full bg-cyan-500" 
                    />
                 </div>
                 <p className="text-zinc-600 italic">// Neural validation in progress...</p>
              </motion.div>
              
              <motion.div 
                style={{ y: layer1Y }}
                className="absolute -bottom-20 -right-10 p-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[3rem] shadow-2xl z-20"
              >
                 <Database className="text-violet-500 mb-4" />
                 <h4 className="font-black italic uppercase text-xl">Massive Inject</h4>
                 <p className="text-xs text-zinc-400 mt-2">Up to 10k records/sec</p>
              </motion.div>
           </div>

           <div className="lg:w-full space-y-8 order-1 lg:order-2">
              <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
                Batch <br /> <span className="text-cyan-500 text-outline-zinc dark:text-outline-white text-transparent">Logic.</span>
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-xl font-medium leading-relaxed">
                Manually adding students is a relic of the past. Use our <span className="text-cyan-500 font-bold">Neural BatchAdd</span> to 
                populate entire campuses in seconds.
              </p>
              <button className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500 border-b-2 border-cyan-500 pb-2 hover:gap-8 transition-all">
                 Read Documentation <ArrowDownRight size={16} />
              </button>
           </div>
        </div>
      </section>

      {/* ── SECTION 5: FINAL CTA ── */}
      <section className="relative py-40 flex flex-col items-center justify-center text-center">
        <motion.div style={{ scale: heroScale }} className="relative z-10">
          <h2 className="text-8xl md:text-[12rem] font-black italic uppercase tracking-tighter leading-none mb-12">
            Build <br /> <span className="text-cyan-500">Fast.</span>
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ ease: EXTREME_BEZIER }}
            className="px-16 py-8 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-black uppercase tracking-[0.5em] text-xs shadow-2xl"
          >
            Start Implementation
          </motion.button>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default FeaturesPage;