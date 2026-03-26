import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { Scenario } from "@/data/scenarios";

interface CrisisCardProps {
  category: {
    id: string;
    title: string;
    icon: string;
    description: string;
    color: string;
  };
  scenarios: Scenario[];
  onSelect: (scenario: Scenario) => void;
  index: number;
}

const CrisisCard = ({ category, scenarios, onSelect, index }: CrisisCardProps) => {
  const colorMap: Record<string, string> = {
    primary: "border-primary/30 hover:border-primary",
    warning: "border-warning/30 hover:border-warning",
    success: "border-survival/30 hover:border-survival",
    danger: "border-danger/30 hover:border-danger",
  };

  const glowMap: Record<string, string> = {
    primary: "box-glow-primary",
    warning: "box-glow-primary",
    success: "box-glow-success",
    danger: "box-glow-danger",
  };

  return (
    <motion.div
      className={`crisis-card ${colorMap[category.color] || ""}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      <div className="text-5xl mb-4">{category.icon}</div>
      <h3 className="font-display text-lg tracking-wider text-foreground mb-2">
        {category.title}
      </h3>
      <p className="text-muted-foreground font-body text-sm mb-4">
        {category.description}
      </p>

      {scenarios.length > 0 ? (
        <div className="space-y-2">
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelect(s)}
              className={`w-full flex items-center justify-between p-3 rounded-md bg-secondary/50 border border-border hover:border-primary transition-all group font-body text-sm text-foreground`}
            >
              <span>{s.title}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          ))}
        </div>
      ) : (
        <div className="p-3 rounded-md bg-secondary/30 border border-border/50 text-center">
          <span className="text-muted-foreground font-body text-xs tracking-wider uppercase">
            Coming Soon
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default CrisisCard;
