import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';

const SettingsPage = () => {
  const darkMode = useSelector((state) => state.theme.mode === "dark");
  
  // 3D Parallax Logic
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
    <div className={`min-h-screen p-8 transition-colors duration-500 ${darkMode ? 'bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent inline-block">
            SYSTEM SETTINGS
          </h1>
          <p className="text-sm font-bold opacity-50 tracking-[3px] uppercase mt-1">Industrial Management v2.0</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: 3D PROFILE CARD */}
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={`lg:col-span-1 p-8 rounded-[2.5rem] relative overflow-hidden group border ${
              darkMode ? 'bg-white/5 border-white/10 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
            }`}
          >
            <div style={{ transform: "translateZ(75px)" }} className="flex flex-col items-center text-center">
              {/* PHOTO UPLOAD */}
              <div className="relative group/photo mb-6">
                <motion.div 
                   whileHover={{ scale: 1.05 }}
                   className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-2xl overflow-hidden"
                >
                  <div className={`w-full h-full rounded-full overflow-hidden border-4 ${darkMode ? 'border-[#020617]' : 'border-white'}`}>
                    <img src="https://ui-avatars.com/api/?name=Admin&background=random" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                </motion.div>
                <motion.label 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2.5 rounded-xl cursor-pointer shadow-lg border-2 border-white dark:border-[#020617]"
                >
                  <Icon icon="solar:camera-add-bold-duotone" width="20" />
                  <input type="file" className="hidden" />
                </motion.label>
              </div>

              <h3 className="text-xl font-black">Admin Master</h3>
              <p className="text-xs font-bold opacity-40 uppercase tracking-widest mb-6">System Operator</p>
              
              <div className="w-full space-y-3">
                <button className="w-full py-3 rounded-2xl bg-indigo-600 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-600/30 hover:brightness-110 transition-all">
                  Update Logo
                </button>
              </div>
            </div>

            {/* Background Glows */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-600/20 blur-[80px] group-hover:bg-indigo-600/40 transition-all" />
          </motion.div>

          {/* RIGHT: SETTINGS FORMS */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* PROFILE SECTION */}
            <SettingsSection icon="solar:user-id-bold-duotone" title="Profile Identity" darkMode={darkMode}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Username" placeholder="admin_master" darkMode={darkMode} />
                <InputField label="Email Address" placeholder="admin@attendenx.com" darkMode={darkMode} />
              </div>
            </SettingsSection>

            {/* SECURITY SECTION */}
            <SettingsSection icon="solar:shield-keyhole-bold-duotone" title="Security & Access" darkMode={darkMode}>
              <div className="space-y-4">
                <InputField label="Current Password" type="password" placeholder="••••••••" darkMode={darkMode} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="New Password" type="password" placeholder="Min. 8 chars" darkMode={darkMode} />
                  <InputField label="Confirm New Password" type="password" placeholder="Verify password" darkMode={darkMode} />
                </div>
              </div>
            </SettingsSection>

            {/* ACTION BUTTONS */}
            <div className="flex justify-end gap-4 pt-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest ${darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-200 hover:bg-slate-300'}`}
              >
                Reset Changes
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(79, 70, 229, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 rounded-2xl bg-indigo-600 text-white font-black text-xs uppercase tracking-widest shadow-xl"
              >
                Save Protocol
              </motion.button>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

// HELPER COMPONENTS
const SettingsSection = ({ icon, title, children, darkMode }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className={`p-8 rounded-[2.5rem] border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2.5 rounded-xl bg-indigo-600/10 text-indigo-500">
        <Icon icon={icon} width="24" />
      </div>
      <h4 className="text-lg font-black tracking-tight">{title}</h4>
    </div>
    {children}
  </motion.div>
);

const InputField = ({ label, placeholder, type = "text", darkMode }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-[2px] opacity-40 ml-1">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder}
      className={`w-full p-4 rounded-2xl border transition-all outline-none font-bold text-sm ${
        darkMode 
          ? 'bg-white/5 border-white/10 focus:border-indigo-500 text-white placeholder:opacity-20' 
          : 'bg-slate-50 border-slate-200 focus:border-indigo-600 text-slate-900'
      }`}
    />
  </div>
);

export default SettingsPage;