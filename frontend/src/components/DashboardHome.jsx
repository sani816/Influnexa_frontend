import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import DashboardChart from "./DashboardChart";
import Config from "../config/Config";
import {
  FaUsers,
  FaBuilding,
  FaChartLine,
  FaClock
} from "react-icons/fa";

function DashboardHome() {

  const [stats, setStats] = useState({
    totalBrands: 0,
    totalCreators: 0,
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  // 🔥 LIVE ACTIVITY STATE
  const [activity, setActivity] = useState([]);

  useEffect(() => {

    fetchStats();

    const socket = io(Config.API_URL);

    // BRAND CREATED
    socket.on("new-brand", (data) => {
      setStats((prev) => ({
        ...prev,
        totalBrands: prev.totalBrands + 1,
      }));

      setActivity((prev) => [
        `New Brand Registered: ${data.brandName}`,
        ...prev,
      ]);
    });

    // BRAND UPDATED
    socket.on("update-brand", (data) => {
      fetchStats();

      setActivity((prev) => [
        `Brand Updated: ${data.brandName}`,
        ...prev,
      ]);
    });

    // CREATOR CREATED
    socket.on("new-creator", (data) => {
      setStats((prev) => ({
        ...prev,
        totalCreators: prev.totalCreators + 1,
      }));

      setActivity((prev) => [
        `New Influencer Joined: ${data.fullName}`,
        ...prev,
      ]);
    });

    // CLOCK
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
      socket.disconnect();
    };

  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${Config.API_URL}/api/admin/stats`);

      setStats({
        totalBrands: res.data.totalBrands,
        totalCreators: res.data.totalCreators,
      });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-5xl font-bold text-white">
            Admin Dashboard
          </h1>

          <p className="text-gray-300 mt-2">
            Welcome back Admin 👋
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg px-5 py-3 rounded-xl border border-white/20">
          <div className="flex items-center gap-2 text-cyan-300">
            <FaClock />
            {currentTime.toLocaleString()}
          </div>
        </div>

      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-6 rounded-2xl shadow-lg">
          <FaBuilding size={40} />
          <h2 className="text-3xl font-bold mt-4">
            {stats.totalBrands}
          </h2>
          <p className="text-white/80">Total Brands</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 rounded-2xl shadow-lg">
          <FaUsers size={40} />
          <h2 className="text-3xl font-bold mt-4">
            {stats.totalCreators}
          </h2>
          <p className="text-white/80">Total Influencers</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-2xl shadow-lg">
          <FaChartLine size={40} />
          <h2 className="text-3xl font-bold mt-4">
            {stats.totalBrands + stats.totalCreators}
          </h2>
          <p className="text-white/80">Total Registrations</p>
        </div>

      </div>

      {/* CHART */}
      <DashboardChart stats={stats} />

      {/* 🔥 LIVE ACTIVITY */}
      {/* <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">

        <h2 className="text-2xl font-bold text-white mb-4">
          Recent Activity 
        </h2>

        <div className="space-y-3 max-h-60 overflow-y-auto">

          {activity.length === 0 ? (
            <p className="text-gray-200">No activity yet...</p>
          ) : (
            activity.map((item, index) => (
              <div
                key={index}
                className="bg-slate-800 p-4 rounded-xl text-white"
              >
                {item}
              </div>
            ))
          )}

        </div>

      </div> */}

    </div>
  );
}

export default DashboardHome;