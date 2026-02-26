import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";
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

const HorizontalModuleSection = ({ modules }) => {
  const targetRef = useRef(null);
  const scrollRef = useRef(null);
  const [xDistance, setXDistance] = useState(0);

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

        <motion.div
          ref={scrollRef}
          style={{ x: smoothX }}
          className="flex gap-16 px-[10vw] items-center"
        >
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
                  <p className="text-cyan-500 font-mono text-xs uppercase tracking-[0.5em]">
                    System.Core
                  </p>
                </div>
                <h4 className="text-7xl font-black italic tracking-tighter uppercase mb-6 leading-none">
                  {text}
                </h4>
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
            <p className="mt-10 text-zinc-800 font-black text-xl uppercase tracking-[1.5em]">
              Deep Data
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};


export default HorizontalModuleSection