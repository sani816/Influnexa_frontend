import { useState } from "react";
import { FaHeart, FaInstagram } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const creators = [
  {
    name: "Aman Sharma",
    niche: "Tech",
    followers: "500K",
    engagement: "8%",
    location: "Delhi",
    image:
      "https://i.pinimg.com/736x/97/74/a0/9774a0bcb79dbb74c65bfc86634b3474.jpg",

    instagram: {
      username: "@aman.tech",
      bio: "Tech Reviewer | AI Enthusiast | Gadgets",
      followers: "500K",
      profilePic:
        "https://i.pinimg.com/736x/97/74/a0/9774a0bcb79dbb74c65bfc86634b3474.jpg",
      link: "https://instagram.com",
    },
  },

  {
    name: "Priya Roy",
    niche: "Fashion",
    followers: "1.2M",
    engagement: "10%",
    location: "Mumbai",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500",

    instagram: {
      username: "@priya.style",
      bio: "Fashion | Lifestyle | Beauty",
      followers: "1.2M",
      profilePic:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500",
      link: "https://instagram.com",
    },
  },

  {
    name: "Rahul Singh",
    niche: "Fitness",
    followers: "850K",
    engagement: "12%",
    location: "Kolkata",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500",

    instagram: {
      username: "@rahul.fit",
      bio: "Fitness Coach | Gym Motivation",
      followers: "850K",
      profilePic:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500",
      link: "https://instagram.com",
    },
  },

  {
    name: "Sneha Das",
    niche: "Travel",
    followers: "900K",
    engagement: "9%",
    location: "Goa",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500",

    instagram: {
      username: "@sneha.travel",
      bio: "Traveller | Explorer | Content Creator",
      followers: "900K",
      profilePic:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500",
      link: "https://instagram.com",
    },
  },

  {
    name: "Riya Kapoor",
    niche: "Beauty",
    followers: "1.5M",
    engagement: "15%",
    location: "Delhi",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=500",

    instagram: {
      username: "@riya.beauty",
      bio: "Beauty Creator | Makeup Artist",
      followers: "1.5M",
      profilePic:
        "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=500",
      link: "https://instagram.com",
    },
  },

  {
    name: "Arjun Mehta",
    niche: "Gaming",
    followers: "2M",
    engagement: "18%",
    location: "Bangalore",
    image:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=500",

    instagram: {
      username: "@arjun.gamer",
      bio: "Gaming Creator | Streamer",
      followers: "2M",
      profilePic:
        "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=500",
      link: "https://instagram.com",
    },
  },
];

function FeaturedCreators() {
  const [liked, setLiked] = useState({});
  const [flipped, setFlipped] = useState({});

  const toggleLike = (index) => {
    setLiked({
      ...liked,
      [index]: !liked[index],
    });
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen relative overflow-hidden bg-black py-20 px-6">

        {/* Background Glow */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-pink-500 rounded-full blur-[180px] opacity-20 animate-pulse"></div>

        <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500 rounded-full blur-[180px] opacity-20 animate-pulse"></div>

        <div className="max-w-7xl mx-auto relative z-10">

          <h1 className="text-5xl font-bold text-center text-white neon-text mb-16">
            Featured Creators
          </h1>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">

            {creators.map((creator, index) => (
              <div
                key={index}
                className="perspective h-[620px]"
              >
                <div
                  className={`relative w-full h-full duration-700 transform-style preserve-3d ${
                    flipped[index] ? "rotate-y-180" : ""
                  }`}
                >

                  {/* FRONT CARD */}

                  <div className="absolute w-full h-full backface-hidden rounded-3xl overflow-hidden bg-white/10 backdrop-blur-lg border border-cyan-400/30 shadow-[0_0_25px_rgba(0,255,255,0.5)] hover:shadow-[0_0_40px_rgba(255,0,255,0.7)] animate-float">

                    <button
                      onClick={() => toggleLike(index)}
                      className="absolute top-4 right-4 z-20"
                    >
                      <FaHeart
                        className={`text-3xl transition-all duration-300 ${
                          liked[index]
                            ? "text-red-500 scale-125"
                            : "text-white"
                        }`}
                      />
                    </button>

                    <img
                      src={creator.image}
                      alt={creator.name}
                      className="w-full h-72 object-cover"
                    />

                    <div className="p-6 text-white">

                      <h3 className="text-2xl font-bold mb-4">
                        {creator.name}
                      </h3>

                      <p className="mb-2">
                        <span className="text-cyan-400">
                          Niche:
                        </span>{" "}
                        {creator.niche}
                      </p>

                      <p className="mb-2">
                        <span className="text-cyan-400">
                          Followers:
                        </span>{" "}
                        {creator.followers}
                      </p>

                      <p className="mb-2">
                        <span className="text-cyan-400">
                          Engagement:
                        </span>{" "}
                        {creator.engagement}
                      </p>

                      <p>
                        <span className="text-cyan-400">
                          Location:
                        </span>{" "}
                        {creator.location}
                      </p>

                      <button
                        onClick={() =>
                          setFlipped({
                            ...flipped,
                            [index]: true,
                          })
                        }
                        className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105 transition"
                      >
                        View Profile
                      </button>

                    </div>
                  </div>

                  {/* BACK CARD */}

                  <div className="absolute w-full h-full rotate-y-180 backface-hidden rounded-3xl bg-gradient-to-br from-pink-600 via-purple-700 to-black text-white flex flex-col items-center justify-center p-8">

                    <img
                      src={creator.instagram.profilePic}
                      alt=""
                      className="w-32 h-32 rounded-full border-4 border-white object-cover"
                    />

                    <FaInstagram className="text-5xl mt-4 text-pink-400" />

                    <h2 className="text-2xl font-bold mt-4">
                      {creator.instagram.username}
                    </h2>

                    <p className="text-center mt-4">
                      {creator.instagram.bio}
                    </p>

                    <p className="mt-4 font-semibold">
                      Followers: {creator.instagram.followers}
                    </p>

                    <a
                      href={creator.instagram.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 bg-pink-500 px-8 py-3 rounded-full hover:scale-105 transition"
                    >
                      Open Instagram
                    </a>

                    <button
                      onClick={() =>
                        setFlipped({
                          ...flipped,
                          [index]: false,
                        })
                      }
                      className="mt-4 bg-white text-black px-8 py-3 rounded-full"
                    >
                      Back
                    </button>

                  </div>

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