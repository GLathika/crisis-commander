import { motion } from "framer-motion";
import { RotateCcw, Home, ShieldCheck, ShieldX } from "lucide-react";

interface OutcomeScreenProps {
  type: "failure" | "survival";
  report: string;
  onRestart: () => void;
  onExit: () => void;
}

const OutcomeScreen = ({ type, report, onRestart, onExit }: OutcomeScreenProps) => {
  const isFail = type === "failure";

  return (
    <motion.div
      className="outcome-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`absolute inset-0 ${isFail ? "bg-danger/10" : "bg-survival/10"}`} />

      {/* Scanline effect for failure */}
      {isFail && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-full h-1 bg-danger/30"
            animate={{ y: ["-100%", "100vh"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
        </div>
      )}

      <motion.div
        className="relative z-10 max-w-2xl mx-auto p-8 text-center"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
      >
        {/* Icon */}
        <motion.div
          className={`mx-auto mb-6 w-24 h-24 rounded-full flex items-center justify-center ${
            isFail ? "bg-danger/20 border-2 border-danger" : "bg-survival/20 border-2 border-survival"
          }`}
          animate={isFail ? { scale: [1, 1.1, 1] } : { rotate: [0, 360] }}
          transition={isFail ? { repeat: Infinity, duration: 1.5 } : { duration: 1 }}
        >
          {isFail ? (
            <ShieldX className="w-12 h-12 text-danger" />
          ) : (
            <ShieldCheck className="w-12 h-12 text-survival" />
          )}
        </motion.div>

        {/* Title */}
        <motion.h1
          className={`font-display text-5xl md:text-7xl font-bold tracking-widest mb-4 ${
            isFail ? "text-danger text-glow-danger" : "text-survival text-glow-success"
          }`}
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {isFail ? "FAILURE" : "SURVIVAL"}
        </motion.h1>

        {/* Report Card */}
        <motion.div
          className="mt-8 bg-card/95 backdrop-blur-md border border-border rounded-lg p-6 text-left"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="font-display text-sm tracking-widest text-primary mb-3 uppercase">
            Safety Protocol Report
          </h3>
          <p className="text-foreground/90 font-body text-base leading-relaxed">
            {report}
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex justify-center gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <button
            onClick={onRestart}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-display text-sm tracking-wider hover:opacity-90 transition-opacity"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
          <button
            onClick={onExit}
            className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-display text-sm tracking-wider border border-border hover:border-primary transition-colors"
          >
            <Home className="w-4 h-4" />
            Dashboard
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default OutcomeScreen;
