import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';

const AttendancePage = () => {
  const darkMode = useSelector((state) => state.theme.mode === "dark");
  
  // Form State
  const [selectedBatch, setSelectedBatch] = useState("");
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState([
    { id: '1', name: 'John Doe', status: 'present' },
    { id: '2', name: 'Jane Smith', status: 'present' },
    { id: '3', name: 'Alex Johnson', status: 'present' },
  ]);

  // Mock data for dropdowns
  const batches = ["Batch A - Morning", "Batch B - Evening", "Batch C - Weekend"];
  const statusOptions = ["present", "absent", "Excused", "Halfday - Late", "Half Day - Early Exit"];

  // --- 3D PARALLAX LOGIC ---
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

  const handleStatusChange = (studentId, newStatus) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, status: newStatus } : s));
  };

  const submitAttendance = () => {
    const payload = {
      batchId: selectedBatch,
      date: attendanceDate,
      records: students.map(s => ({ studentId: s.id, status: s.status }))
    };
    console.log("Submitting to Controller:", payload);
    alert("Attendance data sent to system!");
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-6 transition-colors duration-500 overflow-hidden relative font-sans ${
      darkMode ? 'bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* DYNAMIC BACKGROUND ORBS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-[120px] opacity-30 animate-pulse ${darkMode ? 'bg-indigo-600' : 'bg-indigo-300'}`} />
        <div className={`absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-[120px] opacity-20 ${darkMode ? 'bg-purple-600' : 'bg-purple-300'}`} />
      </div>

      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-start relative z-10">
        
        {/* LEFT SIDE: INFO & SELECTION */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6 lg:sticky lg:top-12"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold tracking-widest uppercase">
            Attendance Registry
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none">
            Track Daily <br />
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 bg-clip-text text-transparent">
              Presence.
            </span>
          </h1>
          <p className={`text-lg max-w-md ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Log student attendance for your current sessions. The system automatically handles <strong>9:00 AM late marks</strong>.
          </p>
          
          {/* SELECTION CONTROLS */}
          <div className="space-y-4 pt-4">
            <div className="flex flex-col gap-2">
               <label className="text-xs font-black uppercase tracking-widest opacity-60 ml-1">Select Batch</label>
               <select 
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className={`w-full max-w-sm px-5 py-4 rounded-2xl outline-none border transition-all font-bold text-sm appearance-none ${
                    darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 shadow-sm text-slate-900'
                }`}
               >
                 <option value="">Choose a batch...</option>
                 {batches.map(b => <option key={b} value={b}>{b}</option>)}
               </select>
            </div>

            <div className="flex flex-col gap-2">
               <label className="text-xs font-black uppercase tracking-widest opacity-60 ml-1">Session Date</label>
               <input 
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className={`w-full max-w-sm px-5 py-4 rounded-2xl outline-none border transition-all font-bold text-sm ${
                    darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 shadow-sm text-slate-900'
                }`}
               />
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE: THE 3D STUDENT LIST */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { x.set(0); y.set(0); }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className={`relative group p-8 rounded-[2.5rem] border transition-all duration-500 ${
            darkMode 
              ? 'bg-white/[0.03] border-white/10 backdrop-blur-xl shadow-2xl' 
              : 'bg-white border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)]'
          }`}
        >
          <div className="mb-8 flex justify-between items-end" style={{ transform: "translateZ(50px)" }}>
            <div>
                <h3 className="text-2xl font-black tracking-tight">Student List</h3>
                <p className="text-sm opacity-50">Mark presence for today's session.</p>
            </div>
            <div className="text-xs font-bold px-3 py-1 bg-indigo-500/10 text-indigo-500 rounded-lg">
                {students.length} Total
            </div>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar" style={{ transform: "translateZ(30px)" }}>
            {students.map((student) => (
              <div 
                key={student.id}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                    darkMode ? 'bg-black/20 border-white/5 hover:border-indigo-500/50' : 'bg-slate-50 border-transparent hover:bg-white hover:border-indigo-200 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                        {student.name.charAt(0)}
                    </div>
                    <div>
                        <h4 className="font-bold text-sm">{student.name}</h4>
                        <p className="text-[10px] uppercase tracking-tighter opacity-50">ID: {student.id}</p>
                    </div>
                </div>

                <select 
                    value={student.status}
                    onChange={(e) => handleStatusChange(student.id, e.target.value)}
                    className={`text-xs font-black uppercase p-2 rounded-xl border-none cursor-pointer outline-none ${
                        student.status === 'present' ? 'bg-emerald-500/20 text-emerald-500' : 
                        student.status === 'absent' ? 'bg-red-500/20 text-red-500' : 'bg-amber-500/20 text-amber-500'
                    }`}
                >
                    {statusOptions.map(opt => (
                        <option key={opt} value={opt} className="bg-slate-900 text-white">{opt}</option>
                    ))}
                </select>
              </div>
            ))}
          </div>

          <motion.button
            onClick={submitAttendance}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)", skewX: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-5 mt-8 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-900/20"
            style={{ transform: "translateZ(60px)" }}
          >
            <Icon icon="solar:check-read-bold" width="20" />
            Save Attendance
          </motion.button>

          {/* GLOW EFFECT */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-[2.5rem] blur opacity-0 group-hover:opacity-10 transition duration-1000"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default AttendancePage;