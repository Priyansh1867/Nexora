import { LogOut } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";

import ProfileSettings from "../components/settings/ProfileSettings";
import AccountSettings from "../components/settings/AccountSettings";
import SecuritySettings from "../components/settings/SecuritySettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import PreferenceSettings from "../components/settings/PreferenceSettings";
import RightSidebar from "../components/settings/RightSidebar";

import { useAuth } from "../context/AuthContext";

function Settings() {
  const { logout } = useAuth();

  const handleSignOut = async () => {
    try {
      await logout();
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
      window.location.href = "/login";
    }
  };

  return (
    <DashboardLayout>
      <div className="flex gap-8">
        
        <div className="flex-1 space-y-8">
          
          <section>
            <h1 className="text-4xl font-bold text-[#172033]">Settings</h1>
            <p className="mt-3 text-lg text-gray-500">
              Manage your account settings, UI theme, notification rules, and preferences.
            </p>
          </section>

          <ProfileSettings />

          <AccountSettings />

          <SecuritySettings />

          <NotificationSettings />

          <PreferenceSettings />

          {/* Simple Standalone Sign Out Card */}
          <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-[#172033]">Sign Out</h2>
              <p className="mt-2 text-xs text-gray-500">
                Safely end your session and log out of the platform.
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 rounded-xl bg-red-500 hover:bg-red-600 px-6 py-3 font-bold text-white transition cursor-pointer shadow-sm text-xs"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </section>

        </div>

        <RightSidebar />

      </div>
    </DashboardLayout>
  );
}

export default Settings;