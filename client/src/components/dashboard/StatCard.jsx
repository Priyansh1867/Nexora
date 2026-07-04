import { motion } from "framer-motion";

function StatCard({
  title,
  value,
  subtitle,
  icon,
  onClick,
}) {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 18 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="
      h-[185px]
      bg-white
      rounded-[28px]
      border
      border-[#EDF1F4]
      shadow-[0_8px_30px_rgba(0,0,0,0.02)]
      p-7
      flex
      flex-col
      justify-between
      hover:shadow-[0_16px_35px_rgba(0,0,0,0.06)]
      hover:border-[#428475]/20
      transition-all
      duration-300
      cursor-pointer
      "
    >
      <div className="flex justify-between">

        <div>

          <p className="text-[14px] font-semibold text-[#4B5563]">
            {title}
          </p>

          <h2 className="mt-2.5 text-3xl font-black leading-none text-[#172033] tracking-tight">
            {value}
          </h2>

          <p className="mt-2.5 text-[#428475] text-[14px] font-bold">
            {subtitle}
          </p>

        </div>

        <div
          className="
          w-[72px]
          h-[72px]
          rounded-[22px]
          bg-[#EEF8F4]
          flex
          items-center
          justify-center
          text-[#428475]
          "
        >
          {icon}
        </div>

      </div>

      <div className="flex justify-between items-center border-t border-[#EDF1F4]/50 pt-3">

        <span className="text-[#6B7280] text-[15px] font-bold">
          View Details
        </span>

        <span className="text-[#428475] text-xl font-bold transition-transform duration-300 hover:translate-x-1">
          →
        </span>

      </div>

    </motion.div>
  );
}

export default StatCard;