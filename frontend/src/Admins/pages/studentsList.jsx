import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useSelector } from 'react-redux';
// Standard Lucide Icons
import { 
  UserPlus, 
  Search, 
  Pencil, 
  Trash2, 
  X, 
  User, 
  Mail, 
  Calendar, 
  Phone, 
  GraduationCap, 
  School, 
  CheckCircle2 
} from 'lucide-react';

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

  // --- 3D TILT EFFECT FOR MODAL ---
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
        
        {/* HEADER SECTION - CENTERED */}
        <div className="text-center mb-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[10px] font-bold tracking-widest uppercase mb-4">
              School Management System
            </div>
            <h1 className="text-5xl font-black tracking-tighter leading-tight mb-6">
              Student <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Records.</span>
            </h1>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <div className={`px-4 py-2.5 rounded-2xl border flex items-center gap-3 ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
              <Search size={18} className="text-indigo-500" />
              <input type="text" placeholder="Search students..." className="bg-transparent outline-none text-sm w-48" />
            </div>
            <motion.button 
              onClick={() => openModal()}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} 
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-indigo-500/20"
            >
              <UserPlus size={18} /> Add New Student
            </motion.button>
          </div>
        </div>

        {/* DATA TABLE AREA */}
        <motion.div
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
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest opacity-40">ID Number</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest opacity-40">Student Name</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest opacity-40">Age</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest opacity-40">Class</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest opacity-40">Status</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest opacity-40">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {students.map((student) => (
                  <tr key={student.id} className={`group transition-all ${darkMode ? 'hover:bg-white/[0.03]' : 'hover:bg-indigo-50/50'}`}>
                    <td className="px-6 py-4 font-mono text-xs font-bold text-indigo-500">{student.id}</td>
                    <td className="px-6 py-4 text-left">
                      <div className="flex items-center gap-3 justify-center">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex-shrink-0 flex items-center justify-center text-white font-black text-xs">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{student.name}</p>
                          <p className="text-[10px] opacity-50">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">{student.age}</td>
                    <td className="px-6 py-4 text-xs font-bold uppercase opacity-60">{student.class}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                        student.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        {/* EDIT BUTTON */}
                        <motion.button 
                          onClick={() => openModal(student)}
                          whileHover="hover" initial="rest"
                          className={`w-9 h-9 flex items-center justify-center rounded-xl border transition-all ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}
                        >
                          <motion.div variants={{ rest: { rotate: 0 }, hover: { rotate: 360 } }}>
                            <Pencil size={16} className="text-indigo-500" />
                          </motion.div>
                        </motion.button>

                        {/* DELETE BUTTON */}
                        <motion.button 
                          onClick={() => setStudents(students.filter(s => s.id !== student.id))}
                          whileHover="hover" initial="rest"
                          className={`w-9 h-9 flex items-center justify-center rounded-xl border transition-all ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}
                        >
                          <motion.div variants={{ rest: { rotate: 0 }, hover: { rotate: -360 } }}>
                            <Trash2 size={16} className="text-red-500" />
                          </motion.div>
                        </motion.button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* --- FORM MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
            
            <motion.div 
              onMouseMove={handleMouseMove}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className={`relative w-full max-w-lg p-10 rounded-[3rem] border shadow-2xl ${darkMode ? 'bg-[#0f172a] border-white/10 text-white' : 'bg-white border-slate-200'}`}
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400">
                <X size={20}/>
              </button>
              
              <div className="mb-8">
                <h2 className="text-3xl font-black tracking-tighter uppercase">{editingStudent ? 'Edit Student' : 'Add Student'}</h2>
                <div className="h-1 w-12 bg-indigo-600 rounded-full mt-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                {/* NAME FIELD */}
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40 flex items-center gap-2"><User size={12} /> Full Name</label>
                  <input className={`px-5 py-3 rounded-2xl border outline-none text-xs font-bold ${darkMode ? 'bg-white/5 border-white/10 focus:border-indigo-500' : 'bg-slate-100 focus:bg-white focus:border-indigo-500'}`} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>

                {/* EMAIL FIELD */}
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40 flex items-center gap-2"><Mail size={12} /> Email Address</label>
                  <input type="email" className={`px-5 py-3 rounded-2xl border outline-none text-xs font-bold ${darkMode ? 'bg-white/5 border-white/10 focus:border-indigo-500' : 'bg-slate-100 focus:bg-white focus:border-indigo-500'}`} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>

                {/* AGE FIELD */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40 flex items-center gap-2"><Calendar size={12} /> Age</label>
                  <input type="number" className={`px-5 py-3 rounded-2xl border outline-none text-xs font-bold ${darkMode ? 'bg-white/5 border-white/10 focus:border-indigo-500' : 'bg-slate-100 focus:bg-white focus:border-indigo-500'}`} value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} />
                </div>

                {/* PHONE FIELD */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40 flex items-center gap-2"><Phone size={12} /> Phone</label>
                  <input className={`px-5 py-3 rounded-2xl border outline-none text-xs font-bold ${darkMode ? 'bg-white/5 border-white/10 focus:border-indigo-500' : 'bg-slate-100 focus:bg-white focus:border-indigo-500'}`} value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>

                {/* BATCH FIELD */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40 flex items-center gap-2"><GraduationCap size={12} /> Graduation Year</label>
                  <input className={`px-5 py-3 rounded-2xl border outline-none text-xs font-bold ${darkMode ? 'bg-white/5 border-white/10 focus:border-indigo-500' : 'bg-slate-100 focus:bg-white focus:border-indigo-500'}`} value={formData.batch} onChange={(e) => setFormData({...formData, batch: e.target.value})} />
                </div>

                {/* CLASS FIELD */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40 flex items-center gap-2"><School size={12} /> Class</label>
                  <input className={`px-5 py-3 rounded-2xl border outline-none text-xs font-bold ${darkMode ? 'bg-white/5 border-white/10 focus:border-indigo-500' : 'bg-slate-100 focus:bg-white focus:border-indigo-500'}`} value={formData.class} onChange={(e) => setFormData({...formData, class: e.target.value})} />
                </div>

                {/* STATUS TOGGLE */}
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40 flex items-center gap-2"><CheckCircle2 size={12} /> Account Status</label>
                  <div className="flex gap-2">
                    {['Active', 'Suspended' , "Dead"].map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setFormData({...formData, status})}
                        className={`flex-1 py-3 rounded-2xl text-[10px] font-bold uppercase border transition-all ${
                          formData.status === status 
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' 
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
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full py-5 mt-8 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-500/20"
              >
                {editingStudent ? 'Save Changes' : 'Add Student'}
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentList;