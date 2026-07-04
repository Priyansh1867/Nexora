import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

function SidebarItem({
  to,
  icon,
  title,
  badge,
  colorClass = "text-emerald-400",
}) {
  return (
    <NavLink
      to={to}
      className="relative block"
    >
      {({ isActive }) => (
        <motion.div
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          className={`relative z-10 flex items-center justify-between rounded-2xl px-4 py-3.5 transition-colors duration-300 ${
            isActive
              ? "text-white font-bold"
              : "text-emerald-100/80 hover:text-white"
          }`}
        >
          {/* Active Background Pill with LayoutID for sliding animation */}
          {isActive && (
            <motion.div
              layoutId="activeSidebarPill"
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="absolute inset-0 bg-[#428475] rounded-2xl -z-10 shadow-lg shadow-[#16332D]/30 border border-[#8FE5C1]/15"
            />
          )}

          {/* Hover highlight for inactive items */}
          {!isActive && (
            <div className="absolute inset-0 rounded-2xl bg-white/0 hover:bg-white/5 -z-10 transition-colors duration-300" />
          )}

          <div className="flex items-center gap-4">
            <div
              className={`transition-colors duration-300 ${
                isActive ? "text-white scale-110" : colorClass
              }`}
            >
              {icon}
            </div>

            <span className="text-[15px]">
              {title}
            </span>
          </div>

          {badge && (
            <div className="w-6 h-6 rounded-full bg-[#3BBD8A] text-[#16332D] text-[11px] font-black flex items-center justify-center shadow-sm">
              {badge}
            </div>
          )}
        </motion.div>
      )}
    </NavLink>
  );
}

export default SidebarItem;