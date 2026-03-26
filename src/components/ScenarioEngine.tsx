import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw } from "lucide-react";
import TypewriterText from "./TypewriterText";
import OutcomeScreen from "./OutcomeScreen";
import type { Scenario, ScenarioNode } from "@/data/scenarios";

interface ScenarioEngineProps {
  scenario: Scenario;
  onExit: () => void;
}

const ScenarioEngine = ({ scenario, onExit }: ScenarioEngineProps) => {
  const [currentNodeId, setCurrentNodeId] = useState(scenario.startNodeId);
  const [textComplete, setTextComplete] = useState(false);
  const [showOutcome, setShowOutcome] = useState(false);

  const currentNode: ScenarioNode = scenario.nodes[currentNodeId];

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
