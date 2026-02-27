import {Smartphone} from "lucide-react"
import {motion} from "framer-motion"


const IPhone17 = () => (
  <div className="relative mx-auto" style={{ width: 300, height: 650 }}>
    <div
      className="absolute inset-0 rounded-[52px]"
      style={{
        background: "linear-gradient(160deg, #3a3a3c 0%, #1c1c1e 40%, #2c2c2e 100%)",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.12), 0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)",
      }}
    />
    <div
      className="absolute rounded-[46px] overflow-hidden"
      style={{ inset: 6, background: "#000" }}
    >
      <div
        className="w-full h-full flex flex-col items-center justify-center"
        style={{
          background: "linear-gradient(160deg, #06b6d4 0%, #0891b2 40%, #0e7490 100%)",
        }}
      >
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 pt-3 text-[10px] font-semibold text-white/80">
          <span>9:41</span>
          <span>●●●</span>
        </div>
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2 bg-black rounded-full"
          style={{ width: 110, height: 32 }}
        />
        <div className="text-center px-6 mt-8">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <Smartphone size={64} className="text-white mb-4 mx-auto drop-shadow-2xl" />
          </motion.div>
         
          <div className="mt-8 space-y-2 w-full">
            {["Batch A · 92%", "Batch B · 88%", "Batch C · 95%"].map((t, i) => (
              <motion.div
                key={i}
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.15 + 0.4 }}
                className="bg-white/15 backdrop-blur rounded-2xl px-4 py-2 text-white text-[11px] font-bold text-left"
              >
                {t}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div
      className="absolute rounded-full"
      style={{
        left: -3,
        top: 130,
        width: 3,
        height: 60,
        background: "linear-gradient(180deg,#4a4a4c,#2c2c2e)",
        boxShadow: "-1px 0 2px rgba(0,0,0,0.5)",
      }}
    />
    <div
      className="absolute rounded-full"
      style={{
        left: -3,
        top: 210,
        width: 3,
        height: 40,
        background: "linear-gradient(180deg,#4a4a4c,#2c2c2e)",
        boxShadow: "-1px 0 2px rgba(0,0,0,0.5)",
      }}
    />
    <div
      className="absolute rounded-full"
      style={{
        right: -3,
        top: 170,
        width: 3,
        height: 80,
        background: "linear-gradient(180deg,#4a4a4c,#2c2c2e)",
        boxShadow: "1px 0 2px rgba(0,0,0,0.5)",
      }}
    />
    <div
      className="absolute inset-0 rounded-[52px] pointer-events-none"
      style={{
        background:
          "linear-gradient(130deg, rgba(255,255,255,0.08) 0%, transparent 50%)",
      }}
    />
  </div>
);

export default IPhone17
