import { useState, useEffect } from "react";
import {
  Check,
  Monitor,
  Moon,
  Sun,
} from "lucide-react";

function AppearanceSettings() {
  const [activeTheme, setActiveTheme] = useState("Light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("nexora_theme") || "Light";
    setActiveTheme(savedTheme);
  }, []);

  const handleThemeChange = (themeName) => {
    setActiveTheme(themeName);
    localStorage.setItem("nexora_theme", themeName);
    
    if (themeName === "Dark") {
      document.documentElement.classList.add("dark");
    } else if (themeName === "Light") {
      document.documentElement.classList.remove("dark");
    } else {
      // System mode
      const darkPref = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (darkPref) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
    // Dispatch global custom event to trigger other components (like navbar theme icon states!)
    window.dispatchEvent(new Event("nexora_theme_changed"));
  };

  return (
    <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-8 shadow-sm">
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#172033]">
          Appearance
        </h2>
        <p className="mt-2 text-xs text-gray-500">
          Customize the UI theme colors and appearance preferences of Nexora.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <ThemeCard
          icon={<Sun size={24} />}
          title="Light"
          active={activeTheme === "Light"}
          onClick={() => handleThemeChange("Light")}
        />

        <ThemeCard
          icon={<Moon size={24} />}
          title="Dark"
          active={activeTheme === "Dark"}
          onClick={() => handleThemeChange("Dark")}
        />

        <ThemeCard
          icon={<Monitor size={24} />}
          title="System"
          active={activeTheme === "System"}
          onClick={() => handleThemeChange("System")}
        />
      </div>

    </section>
  );
}

function ThemeCard({ icon, title, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative rounded-[24px] border p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer ${
        active
          ? "border-[#428475] bg-[#EEF8F4]"
          : "border-[#EDF1F4] bg-white"
      }`}
    >
      {active && (
        <div className="absolute right-4 top-4 rounded-full bg-[#428475] p-1 text-white shadow-sm">
          <Check size={12} />
        </div>
      )}

      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F8FAFB] text-[#428475] border border-gray-100">
        {icon}
      </div>

      <h3 className="mt-5 text-sm font-bold text-[#172033]">
        {title}
      </h3>
    </button>
  );
}

export default AppearanceSettings;