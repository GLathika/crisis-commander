import sceneFlood from "@/assets/scene-flood.jpg";
import sceneFloodFail from "@/assets/scene-flood-fail.jpg";
import sceneFloodSuccess from "@/assets/scene-flood-success.jpg";
import sceneBusFire from "@/assets/scene-busfire.jpg";
import sceneBusHammer from "@/assets/scene-bus-hammer.jpg";
import sceneBusDoorFail from "@/assets/scene-bus-door-fail.jpg";
import sceneBusEscape from "@/assets/scene-bus-escape.jpg";

export interface ScenarioChoice {
  label: string;
  nextNodeId: string;
}

export interface ScenarioNode {
  id: string;
  text: string;
  image: string;
  choices?: ScenarioChoice[];
  outcome?: "failure" | "survival";
  report?: string;
}

export interface Scenario {
  id: string;
  title: string;
  category: "natural" | "manmade" | "environmental" | "emergency";
  description: string;
  nodes: Record<string, ScenarioNode>;
  startNodeId: string;
}

export const scenarios: Scenario[] = [
  {
    id: "flash-flood",
    title: "The Flash Flood Crossing",
    category: "natural",
    description: "A sudden flash flood blocks the road ahead. Your decisions in the next 30 seconds will determine your fate.",
    startNodeId: "start",
    nodes: {
      start: {
        id: "start",
        text: "You're driving home late at night on a rural highway. Rain has been pouring for hours. As you round a bend, your headlights illuminate a terrifying sight — the road ahead is submerged under fast-moving brown water. The current is strong, carrying debris. You can see it's about 2 feet deep... maybe more. What do you do?",
        image: sceneFlood,
        choices: [
          { label: "Drive Through It", nextNodeId: "drive-through" },
          { label: "Turn Around Immediately", nextNodeId: "turn-around" },
          { label: "Wait It Out", nextNodeId: "wait" },
        ],
      },
      "drive-through": {
        id: "drive-through",
        text: "You press the accelerator and enter the water. Within seconds, the current grabs your vehicle like a toy. Your tires lose grip. The engine sputters and dies. Water begins seeping through the doors as your car is swept sideways. You're trapped in a steel coffin being carried downstream...",
        image: sceneFloodFail,
        outcome: "failure",
        report: "CRITICAL ERROR: You attempted to drive through floodwater. Just 6 inches of moving water can knock you down. 12 inches can carry a vehicle. Nearly half of all flood deaths occur in vehicles. Remember: TURN AROUND, DON'T DROWN. This is the #1 rule of flood safety.",
      },
      "turn-around": {
        id: "turn-around",
        text: "You immediately shift into reverse, carefully turn your vehicle around, and drive to higher ground. You call emergency services to report the flooded road. From the safety of an elevated parking lot, you watch as the water level rises another 3 feet in just 20 minutes. Your quick thinking saved your life.",
        image: sceneFloodSuccess,
        outcome: "survival",
        report: "EXCELLENT DECISION: You followed the #1 rule of flood safety — 'Turn Around, Don't Drown.' Key facts: Flash floods are the #1 weather-related killer in the US. A mere 2 feet of water can float a 3,000-pound car. Always seek higher ground and never attempt to cross flooded roadways. You also correctly reported the hazard to emergency services.",
      },
      wait: {
        id: "wait",
        text: "You decide to wait, but the water level is rising fast. Within minutes, the flood water reaches your car. The engine stalls and water begins flooding the cabin. You scramble to escape but the current is too strong against the doors...",
        image: sceneFloodFail,
        outcome: "failure",
        report: "CRITICAL ERROR: Waiting near floodwaters is extremely dangerous. Flash floods can rise several feet in minutes. The safe response is to immediately retreat to higher ground. Never park near waterways during heavy rain. Time is not your ally in flood situations.",
      },
    },
  },
  {
    id: "bus-fire",
    title: "The Markapuram Bus Fire",
    category: "emergency",
    description: "March 26, 2026 — A private sleeper bus catches fire near Markapuram, Andhra Pradesh. You are a passenger who just woke up to smoke and screams.",
    startNodeId: "start",
    nodes: {
      start: {
        id: "start",
        text: "You wake up to screams and thick black smoke filling the bus cabin. The sleeper bus you boarded in Bangalore heading to Vijayawada has caught fire. Orange flames lick at the curtains. Passengers are panicking, pushing toward the front. The heat is already unbearable. You have seconds to act. What's your move?",
        image: sceneBusFire,
        choices: [
          { label: "Rush to the Front Door", nextNodeId: "front-door" },
          { label: "Locate Emergency Hammer", nextNodeId: "find-hammer" },
        ],
      },
      "front-door": {
        id: "front-door",
        text: "You push through the panicked crowd toward the front door. But the fire originated near the engine compartment — the front is an inferno. The door mechanism has melted and jammed. Passengers are crushing against each other in blind panic. The smoke is toxic, and within seconds you can no longer breathe...",
        image: sceneBusDoorFail,
        outcome: "failure",
        report: "CRITICAL ERROR: In bus fires, the front door is often compromised as fires frequently originate from the engine compartment. 90% of casualties in vehicle fires result from exit delays and crowd crush at primary exits. Always identify SECONDARY exits: emergency windows, roof hatches, and emergency hammers. In the Markapuram tragedy, blocked exits and panic were the primary causes of casualties.",
      },
      "find-hammer": {
        id: "find-hammer",
        text: "Staying low to avoid the smoke, you spot the red emergency hammer mounted near the window. You grab it, strike the corner of the window glass with a firm blow — the tempered glass shatters into small safe fragments. Fresh air rushes in. You help two other passengers climb out before escaping yourself. Emergency responders arrive within minutes.",
        image: sceneBusEscape,
        choices: [
          { label: "Break Another Window", nextNodeId: "break-more" },
          { label: "Call for Help & Evacuate", nextNodeId: "evacuate" },
        ],
      },
      "break-more": {
        id: "break-more",
        text: "You move along the outside of the bus, smashing additional windows to create more escape routes. Several passengers climb out through the new openings. Your quick action helped save 12 additional lives. Fire crews arrive and begin battling the blaze.",
        image: sceneBusEscape,
        outcome: "survival",
        report: "HEROIC RESPONSE: You identified the secondary exit system and used the emergency hammer correctly. Key protocols: 1) Stay LOW — smoke and toxic gases rise. 2) Strike window CORNERS — tempered glass breaks easiest at edges. 3) Clear remaining glass before climbing through. 4) Help others once you're safe. In the Markapuram incident, those who located emergency hammers and broke windows had the highest survival rate.",
      },
      evacuate: {
        id: "evacuate",
        text: "You move to safety and immediately call emergency services, providing the exact location on the highway. You guide other escaped passengers away from the burning bus to prevent secondary injuries from potential fuel explosion. Your calm leadership prevented additional casualties.",
        image: sceneBusEscape,
        outcome: "survival",
        report: "EXCELLENT RESPONSE: After escaping, you prioritized calling emergency services and guiding survivors to safety. Key takeaways: 1) Always board buses noting emergency exit locations. 2) Keep a personal window-breaker tool. 3) Cover nose/mouth with wet cloth in smoke. 4) Move at least 100 meters from burning vehicles due to explosion risk. 5) Account for fellow passengers and provide first aid.",
      },
    },
  },
];

export const categories = [
  {
    id: "natural",
    title: "Natural Disasters",
    icon: "🌊",
    description: "Earthquakes, floods, storms — nature's fury unleashed",
    color: "primary" as const,
  },
  {
    id: "manmade",
    title: "Man-Made Crises",
    icon: "💥",
    description: "Industrial accidents, structural failures, chemical hazards",
    color: "warning" as const,
  },
  {
    id: "environmental",
    title: "Environmental",
    icon: "🏭",
    description: "Toxic spills, radiation, air quality emergencies",
    color: "success" as const,
  },
  {
    id: "emergency",
    title: "Emergency Situations",
    icon: "🔥",
    description: "Vehicle fires, building collapses, mass casualty events",
    color: "danger" as const,
  },
];
