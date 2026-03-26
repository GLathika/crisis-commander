import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

const TypewriterText = ({ text, speed = 30, onComplete }: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return (
    <motion.p
      className="text-lg md:text-xl leading-relaxed font-body text-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {displayedText}
      {!isComplete && (
        <motion.span
          className="inline-block w-0.5 h-5 bg-primary ml-1 align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.7 }}
        />
      )}
    </motion.p>
  );
};

export default TypewriterText;
