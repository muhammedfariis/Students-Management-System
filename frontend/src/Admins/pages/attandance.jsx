import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';

const AttendancePage = () => {
  const darkMode = useSelector((state) => state.theme.mode === "dark");
  
  // States
  const [formData, setFormData] = useState({ Batch: 'Choose Batch', Date: new Date().toISOString().split('T')[0] });
  const [isBatchOpen, setIsBatchOpen] = useState(false);
  const [openStatusId, setOpenStatusId] = useState(null);
  
  const [students, setStudents] = useState([
    { id: '1', name: 'John Doe', status: 'present' },
    { id: '2', name: 'Jane Smith', status: 'present' },
    { id: '3', name: 'Alex Johnson', status: 'present' },
    { id: '4', name: 'Sarah Williams', status: 'present' }
  ]);

  const batches = ["Batch A - Morning", "Batch B - Evening", "Batch C - Weekend"];
  const statusOptions = ["present", "absent", "Excused", "Halfday - Late", "Half Day - Early Exit"];

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

  const handleStatusChange = (studentId, newStatus) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, status: newStatus } : s));
    setOpenStatusId(null);
  };

  return (
    <div className={`h-screen w-full flex items-center justify-center p-6 transition-colors duration-500 overflow-hidden relative font-sans ${
      darkMode ? 'bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* BACKGROUND ORBS - Z-INDEX 0 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-[120px] opacity-30 animate-pulse ${darkMode ? 'bg-indigo-600' : 'bg-indigo-300'}`} />
        <div className={`absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-[120px] opacity-20 ${darkMode ? 'bg-purple-600' : 'bg-purple-300'}`} />
      </div>

      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* LEFT SIDE UI */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-xs font-bold tracking-widest uppercase">
            Attendance Registry
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none">
            Verify the <br />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Daily Presence.
            </span>
          </h1>
          <p className={`text-lg max-w-md ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Manage and confirm student entry records for the <strong>Attendenx</strong> system.
          </p>
          
          <div className="flex gap-4 pt-4">
            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
              <Icon icon="solar:calendar-mark-bold-duotone" width="32" className="text-indigo-500 mb-2" />
              <h4 className="font-bold text-sm">Real-time</h4>
            </div>
            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
              <Icon icon="solar:users-group-rounded-bold-duotone" width="32" className="text-purple-500 mb-2" />
              <h4 className="font-bold text-sm">Batch Sync</h4>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE: 3D PANEL - Z-INDEX 20 */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { x.set(0); y.set(0); }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className={`relative z-20 group p-8 rounded-[2.5rem] border transition-all duration-500 ${
            darkMode 
              ? 'bg-white/[0.03] border-white/10 backdrop-blur-xl shadow-2xl' 
              : 'bg-white border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)]'
          }`}
        >
          <div className="mb-6 relative z-30" style={{ transform: "translateZ(50px)" }}>
            <h3 className="text-2xl font-black tracking-tight">Mark Attendance</h3>
            <p className="text-sm opacity-50">Select batch and update status.</p>
          </div>

          <div className="space-y-5 relative z-30" style={{ transform: "translateZ(30px)" }}>
            
            {/* BATCH DATALIST */}
            <div className="flex flex-col gap-2 relative">
              <label className="text-xs font-black uppercase tracking-widest opacity-60 ml-1">Batch</label>
              <div 
                onClick={(e) => { e.stopPropagation(); setIsBatchOpen(!isBatchOpen); }}
                className={`w-full px-5 py-4 rounded-2xl border cursor-pointer flex justify-between items-center transition-all ${
                  darkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-slate-100 border-transparent text-slate-900'
                }`}
              >
                <span className="text-sm font-bold">{formData.Batch}</span>
                <Icon icon="solar:alt-arrow-down-bold" className={`text-indigo-500 transition-transform ${isBatchOpen ? 'rotate-180' : ''}`} />
              </div>

              <AnimatePresence>
                {isBatchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 10 }} exit={{ opacity: 0, y: -10 }}
                    className={`absolute top-full left-0 right-0 z-[100] mt-2 p-2 rounded-2xl border backdrop-blur-3xl shadow-2xl ${
                      darkMode ? 'bg-slate-900 border-white/20' : 'bg-white border-slate-200'
                    }`}
                  >
                    {batches.map((b) => (
                      <div key={b} onClick={() => { setFormData({...formData, Batch: b}); setIsBatchOpen(false); }}
                        className={`px-4 py-3 rounded-xl text-xs font-black uppercase cursor-pointer transition-all mb-1 ${
                          formData.Batch === b ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' : darkMode ? 'text-white hover:bg-white/10' : 'text-slate-700 hover:bg-indigo-50'
                        }`}
                      >
                        {b}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* DATE INPUT */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest opacity-60 ml-1">Session Date</label>
              <input 
                type="date" 
                value={formData.Date}
                onChange={(e) => setFormData({...formData, Date: e.target.value})}
                className={`w-full px-5 py-4 rounded-2xl border outline-none font-bold text-sm transition-all ${
                  darkMode ? 'bg-black/40 border-white/10 text-white focus:border-indigo-500' : 'bg-slate-100 border-transparent focus:bg-white text-slate-900 shadow-inner'
                }`}
              />
            </div>

            {/* STUDENT LIST */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-black uppercase tracking-widest opacity-60 ml-1">Students</label>
              <div className="space-y-3">
                {students.map((student) => (
                  <div key={student.id} className={`flex items-center justify-between p-4 rounded-2xl border relative transition-all ${
                    darkMode ? 'bg-black/40 border-white/5' : 'bg-slate-50 border-transparent'
                  }`}>
                    <span className={`text-sm font-bold ml-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{student.name}</span>
                    
                    <div className="relative">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setOpenStatusId(openStatusId === student.id ? null : student.id); }}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-2 border transition-all ${
                          student.status === 'present' ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/10' : 'border-amber-500/30 text-amber-500 bg-amber-500/10'
                        }`}
                      >
                        {student.status}
                        <Icon icon="solar:alt-arrow-down-bold" width="12" />
                      </button>

                      <AnimatePresence>
                        {openStatusId === student.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                            className={`absolute right-0 top-full mt-2 z-[110] w-48 p-2 rounded-2xl border shadow-2xl backdrop-blur-3xl ${
                              darkMode ? 'bg-slate-800 border-white/20' : 'bg-white border-slate-200'
                            }`}
                          >
                            {statusOptions.map((opt) => (
                              <div key={opt} onClick={() => handleStatusChange(student.id, opt)}
                                className={`px-3 py-2.5 rounded-xl text-[10px] font-black uppercase cursor-pointer mb-1 transition-all ${
                                  student.status === opt ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md' : darkMode ? 'text-white hover:bg-white/10' : 'text-slate-700 hover:bg-slate-100'
                                }`}
                              >
                                {opt}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(79, 70, 229, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all cursor-pointer relative z-50"
              style={{ transform: "translateZ(60px)", backfaceVisibility: "hidden" }}
            >
              <Icon icon="solar:check-read-bold" width="20" />
              Initialize Attendance
            </motion.button>
          </div>

          {/* GLOW EFFECT - Z-INDEX 0 */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur opacity-0 group-hover:opacity-20 transition duration-1000 z-0"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default AttendancePage;