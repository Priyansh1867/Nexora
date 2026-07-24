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
      min-h-[160px]
      h-auto
      bg-white
      rounded-[28px]
      border
      border-[#EDF1F4]
      shadow-[0_8px_30px_rgba(0,0,0,0.02)]
      p-5
      md:p-6
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
      <div className="flex justify-between gap-3 items-start mb-6">

        <div className="flex-1 min-w-0 pr-2">

          <p className="text-xs md:text-sm font-semibold text-[#4B5563] truncate">
            {title}
          </p>

          <h2 className="mt-2 text-2xl md:text-3xl font-black leading-none text-[#172033] tracking-tight truncate">
            {value}
          </h2>

          <p className="mt-2 text-[#428475] text-xs font-bold line-clamp-2 leading-snug">
            {subtitle}
          </p>

        </div>

        <div
          className="
          w-12
          h-12
          md:w-14
          md:h-14
          rounded-xl
          md:rounded-[20px]
          bg-[#EEF8F4]
          flex
          items-center
          justify-center
          text-[#428475]
          shrink-0
          "
        >
          {icon}
        </div>

      </div>

      <div className="flex justify-between items-center border-t border-[#EDF1F4]/50 pt-4 mt-auto">

        <span className="text-[#6B7280] text-[13px] md:text-[14px] font-bold">
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