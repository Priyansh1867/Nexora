import {
  ArrowRight,
} from "lucide-react";

function CategoryCard({
  title,
  resources,
  icon,
  color = "#428475",
  onClick,
}) {
  return (
    <div
      className="
      group
      rounded-[28px]
      border
      border-[#EDF1F4]
      bg-white
      p-7
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      "
    >
      <div
        className="flex h-16 w-16 items-center justify-center rounded-2xl text-white"
        style={{
          backgroundColor: color,
        }}
      >
        {icon}
      </div>

      <h2 className="mt-7 text-2xl font-bold text-[#172033]">
        {title}
      </h2>

      <p className="mt-2 text-gray-500">
        {resources} Resources
      </p>

      <button
        onClick={onClick}
        className="
        mt-8
        flex
        items-center
        gap-2
        font-semibold
        transition-all
        duration-300
        group-hover:gap-3
        cursor-pointer
        "
        style={{
          color,
        }}
      >
        Browse

        <ArrowRight size={18} />
      </button>
    </div>
  );
}

export default CategoryCard;