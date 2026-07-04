import {
  ArrowRight,
  Sparkles,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 18 },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0, y: 40 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15, delay: 0.3 },
    },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0F2924] via-[#1A453B] to-[#2D5F54] py-28 text-white">
      {/* Background Decorative Circles */}
      <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2 backdrop-blur shadow-sm"
          >
            <Sparkles size={16} className="text-[#3BBD8A] animate-pulse" />
            <span className="text-sm font-semibold tracking-wide text-emerald-100">
              The Future of Student Collaboration
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mt-8 text-6xl font-black leading-tight tracking-tight lg:text-7xl"
          >
            Learn.<br />Build.<br />
            <span className="bg-gradient-to-r from-emerald-400 to-[#3BBD8A] bg-clip-text text-transparent">
              Grow Together.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-8 max-w-xl text-lg leading-relaxed text-emerald-100/80"
          >
            Nexora connects students through collaborative projects, curated skills roadmap, a shared resource library, and seamless real-time messaging.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap gap-5"
          >
            <Link
              to="/register"
              style={{ color: "#16332D" }}
              className="flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-bold shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>

            <a
              href="#features"
              className="rounded-2xl border border-white/20 bg-white/5 px-8 py-4 font-semibold backdrop-blur hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
            >
              Explore Features
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="relative lg:justify-self-end w-full max-w-md"
        >
          {/* Card Border Glow */}
          <div className="absolute -inset-1 rounded-[42px] bg-gradient-to-r from-emerald-500 to-[#3BBD8A] opacity-20 blur-xl" />
          
          <div className="relative rounded-[40px] border border-gray-100 bg-white p-8 text-[#172033] shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-5">
              <h3 className="text-2xl font-black text-[#16332D]">
                Nexora Network
              </h3>

              <Users
                size={26}
                className="text-[#428475]"
              />
            </div>

            <div className="mt-8 space-y-4">
              <Stat
                title="Active Students"
                value="12,540+"
                delay={0.4}
              />

              <Stat
                title="Collaborative Projects"
                value="2,140+"
                delay={0.5}
              />

              <Stat
                title="Shared Resources"
                value="8,400+"
                delay={0.6}
              />

              <Stat
                title="Learning Hubs"
                value="180+"
                delay={0.7}
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function Stat({
  title,
  value,
  delay
}) {
  return (
    <motion.div
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 15, delay }}
      className="flex items-center justify-between rounded-2xl bg-[#F8FAFB] border border-[#EDF1F4]/70 p-5 hover:bg-emerald-50/30 transition-colors duration-300"
    >
      <span className="font-semibold text-gray-700">
        {title}
      </span>

      <span className="text-xl font-extrabold text-[#428475]">
        {value}
      </span>
    </motion.div>
  );
}

export default Hero;