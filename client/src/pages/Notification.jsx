import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

import Hero from "../components/notifications/Hero";
import NotificationFilter from "../components/notifications/NotificationFilter";
import NotificationCard from "../components/notifications/NotificationCard";
import ActivityCard from "../components/notifications/ActivityCard";
import SummaryCard from "../components/notifications/SummaryCard";
import RightSidebar from "../components/notifications/RightSidebar";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Load real notifications from localStorage (saved by Navbar when they arrive)
    try {
      const saved = localStorage.getItem("nexora_notifications");
      if (saved) {
        const parsed = JSON.parse(saved);
        setNotifications(Array.isArray(parsed) ? parsed : []);
      }
    } catch {
      setNotifications([]);
    }
  }, []);

  const handleMarkAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem("nexora_notifications", JSON.stringify(updated));
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8 overflow-hidden">

          <Hero />

          <NotificationFilter />

          <section>
            <div className="mb-6 flex items-center justify-between">

              <div>

                <h2 className="text-3xl font-bold text-[#172033]">
                  Recent Notifications
                </h2>

                <p className="mt-2 text-gray-500">
                  Stay informed with all your latest updates.
                </p>

              </div>

              {notifications.length > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="font-semibold text-[#428475] hover:underline cursor-pointer"
                >
                  Mark All Read
                </button>
              )}

            </div>

            <div className="space-y-5">
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <NotificationCard
                    key={index}
                    {...notification}
                  />
                ))
              ) : (
                <div className="py-16 text-center rounded-[30px] border border-dashed border-gray-200 bg-gray-50/40">
                  <p className="text-gray-400 font-semibold text-sm">
                    🔔 No notifications yet. Activity will appear here as you use Nexora.
                  </p>
                </div>
              )}
            </div>

          </section>

          <section>
            <div className="mb-6 flex items-center justify-between">

              <div>

                <h2 className="text-3xl font-bold text-[#172033]">
                  Recent Activity
                </h2>

                <p className="mt-2 text-gray-500">
                  Track collaboration and platform activity.
                </p>

              </div>

            </div>

            <div className="py-12 text-center rounded-[30px] border border-dashed border-gray-200 bg-gray-50/40">
              <p className="text-gray-400 font-semibold text-sm">
                No recent activity yet. Start uploading resources, joining teams, or sending messages!
              </p>
            </div>

          </section>

          <SummaryCard notificationsCount={notifications.length} unreadCount={notifications.filter(n => !n.read).length} />

        </div>

        <RightSidebar />
      </div>
    </DashboardLayout>
  );
}

export default Notifications;