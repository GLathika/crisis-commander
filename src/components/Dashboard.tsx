import { motion } from "framer-motion";
import CrisisCard from "./CrisisCard";
import { scenarios, categories } from "@/data/scenarios";
import type { Scenario } from "@/data/scenarios";
import heroCharacter from "@/assets/hero-character.png";

interface DashboardProps {
  onStartScenario: (scenario: Scenario) => void;
}

const Dashboard = ({ onStartScenario }: DashboardProps) => {
  const getScenariosByCategory = (catId: string) =>
    scenarios.filter((s) => s.category === catId);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-danger/5 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 pt-12 pb-8">
          {/* Hero with character */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-16">
            {/* Character - Big and Central */}
            <motion.div
              className="relative flex-shrink-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              {/* Glow ring behind character */}
              <motion.div
                className="absolute inset-0 -m-8 rounded-full bg-gradient-to-br from-primary/20 via-danger/10 to-primary/20 blur-2xl"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
              <motion.img
                src={heroCharacter}
                alt="Emergency Response Operative"
                className="relative z-10 h-[420px] md:h-[520px] lg:h-[600px] w-auto drop-shadow-2xl"
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                style={{
                  filter: "drop-shadow(0 0 40px hsl(35 95% 55% / 0.3)) drop-shadow(0 20px 60px rgba(0,0,0,0.5))"
                }}
              />
            </motion.div>

            {/* Text Content */}
            <motion.div
              className="text-center lg:text-left max-w-xl"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <motion.div
                className="inline-block px-4 py-1.5 bg-danger/10 border border-danger/30 rounded-full mb-6"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <span className="font-display text-xs tracking-[0.3em] text-danger uppercase">
                  ⚡ Live Training Simulation
                </span>
              </motion.div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
                DISASTER
                <br />
                <span className="text-primary text-glow-primary">RESPONSE</span>
                <br />
                SIMULATOR
              </h1>

              <p className="text-muted-foreground font-body text-lg md:text-xl max-w-md mx-auto lg:mx-0">
                Interactive crisis training through immersive visual scenarios.
                Every choice matters. Every second counts.
              </p>

              <motion.div
                className="mt-6 flex items-center gap-6 justify-center lg:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="text-center">
                  <div className="font-display text-2xl text-primary">4</div>
                  <div className="font-body text-xs text-muted-foreground uppercase tracking-wider">Categories</div>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <div className="font-display text-2xl text-danger">7</div>
                  <div className="font-body text-xs text-muted-foreground uppercase tracking-wider">Active Scenarios</div>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <div className="font-display text-2xl text-survival">∞</div>
                  <div className="font-body text-xs text-muted-foreground uppercase tracking-wider">Lives Saved</div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Section Header */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="font-display text-sm tracking-[0.4em] text-primary uppercase mb-2">
              Select Crisis Category
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          </motion.div>

          {/* Crisis Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto pb-16">
            {categories.map((cat, i) => (
              <CrisisCard
                key={cat.id}
                category={cat}
                scenarios={getScenariosByCategory(cat.id)}
                onSelect={onStartScenario}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
