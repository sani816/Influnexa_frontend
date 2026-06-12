import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Config from "../config/Config";

import {
  FaUsers,
  FaBuilding,
  FaChartLine,
  FaRupeeSign,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaGlobe,
  FaInstagram
} from "react-icons/fa";

function AnalyticsSection() {

  const [brands, setBrands] = useState([]);
  const [creators, setCreators] = useState([]);

  // FETCH DATA
  const fetchData = async () => {
    try {
      const [bRes, cRes] = await Promise.all([
        axios.get(`${Config.API_URL}/api/brands`),
        axios.get(`${Config.API_URL}/api/creator`)
      ]);

      setBrands(bRes.data?.brands || []);
      setCreators(cRes.data?.creators || []);
    } catch (err) {
      console.log(err);
    }
  };

  // SOCKET LIVE
  useEffect(() => {
    fetchData();

    const socket = io(Config.API_URL);

    socket.on("new-brand", fetchData);
    socket.on("update-brand", fetchData);
    socket.on("new-creator", fetchData);
    socket.on("update-creator", fetchData);

    return () => socket.disconnect();
  }, []);

  // ======================
  // BRAND STATS
  // ======================
  const totalBrands = brands.length;
  const activeBrands = brands.filter(b => b.status === "active").length;
  const pendingBrands = brands.filter(b => b.status === "pending").length;
  const inactiveBrands = brands.filter(b => b.status === "inactive").length;

  const brandsWithWebsite = brands.filter(b => b.websiteUrl).length;

  // ======================
  // CREATOR STATS
  // ======================
  const totalCreators = creators.length;
  const verifiedCreators = creators.filter(c => c.isVerified).length;
  const instagramConnected = creators.filter(c => c.instagramUsername).length;

  // ======================
  // BUSINESS METRICS (demo logic)
  // ======================
  const revenue = (totalBrands * 5000) + (totalCreators * 2000);

  const conversionRate =
    totalBrands > 0
      ? ((totalCreators / totalBrands) * 100).toFixed(1)
      : 0;

  const engagementScore =
    totalCreators > 0
      ? ((verifiedCreators / totalCreators) * 100).toFixed(1)
      : 0;

  return (
    <div className="text-white p-4 sm:p-6">

      <h1 className="text-2xl font-bold mb-6 sm:text-3xl lg:text-4xl sm:mb-8">
        Analytics Dashboard
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

        {/* BRANDS */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 sm:p-6  rounded-xl sm:rounded-2xl">
          <FaBuilding size={24} className="sm:w-[30px] sm:h-[30px]" />
          <h2 className="sm:text-3xl text-2xl font-bold mt-2 sm:mt-3">{totalBrands}</h2>
          <p>Total Brands</p>

          <div className="text-xs sm:text-sm sm:mt-3 mt-2 space-y-1">
            <p className="flex items-center gap-2"><FaCheckCircle className="shrink-0" /> Active: {activeBrands}</p>
            <p className="flex items-center gap-2"><FaClock className="shrink-0" /> Pending: {pendingBrands}</p>
            <p className="flex items-center gap-2"><FaTimesCircle className="shrink-0" /> Inactive: {inactiveBrands}</p>
            <p className="flex items-center gap-2"><FaGlobe className="shrink-0" /> Websites: {brandsWithWebsite}</p>
          </div>
        </div>

        {/* INFLUENCERS */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 sm:p-6  p-4 sm:rounded-2xl rounded-xl">
          <FaUsers size={24} className="sm:w-8 sm:h-8"/>
          <h2 className="sm:text-3xl text-2xl font-bold  mt-2 sm:mt-3">{totalCreators}</h2>
          <p className="text-sm sm:text-base">Total Influencers</p>

          <div className="text-xs sm:text-sm sm:mt-3 mt-2 space-y-1">
            <p className="flex items-center gap-2"><FaCheckCircle className="shrink-0" /> Verified: {verifiedCreators}</p>
            <p className="flex items-center gap-2"><FaInstagram className="shrink-0" /> IG Connected: {instagramConnected}</p>
          </div>
        </div>

        {/* GROWTH */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600  p-4 sm:p-6  rounded-xl sm:rounded-2xl">
          <FaChartLine size={24}className="sm:w-8 sm:h-8" />
          <h2 className="sm:text-3xl text-2xl font-bold mt-2 sm:mt-3">
            {conversionRate}%
          </h2>
          <p className="text-sm sm:text-base">Conversion Rate</p>

          <p className="text-xs sm:mt-3 mt-2 sm:text-sm">
            Influencers per brand ratio
          </p>
        </div>

        {/* REVENUE */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 sm:p-6 sm:rounded-2xl p-4 rounded-xl">
          <FaRupeeSign size={24}  className="sm:w-8 sm:h-8"/>
          <h2 className="sm:text-3xl font-bold sm:mt-3 text-2xl mt-2">
            ₹{(revenue / 1000).toFixed(1)}K
          </h2>
          <p className=" text-sm sm:text-base">Estimated Revenue</p>

          <p className="text-xs  sm:text-sm sm:mt-3 mt-2">
            Based on platform activity
          </p>
        </div>

      </div>

      {/* SECOND ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">

        {/* <div className="bg-slate-800 p-5 rounded-xl">
          <h2 className="text-xl font-bold">Engagement Score</h2>
          <p className="text-3xl mt-2 text-green-400">
            {engagementScore}%
          </p>
        </div> */}

        <div className="bg-slate-800 sm:p-5 p-4 sm:rounded-xl rounded-lg">
          <h2 className=" text-base sm:text-lg lg:text-xl font-bold">Market Health</h2>
          <p className="sm:text-3xl text-2xl mt-2 text-cyan-400">
            {activeBrands > 0 && totalCreators > 0 ? "Good" : "Low"}
          </p>
        </div>

        <div className="bg-slate-800 sm:p-5 p-4 sm:rounded-xl rounded-lg">
          <h2 className="text-base sm:text-lg lg:text-xl font-bold">Platform Activity</h2>
          <p className="sm:text-3xl  text-2xl mt-2 text-yellow-400">
            {activeBrands + totalCreators}
          </p>
        </div>

      </div>

    </div>
  );
}

export default AnalyticsSection;