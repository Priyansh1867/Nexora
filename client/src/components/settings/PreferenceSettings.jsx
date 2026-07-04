import {
  CalendarDays,
  Clock3,
  Globe,
  Languages,
} from "lucide-react";

function PreferenceSettings() {
  return (
    <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-8 shadow-sm">

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-[#172033]">
          Preferences
        </h2>

        <p className="mt-2 text-gray-500">
          Configure your regional and application preferences.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <SelectField
          icon={<Languages size={18} />}
          label="Language"
          value="English"
          options={[
            "English",
            "Hindi",
          ]}
        />

        <SelectField
          icon={<Globe size={18} />}
          label="Region"
          value="India"
          options={[
            "India",
            "United States",
            "United Kingdom",
          ]}
        />

        <SelectField
          icon={<Clock3 size={18} />}
          label="Time Zone"
          value="Asia/Kolkata"
          options={[
            "Asia/Kolkata",
            "UTC",
            "Europe/London",
          ]}
        />

        <SelectField
          icon={<CalendarDays size={18} />}
          label="Date Format"
          value="DD/MM/YYYY"
          options={[
            "DD/MM/YYYY",
            "MM/DD/YYYY",
            "YYYY-MM-DD",
          ]}
        />

      </div>

    </section>
  );
}

function SelectField({
  icon,
  label,
  value,
  options,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <div className="relative">

        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>

        <select
          defaultValue={value}
          className="h-14 w-full rounded-2xl border border-[#E5E7EB] bg-white pl-12 pr-4 outline-none focus:border-[#428475]"
        >
          {options.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>

      </div>

    </div>
  );
}

export default PreferenceSettings;