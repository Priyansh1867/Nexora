import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Lock,
  Compass,
  Code2,
  Terminal,
  BrainCircuit,
  RotateCcw,
  Plus,
} from "lucide-react";

import AddCustomPathModal from "./AddCustomPathModal";

const DEFAULT_ROADMAPS = {
  "Frontend Developer": [
    {
      title: "Internet & HTML/CSS",
      description: "Learn how browsers work, markup semantics, responsive layout designs (Flexbox/Grid), and vanilla CSS customization.",
      completed: true,
      locked: false,
    },
    {
      title: "Advanced JavaScript",
      description: "Master ES6+ syntax features, asynchronous loops (Promises, Async/Await), DOM manipulation, and fetch requests.",
      completed: true,
      locked: false,
    },
    {
      title: "React Development",
      description: "Build modular user interfaces using component trees, state hooks (useState, useEffect), and client-side navigation (react-router).",
      completed: false,
      locked: false,
    },
    {
      title: "State Management & Next.js",
      description: "Understand global stores (Zustand, Redux Toolkit) and explore hybrid rendering techniques (SSR, SSG) using Next.js framework.",
      completed: false,
      locked: true,
    },
    {
      title: "Testing & Deployment",
      description: "Write unit tests using Jest/RTL, optimize build packages, and launch live client bundles on hosting platforms like Vercel.",
      completed: false,
      locked: true,
    },
  ],
  "Backend Developer": [
    {
      title: "Programming Logic (JS/Python)",
      description: "Develop logical problem-solving foundations, standard data structures (Arrays, Objects), and clean execution scripts.",
      completed: true,
      locked: false,
    },
    {
      title: "Server Engines (Node.js/Express)",
      description: "Learn API request/response lifecycles, HTTP routing structures, middleware handlers, and backend MVC architectures.",
      completed: true,
      locked: false,
    },
    {
      title: "Relational Databases (PostgreSQL)",
      description: "Design table schemas, join foreign keys, index queries, write migration scripts, and coordinate DB connectivity.",
      completed: false,
      locked: false,
    },
    {
      title: "Authentication & Cryptography",
      description: "Integrate stateless auth using JWTs (JSON Web Tokens), hash passwords using bcrypt, and set safe CORS policies.",
      completed: false,
      locked: true,
    },
    {
      title: "Containers & Deployment",
      description: "Write Dockerfiles, manage multi-container systems using Docker Compose, and deploy endpoints to cloud providers.",
      completed: false,
      locked: true,
    },
  ],
  "AI / ML Engineer": [
    {
      title: "Python Foundation & NumPy",
      description: "Master Python programming logic, mathematical packages, and fast vector computations using NumPy arrays.",
      completed: true,
      locked: false,
    },
    {
      title: "Data Analysis (Pandas & Seaborn)",
      description: "Load dataset tables, clean missing values, merge dataframes, and render statistical graphs for analysis.",
      completed: true,
      locked: false,
    },
    {
      title: "Supervised Machine Learning",
      description: "Train regressions, decision trees, random forests, and analyze accuracy/recall values using Scikit-Learn tools.",
      completed: false,
      locked: false,
    },
    {
      title: "Deep Learning (TensorFlow/PyTorch)",
      description: "Design artificial neural networks, convolutional nodes (CNNs) for vision, and recurrent nodes for sequence streams.",
      completed: false,
      locked: true,
    },
    {
      title: "Generative AI & Agent Chains",
      description: "Prompt Large Language Models, embed vector database stores, and script multi-agent workflows using LangChain.",
      completed: false,
      locked: true,
    },
  ],
};

function LearningPath() {
  const [roadmaps, setRoadmaps] = useState(() => {
    const saved = localStorage.getItem("nexora_custom_roadmaps");
    return saved ? { ...DEFAULT_ROADMAPS, ...JSON.parse(saved) } : DEFAULT_ROADMAPS;
  });

  const [selectedGoal, setSelectedGoal] = useState(() => {
    return localStorage.getItem("nexora_career_goal") || null;
  });

  const [roadmapSteps, setRoadmapSteps] = useState(() => {
    const savedGoal = localStorage.getItem("nexora_career_goal");
    const currentRoadmaps = (() => {
      const saved = localStorage.getItem("nexora_custom_roadmaps");
      return saved ? { ...DEFAULT_ROADMAPS, ...JSON.parse(saved) } : DEFAULT_ROADMAPS;
    })();
    return savedGoal && currentRoadmaps[savedGoal] ? currentRoadmaps[savedGoal] : [];
  });

  const [showCustomModal, setShowCustomModal] = useState(false);

  const handleSelectGoal = (goal) => {
    setSelectedGoal(goal);
    setRoadmapSteps(roadmaps[goal]);
    localStorage.setItem("nexora_career_goal", goal);
  };

  const handleResetGoal = () => {
    setSelectedGoal(null);
    setRoadmapSteps([]);
    localStorage.removeItem("nexora_career_goal");
  };

  const handleAddCustomSuccess = (goal, steps) => {
    const newRoadmaps = { ...roadmaps, [goal]: steps };
    setRoadmaps(newRoadmaps);
    
    // Save to local storage so progress persists
    localStorage.setItem("nexora_custom_roadmaps", JSON.stringify(newRoadmaps));

    // Update the selected goal and steps directly to avoid stale state issues
    setSelectedGoal(goal);
    setRoadmapSteps(steps);
    localStorage.setItem("nexora_career_goal", goal);
    
    setShowCustomModal(false);
  };

  // Toggle milestone completion (and save state)
  const toggleStepCompleted = (index) => {
    const updated = roadmapSteps.map((step, idx) => {
      if (idx === index) {
        return { ...step, completed: !step.completed };
      }
      return step;
    });

    // Recalculate locked status sequentially
    for (let i = 0; i < updated.length; i++) {
      if (i > 0) {
        // If the previous step is completed, this step is unlocked. Else locked.
        updated[i].locked = !updated[i - 1].completed;
      }
    }

    setRoadmapSteps(updated);

    const newRoadmaps = { ...roadmaps, [selectedGoal]: updated };
    setRoadmaps(newRoadmaps);
    localStorage.setItem("nexora_custom_roadmaps", JSON.stringify(newRoadmaps));
  };

  return (
    <>
    <section id="career-learning-path" className="rounded-[30px] border border-[#EDF1F4] bg-white p-8 shadow-sm">
      
      {/* Header */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#172033]">
            Career Learning Path
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            {selectedGoal 
              ? `Structured roadmap for ${selectedGoal}. Check off items to unlock milestones.`
              : "Tell us your goals to generate a customized curriculum roadmap."
            }
          </p>
        </div>

        <div className="flex items-center gap-3">
          {selectedGoal && (
            <button
              onClick={handleResetGoal}
              className="flex items-center gap-1.5 rounded-xl border border-red-200 text-xs font-bold text-red-500 hover:bg-red-50 px-4 py-2.5 transition cursor-pointer"
            >
              <RotateCcw size={14} />
              Reset Goal
            </button>
          )}
          <button
            onClick={() => setShowCustomModal(true)}
            className="flex items-center gap-1.5 rounded-xl bg-[#428475] hover:bg-[#1A312C] text-xs font-bold text-white px-4 py-2.5 transition cursor-pointer shadow-sm"
          >
            <Plus size={16} />
            Add Custom Path
          </button>
        </div>
      </div>

      {/* Goal Selector Phase */}
      {!selectedGoal ? (
        <div className="grid gap-6 md:grid-cols-3">
          
          <GoalCard
            title="Frontend Developer"
            description="Create interactive layouts, coordinate styles, and master React structures."
            icon={<Code2 size={26} />}
            color="#428475"
            onClick={() => handleSelectGoal("Frontend Developer")}
          />

          <GoalCard
            title="Backend Developer"
            description="Build robust servers, design relational databases, and secure APIs."
            icon={<Terminal size={26} />}
            color="#2563EB"
            onClick={() => handleSelectGoal("Backend Developer")}
          />

          <GoalCard
            title="AI / ML Engineer"
            description="Perform scientific data cleaning, train regressions, and engineer AI agents."
            icon={<BrainCircuit size={26} />}
            color="#7C3AED"
            onClick={() => handleSelectGoal("AI / ML Engineer")}
          />

        </div>
      ) : (
        /* Roadmap Phase */
        <div className="space-y-7 relative">
          {roadmapSteps.map((step, index) => (
            <div
              key={step.title}
              onClick={() => !step.locked && toggleStepCompleted(index)}
              className={`flex gap-5 transition group ${step.locked ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <div className="flex flex-col items-center">
                {step.completed ? (
                  <CheckCircle2
                    size={28}
                    className="text-[#428475] transition-transform group-hover:scale-110"
                  />
                ) : step.locked ? (
                  <Lock
                    size={26}
                    className="text-gray-400"
                  />
                ) : (
                  <Circle
                    size={26}
                    className="text-[#428475] transition-transform group-hover:scale-110"
                  />
                )}

                {index !== roadmapSteps.length - 1 && (
                  <div className={`mt-2 h-14 w-[2px] ${step.completed ? "bg-[#428475]" : "bg-[#E5E7EB]"}`} />
                )}
              </div>

              <div className={`flex-1 rounded-2xl p-5 border transition ${
                step.completed 
                  ? "bg-[#EEF8F4]/30 border-[#428475]/10" 
                  : step.locked 
                    ? "bg-gray-50 border-gray-150" 
                    : "bg-white border-gray-200 hover:border-[#428475]"
              }`}>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#172033]">
                    {step.title}
                  </h3>
                  {step.completed && (
                    <span className="text-[10px] bg-[#EEF8F4] text-[#428475] font-bold px-2 py-0.5 rounded-full uppercase">
                      Completed
                    </span>
                  )}
                  {step.locked && (
                    <span className="text-[10px] bg-gray-200 text-gray-400 font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                      <Lock size={10} /> Locked
                    </span>
                  )}
                </div>

                <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

    </section>
      
      {showCustomModal && (
        <AddCustomPathModal 
          onClose={() => setShowCustomModal(false)} 
          onAddSuccess={handleAddCustomSuccess} 
        />
      )}
    </>
  );
}

function GoalCard({ title, description, icon, color, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 -translate-y-0 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-sm"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
        <h3 className="mt-5 text-lg font-bold text-[#172033] group-hover:text-[#428475] transition">
          {title}
        </h3>
        <p className="mt-2 text-xs text-gray-500 leading-relaxed">
          {description}
        </p>
      </div>
      
      <div className="mt-6 flex items-center gap-1.5 text-xs font-bold transition group-hover:translate-x-1" style={{ color }}>
        Generate Roadmap
        <ArrowRight size={14} />
      </div>
    </div>
  );
}

export default LearningPath;