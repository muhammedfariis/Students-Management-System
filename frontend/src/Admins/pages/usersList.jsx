import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useSelector } from 'react-redux';
import { 
  ShieldCheck, 
  Users, 
  Search, 
  Pencil, 
  Trash2, 
  Mail, 
  Lock, 
  Activity, 
  AlertCircle, 
  Skull,
  X,
  Save,
  Fingerprint,
  Loader2
} from 'lucide-react';
import API from '../../Api/auth/API';
import toast, { Toaster } from 'react-hot-toast';

const UserManagementList = () => {
  const darkMode = useSelector((state) => state.theme.mode === "dark");
  
  // --- STATE ---
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeRole, setActiveRole] = useState('Admin'); 
  const [searchQuery, setSearchQuery] = useState("");
  const [availableRoles, setAvailableRoles] = useState([]);

  // Edit States
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({ username: '', email: '' });
  const [isUpdating, setIsUpdating] = useState(false);

  // --- FETCH DATA ---
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await API.get("/officials/users");
      const fetchedUsers = response.data.users;
      setUsers(fetchedUsers);

      const roles = [...new Set(fetchedUsers.map(u => u.role?.name))].filter(Boolean);
      setAvailableRoles(roles);
      if (roles.length > 0 && !roles.includes(activeRole)) setActiveRole(roles[0]);
    } catch (err) {
      toast.error("Failed to sync records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  // --- UPDATE & DELETE LOGIC ---
  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await API.put(`/officials/users/${editingUser._id}`, editFormData);
      toast.success("Identity Re-encrypted Successfully");
      setTimeout(() => {
        setEditingUser(null);
        setIsUpdating(false);
        fetchUsers();
      }, 500);
    } catch (err) {
      toast.error("Protocol Failure: Update rejected");
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Terminate this entity?")) return;
    try {
      await API.delete(`/officials/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
      toast.success("Entity removed from records");
    } catch (err) {
      toast.error("Deletion failed");
    }
  };

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
    user.role?.name === activeRole && 
    (user.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
     user.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className={`h-screen w-full flex flex-col items-center justify-center p-6 transition-colors duration-500 relative overflow-hidden font-sans ${
        darkMode ? 'bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <Toaster position="top-right" />
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-[120px] opacity-30 animate-pulse ${darkMode ? 'bg-indigo-600' : 'bg-indigo-300'}`} />
        <div className={`absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-[120px] opacity-20 ${darkMode ? 'bg-purple-600' : 'bg-purple-300'}`} />
      </div>

      <div className={`max-w-6xl w-full flex flex-col items-center relative z-10 transition-all duration-500 ${editingUser ? 'scale-95 blur-sm opacity-50' : 'scale-100'}`}>
        
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
              {availableRoles.map((role) => (
                <button
                  key={role}
                  onClick={() => setActiveRole(role)}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${
                    activeRole === role 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                    : 'opacity-40 hover:opacity-100'
                  }`}
                >
                  {role === 'Admin' ? <ShieldCheck size={14} /> : <Users size={14} />} {role}
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
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest opacity-40">Permissions</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest opacity-40">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                <AnimatePresence mode='popLayout'>
                {loading ? (
                  <tr><td colSpan="4" className="py-20"><Loader2 className="animate-spin text-indigo-500 mx-auto" /></td></tr>
                ) : filteredUsers.map((user) => (
                  <motion.tr 
                    key={user._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`group transition-all ${darkMode ? 'hover:bg-white/[0.03]' : 'hover:bg-indigo-50/50'}`}
                  >
                    <td className="px-6 py-4 font-mono text-xs font-bold text-indigo-500">#{user._id.slice(-6)}</td>
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
                        <div className="flex flex-wrap gap-1 justify-center max-w-[200px] mx-auto">
                            {user.role?.permissions?.map(perm => (
                            <span key={perm} className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-500 text-[9px] font-bold border border-indigo-500/20">{perm}</span>
                            ))}
                        </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <motion.button 
                          onClick={() => { setEditingUser(user); setEditFormData({username: user.username, email: user.email}) }}
                          whileHover="hover" initial="rest"
                          className={`w-9 h-9 flex items-center justify-center rounded-xl border transition-all ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}
                        >
                          <motion.div variants={{ rest: { rotate: 0 }, hover: { rotate: 360 } }}>
                            <Pencil size={16} className="text-indigo-500" />
                          </motion.div>
                        </motion.button>

                        <motion.button 
                          onClick={() => handleDelete(user._id)}
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
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* PREMIUM CENTER MODAL EDIT FORM */}
      <AnimatePresence>
        {editingUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => !isUpdating && setEditingUser(null)} 
                className="absolute inset-0 bg-black/60 backdrop-blur-xl" 
            />
            
            <motion.div 
              initial={{ x: 600, opacity: 0, scale: 0.5 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -600, opacity: 0, scale: 0.5 }} // Slides to center then left on exit
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className={`relative w-full max-w-md p-10 rounded-[3rem] border shadow-2xl ${
                darkMode ? 'bg-[#0f172a] border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Fingerprint className="text-indigo-500" size={32} />
                </div>
                <h2 className="text-2xl font-black tracking-tight">Modify Identity</h2>
                <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-1">Registry Patch Protocol</p>
              </div>

              <form onSubmit={handleUpdate} className="space-y-5">
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Username</label>
                    <input 
                        type="text" 
                        className={`w-full px-6 py-4 rounded-2xl outline-none font-bold text-sm transition-all ${darkMode ? 'bg-black/40 border border-white/10 focus:border-indigo-500' : 'bg-slate-100 border-transparent focus:border-indigo-500'}`} 
                        value={editFormData.username} 
                        onChange={e => setEditFormData({...editFormData, username: e.target.value})} 
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Email Address</label>
                    <input 
                        type="email" 
                        className={`w-full px-6 py-4 rounded-2xl outline-none font-bold text-sm transition-all ${darkMode ? 'bg-black/40 border border-white/10 focus:border-indigo-500' : 'bg-slate-100 border-transparent focus:border-indigo-500'}`} 
                        value={editFormData.email} 
                        onChange={e => setEditFormData({...editFormData, email: e.target.value})} 
                    />
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="submit" 
                    disabled={isUpdating}
                    className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/20"
                  >
                    {isUpdating ? <Loader2 className="animate-spin" size={16} /> : <><Save size={16} /> Commit Change</>}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserManagementList;