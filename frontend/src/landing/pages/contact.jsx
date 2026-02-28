"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Mail, 
  MessageSquare, 
  Send, 
  MapPin, 
  Phone, 
  Globe, 
  Zap, 
  ShieldCheck, 
  Clock,
  HelpCircle,
  Building2,
  BellRing
} from "lucide-react";
import { SpotlightNavbar } from "../components/common/navbar";
import Footer from "../components/common/landingFooter";
import MeshBackground from "../components/common/mesh";
import ParallaxElement from "../components/ui/parallaxElament";
import { cn } from "../../lib/utils/utils";

const ContactPage = () => {
  const containerRef = useRef(null);
  const [formState, setFormState] = useState("idle"); 

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState("sending");
    setTimeout(() => setFormState("success"), 2000);
  };

  return (
    <div
      ref={containerRef}
      className="bg-white dark:bg-[#050507] text-black dark:text-white transition-colors duration-300 overflow-x-hidden selection:bg-cyan-500 selection:text-black font-sans"
    >
      <SpotlightNavbar />

      {/* --- HERO & CONTACT FORM SECTION --- */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <MeshBackground />
          <motion.div 
            className="absolute inset-0 opacity-10 dark:opacity-20"
            style={{
              backgroundImage: "linear-gradient(rgba(0,0,0,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,1) 1px,transparent 1px)",
              backgroundSize: "60px 60px", y : backgroundY
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Side: Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="px-3 py-1 bg-cyan-500 text-black text-[10px] font-black rounded-full uppercase tracking-widest">
                Support Online
              </div>
              <p className="text-[10px] font-black tracking-[0.3em] text-zinc-400 uppercase">
                Available Worldwide
              </p>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none uppercase italic mb-8">
              Get in <br />
              <span className="text-cyan-500">Touch.</span>
            </h1>

            <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-light italic leading-relaxed mb-12 max-w-lg">
              Have a question or need help with your account? Our <span className="text-black dark:text-white font-bold">Support Team</span> is here to help you.
            </p>

            <div className="space-y-6">
              {[
                { icon: <Mail />, label: "Email Us", value: "muhammedfariis101@gmail.com" },
                { icon: <Phone />, label: "Call Us", value: "+91 9562166107" },
                { icon: <MapPin />, label: "Location", value: "Calicut , Kerala" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-6 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-cyan-500 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-300">
                    {React.cloneElement(item.icon, { size: 20 })}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{item.label}</p>
                    <p className="text-lg font-bold">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <div className="relative">
            <ParallaxElement speed={1.5}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border border-black/5 dark:border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.1)] dark:shadow-none bg-white/80 dark:bg-zinc-900/50 backdrop-blur-3xl"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Full Name" placeholder="Enter your name" type="text" />
                    <InputField label="Email Address" placeholder="name@company.com" type="email" />
                  </div>
                  <InputField label="Subject" placeholder="How can we help?" type="text" />
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-1">Message</label>
                    <textarea 
                      rows={4}
                      className="w-full bg-zinc-100 dark:bg-black/40 border border-transparent focus:border-cyan-500/50 rounded-2xl p-4 outline-none transition-all resize-none text-sm font-medium"
                      placeholder="Write your message here..."
                    />
                  </div>

                  <motion.button
                    disabled={formState !== "idle"}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 transition-all",
                      formState === "success" ? "bg-emerald-500 text-white" : "bg-cyan-500 text-black hover:shadow-[0_20px_40px_rgba(6,182,212,0.3)]"
                    )}
                  >
                    {formState === "idle" && <><Send size={18} /> Send Message</>}
                    {formState === "sending" && <div className="w-5 h-5 border-2 border-black border-t-transparent animate-spin rounded-full" />}
                    {formState === "success" && <><ShieldCheck size={18} /> Sent Successfully</>}
                  </motion.button>
                </form>
              </motion.div>
            </ParallaxElement>
          </div>
        </div>
      </section>

      {/* --- NEW SECTION 1: FAQ --- */}
      <section className="py-24 border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div>
                    <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">Common <span className="text-cyan-500">Questions</span></h2>
                    <p className="text-zinc-500 mt-4 max-w-md">Quick answers to the most common inquiries we receive from our users.</p>
                </div>
                <HelpCircle size={60} className="text-zinc-200 dark:text-zinc-800 hidden md:block" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                    { q: "How fast is the response time?", a: "Our team typically responds within 2-4 hours during business days." },
                    { q: "Do you offer custom enterprise plans?", a: "Yes, we provide tailored solutions for large-scale organizations." },
                    { q: "Is there 24/7 technical support?", a: "Priority support is available 24/7 for our Enterprise Tier users." },
                    { q: "Can I request a live demo?", a: "Absolutely. Fill out the form above and select 'Demo' in the subject." }
                ].map((faq, i) => (
                    <div key={i} className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/30 border border-black/5 dark:border-white/5">
                        <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                            <span className="text-cyan-500">?</span> {faq.q}
                        </h4>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- NEW SECTION 2: OFFICE LOCATIONS --- */}
      <section className="py-24 bg-zinc-50 dark:bg-[#08080a]">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">Our <span className="text-cyan-500">Offices</span></h2>
                <p className="text-zinc-500">Visit us at one of our global technology hubs.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { city: "San Francisco", address: "101 California St, SF", type: "Headquarters" },
                    { city: "London", address: "22 Bishopsgate, London", type: "European Hub" },
                    { city: "Tokyo", address: "Shibuya Sky Tower, Tokyo", type: "Asia Pacific" }
                ].map((office, i) => (
                    <motion.div 
                        whileHover={{ y: -10 }}
                        key={i} 
                        className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-black/5 dark:border-white/5 shadow-sm"
                    >
                        <Building2 className="text-cyan-500 mb-6" size={32} />
                        <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">{office.type}</p>
                        <h3 className="text-2xl font-bold mb-2 italic">{office.city}</h3>
                        <p className="text-zinc-500 text-sm">{office.address}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* --- NEW SECTION 3: NEWSLETTER / CTA --- */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="bg-cyan-500 p-12 md:p-20 rounded-[3rem] text-black text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10">
                    <BellRing size={200} />
                </div>
                
                <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-6">Stay Updated</h2>
                <p className="text-black/70 text-lg mb-10 max-w-lg mx-auto font-medium">
                    Get the latest system updates and feature releases delivered to your inbox.
                </p>
                
                <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                    <input 
                        type="email" 
                        placeholder="Enter email" 
                        className="flex-1 px-6 py-4 rounded-2xl bg-white/20 border border-black/10 placeholder:text-black/50 outline-none focus:bg-white/40 transition-all font-bold"
                    />
                    <button className="px-8 py-4 bg-black text-white rounded-2xl font-black uppercase text-sm hover:scale-105 transition-transform">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Simple Input Component
const InputField = ({ label, placeholder, type }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-1">{label}</label>
    <input 
      type={type}
      placeholder={placeholder}
      className="w-full h-14 bg-zinc-100 dark:bg-black/40 border border-transparent focus:border-cyan-500/50 rounded-2xl px-4 outline-none transition-all text-sm font-medium"
    />
  </div>
);

export default ContactPage;