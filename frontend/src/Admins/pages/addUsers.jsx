import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import Switch from "../../components/toggle"; // Assuming the switch code you provided is in this file

const AddUserPage = () => {
  const darkMode = useSelector((state) => state.theme.mode === "dark");
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Student', department: '' });

  // --- PARALLAX 3D EFFECTS LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center p-6 transition-colors duration-500 overflow-hidden relative ${
      darkMode ? 'bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* DYNAMIC BACKGROUND GRADIENT ORBS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-[120px] opacity-30 animate-pulse ${darkMode ? 'bg-indigo-600' : 'bg-indigo-300'}`} />
        <div className={`absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-[120px] opacity-20 ${darkMode ? 'bg-purple-600' : 'bg-purple-300'}`} />
      </div>

      {/* TOP NAVIGATION / SWITCH AREA */}
      <div className="absolute top-8 right-8 z-50">
        <Switch />
      </div>

      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* LEFT SIDE: TEXT & EXPLANATION */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-xs font-bold tracking-widest uppercase">
            User Management
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none">
            Expand your <br />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Digital Frontier.
            </span>
          </h1>
          <p className={`text-lg max-w-md ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Seamlessly onboard new administrators or students into the <strong>Attendenx</strong> ecosystem with high-level encryption and role-based access control.
          </p>
          
          <div className="flex gap-4 pt-4">
            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
              <Icon icon="solar:shield-check-bold-duotone" width="32" className="text-indigo-500 mb-2" />
              <h4 className="font-bold text-sm">Secure Entry</h4>
            </div>
            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
              <Icon icon="solar:bolt-circle-bold-duotone" width="32" className="text-purple-500 mb-2" />
              <h4 className="font-bold text-sm">Instant Sync</h4>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE: 3D PARALLAX FORM */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`relative group p-8 rounded-[2.5rem] border transition-all duration-500 ${
            darkMode 
              ? 'bg-white/[0.03] border-white/10 backdrop-blur-xl shadow-2xl' 
              : 'bg-white border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)]'
          }`}
        >
          {/* Form Header */}
          <div className="mb-8" style={{ transform: "translateZ(50px)" }}>
            <h3 className="text-2xl font-black tracking-tight">Create Account</h3>
            <p className="text-sm opacity-50">Enter credentials for the new operative.</p>
          </div>

          <form className="space-y-5" style={{ transform: "translateZ(30px)" }}>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest opacity-60 ml-1">Full Name</label>
              <div className="relative group">
                <Icon icon="solar:user-bold" className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:text-indigo-500 group-focus-within:opacity-100 transition-all" />
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl outline-none border transition-all ${
                    darkMode 
                      ? 'bg-black/20 border-white/10 focus:border-indigo-500 focus:bg-black/40' 
                      : 'bg-slate-100 border-transparent focus:bg-white focus:border-indigo-500 shadow-inner'
                  }`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest opacity-60 ml-1">Email Address</label>
              <div className="relative group">
                <Icon icon="solar:letter-bold" className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:text-indigo-500 group-focus-within:opacity-100 transition-all" />
                <input 
                  type="email" 
                  placeholder="john@industry.com"
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl outline-none border transition-all ${
                    darkMode 
                      ? 'bg-black/20 border-white/10 focus:border-indigo-500 focus:bg-black/40' 
                      : 'bg-slate-100 border-transparent focus:bg-white focus:border-indigo-500 shadow-inner'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest opacity-60 ml-1">Role</label>
                <select className={`w-full px-4 py-4 rounded-2xl outline-none border transition-all appearance-none ${
                    darkMode ? 'bg-black/20 border-white/10' : 'bg-slate-100 border-transparent'
                }`}>
                  <option>Student</option>
                  <option>Instructor</option>
                  <option>Admin</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest opacity-60 ml-1">Department</label>
                <input 
                  type="text" 
                  placeholder="Engineering"
                  className={`w-full px-4 py-4 rounded-2xl outline-none border transition-all ${
                    darkMode ? 'bg-black/20 border-white/10' : 'bg-slate-100 border-transparent'
                  }`}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 20px 40px rgba(79, 70, 229, 0.4)",
                skewX: -3
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-colors"
              style={{ transform: "translateZ(60px)" }}
            >
              <Icon icon="solar:user-plus-bold" width="20" />
              Initialize User
            </motion.button>
          </form>

          {/* Decorative Glow on Hover */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
        </motion.div>
      </div>

      {/* FOOTER SCROLL INDICATOR */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20"
      >
        <Icon icon="solar:mouse-minimalistic-bold" width="30" />
      </motion.div>
    </div>
  );
};

export default AddUserPage;