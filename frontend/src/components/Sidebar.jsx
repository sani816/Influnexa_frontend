import {
  FaTachometerAlt,
  FaBuilding,
  FaUsers,
  FaChartLine,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Sidebar({ setSection }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const menuClass = `
    flex items-center gap-3
    w-full
    px-4 py-3
    rounded-xl
    text-gray-300
    hover:bg-cyan-500/20
    hover:text-cyan-300
    transition-all
    duration-300
    cursor-pointer
  `;

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate("/admin");
  };

  const handleClick = (section) => {
    setSection(section);
    setOpen(false); // auto close on mobile
  };

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="lg:hidden flex items-center justify-between bg-black/40 backdrop-blur-xl p-4 border-b border-white/10">
        <h1 className="text-xl font-bold text-cyan-400">InfluNexa</h1>

        <button
          onClick={() => setOpen(true)}
          className="text-white text-2xl"
        >
          <FaBars />
        </button>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed lg:static top-0 left-0 z-50
          h-screen w-72
          bg-black/40 backdrop-blur-xl
          border-r border-white/10 shadow-2xl
          p-6 flex flex-col
          transform transition-transform duration-300 ease-in-out

          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* CLOSE BUTTON (MOBILE) */}
        <div className="lg:hidden flex justify-end mb-4">
          <button
            onClick={() => setOpen(false)}
            className="text-white text-xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* LOGO */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
            InfluNexa
          </h1>
          <p className="text-gray-400 text-sm">Admin Panel</p>
        </div>

        {/* ADMIN CARD */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 flex items-center justify-center text-white font-bold">
              A
            </div>

            <div>
              <h3 className="text-white font-semibold">Admin</h3>
              <p className="text-gray-400 text-sm">Super Admin</p>
            </div>
          </div>
        </div>

        {/* MENU */}
        <div className="space-y-2">
          <button onClick={() => handleClick("dashboard")} className={menuClass}>
            <FaTachometerAlt /> Dashboard
          </button>

          <button onClick={() => handleClick("brands")} className={menuClass}>
            <FaBuilding /> Brands
          </button>

          <button onClick={() => handleClick("creators")} className={menuClass}>
            <FaUsers /> Influencers
          </button>

          <button onClick={() => handleClick("analytics")} className={menuClass}>
            <FaChartLine /> Analytics
          </button>

          <button onClick={() => handleClick("settings")} className={menuClass}>
            <FaCog /> Settings
          </button>
        </div>

        {/* FOOTER */}
        <div className="mt-auto pt-6">
          <button
            onClick={handleLogout}
            className="
              w-full bg-red-500 hover:bg-red-600
              text-white px-4 py-2 rounded-lg font-semibold
              transition
            "
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;