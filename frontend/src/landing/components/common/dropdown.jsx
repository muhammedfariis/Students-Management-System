"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, Book, Cpu, Terminal, 
  ShieldCheck, FileText, Mail 
} from 'lucide-react';
import { cn } from "../../../lib/utils/utils";

export default function CustomDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "inline-flex items-center justify-center gap-x-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300",
          "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md",
          "text-neutral-700 dark:text-neutral-300",
          "border border-neutral-200 dark:border-neutral-800",
          "hover:border-neutral-300 dark:hover:border-cyan-500/50",
          "hover:shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]"
        )}
      >
        <span>More</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", isOpen ? 'rotate-180 text-cyan-500' : 'text-neutral-400')} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={cn(
              "absolute right-0 z-50 mt-3 w-64 origin-top-right rounded-2xl p-2",
              "bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl",
              "border border-neutral-200 dark:border-neutral-800",
              "shadow-2xl ring-1 ring-black/5 dark:ring-white/5"
            )}
          >
            <div className="space-y-1">
              <div className="px-3 py-2 text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">Resources</div>
              <DropdownItem to="/docs" icon={<Book size={18} />} label="Docs" onClick={handleLinkClick} />
              <DropdownItem to="/logics" icon={<Cpu size={18} />} label="System Logics" onClick={handleLinkClick} />
              <DropdownItem to="/architecture" icon={<Terminal size={18} />} label="Architecture" onClick={handleLinkClick} />
              
              <div className="my-2 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent" />
              
              <div className="px-3 py-2 text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">Legal</div>
              <DropdownItem to="/privacy" icon={<ShieldCheck size={18} />} label="Privacy" onClick={handleLinkClick} />
              <DropdownItem to="/terms" icon={<FileText size={18} />} label="Terms" onClick={handleLinkClick} />
              <DropdownItem to="/contact" icon={<Mail size={18} />} label="Contact" onClick={handleLinkClick} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DropdownItem({ to, icon, label, onClick }) {
  return (
    <Link 
      to={to} 
      onClick={onClick} 
      className={cn(
        "group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200",
        "text-neutral-600 dark:text-neutral-400",
        "hover:bg-neutral-100 dark:hover:bg-white/5",
        "hover:text-black dark:hover:text-cyan-400"
      )}
    >
      <span className="mr-3 text-neutral-400 group-hover:text-black dark:group-hover:text-cyan-400 transition-colors">
        {icon}
      </span>
      {label}
    </Link>
  );
}