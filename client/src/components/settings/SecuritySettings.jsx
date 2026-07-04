import { useState } from "react";
import {
  KeyRound,
  Lock,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { showToast } from "../../utils/toast";

function SecuritySettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast("Please fill in all password fields!", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast("New password and confirm password do not match!", "error");
      return;
    }
    if (newPassword.length < 6) {
      showToast("New password must be at least 6 characters long!", "error");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      showToast("Password changed successfully!");
    }, 800);
  };

  return (
    <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-8 shadow-sm">
      
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#172033]">
            Security
          </h2>
          <p className="mt-2 text-xs text-gray-500">
            Manage your password credentials and account session security.
          </p>
        </div>

        <button
          onClick={handlePasswordChange}
          disabled={loading}
          className="rounded-2xl bg-[#16332D] hover:bg-[#214740] px-6 py-3 text-xs font-bold text-white transition flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50"
        >
          {loading ? <Loader2 size={12} className="animate-spin" /> : null}
          Update Password
        </button>
      </div>

      <div className="space-y-6">
        <PasswordField
          icon={<Lock size={16} />}
          label="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <PasswordField
          icon={<KeyRound size={16} />}
          label="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <PasswordField
          icon={<ShieldCheck size={16} />}
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

    </section>
  );
}

function PasswordField({ icon, label, value, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold text-gray-700 uppercase">
        {label}
      </label>

      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>

        <input
          type="password"
          placeholder={label}
          value={value}
          onChange={onChange}
          className="h-12 w-full rounded-xl border border-[#E5E7EB] pl-12 pr-4 outline-none focus:border-[#428475] text-xs bg-white focus:bg-white transition"
        />
      </div>
    </div>
  );
}

export default SecuritySettings;