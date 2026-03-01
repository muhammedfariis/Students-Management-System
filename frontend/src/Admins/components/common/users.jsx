import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Lottie from 'lottie-react';
import Switch from "../../../landing/components/ui/toggle";

// Animation Links (Standard Industrial Style)
const ANIM_URLS = {
  dashboard: "https://fonts.gstatic.com/s/i/short-term/release/googlesymbols/dashboard/default/24px.xml", // Placeholder concept
  // For this demo, I'll use Lottie JSON URLs from reliable sources:
  home: "https://assets9.lottiefiles.com/packages/lf20_qc96of.json",
  attendance: "https://assets10.lottiefiles.com/private_files/lf30_8scv8mzp.json",
  students: "https://assets3.lottiefiles.com/packages/lf20_ZpZ97K.json",
  events: "https://assets1.lottiefiles.com/packages/lf20_m9zragio.json",
  settings: "https://assets3.lottiefiles.com/packages/lf20_hwc9s9oc.json",
  logout: "https://assets1.lottiefiles.com/private_files/lf30_oi9m66.json"
};

const SidebarItem = ({ item, isExpanded, isActive, darkMode, onClick }) => {
  const lottieRef = useRef();

  return (
    <motion.div
      onMouseEnter={() => lottieRef.current?.play()}
      onMouseLeave={() => lottieRef.current?.stop()}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={`group relative flex items-center h-14 rounded-2xl cursor-pointer transition-all duration-300 ${
        isActive 
          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
          : darkMode ? 'hover:bg-white/5 text-slate-400 hover:text-white' : 'hover:bg-indigo-50 text-slate-600 hover:text-indigo-600'
      } ${isExpanded ? 'px-4' : 'justify-center mx-2'}`}
    >
      <div className={`w-8 h-8 flex items-center justify-center ${isActive ? 'brightness-200' : 'opacity-80 group-hover:opacity-100'}`}>
        <Lottie 
          lottieRef={lottieRef}
          animationData={item.animationData} 
          loop={false} 
          autoplay={false}
          style={{ width: 32, height: 32 }}
        />
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="ml-4 font-bold text-sm tracking-wide"
          >
            {item.name}
          </motion.span>
        )}
      </AnimatePresence>

      {isActive && (
        <motion.div 
          layoutId="activeGlow"
          className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-2xl -z-10"
        />
      )}
    </motion.div>
  );
};

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const darkMode = useSelector((state) => state.theme.mode === "dark");
  const navigate = useNavigate();
  const location = useLocation();

  // You would typically import these JSONs locally
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', animUrl: "https://assets9.lottiefiles.com/packages/lf20_qc96of.json" },
    { name: 'Attendance', path: '/attendance', animUrl: "https://assets10.lottiefiles.com/packages/lf20_f7SclS.json" },
    { name: 'Student List', path: '/students', animUrl: "https://assets3.lottiefiles.com/packages/lf20_ZpZ97K.json" },
    { name: 'Events', path: '/events', animUrl: "https://assets1.lottiefiles.com/packages/lf20_m9zragio.json" },
    { name: 'Settings', path: '/settings', animUrl: "https://assets3.lottiefiles.com/packages/lf20_hwc9s9oc.json" },
  ];

  return (
    <motion.div
      animate={{ width: isExpanded ? 280 : 90 }}
      className={`relative h-screen flex flex-col transition-colors duration-500 border-r ${
        darkMode ? 'bg-[#020617] border-white/10 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      {/* BRANDING */}
      <div className="h-24 flex items-center px-6 gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex-shrink-0 flex items-center justify-center shadow-indigo-500/40 shadow-lg">
          <img src="/images/attLogoLight.png" className="w-6 h-6 object-contain" alt="A" />
        </div>
        {isExpanded && (
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-black text-xl tracking-tighter bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            ATTENDENX
          </motion.h1>
        )}
      </div>

      {/* MENU NAV */}
      <nav className="flex-1 px-3 space-y-2">
        {menuItems.map((item) => (
          <SidebarItem 
            key={item.name}
            item={item}
            isExpanded={isExpanded}
            isActive={location.pathname === item.path}
            darkMode={darkMode}
            onClick={() => navigate(item.path)}
          />
        ))}
      </nav>

      {/* FOOTER: THEME & LOGOUT */}
      <div className={`p-4 mt-auto border-t ${darkMode ? 'border-white/5' : 'border-slate-100'}`}>
        <div className="flex items-center justify-between mb-4">
          {isExpanded && <span className="text-[10px] font-black uppercase opacity-40">System</span>}
          <div className={isExpanded ? 'scale-75' : 'scale-50'}> <Switch /> </div>
        </div>

        <div className={`flex items-center gap-3 p-2 rounded-2xl ${darkMode ? 'bg-white/5' : 'bg-slate-50'}`}>
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex-shrink-0 overflow-hidden">
             <img src="https://ui-avatars.com/api/?name=Admin" alt="User" />
          </div>
          {isExpanded && (
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold truncate">Administrator</p>
              <button onClick={() => navigate('/login')} className="text-[10px] text-red-500 font-bold hover:underline">Logout</button>
            </div>
          )}
        </div>
      </div>

      {/* TOGGLE BTN */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-10 w-6 h-6 bg-indigo-600 rounded-full text-white flex items-center justify-center text-xs shadow-lg"
      >
        {isExpanded ? '❮' : '❯'}
      </button>
    </motion.div>
  );
};

export default Sidebar;