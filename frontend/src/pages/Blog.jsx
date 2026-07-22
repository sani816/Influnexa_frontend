import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhyChooseUs from "../components/WhyChooseUs";

function Blog() {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleCard = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
  fetchBlogs();
}, []);

const fetchBlogs = async () => {
  try {
    const res = await axios.get(
      `${API_URL}/api/blogs`
    );

    setBlogs(res.data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};
const API_URL = import.meta.env.VITE_API_URL;
  const [blogs, setBlogs] = useState([]);
const [loading, setLoading] = useState(true);
if (loading) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold">Loading Blogs...</h2>
      </div>
      <Footer />
    </>
  );
}
  return (
    <>
      <Navbar />

      {/* background glow (responsive) */}
      <div>
     <div className="bg-gradient-to-b from-indigo-900 via-purple-900 text-white">
        {/* HERO */}
        <section className="py-16 sm:py-24 text-black relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
              InfluNexa Blog
            </h1>

            <p className="text-sm sm:text-lg md:text-xl max-w-3xl mx-auto text-white">
              Insights, strategies, trends, and growth stories from the world of influencer marketing.
            </p>

          </div>
        </section>

        {/* FEATURED */}
        <section className="py-6 sm:py-10 bg-transparent">

          <div className="max-w-7xl mx-auto px-4 sm:px-6">

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-2">
<img
  src={`${API_URL}/uploads/${blog.image}`}
  alt={blog.title}
  className="w-full h-40 sm:h-48 md:h-56 object-cover"
/>
              <div className="p-6 sm:p-10 text-white">

                <h2 className="text-2xl sm:text-4xl font-bold mt-4 sm:mt-6 text-black">
                  Complete Guide to Influencer Marketing Success
                </h2>

                <p className="mt-4 sm:mt-6 text-sm sm:text-base">
                  Learn everything from influencer discovery to campaign management and ROI measurement.
                </p>

              </div>

            </div>

          </div>

        </section>
        
       </div>
        {/* BLOGS */}
        <section className="py-12 sm:py-20">

          <div className="max-w-7xl mx-auto px-4 sm:px-6">

            <h2 className="text-3xl sm:text-5xl font-bold text-center mb-8 sm:mb-12 text-black">
              Latest Articles
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

              {blogs.map((blog) => (
                <div key={blog._id} className="flip-card h-[420px] sm:h-[480px] md:h-[500px]">

                  <div className={`flip-card-inner ${flippedCards[blog._id] ? "flipped" : ""}`}>

                    {/* FRONT */}
                    <div className="flip-card-front">

                      <img
                        src={blog.image}
                        className="w-full h-40 sm:h-48 md:h-56 object-cover"
                      />

                      <div className="p-4 sm:p-6 text-white">

                        <span className="text-cyan-400 font-semibold text-sm sm:text-base">
                          {blog.category}
                        </span>

                        <h3 className="text-lg sm:text-2xl font-bold mt-2 sm:mt-3 text-black">
                          {blog.title}
                        </h3>

                        <p className="text-white mt-3 sm:mt-4 text-sm sm:text-base">
                          {blog.description}
                        </p>

                        <button
                          onClick={() => toggleCard(blog._id)}
                          className="mt-4 sm:mt-6 bg-cyan-600 text-black font-bold rounded-2xl py-2 px-4 text-sm sm:text-base"
                        >
                          Read Article →
                        </button>

                      </div>

                    </div>

                    {/* BACK */}
                    <div className="flip-card-back p-4 sm:p-6">

                      <h3 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6">
                        {blog.title}
                      </h3>

                      <p className="text-sm sm:text-lg leading-6 sm:leading-8">
                        {blog.content}
                      </p>

                      <button
                        onClick={() => toggleCard(blog._id)}
                        className="mt-6 sm:mt-8 bg-white text-black px-4 sm:px-5 py-2 rounded-xl font-bold"
                      >
                        ← Back
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>

          </div>

        </section>

        <WhyChooseUs />

      </div>

      <Footer />
    </>
  );
}

export default Blog;