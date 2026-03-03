import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useSelector } from 'react-redux';
import { 
  ShieldCheck, 
  Users, 
  UserCircle, 
  Search, 
  Pencil, 
  Trash2, 
  X, 
  Mail, 
  Lock, 
  Activity, 
  AlertCircle, 
  Skull 
} from 'lucide-react';

const UserManagementList = () => {
  const darkMode = useSelector((state) => state.theme.mode === "dark");
  
  // --- STATE ---
  const [activeRole, setActiveRole] = useState('Admin'); // Toggle state
  const [searchQuery, setSearchQuery] = useState("");

  // Mock Database
  const [users, setUsers] = useState([
    { id: 'ADM001', username: 'super_admin', email: 'admin@system.com', password: '••••••••', role: 'Admin', status: 'Active' },
    { id: 'STF042', username: 'j_doe_staff', email: 'j.doe@univ.edu', password: '••••••••', role: 'Staff', status: 'Suspended' },
    { id: 'STU991', username: 'alex_student', email: 'alex.s@univ.edu', password: '••••••••', role: 'Student', status: 'Active' },
    { id: 'STF088', username: 'sarah_m', email: 'sarah.m@univ.edu', password: '••••••••', role: 'Staff', status: 'Dead' },
  ]);

  // --- 3D TILT EFFECT LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  // --- FILTER LOGIC ---
  const filteredUsers = users.filter(user => 
    user.role === activeRole && 
    (user.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
     user.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Suspended': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'Dead': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-slate-500/10 text-slate-500';
    }
  };

  return (
    <div className={`h-screen w-full flex flex-col items-center justify-center p-6 transition-colors duration-500 relative overflow-hidden font-sans ${
        darkMode ? 'bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-[120px] opacity-30 animate-pulse ${darkMode ? 'bg-indigo-600' : 'bg-indigo-300'}`} />
        <div className={`absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-[120px] opacity-20 ${darkMode ? 'bg-purple-600' : 'bg-purple-300'}`} />
      </div>

      <div className="max-w-6xl w-full flex flex-col items-center relative z-10">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[10px] font-bold tracking-widest uppercase mb-4">
              User Management
            </div>
            <h1 className="text-5xl font-black tracking-tighter leading-tight mb-6">
              User <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Records.</span>
            </h1>
          </motion.div>

          {/* ROLE TOGGLE & SEARCH */}
          <div className="flex flex-col gap-6 items-center">
            <div className={`p-1.5 rounded-2xl border flex gap-1 ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
              {[
                { name: 'Admin', icon: <ShieldCheck size={14} /> },
                { name: 'Staff', icon: <Users size={14} /> },
              ].map((role) => (
                <button
                  key={role.name}
                  onClick={() => setActiveRole(role.name)}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${
                    activeRole === role.name 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                    : 'opacity-40 hover:opacity-100'
                  }`}
                >
                  {role.icon} {role.name}
                </button>
              ))}
            </div>

            <div className={`px-4 py-2.5 rounded-2xl border flex items-center gap-3 transition-all ${darkMode ? 'bg-white/5 border-white/10 focus-within:border-indigo-500' : 'bg-white border-slate-200 shadow-sm'}`}>
              <Search size={18} className="text-indigo-500" />
              <input 
                type="text" 
                placeholder={`Search ${activeRole.toLowerCase()}s...`} 
                className="bg-transparent outline-none text-sm w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* DATA TABLE AREA */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { x.set(0); y.set(0); }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`w-full rounded-[2.5rem] border overflow-hidden transition-all duration-500 ${
              darkMode ? 'bg-white/[0.02] border-white/10 backdrop-blur-xl shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className={`${darkMode ? 'bg-white/5' : 'bg-slate-50'}`}>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest opacity-40">Serial ID</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest opacity-40">User Credentials</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest opacity-40">Access Key</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest opacity-40">Entity Status</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest opacity-40">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                <AnimatePresence mode='popLayout'>
                {filteredUsers.map((user) => (
                  <motion.tr 
                    key={user.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`group transition-all ${darkMode ? 'hover:bg-white/[0.03]' : 'hover:bg-indigo-50/50'}`}
                  >
                    <td className="px-6 py-4 font-mono text-xs font-bold text-indigo-500">{user.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 justify-center">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex-shrink-0 flex items-center justify-center text-white font-black text-xs">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-sm">{user.username}</p>
                          <p className="text-[10px] opacity-50 flex items-center gap-1"><Mail size={10}/> {user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2 opacity-60">
                        <Lock size={12} />
                        <span className="font-mono text-xs">{user.password}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-tight flex items-center justify-center gap-1.5 w-max mx-auto ${getStatusStyle(user.status)}`}>
                        {user.status === 'Active' && <Activity size={10}/>}
                        {user.status === 'Suspended' && <AlertCircle size={10}/>}
                        {user.status === 'Dead' && <Skull size={10}/>}
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <motion.button 
                          whileHover="hover" initial="rest"
                          className={`w-9 h-9 flex items-center justify-center rounded-xl border transition-all ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}
                        >
                          <motion.div variants={{ rest: { rotate: 0 }, hover: { rotate: 360 } }}>
                            <Pencil size={16} className="text-indigo-500" />
                          </motion.div>
                        </motion.button>

                        <motion.button 
                          onClick={() => setUsers(users.filter(u => u.id !== user.id))}
                          whileHover="hover" initial="rest"
                          className={`w-9 h-9 flex items-center justify-center rounded-xl border transition-all ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}
                        >
                          <motion.div variants={{ rest: { rotate: 0 }, hover: { rotate: -360 } }}>
                            <Trash2 size={16} className="text-red-500" />
                          </motion.div>
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
                </AnimatePresence>
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-20 opacity-30 italic text-sm">No operatives found in the {activeRole} category.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserManagementList;