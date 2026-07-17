import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowLeft,
  FaGlobe,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function CreatorProfile() {
  const { id } = useParams();

  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCreator();
  }, []);

  const fetchCreator = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/creator/${id}`
      );

      setCreator(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-4xl">
        Loading...
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-4xl">
        Creator Not Found
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-black py-20 px-4 relative overflow-hidden">

        {/* Background Glow */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-pink-500 rounded-full blur-[220px] opacity-20 animate-pulse"></div>

        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500 rounded-full blur-[220px] opacity-20 animate-pulse"></div>

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Back */}
          <Link
            to="/featured-creators"
            className="inline-flex items-center gap-3 text-white mb-8"
          >
            <FaArrowLeft />
            Back to Creators
          </Link>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

            <div className="grid lg:grid-cols-3 gap-10">

              {/* LEFT SIDE */}
              <div>

                <img
                  src={
                    creator.image ||
                    "https://via.placeholder.com/400"
                  }
                  alt={creator.fullName}
                  className="w-72 h-72 rounded-full object-cover mx-auto border-4 border-cyan-400"
                />

                <h1 className="text-4xl font-bold text-white text-center mt-6">
                  {creator.fullName}
                </h1>

                <p className="text-cyan-300 text-center mt-3">
                  {creator.profession ||
                    "Digital Creator"}
                </p>

                <div className="mt-8 space-y-4 text-gray-300">

                  <div className="flex gap-3 items-center">
                    <FaMapMarkerAlt />
                    {creator.city}, {creator.state}
                  </div>

                  <div className="flex gap-3 items-center">
                    <FaEnvelope />
                    {creator.email}
                  </div>

                  <div className="flex gap-3 items-center">
                    <FaPhone />
                    {creator.mobileNumber}
                  </div>

                </div>

                {/* SOCIAL LINKS */}
                <div className="mt-10">

                  <h3 className="text-white text-xl font-bold mb-4">
                    Social Links
                  </h3>

                  <div className="flex flex-wrap gap-3">

                    {creator.instagramLink && (
                      <a
                        href={creator.instagramLink}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-pink-500 p-3 rounded-full"
                      >
                        <FaInstagram size={22} />
                      </a>
                    )}

                    {creator.youtubeLink && (
                      <a
                        href={creator.youtubeLink}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-red-500 p-3 rounded-full"
                      >
                        <FaYoutube size={22} />
                      </a>
                    )}

                    {creator.facebookLink && (
                      <a
                        href={creator.facebookLink}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-blue-600 p-3 rounded-full"
                      >
                        <FaFacebook size={22} />
                      </a>
                    )}

                    {creator.linkedinLink && (
                      <a
                        href={creator.linkedinLink}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-blue-700 p-3 rounded-full"
                      >
                        <FaLinkedin size={22} />
                      </a>
                    )}

                    {creator.website && (
                      <a
                        href={creator.website}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-green-500 p-3 rounded-full"
                      >
                        <FaGlobe size={22} />
                      </a>
                    )}

                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="lg:col-span-2 space-y-8">

                {/* ABOUT */}
                <div className="bg-white/5 rounded-2xl p-6">
                  <h2 className="text-3xl font-bold text-cyan-300 mb-4">
                    About Creator
                  </h2>

                  <p className="text-gray-300 leading-8">
                    {creator.bio ||
                      creator.message ||
                      `${creator.fullName} is a content creator and influencer specializing in ${creator.preferredCategory?.join(
                        ", "
                      )}.`}
                  </p>
                </div>

                {/* INSTAGRAM */}
                <div className="bg-gradient-to-r from-pink-600 to-purple-700 rounded-2xl p-6">

                  <h2 className="text-3xl font-bold mb-4">
                    Instagram
                  </h2>

                  <p>
                    Username:
                    {" "}
                    {creator.instagramUsername}
                  </p>

                  <p className="mt-2">
                    Followers:
                    {" "}
                    {creator.followersRange}
                  </p>

                  {creator.instagramLink && (
                    <a
                      href={creator.instagramLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-5 bg-white text-black px-6 py-3 rounded-full"
                    >
                      Open Instagram
                    </a>
                  )}
                </div>

                {/* YOUTUBE */}
                <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-6">

                  <h2 className="text-3xl font-bold mb-4">
                    YouTube Channel
                  </h2>

                  <p>
                    Channel:
                    {" "}
                    {creator.youtubeName || "N/A"}
                  </p>

                  <p className="mt-2">
                    Subscribers:
                    {" "}
                    {creator.youtubeSubscribers || "N/A"}
                  </p>

                  {creator.youtubeLink && (
                    <a
                      href={creator.youtubeLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-5 bg-white text-black px-6 py-3 rounded-full"
                    >
                      Open YouTube
                    </a>
                  )}
                </div>

                {/* CREATOR INFO */}
                <div className="bg-white/5 rounded-2xl p-6">
                  <h2 className="text-3xl font-bold text-yellow-300 mb-4">
                    Creator Information
                  </h2>

                  <div className="grid md:grid-cols-2 gap-5 text-gray-300">

                    <p>
                      <span className="font-bold text-white">
                        Profession:
                      </span>{" "}
                      {creator.profession}
                    </p>

                    <p>
                      <span className="font-bold text-white">
                        Experience:
                      </span>{" "}
                      {creator.experience}
                    </p>

                    <p>
                      <span className="font-bold text-white">
                        Gender:
                      </span>{" "}
                      {creator.gender}
                    </p>

                    <p>
                      <span className="font-bold text-white">
                        DOB:
                      </span>{" "}
                      {creator.dob}
                    </p>
                  </div>
                </div>

                {/* CATEGORIES */}
                <div>
                  <h2 className="text-3xl font-bold text-cyan-300 mb-4">
                    Categories
                  </h2>

                  <div className="flex flex-wrap gap-3">
                    {creator.preferredCategory?.map(
                      (item, index) => (
                        <span
                          key={index}
                          className="bg-cyan-500 px-4 py-2 rounded-full"
                        >
                          {item}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* CAMPAIGNS */}
                <div>
                  <h2 className="text-3xl font-bold text-purple-300 mb-4">
                    Campaign Preferences
                  </h2>

                  <div className="flex flex-wrap gap-3">
                    {creator.campaignTypes?.map(
                      (item, index) => (
                        <span
                          key={index}
                          className="bg-purple-600 px-4 py-2 rounded-full"
                        >
                          {item}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* BRANDS */}
                <div className="bg-white/5 rounded-2xl p-6">
                  <h2 className="text-3xl font-bold text-yellow-300 mb-4">
                    Previously Worked Brands
                  </h2>

                  <p className="text-gray-300">
                    {creator.brandNames ||
                      "No brands added"}
                  </p>
                </div>

                {/* ADDRESS */}
                <div className="bg-white/5 rounded-2xl p-6">
                  <h2 className="text-3xl font-bold text-green-300 mb-4">
                    Address Information
                  </h2>

                  <p>{creator.address1}</p>
                  <p>{creator.address2}</p>
                  <p>
                    {creator.city}, {creator.state}
                  </p>
                  <p>Pincode: {creator.pincode}</p>
                  <p>
                    Address Type:
                    {" "}
                    {creator.addressType}
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default CreatorProfile;