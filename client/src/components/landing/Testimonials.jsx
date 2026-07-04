import {
  Quote,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Frontend Developer",
    review:
      "Nexora helped me find an amazing hackathon team. The collaboration experience is fantastic.",
  },
  {
    name: "Rahul Verma",
    role: "AI Student",
    review:
      "The Resource Library and SkillHub made learning much easier. Everything is organized beautifully.",
  },
  {
    name: "Aman Gupta",
    role: "Backend Developer",
    review:
      "Real-time chat and project collaboration saved our team so much time during development.",
  },
];

function Testimonials() {
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
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-extrabold text-[#172033] text-center"
          >
            Loved by Students
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#4B5563] text-center"
          >
            Thousands of students collaborate, learn and build together every day.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20 grid gap-8 lg:grid-cols-3 items-stretch"
        >
          {testimonials.map((item) => (
            <motion.div
              key={item.name}
              variants={itemVariants}
              className="h-full flex flex-col rounded-[30px] border border-[#EDF1F4] bg-[#F8FAFB] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:bg-white hover:border-[#428475]/20"
            >
              <Quote
                size={36}
                className="text-[#428475] opacity-80"
              />

              <p className="mt-6 text-lg leading-relaxed text-[#374151] font-medium italic">
                "{item.review}"
              </p>

              <div className="mt-8 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <div className="mt-auto flex items-center gap-4 border-t border-[#EDF1F4]/75 pt-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#428475] text-xl font-bold text-white shadow-md shadow-[#428475]/10">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <h4 className="font-bold text-[#172033]">
                    {item.name}
                  </h4>

                  <p className="text-sm font-semibold text-[#4B5563]">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default Testimonials;