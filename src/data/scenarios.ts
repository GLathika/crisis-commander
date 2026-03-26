import sceneFlood from "@/assets/scene-flood.jpg";
import sceneFloodFail from "@/assets/scene-flood-fail.jpg";
import sceneFloodSuccess from "@/assets/scene-flood-success.jpg";
import sceneBusFire from "@/assets/scene-busfire.jpg";
import sceneBusHammer from "@/assets/scene-bus-hammer.jpg";
import sceneBusDoorFail from "@/assets/scene-bus-door-fail.jpg";
import sceneBusEscape from "@/assets/scene-bus-escape.jpg";
import sceneEarthquake from "@/assets/scene-earthquake.jpg";
import sceneEarthquakeCover from "@/assets/scene-earthquake-cover.jpg";
import sceneEarthquakeFail from "@/assets/scene-earthquake-fail.jpg";
import sceneFactoryExplosion from "@/assets/scene-factory-explosion.jpg";
import sceneFactoryEvacuate from "@/assets/scene-factory-evacuate.jpg";
import sceneFactoryTrapped from "@/assets/scene-factory-trapped.jpg";
import sceneToxicSpill from "@/assets/scene-toxic-spill.jpg";
import sceneToxicEvacuate from "@/assets/scene-toxic-evacuate.jpg";
import sceneToxicFail from "@/assets/scene-toxic-fail.jpg";
import sceneWildfire from "@/assets/scene-wildfire.jpg";
import sceneWildfireEscape from "@/assets/scene-wildfire-escape.jpg";
import sceneWildfireFail from "@/assets/scene-wildfire-fail.jpg";
import sceneBuildingCollapse from "@/assets/scene-building-collapse.jpg";
import sceneCollapseSurvive from "@/assets/scene-collapse-survive.jpg";
import sceneCollapseFail from "@/assets/scene-collapse-fail.jpg";

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
  characterPose?: "alert" | "running" | "thinking" | "pointing" | "ducking" | "celebrating";
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
  // ===== NATURAL DISASTERS =====
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
        characterPose: "alert",
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
        characterPose: "ducking",
        outcome: "failure",
        report: "CRITICAL ERROR: You attempted to drive through floodwater. Just 6 inches of moving water can knock you down. 12 inches can carry a vehicle. Nearly half of all flood deaths occur in vehicles. Remember: TURN AROUND, DON'T DROWN.",
      },
      "turn-around": {
        id: "turn-around",
        text: "You immediately shift into reverse, carefully turn your vehicle around, and drive to higher ground. You call emergency services to report the flooded road. From the safety of an elevated parking lot, you watch as the water level rises another 3 feet in just 20 minutes. Your quick thinking saved your life.",
        image: sceneFloodSuccess,
        characterPose: "celebrating",
        outcome: "survival",
        report: "EXCELLENT DECISION: You followed the #1 rule of flood safety — 'Turn Around, Don't Drown.' Key facts: Flash floods are the #1 weather-related killer. A mere 2 feet of water can float a 3,000-pound car. Always seek higher ground.",
      },
      wait: {
        id: "wait",
        text: "You decide to wait, but the water level is rising fast. Within minutes, the flood water reaches your car. The engine stalls and water begins flooding the cabin. You scramble to escape but the current is too strong against the doors...",
        image: sceneFloodFail,
        characterPose: "ducking",
        outcome: "failure",
        report: "CRITICAL ERROR: Waiting near floodwaters is extremely dangerous. Flash floods can rise several feet in minutes. The safe response is to immediately retreat to higher ground.",
      },
    },
  },
  {
    id: "earthquake",
    title: "The Office Earthquake",
    category: "natural",
    description: "A massive 7.2 magnitude earthquake strikes while you're on the 5th floor of an office building.",
    startNodeId: "start",
    nodes: {
      start: {
        id: "start",
        text: "The building suddenly shakes violently. Ceiling tiles crash down, monitors fly off desks, and the floor heaves beneath your feet. The fluorescent lights flicker and shatter. A massive 7.2 magnitude earthquake has struck. Colleagues are screaming. You have seconds to react. What do you do?",
        image: sceneEarthquake,
        characterPose: "alert",
        choices: [
          { label: "Drop, Cover, and Hold On", nextNodeId: "cover" },
          { label: "Run for the Exit", nextNodeId: "run-exit" },
          { label: "Stand in a Doorway", nextNodeId: "doorway" },
        ],
      },
      cover: {
        id: "cover",
        text: "You DROP to your hands and knees, COVER your head under a sturdy desk, and HOLD ON to the desk leg. Debris rains down around you — a massive light fixture crashes exactly where you were standing. The shaking lasts 45 seconds that feel like an eternity. When it stops, you're uninjured. You carefully evacuate using the stairs.",
        image: sceneEarthquakeCover,
        characterPose: "ducking",
        outcome: "survival",
        report: "PERFECT RESPONSE: 'Drop, Cover, and Hold On' is the internationally recommended earthquake response. Most injuries occur from falling objects, not building collapse. Your desk protected you from the light fixture. After shaking stops, evacuate via stairs — never elevators.",
      },
      "run-exit": {
        id: "run-exit",
        text: "You sprint toward the emergency exit, but the violent shaking throws you off balance. You slam into a toppling filing cabinet. Glass from the shattered windows litters the hallway. A section of the ceiling collapses directly in your path, sending a cloud of dust and sharp debris raining down on you...",
        image: sceneEarthquakeFail,
        characterPose: "running",
        outcome: "failure",
        report: "CRITICAL ERROR: Running during an earthquake is extremely dangerous. Most injuries are caused by falling debris and objects — not building collapse. Moving during shaking exposes you to flying glass, toppling furniture, and falling ceiling materials. Always Drop, Cover, and Hold On until shaking stops.",
      },
      doorway: {
        id: "doorway",
        text: "You rush to a doorway and brace yourself, but modern doorways offer no more protection than any other part of the building. The door swings violently, slamming into you. Without overhead cover, falling debris strikes you. This outdated advice from the 1900s doesn't apply to modern buildings...",
        image: sceneEarthquakeFail,
        characterPose: "ducking",
        outcome: "failure",
        report: "CRITICAL ERROR: The 'doorway myth' is outdated advice from the era of adobe buildings. In modern structures, doorways are no stronger than any other part. The swinging door itself becomes a hazard. The correct response is Drop, Cover, and Hold On under a sturdy piece of furniture.",
      },
    },
  },

  // ===== MAN-MADE CRISES =====
  {
    id: "factory-explosion",
    title: "The Chemical Plant Explosion",
    category: "manmade",
    description: "A massive explosion rocks a chemical processing plant. You're a worker on the night shift just 200 meters from the blast.",
    startNodeId: "start",
    nodes: {
      start: {
        id: "start",
        text: "A deafening explosion shatters the night. The chemical storage unit has blown — a fireball rises 50 meters into the air. Alarms blare across the facility. You feel the heat wave even from 200 meters away. Toxic fumes are beginning to spread. Your co-workers are in shock. You have to decide NOW.",
        image: sceneFactoryExplosion,
        characterPose: "alert",
        choices: [
          { label: "Evacuate Upwind Immediately", nextNodeId: "evacuate-upwind" },
          { label: "Run Back to Save Equipment", nextNodeId: "save-equipment" },
          { label: "Head to the Shelter-in-Place Room", nextNodeId: "shelter" },
        ],
      },
      "evacuate-upwind": {
        id: "evacuate-upwind",
        text: "You check the wind direction from the facility flags — the wind is blowing east. You lead your team west, moving perpendicular to and then upwind of the toxic plume. You reach the assembly point 500 meters away, do a headcount, and call emergency services with details about the chemicals involved. Professional hazmat teams arrive within 15 minutes.",
        image: sceneFactoryEvacuate,
        characterPose: "running",
        outcome: "survival",
        report: "EXCELLENT RESPONSE: You correctly identified wind direction and evacuated UPWIND and perpendicular to the toxic plume. Key protocols: 1) Always know wind direction at chemical facilities. 2) Move perpendicular first, then upwind. 3) Account for all personnel at assembly point. 4) Report specific chemicals to emergency services for proper hazmat response.",
      },
      "save-equipment": {
        id: "save-equipment",
        text: "You run back toward the blast zone to shut down critical systems. But the secondary containment has already failed — toxic hydrogen sulfide gas is pouring from ruptured pipes. Without proper respiratory protection, the gas overwhelms you within 30 seconds. At concentrations above 100 ppm, H2S causes immediate collapse...",
        image: sceneFactoryTrapped,
        characterPose: "ducking",
        outcome: "failure",
        report: "CRITICAL ERROR: Never re-enter a blast zone without proper PPE and authorization. Hydrogen sulfide (H2S) is immediately lethal at high concentrations — you cannot outrun an invisible gas cloud. Equipment can be replaced; lives cannot. Always prioritize evacuation over property.",
      },
      shelter: {
        id: "shelter",
        text: "You head to the designated shelter-in-place room, seal the doors with plastic sheeting, and activate the positive-pressure ventilation system. You monitor the radio for all-clear signals. After 2 hours, the hazmat team gives the all-clear. Your knowledge of emergency procedures kept everyone in the room safe.",
        image: sceneFactoryEvacuate,
        characterPose: "thinking",
        outcome: "survival",
        report: "GOOD RESPONSE: Shelter-in-place is a valid strategy when evacuation routes are compromised. Key steps: 1) Seal all doors and windows. 2) Shut off HVAC systems. 3) Use wet cloths over vents if no plastic sheeting available. 4) Monitor emergency communications. 5) Do NOT leave until all-clear is given by authorities.",
      },
    },
  },
  {
    id: "building-collapse",
    title: "The Construction Site Collapse",
    category: "manmade",
    description: "An under-construction high-rise partially collapses. You're a passerby caught in the danger zone.",
    startNodeId: "start",
    nodes: {
      start: {
        id: "start",
        text: "You hear a terrifying groan of steel and concrete. Looking up, you see the upper floors of a construction site buckling inward. Massive chunks of concrete and rebar are crashing down onto the street. A dust cloud is racing toward you. People are screaming and running in all directions. What do you do?",
        image: sceneBuildingCollapse,
        characterPose: "alert",
        choices: [
          { label: "Run Perpendicular to the Building", nextNodeId: "run-perpendicular" },
          { label: "Take Shelter Behind a Sturdy Structure", nextNodeId: "take-shelter" },
          { label: "Run Directly Away from the Building", nextNodeId: "run-away" },
        ],
      },
      "run-perpendicular": {
        id: "run-perpendicular",
        text: "You sprint perpendicular to the collapsing face of the building, getting out of the debris footprint as fast as possible. A massive slab crashes where you were standing just 5 seconds ago. The dust cloud engulfs you but you cover your mouth with your shirt and keep moving. You make it to safety across the street behind a concrete barrier.",
        image: sceneCollapseSurvive,
        characterPose: "running",
        outcome: "survival",
        report: "EXCELLENT RESPONSE: Running perpendicular to the collapse direction minimizes your time in the debris zone. Key rules: 1) A building's debris field typically extends 1/3 to 1/2 of its height outward. 2) Run perpendicular, not parallel. 3) Cover your mouth — concrete dust is extremely harmful. 4) Once safe, do NOT re-enter the area due to secondary collapse risk.",
      },
      "take-shelter": {
        id: "take-shelter",
        text: "You duck behind a large concrete planter and heavy steel bench near the building entrance. The debris rains down around you but the sturdy structures deflect the worst of it. You curl into a ball protecting your head. When the collapse settles, you're covered in dust but alive. You carefully extract yourself and move away from the danger zone.",
        image: sceneCollapseSurvive,
        characterPose: "ducking",
        outcome: "survival",
        report: "GOOD RESPONSE: When you can't outrun debris, finding substantial cover is the next best option. The 'triangle of life' concept — positioning next to large, sturdy objects — can create survivable voids. Always protect your head and airway. After any collapse, move away quickly as secondary collapses are common.",
      },
      "run-away": {
        id: "run-away",
        text: "You run directly away from the building, but the debris field is spreading faster than you can sprint. Running in the same direction as the collapse keeps you in the danger zone longer. A heavy concrete chunk strikes the ground right beside you, and the shockwave throws you off your feet. The dust cloud envelops you completely...",
        image: sceneCollapseFail,
        characterPose: "running",
        outcome: "failure",
        report: "CRITICAL ERROR: Running directly away from a collapsing building keeps you in the debris zone for the maximum amount of time. Always run PERPENDICULAR to the collapse direction. A 10-story building can scatter debris up to 50 meters outward. If you can't outrun it, seek substantial cover immediately.",
      },
    },
  },

  // ===== ENVIRONMENTAL =====
  {
    id: "toxic-spill",
    title: "The River Contamination",
    category: "environmental",
    description: "A chemical tanker has overturned near the local river, spilling thousands of gallons of industrial chemicals into the water supply.",
    startNodeId: "start",
    nodes: {
      start: {
        id: "start",
        text: "Breaking news alerts flood your phone — a chemical tanker has crashed near the reservoir that supplies your town's water. Green-tinted foam is visible on the river surface. Authorities are issuing warnings but details are scarce. Your family is at home. The tap water smells slightly off. What do you do?",
        image: sceneToxicSpill,
        characterPose: "thinking",
        choices: [
          { label: "Stop All Water Use Immediately", nextNodeId: "stop-water" },
          { label: "Boil the Water Before Using", nextNodeId: "boil-water" },
          { label: "Ignore It — Treatment Plants Will Handle It", nextNodeId: "ignore" },
        ],
      },
      "stop-water": {
        id: "stop-water",
        text: "You immediately turn off all taps, alert your neighbors, and switch to stored bottled water. You seal off your home's water intake valve. You monitor official channels for updates. Within hours, authorities confirm the contamination is a volatile organic compound that cannot be removed by home filtration or boiling. Your quick action protected your family.",
        image: sceneToxicEvacuate,
        characterPose: "pointing",
        outcome: "survival",
        report: "EXCELLENT RESPONSE: You followed the precautionary principle correctly. Key protocols: 1) When in doubt, stop all water use. 2) Chemical contaminants often CANNOT be removed by boiling or standard filters. 3) Maintain a 72-hour supply of bottled water per person. 4) Shut off water intake valve to prevent contaminated water from entering your home plumbing.",
      },
      "boil-water": {
        id: "boil-water",
        text: "You boil the water, believing heat will neutralize the chemicals. But industrial solvents and volatile organic compounds (VOCs) actually become MORE dangerous when heated — boiling releases them as toxic vapors into your kitchen air. Your family breathes in the contaminated steam, experiencing dizziness, nausea, and burning eyes...",
        image: sceneToxicFail,
        characterPose: "ducking",
        outcome: "failure",
        report: "CRITICAL ERROR: Boiling water only kills biological contaminants (bacteria, viruses). Chemical contaminants like VOCs, heavy metals, and industrial solvents are NOT removed by boiling. In fact, boiling can CONCENTRATE chemicals and release toxic vapors. Only use water confirmed safe by authorities or use sealed bottled water.",
      },
      ignore: {
        id: "ignore",
        text: "You assume the water treatment plant will handle it and continue normal water use. But the contamination overwhelmed the treatment facility's capacity. Over the next 48 hours, your family develops severe gastrointestinal symptoms, skin rashes, and neurological effects from prolonged chemical exposure through drinking, bathing, and cooking...",
        image: sceneToxicFail,
        characterPose: "ducking",
        outcome: "failure",
        report: "CRITICAL ERROR: Water treatment plants are designed for routine contamination, not industrial chemical spills. Trusting the system blindly during an emergency is dangerous. Always follow the precautionary principle: when authorities issue ANY water warning, stop all use until the all-clear. Chemical exposure is cumulative — every glass counts.",
      },
    },
  },
  {
    id: "wildfire-smoke",
    title: "The Wildfire Evacuation",
    category: "environmental",
    description: "A massive wildfire is approaching your rural community. Thick smoke blankets the sky as evacuation orders are issued.",
    startNodeId: "start",
    nodes: {
      start: {
        id: "start",
        text: "The sky has turned an apocalyptic orange. Ash is falling like snow. The wildfire that started 20 miles away has jumped the containment line and is racing toward your neighborhood at 40 mph driven by strong winds. An evacuation order was just issued. Your car is packed with essentials. The main highway is already jammed with traffic. What do you do?",
        image: sceneWildfire,
        characterPose: "alert",
        choices: [
          { label: "Take the Alternate Route", nextNodeId: "alternate-route" },
          { label: "Stay and Defend Your Home", nextNodeId: "stay-defend" },
          { label: "Wait for Traffic to Clear", nextNodeId: "wait-traffic" },
        ],
      },
      "alternate-route": {
        id: "alternate-route",
        text: "You take the pre-planned alternate evacuation route you identified weeks ago. The back roads are less congested. You drive with headlights on, windows up, and air recirculation activated to filter smoke. You reach the evacuation center 30 miles away safely. Your emergency go-bag has everything you need for 72 hours.",
        image: sceneWildfireEscape,
        characterPose: "running",
        outcome: "survival",
        report: "EXCELLENT RESPONSE: Pre-planning evacuation routes is critical in wildfire-prone areas. Key takeaways: 1) Always have 2-3 evacuation routes planned. 2) Keep a go-bag ready with essentials. 3) Leave EARLY — don't wait for mandatory orders. 4) Drive with windows up and recirculate cabin air. 5) Never drive through heavy smoke — visibility can drop to zero.",
      },
      "stay-defend": {
        id: "stay-defend",
        text: "You decide to stay and fight the fire with your garden hose. But a wildfire generates temperatures over 1,500°F and moves faster than you can react. Embers land on your roof and in your gutters simultaneously from multiple angles. The radiant heat alone makes it impossible to stand outside. The fire engulfs your home in under 3 minutes...",
        image: sceneWildfireFail,
        characterPose: "ducking",
        outcome: "failure",
        report: "CRITICAL ERROR: Attempting to defend your home against an approaching wildfire without professional training and equipment is nearly always fatal. A garden hose delivers about 10 gallons per minute — a wildfire needs 1,000+ gallons per minute to fight. ALWAYS evacuate when ordered. Your life is worth more than any structure.",
      },
      "wait-traffic": {
        id: "wait-traffic",
        text: "You wait for traffic to clear, but the fire moves faster than predicted. Embers begin landing in your yard. The smoke becomes so thick you can barely see your hand in front of your face. By the time you try to leave, visibility on the road is near zero. You're driving blind through a wall of smoke and fire...",
        image: sceneWildfireFail,
        characterPose: "ducking",
        outcome: "failure",
        report: "CRITICAL ERROR: Waiting during a wildfire evacuation is extremely dangerous. Wildfires can accelerate rapidly with wind changes, moving up to 14 mph in forests and 40+ mph in grasslands. Always leave at the FIRST evacuation warning — not when ordered. Traffic jams are survivable; being caught in a fire is not.",
      },
    },
  },

  // ===== EMERGENCY SITUATIONS =====
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
        characterPose: "alert",
        choices: [
          { label: "Rush to the Front Door", nextNodeId: "front-door" },
          { label: "Locate Emergency Hammer", nextNodeId: "find-hammer" },
        ],
      },
      "front-door": {
        id: "front-door",
        text: "You push through the panicked crowd toward the front door. But the fire originated near the engine compartment — the front is an inferno. The door mechanism has melted and jammed. Passengers are crushing against each other in blind panic. The smoke is toxic, and within seconds you can no longer breathe...",
        image: sceneBusDoorFail,
        characterPose: "ducking",
        outcome: "failure",
        report: "CRITICAL ERROR: In bus fires, the front door is often compromised as fires frequently originate from the engine compartment. 90% of casualties result from exit delays and crowd crush at primary exits. Always identify SECONDARY exits: emergency windows, roof hatches, and emergency hammers.",
      },
      "find-hammer": {
        id: "find-hammer",
        text: "Staying low to avoid the smoke, you spot the red emergency hammer mounted near the window. You grab it, strike the corner of the window glass with a firm blow — the tempered glass shatters into small safe fragments. Fresh air rushes in. You help two other passengers climb out before escaping yourself.",
        image: sceneBusEscape,
        characterPose: "pointing",
        choices: [
          { label: "Break Another Window", nextNodeId: "break-more" },
          { label: "Call for Help & Evacuate", nextNodeId: "evacuate" },
        ],
      },
      "break-more": {
        id: "break-more",
        text: "You move along the outside of the bus, smashing additional windows to create more escape routes. Several passengers climb out through the new openings. Your quick action helped save 12 additional lives. Fire crews arrive and begin battling the blaze.",
        image: sceneBusEscape,
        characterPose: "celebrating",
        outcome: "survival",
        report: "HEROIC RESPONSE: You identified the secondary exit system and used the emergency hammer correctly. Key protocols: 1) Stay LOW — smoke rises. 2) Strike window CORNERS — tempered glass breaks easiest at edges. 3) Clear remaining glass before climbing through. 4) Help others once you're safe.",
      },
      evacuate: {
        id: "evacuate",
        text: "You move to safety and immediately call emergency services, providing the exact location on the highway. You guide other escaped passengers away from the burning bus to prevent secondary injuries from potential fuel explosion. Your calm leadership prevented additional casualties.",
        image: sceneBusEscape,
        characterPose: "celebrating",
        outcome: "survival",
        report: "EXCELLENT RESPONSE: After escaping, you prioritized calling emergency services and guiding survivors to safety. Key takeaways: 1) Always note emergency exit locations when boarding. 2) Keep a personal window-breaker tool. 3) Cover nose/mouth with wet cloth in smoke. 4) Move at least 100 meters from burning vehicles.",
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
