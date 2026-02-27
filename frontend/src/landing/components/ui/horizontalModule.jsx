import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";
import { Activity, Zap, Cpu, Layers, Shield, Database, Radio, Workflow } from "lucide-react";

const HorizontalModuleSection = ({ modules }) => {
  const targetRef = useRef(null);
  const scrollRef = useRef(null);
  const [xDistance, setXDistance] = useState(0);

  // Gradient map for unique card identities
  const gradients = [
    "from-cyan-500/20 to-blue-600/5",
    "from-purple-500/20 to-indigo-600/5",
    "from-emerald-500/20 to-teal-600/5",
    "from-amber-500/20 to-orange-600/5",
    "from-rose-500/20 to-red-600/5",
    "from-sky-500/20 to-cyan-600/5",
  ];

  const icons = [<Cpu />, <Database />, <Layers />, <Shield />, <Radio />, <Workflow />, <Zap />, <Activity />];

  useEffect(() => {
    const calculateDistance = () => {
      if (scrollRef.current) {
        setXDistance(scrollRef.current.scrollWidth - window.innerWidth);
      }
    };
    calculateDistance();
    window.addEventListener("resize", calculateDistance);
    return () => window.removeEventListener("resize", calculateDistance);
  }, [modules]);

  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], [0, -xDistance]);
  const smoothX = useSpring(x, { stiffness: 60, damping: 20 });

  return (
    <section ref={targetRef} className="relative h-180  bg-white dark:bg-[#050505] transition-colors duration-500">
      <div className="sticky top-0 h-150 flex items-center overflow-hidden">
        
        {/* --- DYNAMIC BACKGROUND LABEL --- */}
        <motion.div
          style={{ x: useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]) }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        >
          <h2 className="text-[30vw] font-black text-black/[0.03] dark:text-white/[0.02] italic uppercase whitespace-nowrap leading-none">
            INFRASTRUCTURE
          </h2>
        </motion.div>

        {/* --- HORIZONTAL TRACK --- */}
        <motion.div
          ref={scrollRef}
          style={{ x: smoothX }}
          className="flex gap-20 px-[15vw]  items-center"
        >
          {modules.map((text, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative w-[32rem] h-[32rem] shrink-0 rounded-[5rem] overflow-hidden bg-zinc-50/50 dark:bg-white/[0.03] backdrop-blur-3xl border border-black/5 dark:border-white/10 shadow-2xl transition-all duration-700 cursor-none"
            >
              {/* Animated Mesh Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              {/* Card Numbering - Parallax Effect */}
              <div className="absolute -top-4 -right-4 text-[14rem] font-black text-black/[0.03] dark:text-white/[0.03] leading-none italic group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-1000">
                {i + 1}
              </div>

              {/* Internal Content Layer */}
              <div className="absolute inset-0 p-16  flex flex-col justify-end z-20">
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  className="flex items-center gap-4 mb-8"
                >
                  <div className="w-16 h-[3px] bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                  <span className="text-cyan-500 font-black text-[10px] uppercase tracking-[0.6em] italic">
                    Node.0{i + 1}
                  </span>
                </motion.div>

                <h4 className="text-7xl font-black italic tracking-tighter uppercase mb-4 leading-none bg-gradient-to-br from-black to-zinc-500 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent group-hover:from-cyan-500 group-hover:to-blue-600 transition-all duration-500">
                  {text}
                </h4>

                <div className="h-0 group-hover:h-24 overflow-hidden transition-all duration-700 ease-in-out">
                  <p className="text-zinc-500 dark:text-zinc-400 text-lg font-medium italic leading-tight">
                    Critical subsystem processing for {text.toLowerCase()} architecture. 
                    <br /> <span className="text-cyan-500/60 font-mono text-xs mt-2 inline-block tracking-widest">STATUS: ENCRYPTED</span>
                  </p>
                </div>

                {/* Hover Icon Floating Effect */}
                <div className="absolute top-16 left-16 text-zinc-300 dark:text-zinc-700 group-hover:text-cyan-500 group-hover:scale-125 transition-all duration-700 transform-gpu group-hover:rotate-12">
                   {icons[i % icons.length] && React.cloneElement(icons[i % icons.length], { size: 48, strokeWidth: 1.5 })}
                </div>
              </div>

              {/* Glossy Reflection Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
            </motion.div>
          ))}

          {/* --- TERMINUS SECTION --- */}
          <div className="w-[60vw] shrink-0 flex flex-col items-center justify-center relative">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full animate-pulse" />
              <div className="w-64 h-64 rounded-full border border-black/5 dark:border-white/10 flex items-center justify-center relative z-10 backdrop-blur-md">
                <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 border-t-2 border-cyan-500 rounded-full" 
                />
                <Activity size={80} className="text-cyan-500" />
              </div>
            </div>
            <p className="mt-16 text-black dark:text-white font-black text-3xl uppercase tracking-[1.2em] italic opacity-20 group-hover:opacity-100 transition-opacity">
              End Pipeline
            </p>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .shadow-3xl {
          box-shadow: 0 50px 100px -20px rgba(0,0,0,0.5);
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default HorizontalModuleSection;