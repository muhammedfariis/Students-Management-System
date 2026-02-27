import {motion} from "framer-motion"

const MeshBackground = ({ className = "" }) => (
  <div className={`absolute inset-0 bottom-50 overflow-hidden pointer-events-none ${className}`}>
    <motion.div
      className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 rounded-full opacity-20 dark:opacity-10 blur-3xl"
      style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)" }}
      animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
      transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 rounded-full opacity-20 dark:opacity-10 blur-3xl"
      style={{ background: "radial-gradient(circle, #818cf8, transparent 70%)" }}
      animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
      transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
    />
  </div>
);

export default MeshBackground