import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 border-b border-[#EDF1F4] bg-white/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        <Link
          to="/"
          className="flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#16332D] text-2xl font-bold text-white shadow-md shadow-[#16332D]/10">
            N
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#172033]">
              Nexora
            </h2>

            <p className="text-xs text-gray-500 font-medium">
              Student Growth Platform
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {["Features", "How It Works", "FAQ"].map((item) => {
            const href = `#${item.toLowerCase().replace(/\s+/g, "")}`;
            return (
              <a
                key={item}
                href={href}
                className="font-semibold text-gray-700 hover:text-[#428475] transition-colors duration-200"
              >
                {item}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">

          <Link
            to="/login"
            className="rounded-xl border border-[#E5E7EB] px-6 py-3 font-semibold text-gray-700 hover:border-[#428475] hover:bg-[#EEF8F4]/30 transition-all duration-300"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-xl bg-[#428475] px-6 py-3 font-semibold text-white hover:bg-[#16332D] hover:shadow-lg hover:shadow-[#16332D]/20 shadow-sm transition-all duration-300"
          >
            Get Started
          </Link>

        </div>

        <button className="rounded-xl border border-[#E5E7EB] p-3 text-gray-700 hover:bg-gray-50 lg:hidden">
          <Menu size={22} />
        </button>

      </div>
    </motion.header>
  );
}

export default Navbar;