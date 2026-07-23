import { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function FeaturedCreators() {
  const [creators, setCreators] = useState([]);
  const [liked, setLiked] = useState({});
  const navigate = useNavigate();

  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://influnexa-backend-8.onrender.com";

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/creator/featured`
      );

      console.log(" Featured Creators:", res.data);

      if (res.data.success) {
        setCreators(res.data.creators);
      } else {
        setCreators([]);
      }
    } catch (err) {
      console.log(err);
      setCreators([]);
    }
  };

  const toggleLike = (index) => {
    setLiked((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-black relative overflow-hidden py-20 px-4">

        {/* Background Glow */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-pink-500 rounded-full blur-[180px] opacity-20 animate-pulse"></div>

        <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500 rounded-full blur-[180px] opacity-20 animate-pulse"></div>

        <div className="max-w-7xl mx-auto relative z-10">

          <h1 className="text-5xl font-bold text-center text-white mb-16">
            Featured Creators
          </h1>

          {creators.length === 0 ? (
            <div className="text-center text-white text-2xl">
              No creators found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

              {creators.map((creator, index) => (
                <div
                  key={creator._id}
                  className="
                  relative
                  rounded-3xl
                  overflow-hidden
                  bg-white/10
                  backdrop-blur-lg
                  border border-cyan-400/30
                  shadow-[0_0_25px_rgba(0,255,255,0.5)]
                  hover:scale-105
                  transition
                  duration-300
                "
                >
                  

                  {/* Creator Image */}
                  <img
                    src=
                    {creator.image}    
                    alt={creator.fullName}
                    className="w-full h-72 object-cover"
                  />

                  {/* Body */}
                  <div className="p-6 text-white">

                    <h3 className="text-2xl font-bold mb-4">
                      {creator.fullName}
                    </h3>

                    <p className="mb-2">
                      <span className="font-semibold">
                        Category:
                      </span>{" "}
                      {creator.preferredCategory?.join(", ") ||
                        "N/A"}
                    </p>

                    <p className="mb-2">
                      <span className="font-semibold">
                        Instagram Followers:
                      </span>{" "}
                      {creator.followersRange || "N/A"}
                    </p>

                    <p className="mb-2">
                      <span className="font-semibold">
                        Youtube Subscriber:
                      </span>{" "}
                      {creator.youtubeSubs || "N/A"}
                    </p>
      
                    <p className="mb-2">
                      <span className="font-semibold">
                        City:
                      </span>{" "}
                      {creator.city || "N/A"}
                    </p>

                    <p className="mb-2">
                      <span className="font-semibold">
                        Campaigns:
                      </span>{" "}
                      {creator.campaignTypes?.join(", ") ||
                        "N/A"}
                    </p>

                    <button
                      onClick={() =>
                        navigate(`/creator/${creator._id}`)
                      }
                      className="
                      mt-6
                      w-full
                      py-3
                      rounded-xl
                      bg-gradient-to-r
                      from-cyan-500
                      to-purple-600
                      font-semibold
                      hover:scale-105
                      transition
                    "
                    >
                      View Profile
                    </button>

                  </div>
                </div>
              ))}

            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default FeaturedCreators;