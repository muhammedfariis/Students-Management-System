"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { cn } from "../../../lib/utils/utils"; 
import { Link, useLocation } from "react-router-dom"; // Added useLocation
import Switch from "../ui/toggle";
import CustomDropdown from "./dropdown";

interface NavItem {
  label: string;
  href: string;
}

interface SpotlightNavbarProps {
  items?: NavItem[];
  className?: string;
  onItemClick?: (item: NavItem, index: number) => void;
  defaultActiveIndex?: number;
}

export function SpotlightNavbar({
  items = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
  ],
  className,
  onItemClick,
}: SpotlightNavbarProps) {
  const navRef = useRef<HTMLElement | null>(null);
  const location = useLocation(); // Hook to track URL changes
  
  // Initialize state based on current URL path
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    const index = items.findIndex(item => item.href === location.pathname);
    return index !== -1 ? index : 0;
  });
  
  const spotlightX = useRef<number>(0);
  const ambienceX = useRef<number>(0);
  const [isDark, setIsDark] = useState<boolean>(false);

  // Sync active index with URL changes (fixes the "double click" issue)
  useEffect(() => {
    const newIndex = items.findIndex(item => item.href === location.pathname);
    if (newIndex !== -1) {
      setActiveIndex(newIndex);
    }
  }, [location.pathname, items]);

  // Theme Logic
  useEffect(() => {
    const checkTheme = () => {
      const hasDark = document.documentElement.classList.contains("dark");
      setIsDark(hasDark);
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ["class"] 
    });
    return () => observer.disconnect();
  }, []);

  // Spotlight Follow Logic
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      spotlightX.current = x;
      nav.style.setProperty("--spotlight-x", `${x}px`);
    };

    const handleMouseLeave = () => {
      const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`) as HTMLElement;
      if (activeItem) {
        const navRect = nav.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const targetX = itemRect.left - navRect.left + itemRect.width / 2;

        animate(spotlightX.current, targetX, {
          type: "spring",
          stiffness: 200,
          damping: 20,
          onUpdate: (v) => {
            spotlightX.current = v;
            nav.style.setProperty("--spotlight-x", `${v}px`);
          },
        });
      }
    };

    nav.addEventListener("mousemove", handleMouseMove);
    nav.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      nav.removeEventListener("mousemove", handleMouseMove);
      nav.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeIndex]);

  // Ambient Active Glow logic
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    
    const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`) as HTMLElement;

    if (activeItem) {
      const navRect = nav.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const targetX = itemRect.left - navRect.left + itemRect.width / 2;

      animate(ambienceX.current, targetX, {
        type: "spring",
        stiffness: 200,
        damping: 20,
        onUpdate: (v) => {
          ambienceX.current = v;
          nav.style.setProperty("--ambience-x", `${v}px`);
        },
      });
    }
  }, [activeIndex]);

  return (
    <header className={cn("fixed top-0 left-0 w-full z-50 px-6 py-4", className)}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LEFT SECTION: Logo */}
        <div className="flex-1 flex justify-start">
          <Link to="/" className="group transition-transform duration-300 hover:scale-105">
            <img 
              className="h-13 w-auto object-contain rounded-2xl shadow-sm" 
              src={isDark ? "/images/attLogoLight.png" : "/images/attLogoDark.png"} 
              alt="Attendex" 
            />
          </Link>
        </div>

        {/* CENTER SECTION: Spotlight Nav */}
        <div className="flex-shrink-0">
          <nav
            ref={navRef}
            className={cn(
              "relative h-12 rounded-2xl overflow-hidden flex items-center px-2",
              "bg-white dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-300 dark:border-neutral-800/50",
              "shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_25px_rgba(0,0,0,0.3)]"
            )}
            style={{
              "--spotlight-color": isDark ? "rgba(34, 211, 238, 0.15)" : "rgba(0, 0, 0, 0.07)"
            } as React.CSSProperties}
          >
            <div 
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle 80px at var(--spotlight-x) 50%, var(--spotlight-color), transparent)`
              }}
            />

            <ul className="relative flex items-center h-full z-10 gap-1">
              {items.map((item, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <li key={idx}>
                    <Link
                      to={item.href}
                      data-index={idx}
                      onClick={() => onItemClick?.(item, idx)}
                      className={cn(
                        "px-4 py-1.5 text-sm font-semibold rounded-xl transition-all duration-300 relative",
                        // Light Mode: Darker text and more visible grey hover
                        "text-neutral-600 hover:text-black hover:bg-neutral-200/50",
                        // Dark Mode: Cyan glow and white hover
                        "dark:text-neutral-400 dark:hover:text-cyan-300 dark:hover:bg-white/5",
                        // Active States
                        isActive && "text-black bg-neutral-200 dark:text-cyan-400 dark:bg-white/10 shadow-sm"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* RIGHT SECTION: Controls */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <CustomDropdown />
          <div className="h-6 w-px bg-neutral-300 dark:bg-neutral-800" />
          <Switch />
        </div>

      </div>
    </header>
  );
}