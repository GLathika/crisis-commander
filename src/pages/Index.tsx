import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Dashboard from "@/components/Dashboard";
import ScenarioEngine from "@/components/ScenarioEngine";
import type { Scenario } from "@/data/scenarios";

const Index = () => {
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);

  return (
    <>
      <Dashboard onStartScenario={setActiveScenario} />
      <AnimatePresence>
        {activeScenario && (
          <ScenarioEngine
            key={activeScenario.id}
            scenario={activeScenario}
            onExit={() => setActiveScenario(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
