import {
  Award,
  BookOpen,
  FolderKanban,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    icon: <Users size={30} />,
    value: "12,500+",
    label: "Students Registered",
  },
  {
    icon: <FolderKanban size={30} />,
    value: "2,100+",
    label: "Projects Completed",
  },
  {
    icon: <BookOpen size={30} />,
    value: "8,400+",
    label: "Learning Resources",
  },
  {
    icon: <Award size={30} />,
    value: "1,600+",
    label: "Milestones Achieved",
  },
];

function Stats() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { scale: 0.95, opacity: 0, y: 30 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 85, damping: 15 },
    },
  };

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-4"
        >
          {stats.map((item) => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              className="
              group
              rounded-[30px]
              border
              border-[#EDF1F4]
              bg-[#F8FAFB]
              p-8
              text-center
              transition-all
              duration-300
              hover:-translate-y-2
              hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]
              hover:bg-white
              hover:border-[#428475]/20
              "
            >
              <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-2xl bg-[#EEF8F4] text-[#428475] group-hover:bg-[#428475] group-hover:text-white transition-all duration-300">
                {item.icon}
              </div>

              <h2 className="mt-7 text-5xl font-black text-[#172033] tracking-tight">
                {item.value}
              </h2>

              <p className="mt-4 text-lg font-semibold text-[#4B5563]">
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default Stats;