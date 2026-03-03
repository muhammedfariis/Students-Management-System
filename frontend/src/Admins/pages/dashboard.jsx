import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell 
} from 'recharts';

const Dashboard = () => {
  const darkMode = useSelector((state) => state.theme.mode === "dark");
  const [loading, setLoading] = useState(true);

  // Simulated data based on your Mongoose Aggregate logic
  const stats = [
    { title: "Total Payments", value: "$45,200", icon: "solar:wad-of-money-bold-duotone", color: "from-emerald-500 to-teal-600", trend: "+12.5%" },
    { title: "Outstanding Fees", value: "$12,850", icon: "solar:bill-list-bold-duotone", color: "from-amber-500 to-orange-600", trend: "-2.4%" },
    { title: "Student Enrolled", value: "1,240", icon: "solar:users-group-rounded-bold-duotone", color: "from-indigo-500 to-purple-600", trend: "+18%" },
    { title: "Sales Conversion", value: "84%", icon: "solar:graph-up-bold-duotone", color: "from-pink-500 to-rose-600", trend: "+5.2%" },
  ];

  const enrollmentData = [
    { name: 'Jan', count: 400 }, { name: 'Feb', count: 300 }, { name: 'Mar', count: 600 },
    { name: 'Apr', count: 800 }, { name: 'May', count: 500 }, { name: 'Jun', count: 900 },
  ];

  const salesData = [
    { name: 'ID: 104', totalenroll: 45 }, { name: 'ID: 202', totalenroll: 52 },
    { name: 'ID: 305', totalenroll: 38 }, { name: 'ID: 088', totalenroll: 65 },
  ];

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" } })
  };

  return (
    <div className={`min-h-screen w-full p-4 md:p-8 transition-colors duration-700 font-sans relative overflow-x-hidden ${
      darkMode ? 'bg-[#020617] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* PREMIUM BACKGROUND ANIMATION */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className={`absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-20 ${darkMode ? 'bg-indigo-600' : 'bg-indigo-300'}`} 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], x: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className={`absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-15 ${darkMode ? 'bg-purple-600' : 'bg-purple-300'}`} 
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl font-black tracking-tight mb-2">
              Financial <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Intelligence.</span>
            </h1>
            <p className="opacity-60 text-lg font-medium">Monitoring Student Enrollments & Fiscal Health</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border backdrop-blur-md ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
              <Icon icon="solar:calendar-bold-duotone" className="text-indigo-500" width="20" />
              <span className="text-sm font-bold">Mar 03, 2026</span>
            </div>
            <button className="p-3 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/30 transition-all active:scale-95">
              <Icon icon="solar:cloud-download-bold" width="24" />
            </button>
          </motion.div>
        </header>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((item, i) => (
            <motion.div
              key={i} custom={i} variants={cardVariants} initial="hidden" animate="visible"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`p-6 rounded-[2rem] border relative overflow-hidden group transition-all ${
                darkMode ? 'bg-white/[0.03] border-white/10' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg`}>
                  <Icon icon={item.icon} width="28" />
                </div>
                <span className={`text-xs font-black px-2 py-1 rounded-lg ${darkMode ? 'bg-white/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
                  {item.trend}
                </span>
              </div>
              <div className="relative z-10">
                <p className="text-sm font-bold opacity-50 uppercase tracking-widest mb-1">{item.title}</p>
                <h2 className="text-3xl font-black">{item.value}</h2>
              </div>
              {/* Subtle background decoration */}
              <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-3xl opacity-10 bg-gradient-to-br ${item.color}`} />
            </motion.div>
          ))}
        </div>

        {/* MAIN ANALYTICS ROW */}
        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          
          {/* ENROLLMENT TRENDS (Matches studentEnrollmentReport) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className={`lg:col-span-2 p-8 rounded-[2.5rem] border backdrop-blur-xl flex flex-col h-[450px] ${
              darkMode ? 'bg-white/[0.03] border-white/10' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-black">Enrollment Momentum</h3>
                <p className="text-sm opacity-50">Monthly volume of new student acquisitions</p>
              </div>
              <select className={`px-4 py-2 rounded-xl text-xs font-bold border outline-none ${darkMode ? 'bg-black/20 border-white/10' : 'bg-slate-100 border-transparent'}`}>
                <option>Group by: Month</option>
                <option>Group by: Quarter</option>
              </select>
            </div>
            
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={enrollmentData}>
                  <defs>
                    <linearGradient id="colorEnroll" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 12}} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: darkMode ? '#1e293b' : '#ffffff', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorEnroll)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* SALES PERFORMANCE (Matches salepersons ID logic) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className={`p-8 rounded-[2.5rem] border backdrop-blur-xl flex flex-col h-[450px] ${
              darkMode ? 'bg-white/[0.03] border-white/10' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <h3 className="text-xl font-black mb-1">Top Salespersons</h3>
            <p className="text-sm opacity-50 mb-8">Conversion per staff ID</p>
            
            <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
              {salesData.map((sale, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs ${darkMode ? 'bg-white/5' : 'bg-slate-100'}`}>
                      {sale.name.split(' ')[1]}
                    </div>
                    <div>
                      <p className="text-sm font-black">{sale.name}</p>
                      <p className="text-[10px] uppercase tracking-wider opacity-40">Active Representative</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-indigo-500">{sale.totalenroll}</p>
                    <p className="text-[10px] opacity-40">Enrollments</p>
                  </div>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className={`w-full py-4 mt-6 rounded-2xl text-xs font-black uppercase tracking-widest border transition-all ${
                darkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-slate-900 text-white border-transparent hover:bg-slate-800'
              }`}
            >
              View Full Team
            </motion.button>
          </motion.div>
        </div>

        {/* FINANCIAL HEALTH BAR (Matches financialReports logic) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className={`p-8 rounded-[2.5rem] border backdrop-blur-xl ${
            darkMode ? 'bg-white/[0.03] border-white/10' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-md">
              <h3 className="text-2xl font-black mb-2">Net Financial Liquidity</h3>
              <p className="text-sm opacity-50 font-medium">Calculation based on <span className="text-indigo-500 font-bold">Total Fees - Total Payments</span> aggregate data.</p>
            </div>
            
            <div className="flex gap-8">
              <div className="text-center">
                <p className="text-xs font-black opacity-40 uppercase tracking-widest mb-1">Collected</p>
                <p className="text-2xl font-black text-emerald-500">$142k</p>
              </div>
              <div className="w-[2px] h-12 bg-white/10 self-center hidden md:block" />
              <div className="text-center">
                <p className="text-xs font-black opacity-40 uppercase tracking-widest mb-1">Receivable</p>
                <p className="text-2xl font-black text-indigo-500">$28k</p>
              </div>
              <div className="w-[2px] h-12 bg-white/10 self-center hidden md:block" />
              <div className="text-center">
                <p className="text-xs font-black opacity-40 uppercase tracking-widest mb-1">Gap Ratio</p>
                <p className="text-2xl font-black text-rose-500">19%</p>
              </div>
            </div>
          </div>
          
          {/* Progress Bar Representing the Financial Ratio */}
          <div className={`w-full h-4 mt-8 rounded-full overflow-hidden ${darkMode ? 'bg-white/5' : 'bg-slate-100'}`}>
            <motion.div 
              initial={{ width: 0 }} animate={{ width: "81%" }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            />
          </div>
        </motion.div>

      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: ${darkMode ? '#334155' : '#cbd5e1'}; 
          border-radius: 10px; 
        }
      `}</style>
    </div>
  );
};

export default Dashboard;