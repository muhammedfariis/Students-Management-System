import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ShieldCheck,
  Globe,
  ArrowUpRight,
  Terminal,
} from "lucide-react";

const Footer = () => {
  const mode = useSelector((state) => state.theme?.mode || "dark");
  const containerRef = useRef(null);
  const isDarkMode = mode === "dark";

  const currentYear = new Date().getFullYear();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const springRotateX = useSpring(rotateX, { stiffness: 80, damping: 20 });

  const footerLinks = [
    {
      title: "Explore",
      links: [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Pricing", path: "/pricing" },
        { name: "Features", path: "/features" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", path: "/docs" },
        { name: "System Logic", path: "/logic" },
        { name: "Architecture", path: "/architecture" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Terms", path: "/terms" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Contact", path: "/contact" },
      ],
    },
  ];

  return (
    <footer
      ref={containerRef}
      className={`${mode === "dark" ? "dark" : ""} w-full py-16 bg-white dark:bg-black transition-colors duration-500 font-sans`}
      style={{ perspective: "1200px" }}
    >
      <motion.div
        style={{
          rotateX: springRotateX,
          scale,
          opacity,
          transformStyle: "preserve-3d",
        }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="relative bg-gray-50 dark:bg-zinc-950 border glass-border rounded-[2rem] p-8 md:p-12 overflow-hidden shadow-xl">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-35 h-30 bg-black dark:bg-white rounded-2xl shadow-lg cursor-pointer overflow-hidden flex items-center justify-center relative border-2 border-transparent"
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    borderColor: isDarkMode
                      ? "rgba(255,255,255,0.5)"
                      : "rgba(0,0,0,0.1)",
                    boxShadow: isDarkMode
                      ? "0px 0px 25px rgba(255,255,255,0.3)"
                      : "0px 0px 25px rgba(0,0,0,0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.img
                    src={
                      isDarkMode
                        ? "/images/attLogoLight.png"
                        : "/images/attLogoDark.png"
                    }
                    alt="Attendex Logo"
                    className="w-full h-full object-fit block"
                    whileHover={{
                      filter: "brightness(1.2)",
                      scale: 1.1,
                    }}
                  />
                </motion.div>
                <h2 className="text-2xl font-bold tracking-tight dark:text-white uppercase italic">
                  Attend<span className="text-cyan-500">ex</span>
                </h2>
              </div>

              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-xs">
                Premium institutional logic and attendance infrastructure.
                Engineered by
                <span className="text-black dark:text-white font-semibold ml-1">
                  Muhammed Faris
                </span>
                .
              </p>

              <div className="flex gap-3">
                {[
                  {
                    icon: <Github size={18} />,
                    href: "https://github.com/muhammedfariis",
                  },
                  {
                    icon: <Globe size={18} />,
                    href: "https://muhammedfarisportfolio.netlify.app",
                  },
                  {
                    icon: <Linkedin size={18} />,
                    href: "https://www.linkedin.com/in/muhammed-faris-431270375",
                  },
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.05 }}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-white/5 border glass-border hover:border-cyan-500 transition-colors"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
              {footerLinks.map((group, idx) => (
                <div key={idx} className="space-y-5">
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                    {group.title}
                  </h4>
                  <ul className="space-y-3">
                    {group.links.map((link, i) => (
                      <li key={i}>
                        <Link
                          to={link.path}
                          className="text-zinc-600 dark:text-zinc-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all text-sm font-medium flex items-center group"
                        >
                          {link.name}
                          <ArrowUpRight
                            size={12}
                            className="ml-1 opacity-0 group-hover:opacity-100 transition-all"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div
            className="mt-16 pt-10 pb-8 border glass-border flex flex-col items-center justify-center text-center rounded-[2rem] space-y-8 
            bg-gradient-to-b from-gray-100/50 to-white 
            dark:from-zinc-900/50 dark:to-black 
            hover:from-cyan-500/5 dark:hover:from-cyan-500/10 transition-all duration-700 shadow-inner"
          >
            <div className="flex flex-col items-center space-y-3">
              <motion.div
                whileHover={{ width: 80 }}
                whileTap={{ width: 60 }}
                className="w-14 h-14 rounded-2xl bg-white dark:bg-black border glass-border flex items-center justify-center mb-2 shadow-sm transition-all duration-300"
              >
                <Mail className="text-cyan-500" size={28} />
              </motion.div>

              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">
                Institutional Support Node
              </p>

              <a
                href="mailto:muhammedfariis101@gmail.com"
                className="text-xl md:text-3xl font-bold tracking-tighter hover:text-cyan-500 transition-colors duration-300 dark:text-white"
              >
                muhammedfariis101@gmail.com
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-5 py-2 bg-white/50 dark:bg-black/50 rounded-full border glass-border">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold uppercase text-emerald-600 tracking-wider">
                  Protocol Active
                </span>
              </div>
              <div className="flex items-center gap-2 px-5 py-2 bg-white/50 dark:bg-black/50 rounded-full border glass-border">
                <Globe size={12} className="text-blue-500" />
                <span className="text-[10px] font-bold uppercase text-blue-500 tracking-wider">
                  Global v4.0
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6 px-2">
          <div className="flex items-center gap-2 text-zinc-400 dark:text-zinc-600">
            <ShieldCheck size={14} className="text-cyan-500/50" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Muhammed Faris
            </span>
          </div>

          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
            © {currentYear} Attendex Infrastructure Labs
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
