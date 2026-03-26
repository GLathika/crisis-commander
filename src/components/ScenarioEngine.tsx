import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import TypewriterText from "./TypewriterText";
import OutcomeScreen from "./OutcomeScreen";
import heroCharacter from "@/assets/hero-character.png";
import type { Scenario, ScenarioNode } from "@/data/scenarios";

interface ScenarioEngineProps {
  scenario: Scenario;
  onExit: () => void;
}

const poseAnimations: Record<string, { animate: object; transition: object }> = {
  alert: {
    animate: { y: [0, -8, 0], scale: [1, 1.03, 1] },
    transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
  },
  running: {
    animate: { x: [0, 15, 0, -15, 0], y: [0, -20, 0, -20, 0], rotate: [0, 5, 0, -5, 0] },
    transition: { repeat: Infinity, duration: 0.8, ease: "easeInOut" },
  },
  thinking: {
    animate: { y: [0, -5, 0], rotate: [0, -3, 0, 3, 0] },
    transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
  },
  pointing: {
    animate: { x: [0, 10, 0], scale: [1, 1.05, 1] },
    transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
  },
  ducking: {
    animate: { y: [0, 15, 10], scale: [1, 0.85, 0.88], rotate: [0, -5, -3] },
    transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
  },
  celebrating: {
    animate: { y: [0, -25, 0], scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] },
    transition: { repeat: Infinity, duration: 1.2, ease: "easeInOut" },
  },
};

const ScenarioEngine = ({ scenario, onExit }: ScenarioEngineProps) => {
  const [currentNodeId, setCurrentNodeId] = useState(scenario.startNodeId);
  const [textComplete, setTextComplete] = useState(false);
  const [showOutcome, setShowOutcome] = useState(false);

  const currentNode: ScenarioNode = scenario.nodes[currentNodeId];
  const pose = currentNode.characterPose || "alert";
  const poseAnim = poseAnimations[pose] || poseAnimations.alert;

  const handleChoice = useCallback((nextNodeId: string) => {
    setTextComplete(false);
    setShowOutcome(false);
    setCurrentNodeId(nextNodeId);
  }, []);

  const handleTextComplete = useCallback(() => {
    setTextComplete(true);
    if (currentNode.outcome) {
      setTimeout(() => setShowOutcome(true), 800);
    }
  }, [currentNode.outcome]);

  const handleRestart = useCallback(() => {
    setCurrentNodeId(scenario.startNodeId);
    setTextComplete(false);
    setShowOutcome(false);
  }, [scenario.startNodeId]);

  return (
    <div className="fixed inset-0 z-40 bg-background">
      {/* Background Scene */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentNodeId}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={currentNode.image}
            alt="Scene"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Animated Hero Character */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`char-${currentNodeId}`}
          className="absolute bottom-28 right-4 md:right-8 z-50 pointer-events-none"
          initial={{ opacity: 0, x: 80, scale: 0.5 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 80, scale: 0.5 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 150 }}
        >
          {/* Glow aura behind character */}
          <motion.div
            className="absolute inset-0 -m-6 rounded-full blur-2xl"
            style={{
              background: currentNode.outcome === "failure"
                ? "radial-gradient(circle, hsl(0 85% 55% / 0.3), transparent)"
                : currentNode.outcome === "survival"
                ? "radial-gradient(circle, hsl(145 70% 45% / 0.3), transparent)"
                : "radial-gradient(circle, hsl(35 95% 55% / 0.25), transparent)",
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          />
          <motion.img
            src={heroCharacter}
            alt="Response Operative"
            className="h-[160px] md:h-[220px] lg:h-[280px] w-auto drop-shadow-2xl"
            animate={poseAnim.animate as any}
            transition={poseAnim.transition as any}
            style={{
              filter: currentNode.outcome === "failure"
                ? "drop-shadow(0 0 25px hsl(0 85% 55% / 0.5)) hue-rotate(-10deg)"
                : currentNode.outcome === "survival"
                ? "drop-shadow(0 0 25px hsl(145 70% 45% / 0.5))"
                : "drop-shadow(0 0 30px hsl(35 95% 55% / 0.4))",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 p-4 flex items-center gap-4">
        <button
          onClick={onExit}
          className="flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-lg border border-border text-foreground hover:border-primary transition-colors font-body"
        >
          <ArrowLeft className="w-4 h-4" />
          Exit
        </button>
        <h2 className="font-display text-sm md:text-base text-primary tracking-wider uppercase">
          {scenario.title}
        </h2>
      </div>

      {/* Dialogue Box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentNodeId}
          className="absolute bottom-0 left-0 right-0 z-50 dialogue-box"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="max-w-4xl mx-auto">
            <TypewriterText
              text={currentNode.text}
              speed={25}
              onComplete={handleTextComplete}
            />

            {/* Choice Buttons */}
            {textComplete && currentNode.choices && !currentNode.outcome && (
              <motion.div
                className="flex flex-wrap gap-3 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {currentNode.choices.map((choice, i) => (
                  <motion.button
                    key={choice.nextNodeId}
                    onClick={() => handleChoice(choice.nextNodeId)}
                    className="px-6 py-3 bg-secondary border-2 border-primary/50 rounded-lg font-display text-sm tracking-wider text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 box-glow-primary"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {choice.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Outcome Screen */}
      <AnimatePresence>
        {showOutcome && currentNode.outcome && (
          <OutcomeScreen
            type={currentNode.outcome}
            report={currentNode.report || ""}
            onRestart={handleRestart}
            onExit={onExit}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScenarioEngine;
