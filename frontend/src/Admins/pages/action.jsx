import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import API from '../../Api/auth/API';

const ActionPage = () => {
  const darkMode = useSelector((state) => state.theme.mode === "dark");
  const [loading , setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    actionType: 'Suspension', 
    targetCategory: 'Select', 
    idNumber: '',
    duration: '',
    reason: '',
    effectiveDate: ''
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const categories = ["Student", "Staff", "Admin", "Cashier"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAction = async (e)=>{
    e.preventDefault()
    setLoading(true)
    try{
      const api = await API.post("/actions/create" , formData)
      console.log("action data : " , api);

      setTimeout(() => {
        toast.success("action submitted")
      }, 2000);
      
      setFormData({actionType : '' , targetCategory : '' , idNumber : '' , effectiveDate : '' , duration : '' , reason : ""})
    }catch(err){
      console.log(err?.response?.data?.message || "form not submited");
      toast.error("form submition has some issue please check console")
    }finally{
      setLoading(false)
    }
  }

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-6 transition-colors duration-500 overflow-hidden relative font-sans ${
      darkMode ? 'bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* ALERT BACKGROUND ORBS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-[120px] opacity-20 bg-red-600 animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-[120px] opacity-10 bg-orange-600" />
      </div>

      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* LEFT SIDE - WARNING CONTENT */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold tracking-widest uppercase">
            Administrative Authority
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none">
            Issue <br />
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-600 bg-clip-text text-transparent">
              Direct Action.
            </span>
          </h1>
          <p className={`text-lg max-w-md ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Securely process suspensions and dismissals. This action will be logged in the permanent record and notified to the user.
          </p>
          
          <div className="flex gap-4 pt-4">
            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
              <Icon icon="solar:shield-warning-bold-duotone" width="32" className="text-red-500 mb-2" />
              <h4 className="font-bold text-sm">Security Log</h4>
            </div>
            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
              <Icon icon="solar:letter-bold-duotone" width="32" className="text-orange-500 mb-2" />
              <h4 className="font-bold text-sm">Instant Notice</h4>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE - DISCIPLINARY FORM */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { x.set(0); y.set(0); }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className={`relative group p-8 rounded-[2.5rem] border transition-all duration-500 ${
            darkMode ? 'bg-white/[0.03] border-white/10 backdrop-blur-xl shadow-2xl' : 'bg-white border-slate-200 shadow-2xl'
          }`}
        >
          {/* ACTION TYPE TOGGLE */}
          <div className="flex bg-black/10 dark:bg-white/5 p-1 rounded-2xl mb-6 relative z-50">
            {['Suspension', 'Dismissal'].map((type) => (
              <button
                key={type}
                onClick={() => setFormData({...formData, actionType: type})}
                className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  formData.actionType === type 
                    ? 'bg-red-600 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-red-400'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <form className="space-y-4 relative z-50" onSubmit={(e) => e.preventDefault()}>
            
            {/* TARGET SELECTOR */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 relative">
                <label className="text-xs font-black uppercase tracking-widest opacity-60 ml-1">Target Category</label>
                <div 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full px-5 py-3 rounded-2xl border cursor-pointer flex justify-between items-center transition-all ${
                    darkMode ? 'bg-black/40 border-white/10' : 'bg-slate-100 border-transparent'
                  }`}
                >
                  <span className="text-sm font-bold">{formData.targetCategory}</span>
                  <Icon icon="solar:alt-arrow-down-bold" className="text-red-500" />
                </div>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div className={`absolute top-full left-0 right-0 z-[100] mt-2 p-2 rounded-2xl border backdrop-blur-2xl ${darkMode ? 'bg-[#0f172a] border-white/20' : 'bg-white border-slate-200 shadow-xl'}`}>
                      {categories.map((cat) => (
                        <div key={cat} onClick={() => { setFormData({...formData, targetCategory: cat}); setIsDropdownOpen(false); }} className="px-4 py-2 rounded-xl text-xs font-black hover:bg-red-500 hover:text-white cursor-pointer transition-all">
                          {cat}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-black uppercase tracking-widest opacity-60 ml-1">ID Number</label>
                <input 
                  type="text" name="idNumber" placeholder="e.g. STU-9920"
                  value={formData.idNumber} onChange={handleChange}
                  className={`w-full px-5 py-3 rounded-2xl outline-none border transition-all font-bold text-sm ${darkMode ? 'bg-black/40 border-white/10 focus:border-red-500 text-white' : 'bg-slate-100 border-transparent focus:bg-white focus:border-red-500'}`}
                />
              </div>
            </div>

            {/* DATES */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-black uppercase tracking-widest opacity-60 ml-1">Effective Date</label>
                <input 
                  type="date" name="effectiveDate"
                  value={formData.effectiveDate} onChange={handleChange}
                  className={`w-full px-5 py-3 rounded-2xl outline-none border transition-all font-bold text-sm ${darkMode ? 'bg-black/40 border-white/10 focus:border-red-500 text-white' : 'bg-slate-100 border-transparent focus:bg-white focus:border-red-500'}`}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-black uppercase tracking-widest opacity-60 ml-1">Duration (Days)</label>
                <input 
                  type="number" name="duration" placeholder="e.g. 14"
                  disabled={formData.actionType === 'Dismissal'}
                  value={formData.actionType === 'Dismissal' ? '' : formData.duration} onChange={handleChange}
                  className={`w-full px-5 py-3 rounded-2xl outline-none border transition-all font-bold text-sm ${darkMode ? 'bg-black/40 border-white/10 focus:border-red-500 text-white' : 'bg-slate-100 border-transparent focus:bg-white focus:border-red-500'} disabled:opacity-30`}
                />
              </div>
            </div>

            {/* REASON */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-black uppercase tracking-widest opacity-60 ml-1">Official Reason</label>
              <textarea 
                name="reason" rows="3" placeholder="State the violations or grounds for dismissal..."
                value={formData.reason} onChange={handleChange}
                className={`w-full px-5 py-3 rounded-2xl outline-none border transition-all font-bold text-sm resize-none ${darkMode ? 'bg-black/40 border-white/10 focus:border-red-500 text-white' : 'bg-slate-100 border-transparent focus:bg-white focus:border-red-500 shadow-inner'}`}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02, skewX: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all mt-4 relative z-50 shadow-lg shadow-red-500/20"
            >
              <Icon icon="solar:danger-bold" width="20" />
              Confirm {formData.actionType}
            </motion.button>
          </form>

          {/* BACKGROUND DECOR */}
          <div className="absolute -inset-1 bg-red-500 rounded-[2.5rem] blur opacity-0 group-hover:opacity-10 transition duration-1000"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default ActionPage;