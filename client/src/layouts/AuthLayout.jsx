import { motion } from "framer-motion";

function AuthLayout({ children }) {
  const sidebarVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 18 },
    },
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#FAFAFA]">

      {/* Left Section */}
      <motion.div
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        className="relative hidden lg:flex flex-col justify-center px-20 bg-[#1A312C] text-white overflow-hidden"
      >
        {/* Background Gradients */}
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

        <motion.h1
          variants={textVariants}
          className="text-6xl font-black leading-tight tracking-tight"
        >
          Nexora
        </motion.h1>

        <motion.p
          variants={textVariants}
          className="text-xl mt-4 text-emerald-100/90 font-medium"
        >
          Student Growth & Collaboration Platform
        </motion.p>

        <motion.div
          variants={textVariants}
          className="mt-12 space-y-4 border-l-2 border-emerald-500/40 pl-6"
        >
          <h2 className="text-3xl font-extrabold text-emerald-50">
            Learn.
          </h2>

          <h2 className="text-3xl font-extrabold text-emerald-100">
            Collaborate.
          </h2>

          <h2 className="text-3xl font-extrabold text-emerald-200">
            Grow.
          </h2>
        </motion.div>

      </motion.div>

      {/* Right Section */}
      <div className="flex items-center justify-center min-h-screen p-8">
        {children}
      </div>

    </div>
  );
}

export default AuthLayout;