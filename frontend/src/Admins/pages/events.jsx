import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';

const EventsPage = () => {
  const darkMode = useSelector((state) => state.theme.mode === "dark");
  
  // State for Form Inputs
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    targetType: 'All Students', 
    targetDetails: '' 
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const targetOptions = ["All Students", "Specific Batches", "Specific Students", "All Users"];

  // Handle Input Changes - Fixed for textability
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- 3D PARALLAX LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-6 transition-colors duration-500 overflow-hidden relative font-sans ${
      darkMode ? 'bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* BACKGROUND ORBS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-[120px] opacity-30 animate-pulse ${darkMode ? 'bg-indigo-600' : 'bg-indigo-300'}`} />
        <div className={`absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-[120px] opacity-20 ${darkMode ? 'bg-purple-600' : 'bg-purple-300'}`} />
      </div>

      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* LEFT SIDE - TEXT CONTENT */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-xs font-bold tracking-widest uppercase">
            Admin Dashboard
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none">
            Post an <br />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Upcoming Event.
            </span>
          </h1>
          <p className={`text-lg max-w-md ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Send announcements and program schedules to specific groups or the whole college instantly.
          </p>
          
          <div className="flex gap-4 pt-4">
            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
              <Icon icon="solar:users-group-two-rounded-bold-duotone" width="32" className="text-indigo-500 mb-2" />
              <h4 className="font-bold text-sm">Target Groups</h4>
            </div>
            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
              <Icon icon="solar:bell-bing-bold-duotone" width="32" className="text-purple-500 mb-2" />
              <h4 className="font-bold text-sm">Fast Alerts</h4>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE - 3D FORM */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { x.set(0); y.set(0); }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className={`relative group p-8 rounded-[2.5rem] border transition-all duration-500 ${
            darkMode ? 'bg-white/[0.03] border-white/10 backdrop-blur-xl shadow-2xl' : 'bg-white border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)]'
          }`}
        >
          <div className="mb-6" style={{ transform: "translateZ(50px)" }}>
            <h3 className="text-2xl font-black tracking-tight">Event Details</h3>
            <p className="text-sm opacity-50">Enter the information for your program.</p>
          </div>

          <form className="space-y-4 relative z-50" style={{ transform: "translateZ(30px)" }} onSubmit={(e) => e.preventDefault()}>
            
            {/* EVENT TITLE */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-black uppercase tracking-widest opacity-60 ml-1">Event Name</label>
              <input 
                type="text"
                name="title"
                placeholder="e.g. Annual Sports Day"
                value={formData.title}
                onChange={handleChange}
                autoComplete="off"
                className={`w-full px-5 py-3 rounded-2xl outline-none border transition-all font-bold text-sm relative z-50 ${
                  darkMode ? 'bg-black/40 border-white/10 focus:border-indigo-500 text-white' : 'bg-slate-100 border-transparent focus:bg-white focus:border-indigo-500 shadow-inner'
                }`}
              />
            </div>

            {/* DATE & TIME */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-black uppercase tracking-widest opacity-60 ml-1">Date</label>
                <input 
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full px-5 py-3 rounded-2xl outline-none border transition-all font-bold text-sm relative z-50 ${
                    darkMode ? 'bg-black/40 border-white/10 focus:border-indigo-500 text-white' : 'bg-slate-100 border-transparent focus:bg-white focus:border-indigo-500'
                  }`}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-black uppercase tracking-widest opacity-60 ml-1">Time</label>
                <input 
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={`w-full px-5 py-3 rounded-2xl outline-none border transition-all font-bold text-sm relative z-50 ${
                    darkMode ? 'bg-black/40 border-white/10 focus:border-indigo-500 text-white' : 'bg-slate-100 border-transparent focus:bg-white focus:border-indigo-500'
                  }`}
                />
              </div>
            </div>

            {/* TARGET AUDIENCE DROPDOWN */}
            <div className="flex flex-col gap-1 relative z-[60]">
              <label className="text-xs font-black uppercase tracking-widest opacity-60 ml-1">Send To</label>
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full px-5 py-3 rounded-2xl border cursor-pointer flex justify-between items-center transition-all ${
                  darkMode ? 'bg-black/40 border-white/10' : 'bg-slate-100 border-transparent'
                }`}
              >
                <span className="text-sm font-bold">{formData.targetType}</span>
                <Icon icon="solar:alt-arrow-down-bold" className={`text-indigo-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 5 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`absolute top-full left-0 right-0 z-[100] p-2 rounded-2xl border backdrop-blur-2xl shadow-2xl ${
                      darkMode ? 'bg-[#0f172a]/95 border-white/20' : 'bg-white/95 border-slate-200'
                    }`}
                  >
                    {targetOptions.map((opt) => (
                      <div
                        key={opt}
                        onClick={() => { setFormData({...formData, targetType: opt}); setIsDropdownOpen(false); }}
                        className={`px-4 py-2 rounded-xl text-xs font-black uppercase cursor-pointer transition-all mb-1 last:mb-0 ${
                          formData.targetType === opt 
                            ? 'bg-indigo-600 text-white' 
                            : darkMode ? 'hover:bg-white/10' : 'hover:bg-indigo-50'
                        }`}
                      >
                        {opt}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CONDITIONAL DETAILS (IDs or Batch Names) */}
            {(formData.targetType === "Specific Batches" || formData.targetType === "Specific Students") && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex flex-col gap-1 relative z-50">
                <label className="text-xs font-black uppercase tracking-widest opacity-60 ml-1">
                  {formData.targetType === "Specific Batches" ? "Batch Names" : "Student IDs"}
                </label>
                <textarea 
                  name="targetDetails"
                  placeholder={formData.targetType === "Specific Batches" ? "e.g. CS-2024, IT-2023" : "e.g. STU101, STU102"}
                  value={formData.targetDetails}
                  onChange={handleChange}
                  rows="2"
                  className={`w-full px-5 py-3 rounded-2xl outline-none border transition-all font-bold text-sm resize-none relative z-50 ${
                    darkMode ? 'bg-black/40 border-white/10 focus:border-indigo-500 text-white' : 'bg-slate-100 border-transparent focus:bg-white focus:border-indigo-500 shadow-inner'
                  }`}
                />
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02, skewX: -3 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all mt-4 relative z-50"
              style={{ transform: "translateZ(60px)" }}
            >
              <Icon icon="solar:paper-plane-bold" width="20" />
              Publish Event
            </motion.button>
          </form>

          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur opacity-0 group-hover:opacity-10 transition duration-1000"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventsPage;