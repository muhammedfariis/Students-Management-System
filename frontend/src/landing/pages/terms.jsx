import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  ShieldCheck,
  FileText,
  Lock,
  Users,
  Terminal,
  Scale,
  AlertCircle,
  CheckCircle2,
  Database,
  Fingerprint,
  Globe,
  Cpu,
  AlertTriangle,
  BookOpen,
  HardDrive,
  Ban,
} from "lucide-react";

import { SpotlightNavbar } from "../components/common/navbar";
import ParallaxElement from "../components/ui/parallaxElament";

const Terms = () => {
  const sections = [
    {
      title: "1. System Authorization",
      icon: <Fingerprint className="text-cyan-500" />,
      content:
        "By accessing Attendex, you agree to provide valid institutional credentials. The system logic grants access levels based on Roles (Admin, Faculty, Student). Unauthorized attempts to bypass Batch security or API endpoints are strictly logged.",
    },
    {
      title: "2. Attendance & Automation",
      icon: <CheckCircle2 className="text-emerald-500" />,
      content:
        "Attendex utilizes server-side cron jobs (11:00 PM nightly sweeps) to finalize daily records. Users acknowledge that attendance data is processed in real-time and 'Late' thresholds are determined by institutional logic gates.",
    },
    {
      title: "3. Assignment & Submissions",
      icon: <FileText className="text-purple-500" />,
      content:
        "The Assignment Module allows digital submission and grading. Users are responsible for the integrity of uploaded files. Attendex performs automated timestamping; late submissions are flagged based on the zero-friction logic engine.",
    },
    {
      title: "4. Data Privacy & Logs",
      icon: <Database className="text-blue-500" />,
      content:
        "We employ Zero-Trust architecture. Every action (marking batches, adding students, viewing finance) is cryptographically signed. We store activity logs for audit trails, ensuring data transparency across all institutional nodes.",
    },
    {
      title: "5. Financial Ledger",
      icon: <Scale className="text-amber-500" />,
      content:
        "The Finance module tracks revenue and collection rates. While our pipelines operate at 42ms latency, users must verify manual entry accuracy. Attendex is not liable for data discrepancies caused by incorrect batch input.",
    },
    {
      title: "6. Intellectual Property",
      icon: <Cpu className="text-pink-500" />,
      content:
        "All logic gates, UI components, and the Attendex brand identity are exclusive property. Users are prohibited from reverse-engineering the frontend bundle or scraping data via unauthorized bots.",
    },
    {
      title: "7. User Conduct",
      icon: <Users className="text-indigo-500" />,
      content:
        "Users must not use Attendex to upload defamatory or infringing content. Any 'gaming' of the attendance system is considered a violation of institutional integrity and will be reported to administration.",
    },
    {
      title: "8. System Reliability",
      icon: <Globe className="text-cyan-400" />,
      content:
        "While we aim for 99.9% uptime, Attendex is provided on an 'as-is' basis. Scheduled maintenance for logic upgrades will be communicated 24 hours in advance.",
    },
    {
      title: "9. Protocol Termination",
      icon: <Ban className="text-red-500" />,
      content:
        "Attendex reserves the right to suspend access to any User or Batch that poses a security risk or fails to comply with institutional payment terms.",
    },
    {
      title: "10. Limitation of Liability",
      icon: <AlertTriangle className="text-orange-500" />,
      content:
        "To the maximum extent permitted by law, Attendex shall not be liable for any indirect or consequential damages arising out of the use or inability to use the system logic.",
    },
  ];

  // Custom Cubic Bezier for the buttons
  const snapTransition = {
    type: "spring",
    stiffness: 400,
    damping: 25,
    mass: 1,
  };

  return (
    <div className="bg-black text-white selection:bg-cyan-500 selection:text-black font-sans min-h-screen overflow-hidden">
      <SpotlightNavbar />

      {/* --- PARALLAX BACKGROUND DECORATION (OLD STYLE) --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <ParallaxElement speed={-3} className="absolute top-[10%] -left-20">
          <div className="text-[20vw] font-black text-white/5 uppercase italic">
            LEGALS
          </div>
        </ParallaxElement>
        <ParallaxElement speed={2} className="absolute bottom-[10%] -right-20">
          <div className="text-[20vw] font-black text-cyan-500/5 uppercase italic">
            TRUST
          </div>
        </ParallaxElement>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative h-[60vh] flex flex-col items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center z-10"
        >
          <ShieldCheck
            size={80}
            className="mx-auto text-cyan-500 mb-6 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]"
          />
          <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter">
            Terms of <span className="text-cyan-500">Service.</span>
          </h1>
          <p className="text-zinc-500 tracking-[0.5em] uppercase text-xs mt-6">
            Last Updated: February 2026
          </p>
        </motion.div>
      </section>

      {/* --- MAIN CONTENT (OLD UI CARD STYLE) --- */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-40">
        <div className="space-y-12">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[3rem]"
            >
              <div className="bg-zinc-950 p-10 md:p-16 rounded-[2.9rem] flex flex-col md:flex-row gap-8 items-start hover:bg-zinc-900 transition-colors duration-500">
                <div className="p-5 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                  {React.cloneElement(section.icon, { size: 40 })}
                </div>
                <div>
                  <h3 className="text-3xl font-black italic uppercase mb-6 tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-zinc-400 text-xl leading-relaxed font-light italic">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- ACCEPTANCE FOOTER WITH CUBIC BEZIER BUTTONS --- */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="mt-32 p-16 rounded-[4rem] border border-white/5 bg-gradient-to-b from-cyan-500/10 to-transparent text-center"
        >
          <AlertCircle size={40} className="mx-auto text-cyan-500 mb-6" />
          <h2 className="text-4xl font-black italic uppercase mb-6">
            User Acknowledgement
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto mb-10 text-lg">
            By clicking "Accept and Continue" or using the Attendex
            infrastructure, you signify your full agreement to the system logic
            and data processing terms outlined above.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "#06b6d4", // Cyan-500
                color: "#ffffff",
                boxShadow: "0px 0px 30px rgba(6, 182, 212, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ cubicBezier: [0.19, 1, 0.22, 1], duration: 0.6 }}
              className="px-12 py-6 bg-white text-black font-black italic rounded-full uppercase tracking-tighter text-lg"
            >
              Accept & Continue
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(255,255,255,0.5)",
                backgroundColor: "rgba(255,255,255,0.05)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ cubicBezier: [0.19, 1, 0.22, 1], duration: 0.6 }}
              className="px-12 py-6 bg-transparent text-white border border-white/10 font-black italic rounded-full uppercase tracking-tighter text-lg"
            >
              Download PDF
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 border-t border-white/5 text-center text-zinc-800 font-black text-sm tracking-[1em] uppercase italic">
        Attendex Security Protocol © 2026
      </footer>
    </div>
  );
};

export default Terms;
