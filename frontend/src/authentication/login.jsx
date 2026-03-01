import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import Switch from '../landing/components/ui/toggle';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const LoginPage = () => {
  const darkMode = useSelector((state) => state.theme.mode === "dark");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Welcome Back!', {
        className: darkMode ? '!bg-[#1e1b4b] !text-white !border-[#6366f1]' : '',
      });
    }, 2000);
  };

  return (
    <div className={`h-screen w-full relative overflow-hidden transition-colors duration-500 ${darkMode ? 'bg-[#020617] text-slate-50' : 'bg-white text-slate-900'}`}>
      <Toaster position="top-right" />
      
      {/* Mesh Background Layer */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#6366f1 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      {/* HEADER */}
      <header className="fixed top-0 w-full px-4 sm:px-8 py-6 flex justify-between items-center z-50 bg-transparent">
        <div className="flex items-center gap-3 sm:gap-6">
          <motion.button 
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full font-bold text-[10px] uppercase tracking-[1px] sm:tracking-[2px] transition-all ${
              darkMode ? 'bg-white/5 text-white border border-white/10 hover:bg-white hover:text-black' 
                       : 'bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-600 hover:text-white'
            }`}
          >
            <ArrowLeft size={16} />
            <span className="hidden xs:inline">Return</span>
          </motion.button>

          <div className="flex items-center gap-2 sm:gap-3">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-8 h-8 sm:w-10 sm:h-10"
            >
              <motion.img
                src={darkMode ? "/images/attLogoLight.png" : "/images/attLogoDark.png"}
                alt="Logo"
                whileHover={{ scale: 1.2, rotate: 10, filter: "drop-shadow(0 0 15px #6366f1)" }}
                className="w-full h-full object-contain rounded-xl cursor-pointer"
              />
            </motion.div>
            <h2 className="text-sm sm:text-xl font-black tracking-tighter bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              ATTENDENX
            </h2>
          </div>
        </div>
        <div className="scale-75 sm:scale-90"><Switch /></div>
      </header>

      {/* LAYOUT - SWAPPED SIDE (Info Left, Form Right) */}
      <main className="flex h-full w-full">
        
        {/* LEFT: INFO SECTION (Moved from Right) */}
        <section className="hidden lg:flex flex-1 relative items-center justify-center">
          <div className={`absolute inset-0 z-0 transition-colors duration-700 ${
            darkMode ? 'bg-[#0a0f25]' : 'bg-indigo-600'
          }`} 
          style={{ clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0% 100%)' }} 
          />

          <div className="relative z-10 w-2/3 flex flex-col gap-12 items-start">
            <motion.div 
              style={{ animation: 'float 5s infinite ease-in-out' }}
              className="w-80 p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-xl"
            >
              <div className="flex gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#ff5f56]" /><div className="w-2 h-2 rounded-full bg-[#ffbd2e]" /><div className="w-2 h-2 rounded-full bg-[#27c93f]" />
              </div>
              <h3 className="text-white font-black text-2xl mb-2">Neural Sync</h3>
              <p className="text-white/40 text-sm font-medium">Scanning boundaries and verifying metrics in real-time.</p>
              <div className="flex gap-1.5 mt-8 items-end h-8">
                {[12, 28, 18, 32, 22].map((h, i) => (
                  <motion.div key={i} animate={{ height: [h, h*1.4, h] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }} className="w-1 bg-indigo-400 rounded-full shadow-[0_0_10px_#6366f1]" />
                ))}
              </div>
            </motion.div>

            <div className="text-white">
              <h2 className="text-6xl font-black leading-[0.9] tracking-tighter mb-8">
                Welcome <br /> <span className="text-indigo-300">Back.</span>
              </h2>
              <ul className="space-y-4">
                {['Face Recognition', 'AES-256 Encryption', 'Dynamic PDF Reports'].map((item) => (
                  <motion.li key={item} whileHover={{ x: 10 }} className="font-bold text-lg opacity-60 flex items-center gap-3">
                    <span className="text-indigo-300">✦</span> {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* RIGHT: FORM SECTION (Moved from Left) */}
        <section className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 z-10 relative">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-md pt-12 lg:pt-0"
          >
            <div className="mb-6 sm:mb-10 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl font-black leading-none mb-2 sm:mb-3 tracking-tighter">Login</h1>
              <p className="opacity-50 font-medium text-base sm:text-lg">Access your workspace portal.</p>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Gmail</label>
                <input type="email" placeholder="Email Address" required 
                  className={`w-full px-5 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl outline-none border transition-all ${
                    darkMode ? 'bg-white/5 border-white/10 focus:border-indigo-500' : 'bg-slate-100 border-slate-200 focus:border-indigo-500'
                  }`} />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Password</label>
                <input type="password" placeholder="Password" required 
                  className={`w-full px-5 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl outline-none border transition-all ${
                    darkMode ? 'bg-white/5 border-white/10 focus:border-indigo-500' : 'bg-slate-100 border-slate-200 focus:border-indigo-500'
                  }`} />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, letterSpacing: '2px' }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 sm:mt-6 py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-indigo-600 text-white font-black text-xs uppercase tracking-widest shadow-2xl shadow-indigo-500/40"
              >
                {loading ? "Verifying..." : "Login to Account"}
              </motion.button>
              
              <p className="text-center mt-6 text-sm opacity-60">
                Don't have an account? 
                <span onClick={() => navigate("/register")} className="text-indigo-500 font-bold cursor-pointer hover:underline ml-1">
                  Create one here
                </span>
              </p>
            </form>
          </motion.div>
        </section>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-25px); }
        }
        input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        @media (max-width: 450px) {
          .xs\\:inline { display: inline; }
        }
      `}} />
    </div>
  );
};

export default LoginPage;