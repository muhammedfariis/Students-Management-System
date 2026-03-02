import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';

const StudentList = () => {
  const darkMode = useSelector((state) => state.theme.mode === "dark");
  
  // --- STATE ---
  const [students, setStudents] = useState([
    { id: 'STU001', name: 'Alex Rivera', email: 'alex.r@univ.edu', batch: '2024', status: 'Active', age: '21', phone: '+1 234 567 890', class: 'Grade 12' },
    { id: 'STU002', name: 'Sarah Chen', email: 's.chen@univ.edu', batch: '2023', status: 'Active', age: '22', phone: '+1 987 654 321', class: 'Grade 11' },
    { id: 'STU003', name: 'Marcus Bell', email: 'm.bell@univ.edu', batch: '2024', status: 'Suspended', age: '20', phone: '+1 555 012 345', class: 'Grade 12' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({ name: '', age: '', phone: '', batch: '', class: '', status: 'Active', email: '' });

  // --- MODAL LOGIC ---
  const openModal = (student = null) => {
    if (student) {
      setEditingStudent(student);
      setFormData(student);
    } else {
      setEditingStudent(null);
      setFormData({ name: '', age: '', phone: '', batch: '', class: '', status: 'Active', email: '' });
    }
    setIsModalOpen(true);
  };

  // --- 3D PARALLAX LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["1.5deg", "-1.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-1.5deg", "1.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  // --- ROTATING ACTION BUTTON COMPONENT ---
  const ActionButton = ({ icon, label, colorClass, onClick }) => (
    <div className="relative group flex items-center justify-center">
      <motion.button
        onClick={onClick}
        whileHover="hover"
        initial="rest"
        className={`relative z-10 w-9 h-9 flex items-center justify-center rounded-xl transition-all shadow-sm ${
            darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200'
        }`}
      >
        <motion.div
          variants={{
            rest: { rotate: 0, scale: 1 },
            hover: { rotate: 360, scale: 1.2, transition: { type: "spring", stiffness: 300 } }
          }}
          className={colorClass}
        >
          <Icon icon={icon} width="18" />
        </motion.div>
        
        <motion.span
          variants={{ rest: { opacity: 0, scale: 0.8 }, hover: { opacity: 1, scale: 1 } }}
          className={`absolute -bottom-9 pointer-events-none text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded shadow-xl z-50 whitespace-nowrap ${
            darkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900 border'
          }`}
        >
          {label}
        </motion.span>
      </motion.button>
    </div>
  );

  return (
    <div className={`h-screen w-full flex flex-col p-8 transition-colors duration-500 relative overflow-hidden font-sans ${
        darkMode ? 'bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* ORIGINAL DYNAMIC BACKGROUND ORBS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-[120px] opacity-30 animate-pulse ${darkMode ? 'bg-indigo-600' : 'bg-indigo-300'}`} />
        <div className={`absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-[120px] opacity-20 ${darkMode ? 'bg-purple-600' : 'bg-purple-300'}`} />
      </div>

      <div className="max-w-7xl mx-auto w-full flex flex-col h-full relative z-10">
        
        {/* HEADER: ORIGINAL HEAVY TYPOGRAPHY */}
        <div className="flex items-center justify-between mb-8 flex-shrink-0">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[10px] font-black tracking-widest uppercase mb-2">
              Management Portal
            </div>
            <h1 className="text-4xl font-black tracking-tighter leading-none">
                Student <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Directory.</span>
            </h1>
          </motion.div>

          <div className="flex items-center gap-4">
            <div className={`px-4 py-2.5 rounded-2xl border flex items-center gap-3 ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
              <Icon icon="solar:magnifer-bold-duotone" width="20" className="text-indigo-500" />
              <input type="text" placeholder="Quick Search..." className="bg-transparent outline-none text-xs font-bold w-44" />
            </div>
            <motion.button 
              onClick={() => openModal()}
              whileHover={{ scale: 1.05, skewX: -3 }} whileTap={{ scale: 0.95 }} 
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-indigo-500/20"
            >
              <Icon icon="solar:user-plus-bold" width="18" /> Add Operative
            </motion.button>
          </div>
        </div>

        {/* TABLE: TIGHT ALIGNMENT, NO WASTED SPACE */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { x.set(0); y.set(0); }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className={`flex-1 flex flex-col rounded-[2.5rem] border overflow-hidden mb-4 transition-all duration-500 ${
              darkMode ? 'bg-white/[0.02] border-white/10 backdrop-blur-xl shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
          }`}
        >
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse table-fixed">
              <thead>
                <tr className={`${darkMode ? 'bg-white/5' : 'bg-slate-50'}`}>
                  <th className="w-24 px-6 py-5 text-[10px] font-black uppercase tracking-widest opacity-40">Serial ID</th>
                  <th className="w-64 px-6 py-5 text-[10px] font-black uppercase tracking-widest opacity-40">Identity</th>
                  <th className="w-20 px-6 py-5 text-[10px] font-black uppercase tracking-widest opacity-40">Age</th>
                  <th className="w-28 px-6 py-5 text-[10px] font-black uppercase tracking-widest opacity-40">Batch</th>
                  <th className="w-28 px-6 py-5 text-[10px] font-black uppercase tracking-widest opacity-40">Class</th>
                  <th className="w-36 px-6 py-5 text-[10px] font-black uppercase tracking-widest opacity-40">Phone</th>
                  <th className="w-32 px-6 py-5 text-[10px] font-black uppercase tracking-widest opacity-40 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {students.map((student) => (
                  <tr key={student.id} className={`group transition-all ${darkMode ? 'hover:bg-white/[0.03]' : 'hover:bg-indigo-50/50'}`}>
                    <td className="px-6 py-4 font-mono text-[11px] font-black text-indigo-500">{student.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex-shrink-0 flex items-center justify-center text-white font-black text-xs">
                          {student.name.charAt(0)}
                        </div>
                        <div className="truncate">
                          <p className="font-black text-xs uppercase tracking-tight truncate">{student.name}</p>
                          <p className="text-[10px] font-bold opacity-40 truncate">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-black">{student.age}</td>
                    <td className="px-6 py-4 text-[10px] font-black uppercase opacity-60">{student.batch}</td>
                    <td className="px-6 py-4 text-[10px] font-black uppercase opacity-60">{student.class}</td>
                    <td className="px-6 py-4 text-[11px] font-mono font-bold opacity-50">{student.phone}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <ActionButton icon="solar:pen-new-square-bold-duotone" label="Edit" colorClass="text-indigo-500" onClick={() => openModal(student)} />
                        <ActionButton icon="solar:trash-bin-trash-bold-duotone" label="Delete" colorClass="text-red-500" onClick={() => setStudents(students.filter(s => s.id !== student.id))} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* --- REFINED EXTREME MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`relative w-full max-w-lg p-10 rounded-[3rem] border shadow-2xl ${darkMode ? 'bg-[#0f172a] border-white/10 text-white' : 'bg-white border-slate-200'}`}
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400"><Icon icon="solar:close-circle-bold" width="24"/></button>
              
              <div className="mb-8">
                <h2 className="text-3xl font-black tracking-tighter uppercase">{editingStudent ? 'Update Profile' : 'New Operative'}</h2>
                <div className="h-1 w-12 bg-indigo-600 rounded-full mt-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                {[
                  { label: 'Full Name', name: 'name', type: 'text', icon: 'solar:user-bold' },
                  { label: 'Email Address', name: 'email', type: 'email', icon: 'solar:letter-bold' },
                  { label: 'Age', name: 'age', type: 'number', icon: 'solar:calendar-minimalistic-bold' },
                  { label: 'Phone', name: 'phone', type: 'text', icon: 'solar:phone-bold' },
                  { label: 'Batch', name: 'batch', type: 'text', icon: 'solar:flag-bold' },
                  { label: 'Class', name: 'class', type: 'text', icon: 'solar:layers-bold' },
                ].map((field) => (
                  <div key={field.name} className={`flex flex-col gap-1.5 ${field.name === 'name' || field.name === 'email' ? 'col-span-2' : ''}`}>
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1 flex items-center gap-2">
                        <Icon icon={field.icon} width="12" className="text-indigo-500" /> {field.label}
                    </label>
                    <input 
                      type={field.type} 
                      className={`px-5 py-3.5 rounded-2xl border outline-none text-xs font-bold transition-all ${
                        darkMode ? 'bg-white/5 border-white/10 focus:border-indigo-500' : 'bg-slate-100 border-transparent focus:bg-white focus:border-indigo-500 shadow-inner'
                      }`}
                      value={formData[field.name]}
                      onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                    />
                  </div>
                ))}

                <div className="col-span-2 flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1 flex items-center gap-2">
                        <Icon icon="solar:shield-user-bold" width="12" className="text-indigo-500" /> Status
                    </label>
                    <div className="flex gap-2">
                        {['Active', 'Suspended'].map((status) => (
                            <button
                                key={status}
                                type="button"
                                onClick={() => setFormData({...formData, status})}
                                className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                                    formData.status === status 
                                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                                    : darkMode ? 'bg-white/5 border-white/10 text-white/40' : 'bg-slate-100 border-transparent text-slate-400'
                                }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(79, 70, 229, 0.4)", skewX: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 mt-8 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-indigo-500/20 transition-all"
              >
                {editingStudent ? 'Sync Changes' : 'Initialize Record'}
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentList;