import { useState, useEffect } from "react";
import {
  Bell,
  Mail,
  MessageCircle,
  Smartphone,
  Users,
} from "lucide-react";

function NotificationSettings() {
  const [prefs, setPrefs] = useState({
    push: true,
    email: true,
    teams: true,
    messages: true,
    marketing: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem("nexora_notif_prefs");
    if (saved) {
      setPrefs(JSON.parse(saved));
    }
  }, []);

  const handleToggle = (key) => {
    setPrefs((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem("nexora_notif_prefs", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-8 shadow-sm">
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#172033]">
          Notification Preferences
        </h2>
        <p className="mt-2 text-xs text-gray-500">
          Choose which notifications you'd like to receive on your device and email.
        </p>
      </div>

      <div className="space-y-5">
        <Toggle
          icon={<Bell size={18} />}
          title="Push Notifications"
          description="Receive instant app popups."
          checked={prefs.push}
          onChange={() => handleToggle("push")}
        />

        <Toggle
          icon={<Mail size={18} />}
          title="Email Notifications"
          description="Receive important updates via email."
          checked={prefs.email}
          onChange={() => handleToggle("email")}
        />

        <Toggle
          icon={<Users size={18} />}
          title="Team Invitations"
          description="Get notified about collaboration requests."
          checked={prefs.teams}
          onChange={() => handleToggle("teams")}
        />

        <Toggle
          icon={<MessageCircle size={18} />}
          title="Messages"
          description="Receive notifications for new messages."
          checked={prefs.messages}
          onChange={() => handleToggle("messages")}
        />

        <Toggle
          icon={<Smartphone size={18} />}
          title="Marketing Updates"
          description="Receive news and feature announcements."
          checked={prefs.marketing}
          onChange={() => handleToggle("marketing")}
        />
      </div>

    </section>
  );
}

function Toggle({ icon, title, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-[#EDF1F4] p-5 bg-white">
      
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF8F4] text-[#428475]">
          {icon}
        </div>
        <div>
          <h4 className="font-semibold text-sm text-[#172033]">
            {title}
          </h4>
          <p className="mt-1 text-xs text-gray-500">
            {description}
          </p>
        </div>
      </div>

      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />
        <div className="peer h-6 w-11 rounded-full bg-gray-300 transition peer-checked:bg-[#428475] after:absolute after:left-[3px] after:top-[3px] after:h-[18px] after:w-[18px] after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5" />
      </label>

    </div>
  );
}

export default NotificationSettings;