import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Footer from "../components/common/landingFooter";
import {
  ShieldCheck,
  FileText,
  Lock,
  Users,
  Scale,
  AlertCircle,
  CheckCircle2,
  Database,
  Fingerprint,
  Globe,
  Cpu,
  AlertTriangle,
  Ban,
} from "lucide-react";

import { SpotlightNavbar } from "../components/common/navbar";
import ParallaxElement from "../components/ui/parallaxElament";

const Terms = () => {
  // Sync with your Redux store
  const { mode } = useSelector((state) => state.theme);

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

  return (
    <div className={`${mode === "dark" ? "dark" : ""}`}>
      <div className="bg-white dark:bg-black text-black dark:text-white selection:bg-cyan-500 selection:text-black font-sans min-h-screen overflow-x-hidden transition-colors duration-500">
        <SpotlightNavbar />

        {/* --- PARALLAX BACKGROUND DECORATION --- */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <ParallaxElement speed={-3} className="absolute top-[10%] -left-10 md:-left-20">
            <div className="text-[25vw] md:text-[20vw] font-black text-black/[0.03] dark:text-white/5 uppercase italic whitespace-nowrap">
              LEGALS
            </div>
          </ParallaxElement>
          <ParallaxElement speed={2} className="absolute bottom-[10%] -right-10 md:-right-20">
            <div className="text-[25vw] md:text-[20vw] font-black text-cyan-500/[0.03] dark:text-cyan-500/5 uppercase italic whitespace-nowrap">
              TRUST
            </div>
          </ParallaxElement>
        </div>

        {/* --- HERO SECTION --- */}
        <section className="relative h-[50vh] md:h-[60vh] flex flex-col items-center justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center z-10"
          >
            <ShieldCheck
              size={60}
              className="md:w-20 md:h-20 mx-auto text-cyan-500 mb-6 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]"
            />
            <h1 className="text-5xl md:text-9xl font-black italic uppercase tracking-tighter leading-tight">
              Terms of <br className="md:hidden" /> <span className="text-cyan-500">Service.</span>
            </h1>
            <p className="text-zinc-500 dark:text-zinc-500 tracking-[0.3em] md:tracking-[0.5em] uppercase text-[10px] md:text-xs mt-6">
              Last Updated: February 2026
            </p>
          </motion.div>
        </section>

        {/* --- MAIN CONTENT --- */}
        <section className="relative z-10 max-w-5xl mx-auto px-6 pb-24 md:pb-40">
          <div className="space-y-8 md:space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group p-[1px] bg-black/10 dark:bg-white/10 rounded-[2rem] md:rounded-[3rem] transition-all hover:bg-cyan-500/50"
              >
                <div className="bg-gray-50 dark:bg-zinc-950 p-8 md:p-16 rounded-[1.9rem] md:rounded-[2.9rem] flex flex-col md:flex-row gap-6 md:gap-10 items-start hover:bg-white dark:hover:bg-zinc-900 transition-all duration-500 shadow-sm dark:shadow-none">
                  <div className="p-4 md:p-5 bg-black/5 dark:bg-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-500 shrink-0">
                    {React.cloneElement(section.icon, { size: 32, className: "md:w-10 md:h-10" })}
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black italic uppercase mb-4 md:mb-6 tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-xl leading-relaxed font-light italic">
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* --- ACCEPTANCE FOOTER --- */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20 md:mt-32 p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border border-black/5 dark:border-white/5 bg-gray-50 dark:bg-gradient-to-b dark:from-cyan-500/10 dark:to-transparent text-center"
          >
            <AlertCircle size={40} className="mx-auto text-cyan-500 mb-6" />
            <h2 className="text-3xl md:text-4xl font-black italic uppercase mb-6">
              User Acknowledgement
            </h2>
            <p className="text-zinc-500 dark:text-zinc-500 max-w-2xl mx-auto mb-10 text-base md:text-lg">
              By clicking "Accept and Continue" or using the Attendex
              infrastructure, you signify your full agreement to the system logic
              and data processing terms outlined above.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#06b6d4",
                  color: "#ffffff",
                  boxShadow: "0px 0px 30px rgba(6, 182, 212, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 md:px-12 py-5 md:py-6 bg-black dark:bg-white text-white dark:text-black font-black italic rounded-full uppercase tracking-tighter text-base md:text-lg transition-all"
              >
                Accept & Continue
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(0,0,0,0.05)",
                  borderColor: "rgba(0,0,0,0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 md:px-12 py-5 md:py-6 bg-transparent text-black dark:text-white border border-black/10 dark:border-white/10 font-black italic rounded-full uppercase tracking-tighter text-base md:text-lg transition-all"
              >
                Download PDF
              </motion.button>
            </div>
          </motion.div>
        </section>

        {/* --- FOOTER --- */}
       <Footer/>
      </div>
    </div>
  );
};

export default Terms;