import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';

const AddUserPage = () => {
  const darkMode = useSelector((state) => state.theme.mode === "dark");
  const [formData, setFormData] = useState({ Username: '', Email: '', Password: '', Role: 'Student' });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const roles = ["Student", "Instructor", "Administrator", "Developer"];

  // --- 3D PARALLAX LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div className={`h-full w-full flex items-center justify-center p-6 transition-colors duration-500 overflow-hidden relative font-sans ${
      darkMode ? 'bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* ORIGINAL DYNAMIC BACKGROUND ORBS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-[120px] opacity-30 animate-pulse ${darkMode ? 'bg-indigo-600' : 'bg-indigo-300'}`} />
        <div className={`absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-[120px] opacity-20 ${darkMode ? 'bg-purple-600' : 'bg-purple-300'}`} />
      </div>

      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* LEFT SIDE: THE ORIGINAL HEAVY TEXT UI */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
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
            Seamlessly onboard new operatives into the <strong>Attendenx</strong> ecosystem with high-level encryption.
          </p>
          
          {/* THE ORIGINAL ICON BLOCKS */}
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

        {/* RIGHT SIDE: THE ORIGINAL 3D FORM */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { x.set(0); y.set(0); }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className={`relative group p-8 rounded-[2.5rem] border transition-all duration-500 ${
            darkMode 
              ? 'bg-white/[0.03] border-white/10 backdrop-blur-xl shadow-2xl' 
              : 'bg-white border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)]'
          }`}
        >
          <div className="mb-8" style={{ transform: "translateZ(50px)" }}>
            <h3 className="text-2xl font-black tracking-tight">Create Account</h3>
            <p className="text-sm opacity-50">Enter credentials for the new operative.</p>
          </div>

          <form className="space-y-5" style={{ transform: "translateZ(30px)" }}>
            
            {/* ALIGNED INPUTS */}
            {['Username', 'Email', 'Password'].map((label) => (
              <div key={label} className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-widest opacity-60 ml-1">{label}</label>
                <input 
                  type={label === 'Password' ? 'password' : 'text'}
                  name={label}
                  placeholder={label}
                  value={formData[label]}
                  onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                  className={`w-full px-5 py-4 rounded-2xl outline-none border transition-all font-bold text-sm ${
                    darkMode ? 'bg-black/20 border-white/10 focus:border-indigo-500 text-white' : 'bg-slate-100 border-transparent focus:bg-white focus:border-indigo-500 shadow-inner'
                  }`}
                />
              </div>
            ))}

            {/* THE DATALIST */}
            <div className="flex flex-col gap-2 relative">
              <label className="text-xs font-black uppercase tracking-widest opacity-60 ml-1">Role</label>
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full px-5 py-4 rounded-2xl border cursor-pointer flex justify-between items-center transition-all ${
                  darkMode ? 'bg-black/20 border-white/10' : 'bg-slate-100 border-transparent'
                }`}
              >
                <span className="text-sm font-bold">{formData.Role}</span>
                <Icon icon="solar:alt-arrow-down-bold" className={`text-indigo-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: -5 }} 
                    exit={{ opacity: 0, y: 10 }}
                    className={`absolute bottom-[110%] left-0 right-0 z-[100] p-2 rounded-2xl border backdrop-blur-2xl shadow-2xl max-h-48 overflow-y-auto ${
                      darkMode ? 'bg-[#0f172a]/95 border-white/20' : 'bg-white/95 border-slate-200'
                    }`}
                  >
                    {roles.map((r) => (
                      <div
                        key={r}
                        onClick={() => { setFormData({...formData, Role: r}); setIsDropdownOpen(false); }}
                        className={`px-4 py-3 rounded-xl text-xs font-black uppercase cursor-pointer transition-all ${
                          formData.Role === r 
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30' 
                            : darkMode ? 'hover:bg-white/10' : 'hover:bg-indigo-50'
                        }`}
                      >
                        {r}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(79, 70, 229, 0.4)", skewX: -3 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-colors"
              style={{ transform: "translateZ(60px)" }}
            >
              <Icon icon="solar:user-plus-bold" width="20" />
              Initialize User
            </motion.button>
          </form>

          {/* FIXED GLOW EFFECT: Added pointer-events-none */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-200 pointer-events-none"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddUserPage;