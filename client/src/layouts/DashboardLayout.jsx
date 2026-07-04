import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";

function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-[#F8FAFB] overflow-hidden">

      {/* Sidebar */}

      <Sidebar />

      {/* Main */}

      <div className="flex flex-col flex-1 overflow-hidden">

        <Navbar />

        <main className="flex-1 overflow-y-auto">

          <div className="max-w-[1440px] mx-auto px-8 py-8">

            {children}

          </div>

        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;