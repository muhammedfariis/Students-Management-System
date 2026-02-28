import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  ChevronRight, ChevronLeft, Book, Terminal, Cpu, ShieldCheck, 
  Layers, Zap, Globe, HardDrive, Smartphone, Layout, 
  Settings, Users, CreditCard, HelpCircle, Code, Lock, 
  ArrowLeft, Search, Menu, X, Rocket, Activity, Database, Server, Share2, Filter, Bell
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Sync with your Switch
import MeshBackground from "../components/common/mesh";
import Switch from "../components/ui/toggle";
import { toast, Toaster } from "react-hot-toast";

// --- Massive Documentation Content (20+ Sections) ---
const DOCS_CONTENT = [
  { 
    id: "welcome", 
    title: "Project Attendex: Next-Generation Presence Infrastructure", 
    icon: <Rocket size={20} />, 
    content: "Project Attendex represents a paradigm shift in institutional oversight, moving beyond legacy tracking to a high-performance presence engine. Built to accommodate the rigorous demands of modern universities and corporate hubs, the platform utilizes a proprietary synchronization protocol that bridges physical presence with digital audit trails.", 
    details: "The v5 core architecture is benchmarked to sustain 14,200 concurrent biometric streams with a global latency ceiling of 42ms, ensuring real-time data integrity across distributed nodes." 
  },
  { 
    id: "installation", 
    title: "Deployment & System Installation Protocols", 
    icon: <Terminal size={20} />, 
    content: "The current iteration of Attendex operates as a Web-First Cloud Protocol, optimized for browser-based environments using hardware-accelerated rendering. While the system is fully operational via cloud-tenant portals, we are actively developing low-level native integration for enterprise environments.", 
    details: "The Version 3.0 roadmap includes the release of native C++ based binaries for Windows systems and dedicated Swift/Kotlin kernels for mobile hardware, allowing for deeper sensor integration." 
  },
  { 
    id: "getting-started", 
    title: "System Initialization & Onboarding Procedures", 
    icon: <Zap size={20} />, 
    content: "To maintain the integrity of the institutional node, initiating the Attendex system requires a specific three-tier synchronization sequence. This ensures that every data point is cryptographically linked to the master institutional record from the moment of initialization.", 
    list: [
      "1. Neural Node Launch: Execute the 'Launch System' command to initialize the primary synchronization engine.",
      "2. Encrypted Authentication: Authorized personnel must proceed through the JWT-secured gateway to establish a session.",
      "3. Institutional Root Setup: Super Admins are required to configure the primary organizational node before sub-batches can be initialized."
    ]
  },
  { 
    id: "neural-sync", 
    title: "Neural Sync v5: Edge-Computed Biometric Verification", 
    icon: <Activity size={20} />, 
    content: "The Neural Sync engine is the heartbeat of Attendex, utilizing distributed edge computing to process attendance signatures locally. By offloading processing power to the edge, the system eliminates network bottlenecks and provides instantaneous verification feedback to the end-user.", 
    details: "In the event of a total network uplink failure, local nodes cache encrypted presence hashes and automatically perform a reconciliation sweep once the connection to the central vault is restored." 
  },
  { 
    id: "roles", 
    title: "Hierarchical Role-Based Access Control (RBAC)", 
    icon: <Users size={20} />, 
    content: "Security is enforced through a multi-layered Hierarchical RBAC system. This architecture ensures that data visibility is strictly compartmentalized according to institutional rank. Each role operates within its own cryptographic sandbox, preventing horizontal privilege escalation.", 
    details: "Access tiers range from Super Admin (Global System Configuration) and Institutional Admins (Batch & Faculty Management) to Students, who possess read-only access to their personal presence logs." 
  },
  { 
    id: "security", 
    title: "Zero-Trust Architecture & Data Vaulting", 
    icon: <ShieldCheck size={20} />, 
    content: "Attendex operates on a 'Never Trust, Always Verify' security model. All sensitive data, including PII (Personally Identifiable Information) and biometric metadata, is transformed into unique cryptographic hashes before being committed to our high-security MongoDB vault.", 
    details: "We utilize AES-256-GCM encryption at rest and TLS 1.3 for data in transit. Every internal API call is validated by a secondary Auth-Server that issues short-lived, rotatable session tokens." 
  },
  { 
    id: "db-arch", 
    title: "Distributed Database Sharding & High Availability", 
    icon: <Database size={20} />, 
    content: "To ensure 99.99% system uptime, the Attendex database layer utilizes a geographically sharded MongoDB cluster. This allows the system to distribute data loads across multiple global regions, minimizing physical distance between the user and the data node for faster query execution.", 
    details: "The architecture supports automatic failover and secondary replica sets, ensuring that institutional records remain accessible even during localized data center maintenance or outages." 
  },
  { 
    id: "finance", 
    title: "Institutional Cash Flow & Revenue Analytics Engine", 
    icon: <CreditCard size={20} />, 
    content: "The integrated finance module provides administrators with a granular view of institutional revenue streams and fee collections. By utilizing MongoDB's powerful Aggregation Pipelines, the system generates real-time financial snapshots and ledger updates without taxing the primary attendance engine.", 
    details: "Automated billing cycles and revenue tracking activate exactly thirty days post-deployment, allowing institutions to synchronize their financial records with student presence data seamlessly." 
  },
  { 
    id: "geofencing", 
    title: "Geospatial Perimeter Locking & Proxy Prevention", 
    icon: <Globe size={20} />, 
    content: "To eliminate the possibility of proxy attendance, Attendex implements a rigorous Geo-Fencing protocol. The system cross-references the user's real-time GPS coordinates against a predefined digital perimeter of the institution, ensuring that attendance is only recorded within physical boundaries.", 
    details: "Our proprietary algorithm filters out GPS spoofing attempts and high-latency location pings, requiring a 'High-Precision' lock before the attendance signature is cryptographically signed." 
  },
  { 
    id: "api", 
    title: "RESTful API Integration & ERP Synchronization", 
    icon: <Code size={20} />, 
    content: "Attendex is designed to coexist with your existing infrastructure. We provide a comprehensive suite of RESTful endpoints that allow for the seamless migration of user data and the synchronization of attendance records with legacy Enterprise Resource Planning (ERP) systems.", 
    details: "The API is optimized for high-throughput batch operations, supporting the migration of tens of thousands of records in seconds while maintaining a sub-50ms response time for individual queries." 
  },
  { 
    id: "batches", 
    title: "High-Performance Batch & Departmental Management", 
    icon: <Layers size={20} />, 
    content: "The platform organizes the institutional population into high-performance 'Buckets' or Batches. This logical separation allows for customized scheduling, specific faculty assignments, and targeted reporting for different departments, academic years, or professional shifts.", 
    details: "Administrators can manage thousands of individual batches with zero system overhead, utilizing our optimized indexing strategy to retrieve departmental analytics in real-time." 
  },
  { 
    id: "logs", 
    title: "Immutable Audit Logging & System Transparency", 
    icon: <HardDrive size={20} />, 
    content: "For compliance and security auditing, the system maintains an immutable ledger of every transaction, sign-in attempt, and record modification. These logs provide a 'Paper Trail' for every action taken within the system, ensuring total transparency for institutional regulators.", 
    details: "Audit logs are stored in a write-once, read-many (WORM) format and are accessible exclusively by the Super Admin tier to prevent internal tampering or unauthorized record deletion." 
  },
  { 
    id: "cron", 
    title: "Automated Global Cron Sweeps & Cycle Resets", 
    icon: <Cpu size={20} />, 
    content: "Every 24 hours at 11:00 PM, the Attendex core executes a global Cron Sweep. During this window, the system processes all unclaimed attendance slots, marks them as 'Absent' according to institutional policy, and performs a full database optimization for the upcoming cycle.", 
    details: "This automated maintenance cycle ensures that the Presence Engine is always operating at peak efficiency and that daily analytics are finalized and archived for long-term reporting." 
  },
  { 
    id: "ui-ux", 
    title: "Adaptive Glassmorphic Interface & Design Logic", 
    icon: <Layout size={20} />, 
    content: "The Attendex UI is built on a foundation of focus-driven design. Utilizing adaptive Glassmorphism and Mesh-gradient backgrounds, the interface reduces cognitive load for administrators who must interact with complex datasets for extended periods of time.", 
    details: "The design system dynamically adjusts contrast and transparency based on the selected Light/Dark mode, utilizing hardware-accelerated CSS filters to ensure smooth performance even on lower-end hardware." 
  },
  { 
    id: "webhooks", 
    title: "Real-Time Event Webhooks & External Triggers", 
    icon: <Share2 size={20} />, 
    content: "Extend the capabilities of Attendex by utilizing our event-driven webhook architecture. The system can be configured to push real-time data to external third-party applications whenever a specific event occurs, such as a student entering a high-security zone.", 
    details: "Our webhook payloads are signed with a unique HMAC signature, allowing your receiving server to verify that the data originated from the trusted Attendex node." 
  },
  { 
    id: "scalability", 
    title: "Horizontal Scaling via Kubernetes Orchestration", 
    icon: <Server size={20} />, 
    content: "Attendex is built for growth. The platform utilizes Docker-containerized microservices orchestrated by Kubernetes, allowing for horizontal scaling that automatically expands system capacity in response to sudden spikes in user traffic or biometric processing demands.", 
    details: "Load balancers distribute incoming requests across multiple healthy pods, ensuring that the system remains responsive even during peak morning 'Check-In' windows." 
  },
  { 
    id: "notifications", 
    title: "Smart Alerts & Multi-Channel Notification Hub", 
    icon: <Bell size={20} />, 
    content: "Keep stakeholders informed with our automated notification hub. The system can be programmed to trigger SMS, Email, or Mobile Push notifications based on presence status, threshold alerts, or urgent institutional announcements.", 
    details: "Notification templates are fully customizable and support dynamic variables, allowing for personalized communication at a massive scale without manual intervention from faculty." 
  },
  { 
    id: "filtering", 
    title: "Advanced Data Filtering & Reporting Engine", 
    icon: <Filter size={20} />, 
    content: "Transform raw data into actionable insights with our advanced query engine. Administrators can apply complex filters—ranging from date ranges and departmental performance to individual attendance consistency—to generate deep-dive institutional reports.", 
    details: "Reports can be exported in various high-fidelity formats, including PDF, CSV, and JSON, facilitating seamless data sharing with external board members or government regulators." 
  },
  { 
    id: "mfa", 
    title: "Multi-Factor Authentication & Biometric Vaulting", 
    icon: <Lock size={20} />, 
    content: "Protect sensitive administrative accounts with our Multi-Factor Authentication (MFA) suite. In addition to traditional credentials, Attendex supports TOTP-based mobile authenticators and hardware security keys for high-privilege operations.", 
    details: "We are currently integrating WebAuthn protocols to allow for passwordless biometric login directly through the browser, utilizing the secure enclave of the user's device." 
  },
  { 
    id: "mobile-v3", 
    title: "Mobile Ecosystem & Hardware Sensor Roadmap", 
    icon: <Smartphone size={20} />, 
    content: "The upcoming Version 3.0 release will bridge the gap between web and native mobile performance. By accessing hardware-level sensors, the Attendex mobile app will provide even more accurate geofencing and support for native biometric hardware like FaceID and TouchID.", 
    details: "This release will also introduce a dedicated 'Parent Portal,' providing real-time visibility into student presence and safety for guardians through a simplified, high-performance interface." 
  },
  { 
    id: "support", 
    title: "Global Technical Nodes & 24/7 Assistance", 
    icon: <HelpCircle size={20} />, 
    content: "Attendex is backed by a global network of technical support nodes. Whether you encounter a 'Neural Sync' mismatch or require assistance with initial node configuration, our technical engineers are available around the clock through our integrated ticketing system.", 
    details: "Pro-tier subscribers gain access to dedicated node managers and a direct priority hotline, ensuring that any system-critical issues are resolved within a guaranteed four-hour window." 
  }
];

const DocumentationPage = () => {
  // Use Redux state to drive the theme
  const reduxTheme = useSelector((state) => state.theme.mode); 
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("welcome");
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  // Effect to apply the theme to the HTML element whenever Redux theme changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", reduxTheme === "dark");
  }, [reduxTheme]);

  const { scrollYProgress } = useScroll({ container: scrollRef });
  const yRange = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const handleToolAction = (tool) => {
    const colors = { "API Status": "#06b6d4", "Global Sync": "#10b981", "Vault Lock": "#f43f5e", "Node Manager": "#a855f7" };
    toast.loading(`Processing ${tool}...`, { id: 't' });
    setTimeout(() => toast.success(`${tool} Operational`, { id: 't', style: { color: colors[tool] || "#fff" } }), 1000);
  };

  return (
    <div className={`flex h-screen w-full overflow-hidden transition-colors duration-500 ${reduxTheme === 'dark' ? 'bg-[#050507] text-white' : 'bg-white text-black'} font-sans`}>
      <Toaster position="bottom-center" />
      <MeshBackground className="opacity-30 fixed inset-0 pointer-events-none" />

      {/* --- SIDEBAR --- */}
      <motion.aside 
        animate={{ width: isSidebarOpen ? "300px" : "80px" }}
        className={`relative z-50 flex flex-col h-full glass-panel border-r ${reduxTheme === 'dark' ? 'border-white/10' : 'border-black/5'}`}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && <span className="text-xl font-black tracking-tighter uppercase">Docs<span className="text-cyan-500">.</span></span>}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-cyan-500/10 rounded-lg">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 space-y-1">
          {DOCS_CONTENT.map((item) => (
            <button key={item.id} onClick={() => { 
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                setActiveSection(item.id);
            }} 
            className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${activeSection === item.id ? "bg-cyan-500 text-white" : "text-zinc-500 hover:bg-cyan-500/5"}`}>
              {item.icon}
              {isSidebarOpen && <span className="text-[10px] font-bold uppercase tracking-widest truncate">{item.title}</span>}
            </button>
          ))}
        </nav>

     <div className="p-6 space-y-6 border-t border-white/5 flex flex-col items-center">
  {/* Switch Container */}
  <div className="flex justify-center scale-90 transition-transform duration-300">
    <Switch />
  </div>

  {/* Back Button Container */}
  <button 
    onClick={() => navigate("/")} 
    className={`
      flex items-center justify-center gap-3 
      min-h-[48px] w-full rounded-2xl
      transition-all duration-300 group
      ${isSidebarOpen ? "px-4" : "px-0"}
      text-zinc-400 hover:text-cyan-500
    `}
  >
    <div className="flex flex-none items-center justify-center w-12 h-12 bg-red-300/2 group-hover:bg-red-500/10 rounded-xl transition-all duration-300 shadow-lg group-active:scale-90">
      <ArrowLeft 
        size={20} 
        className="text-red-500 group-hover:text-white transition-colors"
      />
    </div>

    <AnimatePresence mode="wait">
      {isSidebarOpen && (
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap"
        >
          Exit Interface
        </motion.span>
      )}
    </AnimatePresence>
  </button>
</div>
      </motion.aside>

      <main ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-20 scroll-smooth">
        <motion.div style={{ y: yRange }} className="max-w-4xl mx-auto space-y-32">
          <header className="space-y-4">
            <div className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.4em]">v5.0.2 Stable</div>
            <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none">The <span className="text-cyan-500">Manual.</span></h1>
          </header>

          {DOCS_CONTENT.map((section, idx) => (
            <section key={section.id} id={section.id} className="relative pt-20 border-t border-black/5 dark:border-white/5 group">
              <div className="absolute -left-10 -top-5 text-9xl font-black opacity-[0.03] italic">{idx + 1}</div>
              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-2xl ${reduxTheme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}>{section.icon}</div>
                    <h2 className="text-4xl font-black uppercase italic">{section.title}</h2>
                </div>
                <p className="text-xl opacity-70 leading-relaxed">{section.content}</p>
                {section.details && <p className="border-l-2 border-cyan-500 pl-4 text-zinc-500">{section.details}</p>}
              </div>
            </section>
          ))}
        </motion.div>
      </main>

      <aside className="hidden xl:flex w-80 h-full p-8 flex-col space-y-8 glass-panel border-l border-white/10">
        <div className="p-6 rounded-3xl bg-cyan-500 text-white shadow-xl rotate-1">
          <div className="text-[10px] font-black uppercase mb-2">Uptime</div>
          <div className="text-4xl font-black">99.9%</div>
        </div>
        <div className="space-y-4">
            <p className="text-[10px] font-black uppercase text-zinc-500">Node Controls</p>
            {["API Status", "Global Sync", "Vault Lock", "Node Manager"].map(tool => (
                <button key={tool} onClick={() => handleToolAction(tool)} className="w-full p-4 rounded-xl border border-white/5 hover:bg-white/5 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                    {tool} 
                    <ChevronRight size={14} />
                </button>
            ))}

            <div className="flex-1 flex items-center justify-center opacity-40">
           <div className="relative aspect-square w-48 rounded-[2rem] border-2 border-dashed border-cyan-500/30 flex items-center justify-center">
             <Cpu size={60} className="text-cyan-500 animate-pulse" />
           </div>
        </div>
        </div>
      </aside>

      <style>{`
        .glass-panel {
            background: ${reduxTheme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)'};
            backdrop-filter: blur(30px);
            -webkit-backdrop-filter: blur(30px);
        }
        * { scrollbar-width: none; }
        *::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default DocumentationPage;