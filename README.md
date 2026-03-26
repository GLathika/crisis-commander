# Resilience-RPG: Disaster Response Simulator 🛡️

**Empowering Citizens to Survive the "Golden 90 Seconds" Through Gamified Storytelling.**

---

## 📌 The Problem
In high-stakes emergencies—like the **March 26, 2026, Prakasam bus fire**—victims often succumb to **"Cognitive Freeze."** While safety manuals exist, they fail to build the muscle memory required to navigate jammed exits or toxic environments under adrenaline. Static training is failing; we need interactive intuition.

## 🚀 The Solution
**Resilience-RPG** is a web-based, gamified simulator that transforms passive safety protocols into immersive "Choice-Consequence" narratives. Users navigate real-world disasters across four categories, making split-second decisions that determine their survival, followed by a technical safety debrief.

## 🌟 Key Features
* **Dynamic Narrative Engine:** A state-machine-driven storytelling UI that visually evolves based on user choices.
* **Hot-Swap Scenario Injection:** Decoupled JSON architecture allowing rapid deployment of real-world scenarios (e.g., the Markapuram Collision) within hours.
* **Categorical Crisis Framework:** Modular training for **Natural, Man-Made, Environmental, and Emergency** situations.
* **Safety Protocol Debriefs:** Every ending provides a data-backed report explaining the science of the outcome (e.g., why to strike window corners vs. the center).

## 🛠️ Tech Stack
* **Frontend:** React.js / Next.js
* **Styling:** Tailwind CSS (Emergency-theme UI)
* **Animations:** Framer Motion (Typewriter effects & transitions)
* **State Management:** React Context / JSON State Machine
* **Icons:** Lucide-React

## 📂 Project Structure
```text
├── src
│   ├── components       # Narrative Engine, UI Cards, Progress Bars
│   ├── data             # JSON Scenarios (Natural, Emergency, etc.)
│   ├── hooks            # Game State Logic & Progression
│   └── assets           # Scenario Backgrounds & Animations
└── public               # Static Safety Protocol Assets

🚥 Quick Start
Clone the repo: git clone https://github.com/your-username/resilience-rpg.git

Install dependencies: npm install

Run the app: npm run dev

Access: Open http://localhost:3000 to start the Markapuram simulation.

🤝 Contributing
We welcome contributions from the safety and tech community to make India safer!

Fork the Project.

Create your Scenario Branch (git checkout -b scenario/AmazingScenario).

Commit your Changes (git commit -m 'Add new Flood scenario').

Push to the Branch (git push origin scenario/AmazingScenario).

Open a Pull Request.

⚖️ License
Distributed under the MIT License. See LICENSE for more information. This project is intended for educational and public safety awareness purposes.

🌏 Regional Impact: Andhra Pradesh
As a transit hub (Chittoor/Tirupati corridor), Andhra Pradesh faces unique high-occupancy risks. This tool bridges the gap between rural response delays and immediate passenger action, turning every traveler into a potential first responder.

Developed for the 2026 Safety-Tech Hackathon.
