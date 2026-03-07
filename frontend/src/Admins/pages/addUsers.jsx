import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import toast, { Toaster } from 'react-hot-toast';
import API from '../../Api/auth/API';

const AddUserPage = () => {
  const darkMode = useSelector((state) => state.theme.mode === "dark");
  const [loading, setLoading] = useState(false);
  const [roleCreating, setRoleCreating] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCreateRoleMode, setIsCreateRoleMode] = useState(false); 
  
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Staff'
  });

  const [newRoleName, setNewRoleName] = useState(''); 
  const [rolesList, setRolesList] = useState(["Admin" , "Staff"]);

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

  const handle = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreateRole = async () => {
    if (!newRoleName) return toast.error("Enter a role name");
    
    setRoleCreating(true);
    try {
      await API.post('/roles', { name: newRoleName, permissions: ["default"] });
      setRolesList((prev) => [...prev, newRoleName]);
      setForm((prev) => ({ ...prev, role: newRoleName }));
      toast.success(`Role "${newRoleName}" created!`);
      setNewRoleName('');
      setIsCreateRoleMode(false); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create role");
    } finally {
      setRoleCreating(false);
    }
  };

  const handleInitializeUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/officials/users', form);
      toast.success('User Initialized Successfully!');
      setForm({ username: '', email: '', password: '', role: 'Staff' });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`h-full min-h-screen w-full flex items-center justify-center p-6 transition-colors duration-500 overflow-hidden relative font-sans ${
      darkMode ? 'bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <Toaster position="top-right" />
      
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-xs font-bold tracking-widest uppercase">
            Management Portal
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none">
            {isCreateRoleMode ? "Define New" : "Expand your"}<br />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {isCreateRoleMode ? "Authority." : "Digital Frontier."}
            </span>
          </h1>
        </motion.div>

        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { x.set(0); y.set(0); }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className={`relative group p-8 rounded-[2.5rem] border transition-all duration-500 ${
            darkMode ? 'bg-white/[0.03] border-white/10 backdrop-blur-xl shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
          }`}
        >
          <div className="flex bg-black/10 dark:bg-white/5 p-1 rounded-xl mb-8 w-fit mx-auto lg:mx-0">
            <button 
              onClick={() => setIsCreateRoleMode(false)}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${!isCreateRoleMode ? 'bg-indigo-600 text-white shadow-lg' : 'opacity-50'}`}
            >
              Add User
            </button>
            <button 
              onClick={() => setIsCreateRoleMode(true)}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${isCreateRoleMode ? 'bg-purple-600 text-white shadow-lg' : 'opacity-50'}`}
            >
              Create Role
            </button>
          </div>

          <AnimatePresence mode="wait">
            {!isCreateRoleMode ? (
              <motion.form 
                key="user-form"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="space-y-5" 
                onSubmit={handleInitializeUser}
              >
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500 ml-1">Username</label>
                  <input name="username" value={form.username} onChange={handle} type="text" placeholder="Username" required 
                    className={`w-full px-5 py-4 rounded-2xl outline-none border transition-all font-bold text-sm ${darkMode ? 'bg-black/20 border-white/10 focus:border-indigo-500' : 'bg-slate-100 border-slate-200 focus:border-indigo-500'}`} 
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500 ml-1">Email</label>
                  <input name="email" value={form.email} onChange={handle} type="email" placeholder="operative@gmail.com" required 
                    className={`w-full px-5 py-4 rounded-2xl outline-none border transition-all font-bold text-sm ${darkMode ? 'bg-black/20 border-white/10 focus:border-indigo-500' : 'bg-slate-100 border-slate-200 focus:border-indigo-500'}`} 
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500 ml-1">Password</label>
                  <input name="password" value={form.password} onChange={handle} type="password" placeholder="••••••••" required 
                    className={`w-full px-5 py-4 rounded-2xl outline-none border transition-all font-bold text-sm ${darkMode ? 'bg-black/20 border-white/10 focus:border-indigo-500' : 'bg-slate-100 border-slate-200 focus:border-indigo-500'}`} 
                  />
                </div>

                <div className="flex flex-col gap-1 relative">
                  <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500 ml-1">Assigned Role</label>
                  <div onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={`w-full px-5 py-4 rounded-2xl border cursor-pointer flex justify-between items-center transition-all ${darkMode ? 'bg-black/20 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
                    <span className="text-sm font-bold">{form.role}</span>
                    <Icon icon="solar:alt-arrow-down-bold" className={`text-indigo-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: -5 }} exit={{ opacity: 0, y: 10 }}
                        className={`absolute bottom-[110%] left-0 right-0 z-[100] p-2 rounded-2xl border backdrop-blur-2xl shadow-2xl max-h-48 overflow-y-auto ${darkMode ? 'bg-[#0f172a]/95 border-white/20' : 'bg-white/95 border-slate-200'}`}
                      >
                        {rolesList.map((r) => (
                          <div key={r} onClick={() => { setForm({...form, role: r}); setIsDropdownOpen(false); }}
                            className={`px-4 py-3 rounded-xl text-xs font-black uppercase cursor-pointer transition-all ${form.role === r ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-indigo-500/10'}`}
                          >{r}</div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className={`w-full py-5 mt-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 ${loading ? 'opacity-70' : ''}`}
                >
                  <Icon icon={loading ? "line-md:loading-twotone-loop" : "solar:user-plus-bold"} width="20" />
                  {loading ? "Initializing..." : "Initialize User"}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div 
                key="role-form"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-purple-500 ml-1">New Role Name</label>
                  <input 
                    value={newRoleName} 
                    onChange={(e) => setNewRoleName(e.target.value)} 
                    type="text" 
                    placeholder="e.g. Supervisor" 
                    className={`w-full px-5 py-6 rounded-2xl outline-none border transition-all font-black text-lg ${darkMode ? 'bg-black/20 border-white/10 focus:border-purple-500' : 'bg-slate-100 border-slate-200 focus:border-purple-500'}`} 
                  />
                  <p className="text-[10px] opacity-50 px-2 italic">* This will add a new category to the user assignment list.</p>
                </div>

                <motion.button 
                  onClick={handleCreateRole}
                  disabled={roleCreating}
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)" }} 
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-5 bg-purple-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 ${roleCreating ? 'opacity-70' : ''}`}
                >
                  <Icon icon={roleCreating ? "line-md:loading-twotone-loop" : "solar:shield-plus-bold"} width="20" />
                  {roleCreating ? "Creating Authority..." : "Create New Role"}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={`absolute -inset-1 bg-gradient-to-r ${isCreateRoleMode ? 'from-purple-500 to-pink-600' : 'from-indigo-500 to-purple-600'} rounded-[2.5rem] blur opacity-0 group-hover:opacity-20 transition duration-1000 pointer-events-none`}></div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddUserPage;