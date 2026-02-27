"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { cn } from "../../../lib/utils/utils";
import { Link } from "react-router-dom";
import Switch from "../ui/toggle";
import CustomDropdown from "./dropdown";

export function SpotlightNavbar({
  items = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
  ],
  className,
  onItemClick,
  defaultActiveIndex = 0,
}) {
  const navRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [hoverX, setHoverX] = useState(null);

  const spotlightX = useRef(0);
  const ambienceX = useRef(0);

  // Spotlight effect logic (Unchanged logic, just ensure ref types are clean for JS)
  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;

    const handleMouseMove = (e) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setHoverX(x);
      spotlightX.current = x;
      nav.style.setProperty("--spotlight-x", `${x}px`);
    };

    const handleMouseLeave = () => {
      setHoverX(null);
      const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);
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

  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;
    const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);

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

  const handleItemClick = (item, index) => {
    setActiveIndex(index);
    onItemClick?.(item, index);
  };

  return (
    <header className={cn("fixed top-0 left-0 w-full z-50 px-6 py-4", className)}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LEFT SECTION: Logo */}
        <div className="flex-1 flex justify-start">
          <Link to="/" className="flex items-center">
            <img 
              className="h-8 w-auto object-contain" 
              src="/images/attendence.png" 
              alt="Attendex" 
            />
          </Link>
        </div>

        {/* CENTER SECTION: Spotlight Nav */}
        <div className="flex-shrink-0">
          <nav
            ref={navRef}
            className="spotlight-nav spotlight-nav-bg glass-border spotlight-nav-shadow relative h-11 rounded-full overflow-hidden flex items-center"
          >
            <ul className="relative flex items-center h-full px-1.5 z-10">
              {items.map((item, idx) => (
                <li key={idx} className="flex items-center">
                  <Link
                    to={item.href}
                    data-index={idx}
                    onClick={() => handleItemClick(item, idx)}
                    className={cn(
                      "px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200",
                      activeIndex === idx
                        ? "text-black dark:text-cyan-400"
                        : "text-neutral-500 hover:text-black dark:hover:text-neutral-200"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* RIGHT SECTION: Dropdown & Switch */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <CustomDropdown />
          <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-800" /> {/* Divider */}
          <Switch />
        </div>

      </div>
    </header>
  );
}