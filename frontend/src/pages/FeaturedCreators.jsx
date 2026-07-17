import { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function FeaturedCreators() {
  const [creators, setCreators] = useState([]);
  const [liked, setLiked] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/creator"
        // For Render:
        // "https://influnexa-backend.onrender.com/api/creator"
      );

      setCreators(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleLike = (index) => {
    setLiked({
      ...liked,
      [index]: !liked[index],
    });
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen relative overflow-hidden bg-black py-20 px-4 sm:px-6">

        {/* Background Glow */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-pink-500 rounded-full blur-[180px] opacity-20 animate-pulse"></div>

        <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500 rounded-full blur-[180px] opacity-20 animate-pulse"></div>

        <div className="max-w-7xl mx-auto relative z-10">

          <h1 className="text-5xl font-bold text-center text-white mb-16">
            Featured Creators
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

            {creators.map((creator, index) => (
              <div
                key={creator._id}
                className="rounded-3xl overflow-hidden
                bg-white/10 backdrop-blur-lg
                border border-cyan-400/30
                shadow-[0_0_25px_rgba(0,255,255,0.5)]
                hover:scale-105 transition duration-300"
              >
                {/* Like Button */}
                <button
                  onClick={() => toggleLike(index)}
                  className="absolute mt-4 ml-[85%] z-20"
                >
                  <FaHeart
                    className={`text-3xl transition-all duration-300 ${
                      liked[index]
                        ? "text-red-500 scale-125"
                        : "text-white"
                    }`}
                  />
                </button>

                {/* Creator Image */}
                <img
                  src={
                    creator.image ||
                    "https://via.placeholder.com/500"
                  }
                  alt={creator.fullName}
                  className="w-full h-72 object-cover"
                />

                {/* Card Body */}
                <div className="p-6 text-white">

                  <h3 className="text-2xl font-bold mb-4">
                    {creator.fullName}
                  </h3>

                  <p className="mb-2">
                    <span className="font-semibold">
                      Category:
                    </span>{" "}
                    {creator.preferredCategory?.join(", ")}
                  </p>

                  <p className="mb-2">
                    <span className="font-semibold">
                      Followers:
                    </span>{" "}
                    {creator.followersRange}
                  </p>

                  <p className="mb-2">
                    <span className="font-semibold">
                      City:
                    </span>{" "}
                    {creator.city}
                  </p>

                  <p className="mb-2">
                    <span className="font-semibold">
                      Campaigns:
                    </span>{" "}
                    {creator.campaignTypes?.join(", ")}
                  </p>

                  <button
                    onClick={() =>
                      navigate(`/creator/${creator._id}`)
                    }
                    className="mt-6 w-full py-3 rounded-xl
                    bg-gradient-to-r from-cyan-500 to-purple-600
                    font-semibold hover:scale-105 transition"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default FeaturedCreators;