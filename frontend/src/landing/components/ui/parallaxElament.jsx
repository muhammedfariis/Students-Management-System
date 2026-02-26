import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";
import {
  Users,
  CheckCircle,
  CreditCard,
  Lock,
  Database,
  BarChart3,
  Fingerprint,
  Code2,
  Smartphone,
  Zap,
  Clock,
  Globe,
  Server,
  Activity,
  ShieldCheck,
} from "lucide-react";
const ParallaxElement = ({
  children,
  speed = 0,
  className = "",
  direction = "y",
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const range =
    direction === "y" ? [speed * -100, speed * 100] : [speed * -50, speed * 50];
  const movement = useTransform(scrollYProgress, [0, 1], range);
  const smoothMovement = useSpring(movement, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      style={{ [direction === "y" ? "y" : "x"]: smoothMovement }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxElement