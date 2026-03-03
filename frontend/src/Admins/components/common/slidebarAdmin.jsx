import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Switch from "../../../components/toggle";

// Helper component for Sidebar Items
const SidebarItem = ({ item, isExpanded, isActive, darkMode, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={`group relative flex items-center h-12 rounded-xl cursor-pointer transition-colors duration-300 ${
        isActive 
          ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/30' 
          : darkMode ? 'hover:bg-white/5 text-slate-400 hover:text-white' : 'hover:bg-indigo-50 text-slate-600 hover:text-indigo-600'
      } ${isExpanded ? 'px-4' : 'justify-center mx-2'}`}
    >
      <motion.div
        layout 
        whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
        className={`flex items-center justify-center flex-shrink-0 ${isActive ? 'text-white' : 'text-indigo-500 group-hover:text-indigo-400'}`}
      >
        <Icon icon={item.icon} width={26} />
      </motion.div>

      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.span 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="ml-4 font-bold text-sm tracking-wide whitespace-nowrap overflow-hidden"
          >
            {item.name}
          </motion.span>
        )}
      </AnimatePresence>

      {isActive && (
        <motion.div 
          layoutId="activeSideBar"
          className="absolute left-0 w-1.5 h-6 bg-white rounded-r-full shadow-[0_0_10px_white]"
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

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'solar:widget-5-bold-duotone' },
    { name: 'Attendance', path: '', icon: 'solar:user-check-rounded-bold-duotone' },
    { name: 'Student List', path: '/studentlist', icon: 'solar:notebook-bookmark-bold-duotone' },
    { name: 'Users List', path: '/userslist', icon: 'solar:users-group-rounded-bold-duotone' },
    { name: 'Add User', path: '/users/add', icon: 'solar:user-plus-bold-duotone' },
    { name: 'Events', path: '/events', icon: 'solar:calendar-minimalistic-bold-duotone' },
    // ACTION SECTION
    { name: 'Action', path: '/action', icon: 'solar:danger-bold-duotone' },
    { name: 'Settings', path: '/settings', icon: 'solar:settings-bold-duotone' },
  ];

  return (
    <>
      {/* CSS to hide scrollbar globally for this component */}
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      <motion.div
        initial={false}
        animate={{ width: isExpanded ? 280 : 88 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }} 
        className={`relative h-screen flex flex-col border-r z-[100] ${
          darkMode ? 'bg-[#020617] border-white/10 text-slate-200' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* 1. TOP LOGO AREA */}
        <div className="h-24 flex items-center px-6 gap-4 overflow-hidden relative flex-shrink-0">
          <motion.div 
            whileHover={{ scale: 1.15, filter: "drop-shadow(0 0 8px #6366f1)" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="min-w-[48px] h-[48px] rounded-xl overflow-hidden flex items-center justify-center bg-transparent cursor-pointer"
          >
            <img 
              src={darkMode ? "/images/attLogoLight.png" : "/images/attLogoDark.png"} 
              className="w-full h-full object-contain pointer-events-none" 
              alt="Logo"
              onError={(e) => { e.target.src = "https://api.iconify.design/solar:chart-square-bold-duotone.svg?color=%234f46e5" }}
            />
          </motion.div>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col"
              >
                <h2 className="font-black text-xl tracking-tighter bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  ATTENDENX
                </h2>
                <p className="text-[9px] font-bold tracking-[2.5px] opacity-40 uppercase">Industrial v2.0</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 2. NAVIGATION - Scrollbar Hidden */}
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto overflow-x-hidden hide-scrollbar">
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

        {/* 3. FOOTER */}
        <div className={`p-4 mt-auto border-t space-y-4 flex-shrink-0 ${darkMode ? 'border-white/5 bg-white/[0.01]' : 'border-slate-100 bg-slate-50'}`}>
          <div className="flex justify-center items-center py-2">
            <motion.div layout className={isExpanded ? 'scale-90' : 'scale-50'}> 
              <Switch /> 
            </motion.div>
          </div>

          <motion.div layout className={`p-2 rounded-2xl transition-all ${darkMode ? 'bg-white/5' : 'bg-white shadow-md border border-slate-100'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex-shrink-0 flex items-center justify-center text-white font-black">
                AD
              </div>
              {isExpanded && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 overflow-hidden text-left">
                  <p className="text-xs font-black truncate leading-tight">Admin Portal</p>
                  <p className="text-[10px] opacity-50 font-medium">Standard License</p>
                </motion.div>
              )}
            </div>

            {isExpanded ? (
              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.02, backgroundColor: "#ef4444", color: "#fff" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/login')}
                className="w-full py-3 rounded-xl bg-red-500/10 text-red-500 transition-all duration-300 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider"
              >
                <Icon icon="solar:logout-3-bold" width="18" />
                Sign Out
              </motion.button>
            ) : (
               <button 
                onClick={() => navigate('/login')}
                className="w-full flex justify-center text-red-500 hover:scale-125 transition-transform py-2"
               >
                <Icon icon="solar:logout-3-bold" width="24" />
               </button>
            )}
          </motion.div>
        </div>

        {/* FLOATING TOGGLE */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -right-3 top-24 w-7 h-7 bg-indigo-600 rounded-lg text-white flex items-center justify-center shadow-xl border border-white/20 z-[110]"
        >
          <motion.div animate={{ rotate: isExpanded ? 0 : 180 }}>
             <Icon icon="solar:alt-arrow-left-bold" width="16" />
          </motion.div>
        </motion.button>
      </motion.div>
    </>
  );
};

export default Sidebar;