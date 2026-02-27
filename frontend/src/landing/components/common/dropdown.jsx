"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { 
  ChevronDown, 
  Book, 
  Cpu, 
  Terminal, 
  ShieldCheck, 
  FileText, 
  Mail 
} from 'lucide-react';

export default function CustomDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close the dropdown if the user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Helper to close menu when a link is clicked
  const handleLinkClick = () => setIsOpen(false);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* --- Trigger Button --- */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-all"
      >
        More
        <ChevronDown 
          className={`-mr-1 h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* --- Dropdown Menu Body --- */}
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            
            {/* Section 1: Resources */}
            <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
              Resources
            </div>
            
            <Link to="/docs" onClick={handleLinkClick} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
              <Book className="mr-3 h-4 w-4 text-gray-400" /> Docs
            </Link>
            <Link to="/logics" onClick={handleLinkClick} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
              <Cpu className="mr-3 h-4 w-4 text-gray-400" /> System Logics
            </Link>
            <Link to="/architecture" onClick={handleLinkClick} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
              <Terminal className="mr-3 h-4 w-4 text-gray-400" /> Architecture
            </Link>

            {/* Visual Separator */}
            <div className="my-1 h-px bg-gray-200" />
            
            <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
              Legal
            </div>

            {/* Section 2: Legal & Contact */}
            <Link to="/privacy" onClick={handleLinkClick} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
              <ShieldCheck className="mr-3 h-4 w-4 text-gray-400" /> Privacy Policy
            </Link>
            <Link to="/terms" onClick={handleLinkClick} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
              <FileText className="mr-3 h-4 w-4 text-gray-400" /> Terms & Condition
            </Link>
            <Link to="/contact" onClick={handleLinkClick} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
              <Mail className="mr-3 h-4 w-4 text-gray-400" /> Contact
            </Link>

          </div>
        </div>
      )}
    </div>
  );
}