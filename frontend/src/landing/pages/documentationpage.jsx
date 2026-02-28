import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  ChevronRight, ChevronLeft, Book, Terminal, Cpu, ShieldCheck, 
  Layers, Zap, Globe, HardDrive, Smartphone, Layout, 
  Settings, Users, CreditCard, HelpCircle, Code, Lock, 
  ArrowLeft, Search, Menu, X, Rocket, Sun, Moon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import MeshBackground from "../components/common/mesh";

// --- Documentation Content Data ---
const DOCS_CONTENT = [
  {
    id: "welcome",
    title: "Project Attendex",
    icon: <Rocket size={20} />,
    content: "Welcome to the next generation of institutional infrastructure. Attendex isn't just an attendance tracker; it's a high-performance presence engine built for massive scale. Operating with a zero-trust architecture, it synchronizes human presence with digital records in real-time.",
    details: "Designed for universities, corporate hubs, and high-security zones, our v5 engine handles 14.2k concurrent users with a latency floor of 42ms."
  },
  {
    id: "installation",
    title: "Installation",
    icon: <Terminal size={20} />,
    content: "Currently, Attendex is a Web-First Cloud Protocol.",
    details: "Native binaries for Windows (.exe) and Mobile (iOS/Android) are slated for the Version 3.0 release. To access the system now, use our encrypted web portal via the 'Launch System' button on the home page.",
    status: "v3.0 - Coming Soon"
  },
  {
    id: "getting-started",
    title: "How to Use",
    icon: <Zap size={20} />,
    content: "Initiating the system follows a 3-step synchronization protocol:",
    list: [
      "1. System Launch: Click 'Launch System' to initialize the Neural Sync.",
      "2. Authentication: Existing users proceed to the JWT-secured Login.",
      "3. Super Admin Entry: New institutions must register via the Super Admin gate for primary node setup."
    ]
  },
  {
    id: "roles",
    title: "Role-Based Access",
    icon: <Users size={20} />,
    content: "Attendex uses a strict Hierarchical RBAC (Role-Based Access Control) system.",
    details: "Roles include Super Admin (Global Config), Admin (Batch Management), Faculty (Verification), and Student (View-Only). Each role is cryptographically isolated."
  },
  {
    id: "security",
    title: "Security & Vault",
    icon: <ShieldCheck size={20} />,
    content: "We utilize a 'Zero-Trust' vaulting system.",
    details: "All student data and biometric hashes are stored in an AES-256 encrypted MongoDB instance. Every API request requires a valid, short-lived JWT (JSON Web Token) signed by our internal Auth-Server."
  },
  {
    id: "finance",
    title: "Cash Flow Engine",
    icon: <CreditCard size={20} />,
    content: "Automated revenue tracking for institutional fees.",
    details: "Our finance module uses MongoDB Aggregation Pipelines to provide real-time ledger updates. Note: Pricing models activate after one month of system deployment."
  },
  {
    id: "geofencing",
    title: "Geo-Fencing",
    icon: <Globe size={20} />,
    content: "Location-locked attendance verification.",
    details: "Prevents proxy attendance by ensuring the user's GPS coordinates fall within the institution's predefined digital perimeter."
  },
  {
    id: "api",
    title: "API Integration",
    icon: <Code size={20} />,
    content: "Connect Attendex to your existing ERP.",
    details: "We provide RESTful endpoints for batch synchronization and user migration. Latency is optimized at <50ms."
  },
  {
    id: "batches",
    title: "Batch Management",
    icon: <Layers size={20} />,
    content: "Organize users into high-performance buckets.",
    details: "Manage thousands of students across different departments, years, and shifts with zero overhead."
  },
  {
    id: "logs",
    title: "Audit Logs",
    icon: <HardDrive size={20} />,
    content: "Full transparency on every system action.",
    details: "The 'Logs' module records every sign-in, change, and system sweep, accessible only by the Super Admin."
  },
  {
    id: "cron",
    title: "Auto-Cron Sweeps",
    icon: <Cpu size={20} />,
    content: "Automated end-of-day processing.",
    details: "Every night at 11:00 PM, the system runs a global sweep to mark unclaimed slots as 'Absent' and resets the Presence Engine for the next cycle."
  },
  {
    id: "ui-ux",
    title: "Design System",
    icon: <Layout size={20} />,
    content: "Adaptive Glassmorphism & Mesh.",
    details: "Designed for focus. The UI transitions seamlessly between Light and Dark modes to reduce eye strain during long administrative sessions."
  },
  {
    id: "mobile",
    title: "Mobile App v3",
    icon: <Smartphone size={20} />,
    content: "The future of Attendex in your pocket.",
    details: "Version 3 will introduce push notifications for parents and real-time biometric scanning via mobile sensors."
  },
  {
    id: "auth",
    title: "Auth Protocol",
    icon: <Lock size={20} />,
    content: "Multi-Factor Authentication (MFA).",
    details: "Beyond simple passwords, Attendex supports biometric and OTP-based verification for high-privilege accounts."
  },
  {
    id: "support",
    title: "Help & Support",
    icon: <HelpCircle size={20} />,
    content: "24/7 Technical Assistance.",
    details: "Encountering a 'Neural Sync' error? Contact our global support nodes via the dashboard ticketing system."
  }
];

const DocumentationPage = () => {
  const [activeSection, setActiveSection] = useState("welcome");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState("dark");
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  // Toggle Theme Logic
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Parallax Effect for Content
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const yRange = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const scrollToSection = (id) => {
    setActiveSection(id);
    if (window.innerWidth < 768) setSidebarOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleToolClick = (tool) => {
    alert(`Initializing ${tool} Module... Accessing Neural Node.`);
  };

  return (
    <div className={`flex h-screen w-full overflow-hidden transition-colors duration-500 ${theme === 'dark' ? 'bg-[#050507] text-white' : 'bg-white text-black'} selection:bg-cyan-500 selection:text-black`}>
      <MeshBackground className="opacity-30 fixed inset-0 pointer-events-none" />

      {/* --- SIDEBAR NAVIGATION --- */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? "320px" : "85px" }}
        className={`relative z-50 border-r ${theme === 'dark' ? 'border-white/10 bg-black/40' : 'border-black/5 bg-white/80'} backdrop-blur-2xl transition-all duration-300 hidden md:flex flex-col h-full`}
      >
        <div className="p-6 flex items-center justify-between">
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -10 }}
                className="text-2xl font-black italic tracking-tighter uppercase"
              >
                Docs<span className="text-cyan-500">.</span>
              </motion.span>
            )}
          </AnimatePresence>
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className={`p-2 rounded-xl transition-all ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-black/5'} active:scale-95`}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 space-y-2 py-4 custom-scrollbar">
          {DOCS_CONTENT.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all group ${
                activeSection === item.id 
                ? "bg-cyan-500 text-white shadow-[0_10px_20px_rgba(6,182,212,0.3)]" 
                : theme === 'dark' ? "hover:bg-white/5 text-zinc-500" : "hover:bg-black/5 text-zinc-500"
              }`}
            >
              <div className={`${activeSection === item.id ? "text-white" : "text-cyan-500"}`}>
                {item.icon}
              </div>
              {isSidebarOpen && (
                <span className="text-xs font-bold uppercase tracking-widest truncate">
                  {item.title}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 space-y-4">
            <button 
                onClick={toggleTheme}
                className={`flex items-center gap-3 w-full p-3 rounded-2xl border transition-all ${theme === 'dark' ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-black/5'}`}
            >
                {theme === 'dark' ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-indigo-600" />}
                {isSidebarOpen && <span className="text-[10px] font-black uppercase tracking-widest">{theme === 'dark' ? "Light Mode" : "Dark Mode"}</span>}
            </button>

            <button 
                onClick={() => navigate("/")}
                className="group flex items-center gap-2 p-3 text-xs font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-cyan-500 transition-all"
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform duration-300" /> 
                {isSidebarOpen && "Back to System"}
            </button>
        </div>
      </motion.aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main ref={scrollRef} className="flex-1 h-screen overflow-y-auto relative p-6 md:p-20 lg:p-32 scroll-smooth">
        
        {/* Floating Back Button for Mobile */}
        <button 
          onClick={() => navigate("/")}
          className="fixed top-6 right-6 z-[60] p-4 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-2xl md:hidden"
        >
          <ArrowLeft size={24} />
        </button>

        <motion.div style={{ y: yRange }} className="max-w-4xl mx-auto space-y-32">
          
          {/* Header */}
          <section className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 text-[10px] font-black uppercase tracking-[0.3em]"
            >
              Documentation v5.0.2
            </motion.div>
            <h1 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter leading-none">
              The <span className="text-cyan-500">Manual.</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-light italic max-w-2xl">
              Deep dive into the architecture, deployment, and operation of the Attendex Presence Engine.
            </p>
          </section>

          {/* Dynamic Content Sections */}
          {DOCS_CONTENT.map((section, idx) => (
            <motion.section
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative group pt-20 border-t border-black/5 dark:border-white/5"
            >
              {/* 3D Parallax Background Numbers */}
              <div className="absolute -left-20 -top-10 text-[15rem] font-black text-black/[0.02] dark:text-white/[0.02] italic select-none pointer-events-none group-hover:text-cyan-500/[0.05] transition-colors">
                {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
              </div>

              <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl rotate-3 group-hover:rotate-0 transition-transform ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                    {section.icon}
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tight">
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-6 max-w-3xl">
                  <p className="text-xl md:text-2xl leading-relaxed opacity-80">
                    {section.content}
                  </p>
                  
                  {section.details && (
                    <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 font-medium border-l-2 border-cyan-500 pl-6">
                      {section.details}
                    </p>
                  )}

                  {section.list && (
                    <div className="grid gap-4 mt-8">
                      {section.list.map((li, i) => (
                        <div key={i} className={`p-6 rounded-3xl border transition-colors ${theme === 'dark' ? 'bg-white/[0.02] border-white/5 hover:border-cyan-500/30' : 'bg-zinc-50 border-black/5 hover:border-cyan-500/30'}`}>
                           <p className="font-mono text-sm tracking-tighter text-cyan-600 dark:text-cyan-400">{li}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.status && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest">
                      <Settings size={14} className="animate-spin" style={{ animationDuration: '3s' }} />
                      {section.status}
                    </div>
                  )}
                </div>
              </div>
            </motion.section>
          ))}

          {/* Footer inside Content */}
          <footer className="py-20 text-center">
            <p className="text-zinc-400 text-xs font-black uppercase tracking-[0.5em] mb-4">
              End of Documentation
            </p>
            <button 
              onClick={() => navigate("/")}
              className="px-12 py-5 rounded-full bg-cyan-500 text-white font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl"
            >
              Return to Interface
            </button>
          </footer>
        </motion.div>
      </main>

      {/* --- RIGHT INFO PANEL (FIXED) --- */}
      <aside className={`hidden xl:flex w-80 h-full border-l p-8 flex-col space-y-8 sticky top-0 overflow-y-auto ${theme === 'dark' ? 'border-white/10 bg-black/20' : 'border-black/5 bg-zinc-50/50'}`}>
        <div className="p-6 rounded-[2.5rem] bg-cyan-500 text-white shadow-2xl rotate-2 hover:rotate-0 transition-transform cursor-default">
          <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">System Health</p>
          <h4 className="text-4xl font-black italic tracking-tighter">99.9%</h4>
          <div className="mt-4 h-1 w-full bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "99.9%" }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="h-full bg-white"
            />
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-2">Quick Tools</p>
          {["API Status", "Global Sync", "Vault Lock", "Node Manager"].map(tool => (
            <button 
              key={tool} 
              onClick={() => handleToolClick(tool)}
              className={`w-full p-4 rounded-2xl border flex justify-between items-center text-xs font-bold uppercase tracking-widest transition-all cursor-pointer group active:scale-95 ${theme === 'dark' ? 'border-white/5 hover:bg-zinc-900' : 'border-black/5 hover:bg-white'}`}
            >
              {tool}
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform text-cyan-500" />
            </button>
          ))}
        </div>

        <div className="relative flex-1 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
             <div className="w-40 h-40 border-2 border-cyan-500 rounded-full animate-ping" />
          </div>
          <div className="relative aspect-square w-full rounded-[2rem] border-2 border-dashed border-cyan-500/30 flex items-center justify-center group">
            <Cpu size={80} className="text-cyan-500 animate-pulse group-hover:scale-110 transition-transform" />
          </div>
        </div>
      </aside>
    </div>
  );
};

export default DocumentationPage;