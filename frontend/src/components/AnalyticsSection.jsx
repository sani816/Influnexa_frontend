import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

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
        axios.get("https://influnexa-backend-7.onrender.com/api/brands"),
        axios.get("https://influnexa-backend-7.onrender.com/api/creator")
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

    const socket = io("influnexa-backend-7.onrender.com:5000");

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
    <div className="text-white">

      <h1 className="text-4xl font-bold mb-8">
        Analytics Dashboard
      </h1>

      {/* GRID */}
      <div className="grid md:grid-cols-4 gap-6">

        {/* BRANDS */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-6 rounded-2xl">
          <FaBuilding size={30} />
          <h2 className="text-3xl font-bold mt-3">{totalBrands}</h2>
          <p>Total Brands</p>

          <div className="text-xs mt-3 space-y-1">
            <p><FaCheckCircle className="inline" /> Active: {activeBrands}</p>
            <p><FaClock className="inline" /> Pending: {pendingBrands}</p>
            <p><FaTimesCircle className="inline" /> Inactive: {inactiveBrands}</p>
            <p><FaGlobe className="inline" /> Websites: {brandsWithWebsite}</p>
          </div>
        </div>

        {/* INFLUENCERS */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6 rounded-2xl">
          <FaUsers size={30} />
          <h2 className="text-3xl font-bold mt-3">{totalCreators}</h2>
          <p>Total Influencers</p>

          <div className="text-xs mt-3 space-y-1">
            <p><FaCheckCircle className="inline" /> Verified: {verifiedCreators}</p>
            <p><FaInstagram className="inline" /> IG Connected: {instagramConnected}</p>
          </div>
        </div>

        {/* GROWTH */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-2xl">
          <FaChartLine size={30} />
          <h2 className="text-3xl font-bold mt-3">
            {conversionRate}%
          </h2>
          <p>Conversion Rate</p>

          <p className="text-xs mt-3">
            Influencers per brand ratio
          </p>
        </div>

        {/* REVENUE */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-6 rounded-2xl">
          <FaRupeeSign size={30} />
          <h2 className="text-3xl font-bold mt-3">
            ₹{(revenue / 1000).toFixed(1)}K
          </h2>
          <p>Estimated Revenue</p>

          <p className="text-xs mt-3">
            Based on platform activity
          </p>
        </div>

      </div>

      {/* SECOND ROW */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">

        {/* <div className="bg-slate-800 p-5 rounded-xl">
          <h2 className="text-xl font-bold">Engagement Score</h2>
          <p className="text-3xl mt-2 text-green-400">
            {engagementScore}%
          </p>
        </div> */}

        <div className="bg-slate-800 p-5 rounded-xl">
          <h2 className="text-xl font-bold">Market Health</h2>
          <p className="text-3xl mt-2 text-cyan-400">
            {activeBrands > 0 && totalCreators > 0 ? "Good" : "Low"}
          </p>
        </div>

        <div className="bg-slate-800 p-5 rounded-xl">
          <h2 className="text-xl font-bold">Platform Activity</h2>
          <p className="text-3xl mt-2 text-yellow-400">
            {activeBrands + totalCreators}
          </p>
        </div>

      </div>

    </div>
  );
}

export default AnalyticsSection;