function Input({
  label,
  icon,
  rightElement,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}

        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`
            w-full
            py-3
            rounded-xl
            border
            border-gray-300
            outline-none
            transition-all
            duration-300
            focus:border-[#428475]
            focus:ring-2
            focus:ring-[#428475]/20
            ${icon ? "pl-11" : "px-4"}
            ${rightElement ? "pr-12" : "pr-4"}
          `}
        />

        {rightElement && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}

export default Input;