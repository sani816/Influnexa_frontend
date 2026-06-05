import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Influencer() {
  const creators = [
    {
      id: 1,
      name: "Priya Sharma",
      category: "Fashion",
      followers: "1.2M",
      engagement: "8.5%",
      location: "Mumbai",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: 2,
      name: "Rahul Verma",
      category: "Tech",
      followers: "850K",
      engagement: "7.2%",
      location: "Delhi",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: 3,
      name: "Ananya Roy",
      category: "Beauty",
      followers: "650K",
      engagement: "9.1%",
      location: "Kolkata",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      id: 4,
      name: "Aman Singh",
      category: "Gaming",
      followers: "2.1M",
      engagement: "10.5%",
      location: "Bangalore",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      id: 5,
      name: "Riya Kapoor",
      category: "Travel",
      followers: "920K",
      engagement: "8.9%",
      location: "Goa",
      image: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
      id: 6,
      name: "Karan Das",
      category: "Fitness",
      followers: "1.4M",
      engagement: "11%",
      location: "Hyderabad",
      image: "https://randomuser.me/api/portraits/men/6.jpg",
    },
  ];

  const categories = [
    "All",
    "Fashion",
    "Beauty",
    "Tech",
    "Travel",
    "Food",
    "Lifestyle",
    "Fitness",
    "Gaming",
  ];

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCreators = creators.filter((creator) => {
    const matchCategory =
      selectedCategory === "All" ||
      creator.category === selectedCategory;

    const matchSearch =
      creator.name.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white py-24">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl md:text-6xl font-bold">
            Influencer Network
          </h1>

          <p className="mt-6 text-xl">
            Discover creators across multiple niches.
          </p>

        </div>

      </section>

      {/* Search */}
      <section className="py-10 bg-gray-100">

        <div className="max-w-7xl mx-auto px-6">

          <input
            type="text"
            placeholder="Search influencers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg p-4 mb-6"
          />

          <div className="flex flex-wrap gap-3">

            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full transition
                ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white"
                    : "bg-white border"
                }`}
              >
                {category}
              </button>
            ))}

          </div>

        </div>

      </section>

      {/* Influencers Grid */}
      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredCreators.map((creator) => (
              <div
                key={creator.id}
                className="bg-white shadow-lg rounded-xl overflow-hidden hover:-translate-y-2 transition"
              >
                <img
                  src={creator.image}
                  alt={creator.name}
                  className="w-full h-64 object-cover"
                />

                <div className="p-6">

                  <h3 className="text-2xl font-bold">
                    {creator.name}
                  </h3>

                  <p className="text-indigo-600 font-semibold">
                    {creator.category}
                  </p>

                  <div className="mt-4 space-y-2">

                    <p>👥 Followers: {creator.followers}</p>
                    <p>📈 Engagement: {creator.engagement}</p>
                    <p>📍 Location: {creator.location}</p>

                  </div>

                  <div className="flex gap-4 mt-6">

                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                      👍 Like
                    </button>

                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                      👎 Dislike
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="bg-indigo-700 text-white py-20">

        <div className="max-w-5xl mx-auto text-center px-6">

          <h2 className="text-4xl font-bold mb-6">
            Want To Join Our Creator Network?
          </h2>

          <p className="text-xl mb-8">
            Register as an influencer and collaborate with top brands.
          </p>

          <button className="bg-white text-indigo-700 px-8 py-4 rounded-lg font-bold hover:scale-105 transition">
            Register As Influencer
          </button>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Influencer;