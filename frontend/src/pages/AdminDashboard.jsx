import { useState } from "react";

import Sidebar from "../components/Sidebar";
import DashboardHome from "../components/DashboardHome";
import BrandSection from "../components/BrandSection";
import CreatorSection from "../components/CreatorSection";
import AnalyticsSection from "../components/AnalyticsSection";
import NotificationSection from "../components/NotificationSection";
import SettingsSection from "../components/SettingsSection";
import BookingStatus from "../components/BookingStatus";

function AdminDashboard() {
  const [section, setSection] = useState("dashboard");

  const getTitle = () => {
    switch (section) {
      case "brands":
        return "Brand Management";
      case "creators":
        return "Influencer Management";
      default:
        return "Admin Dashboard";
    }
  };

  return (
    <>
      <div
        className="relative min-h-screen flex flex-col md:flex-row bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

        {/* Sidebar */}
        <div className="relative z-20 w-full md:w-72 md:fixed md:h-screen">
          <Sidebar setSection={setSection} />
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex-1 w-full md:ml-72 h-full md:h-screen overflow-y-auto bg-slate-900 p-3 sm:p-4 md:p-6">

          {/* Top Header */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl md:rounded-3xl p-4 sm:p-6 shadow-2xl mb-6 md:mb-8">

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              {getTitle()}
            </h1>

            <p className="text-gray-300 text-sm sm:text-base">
              Welcome to InfluNexa Admin Panel
            </p>

          </div>

          {/* Main Section Container */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl md:rounded-3xl shadow-2xl p-3 sm:p-4 md:p-6 min-h-[70vh] md:min-h-[80vh]">

            {section === "dashboard" && <DashboardHome />}

            {section === "brands" && <BrandSection />}

            {section === "creators" && <CreatorSection />}

            {section === "analytics" && <AnalyticsSection />}

            {section === "bookings" && <BookingStatus />}

            {section === "settings" && (
              <SettingsSection setSection={setSection} />
            )}

          </div>

        </div>
      </div>
    </>
  );
}

export default AdminDashboard;