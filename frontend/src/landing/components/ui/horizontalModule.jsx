import { motion } from "framer-motion";
import React from "react";
import { Activity, Zap, Cpu, Layers, Shield, Database, Radio, Workflow } from "lucide-react";

const HorizontalModuleSection = ({ modules }) => {
  // Gradients for cards
  const gradients = [
    "from-cyan-500/20 to-blue-600/5",
    "from-purple-500/20 to-indigo-600/5",
    "from-emerald-500/20 to-teal-600/5",
    "from-amber-500/20 to-orange-600/5",
    "from-rose-500/20 to-red-600/5",
    "from-sky-500/20 to-cyan-600/5",
  ];

  const icons = [<Cpu />, <Database />, <Layers />, <Shield />, <Radio />, <Workflow />, <Zap />, <Activity />];

  return (
    <section className="relative h-screen bg-white dark:bg-[#050505] transition-colors duration-500 flex flex-col justify-center">
      
      {/* --- STATIC BACKGROUND LABEL --- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <h2 className="text-[25vw] font-black text-black/[0.03] dark:text-white/[0.02] italic uppercase whitespace-nowrap leading-none">
          INFRASTRUCTURE
        </h2>
      </div>

      {/* --- INTERNAL SCROLL CONTAINER --- */}
      {/* We use overflow-x-auto and a custom class 'custom-scrollbar' */}
      <div className="relative z-10 w-full overflow-x-auto overflow-y-hidden py-20 custom-scrollbar">
        <div className="flex gap-12 px-[10vw] items-center min-w-max">
          {modules.map((text, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative w-[28rem] h-[28rem] shrink-0 rounded-[4rem] overflow-hidden bg-zinc-50/50 dark:bg-white/[0.03] backdrop-blur-3xl border border-black/5 dark:border-white/10 shadow-2xl transition-all duration-700"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              <div className="absolute -top-4 -right-4 text-[12rem] font-black text-black/[0.03] dark:text-white/[0.03] leading-none italic group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-1000">
                {i + 1}
              </div>

              <div className="absolute inset-0 p-12 flex flex-col justify-end z-20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-[2px] bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                  <span className="text-cyan-500 font-black text-[10px] uppercase tracking-[0.6em] italic">
                    Node.0{i + 1}
                  </span>
                </div>

                <h4 className="text-5xl font-black italic tracking-tighter uppercase mb-4 leading-none bg-gradient-to-br from-black to-zinc-500 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent group-hover:from-cyan-500 group-hover:to-blue-600 transition-all duration-500">
                  {text}
                </h4>

                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium italic leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Critical subsystem processing for {text.toLowerCase()} architecture. 
                  <br /> <span className="text-cyan-500/60 font-mono text-[10px] mt-2 inline-block tracking-widest">STATUS: ENCRYPTED</span>
                </p>

                <div className="absolute top-12 left-12 text-zinc-300 dark:text-zinc-700 group-hover:text-cyan-500 group-hover:scale-110 transition-all duration-700 transform-gpu group-hover:rotate-12">
                   {icons[i % icons.length] && React.cloneElement(icons[i % icons.length], { size: 40, strokeWidth: 1.5 })}
                </div>
              </div>
            </motion.div>
          ))}

          {/* --- TERMINUS SECTION --- */}
          <div className="w-[40vw] shrink-0 flex flex-col items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/20 blur-[80px] rounded-full animate-pulse" />
              <div className="w-48 h-48 rounded-full border border-black/5 dark:border-white/10 flex items-center justify-center relative z-10 backdrop-blur-md">
                <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 border-t-2 border-cyan-500 rounded-full" 
                />
                <Activity size={60} className="text-cyan-500" />
              </div>
            </div>
            <p className="mt-10 text-black dark:text-white font-black text-xl uppercase tracking-[1em] italic opacity-20">
              End Pipeline
            </p>
          </div>
        </div>
      </div>

      {/* --- INJECTED CUSTOM SCROLLBAR CSS --- */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px; /* Width of the horizontal scrollbar */
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          margin-inline: 10vw; /* Matches the padding of the cards */
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.2); /* Cyan-500 with low opacity */
          border-radius: 100px;
          transition: all 0.3s;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.5); /* Brighter on hover */
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.4);
        }

        /* Support for Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(6, 182, 212, 0.2) transparent;
        }
      `}</style>
    </section>
  );
};

export default HorizontalModuleSection;