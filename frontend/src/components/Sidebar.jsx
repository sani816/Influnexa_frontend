import {
  FaTachometerAlt,
  FaBuilding,
  FaUsers,
  FaChartLine,
  FaBell,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Sidebar({ setSection }) {

  const menuClass =
    `
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

    const navigate = useNavigate();

const handleLogout = () => {
  // remove auth data (adjust key based on your app)
  localStorage.removeItem("adminToken");
  localStorage.removeItem("admin");

  // redirect to login page
  navigate("/admin");
};

  return (
    <div
  className="
    w-72
    fixed
    top-0
    left-0
    h-screen
    bg-black/40
    backdrop-blur-xl
    border-r
    border-white/10
    shadow-2xl
    p-6
    flex flex-col
  "
>
      {/* LOGO */}

      <div className="mb-10">

        <h1
          className="
          text-4xl
          font-extrabold
          bg-gradient-to-r
          from-cyan-400
          to-pink-500
          bg-clip-text
          text-transparent
          "
        >
          InfluNexa
        </h1>

        <p className="text-gray-400 text-sm mt-1">
          Admin Panel
        </p>

      </div>

      {/* ADMIN CARD */}

      <div
        className="
        bg-white/5
        border
        border-white/10
        rounded-2xl
        p-4
        mb-8
        "
      >
        <div className="flex items-center gap-3">

          <div
            className="
            h-12 w-12
            rounded-full
            bg-gradient-to-r
            from-cyan-500
            to-pink-500
            flex
            items-center
            justify-center
            text-white
            font-bold
            "
          >
            A
          </div>

          <div>
            <h3 className="text-white font-semibold">
              Admin
            </h3>

            <p className="text-gray-400 text-sm">
              Super Admin
            </p>
          </div>

        </div>
      </div>

      {/* MENU */}

      <div className="space-y-2">

        <button
          onClick={() => setSection("dashboard")}
          className={menuClass}
        >
          <FaTachometerAlt />
          Dashboard
        </button>

        <button
          onClick={() => setSection("brands")}
          className={menuClass}
        >
          <FaBuilding />
          Brands
        </button>

        <button
          onClick={() => setSection("creators")}
          className={menuClass}
        >
          <FaUsers />
          Influencers
        </button>

        <button
          onClick={() => setSection("analytics")}
          className={menuClass}
        >
          <FaChartLine />
          Analytics
        </button>

        <button
          onClick={() => setSection("notifications")}
          className={menuClass}
        >
          <FaBell />
          Notifications
        </button>

        <button
          onClick={() => setSection("settings")}
          className={menuClass}
        >
          <FaCog />
          Settings
        </button>

      </div>

      {/* FOOTER */}

      <div className="absolute bottom-8 left-6 right-6">

       <button
  onClick={handleLogout}
  className="
    bg-red-500
    hover:bg-red-600
    text-white
    px-4
    py-2
    rounded-lg
    font-semibold
    transition
  "
>
  Logout
</button>

      </div>

    </div>
  );
}

export default Sidebar;