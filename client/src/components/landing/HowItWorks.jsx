import {
  BookOpen,
  FolderKanban,
  Rocket,
  UserPlus,
} from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <UserPlus size={30} />,
    title: "Create Your Profile",
    description:
      "Sign up, complete your profile and showcase your skills, interests and achievements.",
  },
  {
    icon: <BookOpen size={30} />,
    title: "Learn & Explore",
    description:
      "Discover learning resources, roadmaps, notes and premium study material.",
  },
  {
    icon: <FolderKanban size={30} />,
    title: "Collaborate",
    description:
      "Join projects, build teams and communicate with students in real time.",
  },
  {
    icon: <Rocket size={30} />,
    title: "Grow Together",
    description:
      "Earn achievements, improve your skills and build an impressive portfolio.",
  },
];

function HowItWorks() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  return (
    <section
      id="howitworks"
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
            How Nexora Works
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#4B5563]"
          >
            Get started in just four simple steps and accelerate your learning journey.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              className="group relative rounded-[30px] border border-[#EDF1F4] bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-[#428475]/30"
            >
              <div className="absolute right-6 top-6 text-5xl font-black text-[#E2E8F0] group-hover:text-[#428475]/10 transition-colors duration-300">
                0{index + 1}
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EEF8F4] text-[#428475] group-hover:bg-[#428475] group-hover:text-white transition-all duration-300">
                {step.icon}
              </div>

              <h3 className="mt-8 text-2xl font-bold text-[#172033]">
                {step.title}
              </h3>

              <p className="mt-5 leading-relaxed text-[#4B5563]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default HowItWorks;