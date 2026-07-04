import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";

function DashboardLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8FAFB] overflow-hidden relative">

      {/* Sidebar - Passed mobile state */}
      <Sidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden w-full relative">

        {/* Navbar - Passed toggle function */}
        <Navbar onMenuToggle={() => setIsMobileMenuOpen(true)} />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-6 md:py-8 w-full">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;