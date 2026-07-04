import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

function WelcomeHeader({ onContinueClick }) {
  const { user } = useAuth();
  const firstName = user?.name ? user.name.split(" ")[0] : "Student";

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  }
  else if (hour < 17) {
    greeting = "Good Afternoon";
  }
  else if (hour >= 20) {
    greeting = "Good Night";
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 15 }}
      className="flex flex-col sm:flex-row justify-between sm:items-center gap-6"
    >
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-[#172033] tracking-tight">
          👋 {greeting}, {firstName}
        </h1>

        <p className="mt-2 text-xl text-[#4B5563] font-semibold">
          Ready to continue your journey today?
        </p>
      </div>

      <motion.button
        onClick={onContinueClick}
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.98 }}
        className="
        self-start
        h-[60px]
        px-8
        rounded-2xl
        bg-[#428475]
        hover:bg-[#1A312C]
        hover:shadow-lg hover:shadow-[#428475]/20
        transition-all
        duration-300
        text-white
        font-bold
        flex
        items-center
        gap-3
        cursor-pointer
        "
      >
        Continue Journey
        <ArrowRight size={20} />
      </motion.button>

    </motion.section>
  );
}

export default WelcomeHeader;