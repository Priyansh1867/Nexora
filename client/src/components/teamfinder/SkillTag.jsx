function SkillTag({
  title,
  active = false,
  color = "#428475",
}) {
  return (
    <span
      className="rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300"
      style={{
        backgroundColor: active
          ? color
          : "#EEF8F4",

        color: active
          ? "#FFFFFF"
          : color,
      }}
    >
      {title}
    </span>
  );
}

export default SkillTag;