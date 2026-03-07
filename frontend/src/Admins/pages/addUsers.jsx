import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import toast, { Toaster } from 'react-hot-toast';
import API from '../../Api/auth/API'; // Path based on your structure

const AddUserPage = () => {
  const darkMode = useSelector((state) => state.theme.mode === "dark");
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Single form state object
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Staff' // Default value
  });

  const rolesList = ["Staff", "Admin", "Cashier"];

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

  // --- SIMPLE HANDLER (Same as your LoginPage) ---
  const handle = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleInitializeUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Direct post to your user creation API
      const response = await API.post('/officials/users', form);
      console.log("api response add user:", response);

      toast.success('User Initialized Successfully!', {
        className: darkMode ? '!bg-[#1e1b4b] !text-white !border-[#6366f1]' : '',
      });

      // Reset form
      setForm({ username: '', email: '', password: '', role: 'Staff' });
    } catch (error) {
      console.error("Initialization Failed:", error);
      const errorMsg = error.response?.data?.message || "Failed to create user";
      toast.error(errorMsg, {
        className: darkMode ? '!bg-red-900 !text-white' : '',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`h-full w-full flex items-center justify-center p-6 transition-colors duration-500 overflow-hidden relative font-sans ${
      darkMode ? 'bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <Toaster position="top-right" />
      
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-[120px] opacity-30 animate-pulse ${darkMode ? 'bg-indigo-600' : 'bg-indigo-300'}`} />
        <div className={`absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-[120px] opacity-20 ${darkMode ? 'bg-purple-600' : 'bg-purple-300'}`} />
      </div>

      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Info Side */}
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
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
            Seamlessly onboard new operatives into the <strong>Attendenx</strong> ecosystem.
          </p>
        </motion.div>

        {/* Right Form Side */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { x.set(0); y.set(0); }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className={`relative group p-8 rounded-[2.5rem] border transition-all duration-500 ${
            darkMode ? 'bg-white/[0.03] border-white/10 backdrop-blur-xl shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
          }`}
        >
          <div className="mb-8" style={{ transform: "translateZ(50px)" }}>
            <h3 className="text-2xl font-black tracking-tight">Create Account</h3>
            <p className="text-sm opacity-50">Enter credentials for the new operative.</p>
          </div>

          <form className="space-y-5" style={{ transform: "translateZ(30px)" }} onSubmit={handleInitializeUser}>
            
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500 ml-1">Username</label>
              <input 
                name="username" 
                value={form.username} 
                onChange={handle} 
                type="text" 
                placeholder="Username" 
                required 
                className={`w-full px-5 py-4 rounded-2xl outline-none border transition-all font-bold text-sm ${
                  darkMode ? 'bg-black/20 border-white/10 focus:border-indigo-500' : 'bg-slate-100 border-slate-200 focus:border-indigo-500 shadow-inner'
                }`} 
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500 ml-1">Email</label>
              <input 
                name="email" 
                value={form.email} 
                onChange={handle} 
                type="email" 
                placeholder="operative@gmail.com" 
                required 
                className={`w-full px-5 py-4 rounded-2xl outline-none border transition-all font-bold text-sm ${
                  darkMode ? 'bg-black/20 border-white/10 focus:border-indigo-500' : 'bg-slate-100 border-slate-200 focus:border-indigo-500 shadow-inner'
                }`} 
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500 ml-1">Password</label>
              <input 
                name="password" 
                value={form.password} 
                onChange={handle} 
                type="password" 
                placeholder="••••••••" 
                required 
                className={`w-full px-5 py-4 rounded-2xl outline-none border transition-all font-bold text-sm ${
                  darkMode ? 'bg-black/20 border-white/10 focus:border-indigo-500' : 'bg-slate-100 border-slate-200 focus:border-indigo-500 shadow-inner'
                }`} 
              />
            </div>

            {/* Role Selection */}
            <div className="flex flex-col gap-1 relative">
              <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500 ml-1">Role</label>
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full px-5 py-4 rounded-2xl border cursor-pointer flex justify-between items-center transition-all ${
                  darkMode ? 'bg-black/20 border-white/10' : 'bg-slate-100 border-slate-200'
                }`}
              >
                <span className="text-sm font-bold">{form.role}</span>
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
                    {rolesList.map((r) => (
                      <div
                        key={r}
                        onClick={() => { setForm({...form, role: r}); setIsDropdownOpen(false); }}
                        className={`px-4 py-3 rounded-xl text-xs font-black uppercase cursor-pointer transition-all ${
                          form.role === r 
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
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(79, 70, 229, 0.4)", skewX: -3 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-5 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              style={{ transform: "translateZ(60px)" }}
            >
              <Icon icon={loading ? "line-md:loading-twotone-loop" : "solar:user-plus-bold"} width="20" />
              {loading ? "Initializing..." : "Initialize User"}
            </motion.button>
          </form>

          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-200 pointer-events-none"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddUserPage;