import { useState } from "react";

import Sidebar from "../components/Sidebar";
import DashboardHome from "../components/DashboardHome";
import BrandSection from "../components/BrandSection";
import CreatorSection from "../components/CreatorSection";
import AnalyticsSection from "../components/AnalyticsSection";
import NotificationSection from "../components/NotificationSection";
import SettingsSection from "../components/SettingsSection";

function AdminDashboard() {

  const [section, setSection] =
    useState("dashboard");

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
      className="min-h-screen flex bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Sidebar */}
      <div className="flex h-screen overflow-hidden">
        <Sidebar setSection={setSection} />
      </div>

      {/* Main Content */}
      <div className="ml-72 flex-1 h-screen overflow-y-auto bg-slate-900 p-6">

        {/* Top Header */}
        <div
          className="
          bg-white/10
          backdrop-blur-xl
          border
          border-white/20
          rounded-3xl
          p-6
          shadow-2xl
          mb-8
        "
        >
          <h1
            className="
            text-4xl
            font-bold
            text-white
            mb-2
          "
          >
            {getTitle()}
          </h1>

          <p className="text-gray-300">
            Welcome to InfluNexa Admin Panel
          </p>
        </div>

        {/* Main Section Container */}
        <div
          className="
          bg-white/10
          backdrop-blur-xl
          border
          border-white/20
          rounded-3xl
          shadow-2xl
          p-6
          min-h-[80vh]
        "
        >
          {section === "dashboard" && (
            <DashboardHome />
          )}

          {section === "brands" && (
            <BrandSection />
          )}

          {section === "creators" && (
            <CreatorSection />
          )}
          {section === "analytics" &&
  <AnalyticsSection />
}

{section === "notifications" &&
  <NotificationSection />
}

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