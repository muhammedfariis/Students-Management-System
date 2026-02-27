"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { cn } from "../../../lib/utils/utils";
import { Link } from "react-router-dom";
import Switch from "../ui/toggle";
import MeshBackground from "./mesh";
export interface NavItem {
  label: string;
  href: string;
}

export interface SpotlightNavbarProps {
  items?: NavItem[];
  className?: string;
  onItemClick?: (item: NavItem, index: number) => void;
  defaultActiveIndex?: number;
}

export function SpotlightNavbar({
  items = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Terms", href: "/terms" },
    { label: "Pricing", href: "/pricing" },
  ],
  className,
  onItemClick,
  defaultActiveIndex = 0,
}: SpotlightNavbarProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [hoverX, setHoverX] = useState<number | null>(null);

  const spotlightX = useRef(0);
  const ambienceX = useRef(0);

  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;

    const handleMouseMove = (e: MouseEvent) => {
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

  // Handle the "Ambience" (Active Item) Movement
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

  const handleItemClick = (item: NavItem, index: number) => {
    setActiveIndex(index);
    onItemClick?.(item, index);
  };

  return (
    <div className={cn("relative w-full px-6 pt-10", className)}>
      {/* MAIN FLEX */}
      <div className="flex items-center justify-between">
        {/* LEFT LOGO */}
        <div className="h-10 w-20 flex justify-center items-center">
          <img className="h-fit w-fit" src="/images/attendence.png" alt="Attendex" />
        </div>

        {/* CENTER NAVBAR */}

        <nav
          ref={navRef}
          className={cn(
            "spotlight-nav spotlight-nav-bg glass-border spotlight-nav-shadow",

            "relative h-11 rounded-full transition-all duration-300 overflow-hidden",
          )}
        >
          <ul className="relative flex items-center h-full px-2 gap-0 z-[10]">
            {items.map((item, idx) => (
              <li key={idx} className="relative h-full flex items-center">
                <Link
                  to={item.href}
                  data-index={idx}
                  onClick={() => handleItemClick(item, idx)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-full transition",

                    activeIndex === idx
                      ? "text-black dark:text-cyan-500"
                      : "text-neutral-500 hover:text-black dark:hover:text-cyan-500",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* RIGHT SWITCH */}

        <Switch />
      </div>
    </div>
  );
}
