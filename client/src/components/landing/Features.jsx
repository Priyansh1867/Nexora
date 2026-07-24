import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const features = [
  {
    image: "/images/features/student_team_finder_1784797802067.jpg",
    title: "Team Finder",
    description:
      "Find teammates with matching skills, interests, and project goals instantly.",
    colorClasses: {
      iconBg: "bg-purple-50 text-purple-600 group-hover:bg-purple-600",
      border: "hover:border-purple-200/80 hover:shadow-purple-500/8",
      title: "group-hover:text-purple-700",
    },
    path: "/team-finder",
  },
  {
    image: "/images/features/skill_learning_hub_1784797845516.jpg",
    title: "Skill Hub",
    description:
      "Track learning progress and master new technologies with curated learning paths.",
    colorClasses: {
      iconBg: "bg-amber-50 text-amber-600 group-hover:bg-amber-600",
      border: "hover:border-amber-200/80 hover:shadow-amber-500/8",
      title: "group-hover:text-amber-700",
    },
    path: "/skill-hub",
  },
  {
    image: "/images/features/digital_resource_library_1784797947963.jpg",
    title: "Resource Library",
    description:
      "Access and share notes, PDFs, books, interview guides, and research papers.",
    colorClasses: {
      iconBg: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600",
      border: "hover:border-emerald-200/80 hover:shadow-emerald-500/8",
      title: "group-hover:text-emerald-700",
    },
    path: "/library",
  },
  {
    image: "/images/features/project_workspace_1784797957971.jpg",
    title: "Project Workspace",
    description:
      "Collaborate efficiently using built-in project management boards and kanbans.",
    colorClasses: {
      iconBg: "bg-blue-50 text-blue-600 group-hover:bg-blue-600",
      border: "hover:border-blue-200/80 hover:shadow-blue-500/8",
      title: "group-hover:text-blue-700",
    },
    path: "/dashboard",
  },
  {
    image: "/images/features/realtime_chat_1784797815608.jpg",
    title: "Real-time Chat",
    description:
      "Communicate instantly with teammates in private chats or team group channels.",
    colorClasses: {
      iconBg: "bg-pink-50 text-pink-600 group-hover:bg-pink-600",
      border: "hover:border-pink-200/80 hover:shadow-pink-500/8",
      title: "group-hover:text-pink-700",
    },
    path: "/chat",
  },
  {
    image: "/images/features/ai_powered_learning_1784797826294.jpg",
    title: "AI Powered",
    description:
      "Smart recommendation engines matching you to ideal skills, roadmaps, and peers.",
    colorClasses: {
      iconBg: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600",
      border: "hover:border-indigo-200/80 hover:shadow-indigo-500/8",
      title: "group-hover:text-indigo-700",
    },
    path: "/skill-hub",
  },
];

function Features() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  return (
    <section
      id="features"
      className="bg-[#FAFAFA] py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-extrabold text-[#172033]"
          >
            Everything Students Need
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#4B5563]"
          >
            Nexora combines learning, collaboration, and networking into one unified, premium student growth ecosystem.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
            >
              <FeatureCard 
                {...feature} 
                onClick={() => navigate(`/login?redirect=${encodeURIComponent(feature.path)}`)}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

function FeatureCard({
  image,
  title,
  description,
  colorClasses,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`
      group
      h-full
      rounded-[30px]
      border
      border-[#EDF1F4]
      bg-white
      p-6
      shadow-[0_4px_20px_rgba(0,0,0,0.015)]
      transition-all
      duration-300
      hover:-translate-y-2
      cursor-pointer
      flex
      flex-col
      ${colorClasses.border}
      `}
    >
      <div className="w-full h-48 mb-6 overflow-hidden rounded-2xl shadow-sm border border-[#EDF1F4]/50">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
      </div>

      <h3 className={`text-2xl font-bold text-[#172033] transition-colors duration-300 ${colorClasses.title}`}>
        {title}
      </h3>

      <p className="mt-4 leading-relaxed text-[#4B5563] flex-1">
        {description}
      </p>
    </div>
  );
}

export default Features;