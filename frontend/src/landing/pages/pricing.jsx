import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Check, 
  Zap, 
  ShieldCheck, 
  ChevronRight, 
  Building2,
  Rocket,
  ArrowRight,
  Fingerprint,
  PieChart,
  Globe,
  Star
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // Added for routing
import MeshBackground from "../components/common/mesh";
import { SpotlightNavbar } from "../components/common/navbar";
import Footer from "../components/common/landingFooter";
import ParallaxElement from "../components/ui/parallaxElament";

// Luxury Cubic Bezier Curve
const CUBIC_BEZIER = [0.16, 1, 0.3, 1];

const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(false);
  const { scrollYProgress } = useScroll();
  const navigate = useNavigate(); // Navigation hook
  
  // Parallax values for deep background elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 300]);

  const plans = [
    {
      name: "Standard",
      price: isYearly ? "1,499" : "1,999",
      description: "Ideal for growing educational institutes.",
      icon: <Rocket className="text-zinc-500" size={24} />,
      features: ["100 Active Users", "Biometric Sync", "Basic Reporting", "99.0% Uptime"],
      color: "from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900",
    },
    {
      name: "Enterprise",
      price: isYearly ? "4,499" : "5,999",
      description: "Advanced infrastructure for large corporations.",
      icon: <Building2 className="text-cyan-500" size={24} />,
      features: ["Unlimited Users", "Neural Geo-fencing", "Dedicated Node", "24/7 Support", "White-labeling"],
      highlight: true,
      color: "from-cyan-500/20 to-blue-500/20",
    },
    {
      name: "Government",
      price: "Custom",
      description: "High-security sectors and on-premise vaulting.",
      icon: <ShieldCheck className="text-violet-500" size={24} />,
      features: ["Air-gapped Setup", "Zero-Trust Protocol", "Physical Audits", "Data Sovereignty"],
      color: "from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900",
      route: "/register" 
    }
  ];

  return (
    <div className="bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors duration-500 overflow-x-hidden font-sans">
      <SpotlightNavbar />

      {/* ── SECTION 1: HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <MeshBackground />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: CUBIC_BEZIER }}
          >
            <span className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-black uppercase tracking-[0.2em] mb-8 inline-block">
              Limited Time: First Month ₹0
            </span>
            <h1 className="text-7xl md:text-[120px] font-black uppercase italic tracking-tighter leading-[0.85] mb-8">
              Future <br /> <span className="text-cyan-500">Presence.</span>
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
              The next generation of biometric infrastructure. Scalable, secure, and entirely autonomous.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.button 
                onClick={() => navigate("/register")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.4, ease: CUBIC_BEZIER }}
                className="px-10 py-5 bg-cyan-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-cyan-500/20"
              >
                Start Free Trial
              </motion.button>
              <motion.button 
                onClick={() => navigate("/register")}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.4, ease: CUBIC_BEZIER }}
                className="px-10 py-5 border border-zinc-300 dark:border-zinc-800 rounded-2xl font-black uppercase tracking-widest"
              >
                View Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2: MISSION CONTROL ── */}
      <section className="relative py-32 px-6">
        <motion.div style={{ y: y1 }} className="absolute top-0 right-0 opacity-10 dark:opacity-20 pointer-events-none">
          <Fingerprint size={600} className="text-cyan-500" />
        </motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <ParallaxElement speed={1.2}>
            <div className="space-y-8">
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
                Command <br /> <span className="text-cyan-500">Center.</span>
              </h2>
              <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-md font-medium leading-relaxed">
                Deploy a unified presence engine that synchronizes local biometric data with global cloud infrastructure in real-time.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                   <PieChart className="text-cyan-500 mb-4" />
                   <h4 className="font-bold uppercase text-[10px] tracking-widest text-zinc-400">Accuracy</h4>
                   <p className="text-2xl font-black italic">99.98%</p>
                </div>
                <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                   <Globe className="text-violet-500 mb-4" />
                   <h4 className="font-bold uppercase text-[10px] tracking-widest text-zinc-400">Latency</h4>
                   <p className="text-2xl font-black italic">14ms</p>
                </div>
              </div>
            </div>
          </ParallaxElement>

          <ParallaxElement speed={-0.5}>
            <div className="relative aspect-square bg-gradient-to-br from-cyan-500/10 to-transparent rounded-[4rem] border border-cyan-500/20 flex items-center justify-center overflow-hidden">
               <MeshBackground />
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                 className="w-2/3 h-2/3 border border-dashed border-cyan-500/30 rounded-full flex items-center justify-center"
               >
                 <div className="w-1/2 h-1/2 bg-cyan-500/20 blur-3xl rounded-full animate-pulse" />
               </motion.div>
               <h3 className="absolute text-8xl font-black opacity-10 italic">SYNC</h3>
            </div>
          </ParallaxElement>
        </div>
      </section>

      {/* ── SECTION 3: PRICING ── */}
      <section className="relative py-40 px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-8">
              Pricing <span className="text-cyan-500">Models.</span>
            </h2>
            
            <div className="flex flex-col items-center gap-8">
              <div className="flex items-center gap-6">
                <span className={`text-xs font-black uppercase tracking-widest ${!isYearly ? "text-cyan-500" : "text-zinc-400"}`}>Monthly</span>
                <button 
                  onClick={() => setIsYearly(!isYearly)}
                  className="w-14 h-7 rounded-full bg-zinc-200 dark:bg-zinc-800 relative p-1 transition-colors"
                >
                  <motion.div 
                    animate={{ x: isYearly ? 28 : 0 }} 
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="w-5 h-5 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50" 
                  />
                </button>
                <span className={`text-xs font-black uppercase tracking-widest ${isYearly ? "text-cyan-500" : "text-zinc-400"}`}>Yearly (-25%)</span>
              </div>
              <p className="text-emerald-500 font-bold text-sm tracking-wide">✨ All plans start with a 1-month zero-cost trial</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -15 }}
                transition={{ duration: 0.4, ease: CUBIC_BEZIER }}
                className={`relative p-10 rounded-[3.5rem] border flex flex-col transition-all duration-500 ${
                  plan.highlight 
                  ? "bg-white dark:bg-zinc-900 border-cyan-500 shadow-2xl shadow-cyan-500/10 scale-105 z-10" 
                  : "bg-zinc-100/50 dark:bg-zinc-900/30 border-zinc-200 dark:border-zinc-800"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-white text-[10px] font-black uppercase px-4 py-1 rounded-full tracking-widest">
                    Most Popular
                  </div>
                )}

                <div className="mb-12">
                  <div className="flex justify-between items-center mb-8">
                    <div className="p-4 rounded-2xl bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                      {plan.icon}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">{plan.name}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold">₹</span>
                    <h3 className="text-6xl font-black tracking-tighter italic">{plan.price}</h3>
                    {plan.price !== "Custom" && <span className="text-zinc-400 text-sm font-bold">/{isYearly ? 'yr' : 'mo'}</span>}
                  </div>
                  <p className="mt-4 text-emerald-500 text-xs font-black uppercase tracking-widest">
                    First Month: ₹0.00
                  </p>
                </div>

                <div className="flex-1 space-y-5 mb-12">
                  {plan.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                      <Check size={16} className="text-cyan-500" strokeWidth={3} /> {f}
                    </div>
                  ))}
                </div>

                <motion.button 
                  onClick={() => navigate(plan.route)} // Wraps every plan's button to register
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, ease: CUBIC_BEZIER }}
                  className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all ${
                    plan.highlight 
                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30" 
                    : "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                  }`}
                >
                  Start 30-Day Free Trial
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: GLOBAL SCALE ── */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden bg-zinc-100 dark:bg-[#08080a]">
        <motion.div style={{ y: y2 }} className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none flex items-center justify-center">
           <h2 className="text-[30vw] font-black italic uppercase select-none">GLOBAL</h2>
        </motion.div>
        
        <div className="relative z-10 text-center px-6">
           <h2 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter mb-8">Ready for <br /> <span className="text-cyan-500">Scale?</span></h2>
           <p className="text-zinc-500 dark:text-zinc-400 text-xl max-w-2xl mx-auto font-medium italic mb-12">
             Join 500+ institutions already leveraging Attendex for autonomous workforce management.
           </p>
           
           <motion.button 
            onClick={() => navigate("/register")} // Wrapped Scale button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.5, ease: CUBIC_BEZIER }}
            className="px-12 py-6 bg-cyan-500 text-white rounded-full font-black uppercase tracking-widest flex items-center gap-4 mx-auto shadow-2xl shadow-cyan-500/40"
           >
             Get Started Free <ArrowRight size={20} />
           </motion.button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PricingPage;