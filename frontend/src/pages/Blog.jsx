import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhyChooseUs from "../components/WhyChooseUs";

function Blog() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flippedCards, setFlippedCards] = useState({});

  const toggleCard = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/blogs`
      );

      setBlogs(res.data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-900 via-purple-900 to-black">

          <div className="text-center">

            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>

            <p className="text-white mt-6 text-xl font-semibold">
              Loading Blogs...
            </p>

          </div>

        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div>

        {/* HERO */}

        <div className="bg-gradient-to-b from-indigo-900 via-purple-900 text-white">

          <section className="py-20">

            <div className="max-w-7xl mx-auto px-6 text-center">

              <h1 className="text-5xl md:text-6xl font-bold">

                InfluNexa Blog

              </h1>

              <p className="text-xl mt-6 max-w-3xl mx-auto">

                Insights, trends, growth strategies, influencer marketing
                guides and creator success stories.

              </p>

            </div>

          </section>

          {/* FEATURED BLOG */}

          {blogs.length > 0 && (

            <section className="pb-16">

              <div className="max-w-7xl mx-auto px-6">

                <div className="grid lg:grid-cols-2 bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden">

                  <img
                    src={`${API_URL}/uploads/${blogs[0].image}`}
                    alt={blogs[0].title}
                    className="w-full h-[350px] object-cover"
                  />

                  <div className="p-10 flex flex-col justify-center">

                    <span className="text-cyan-300 font-semibold">

                      Featured Article

                    </span>

                    <h2 className="text-4xl font-bold mt-4">

                      {blogs[0].title}

                    </h2>

                    <p className="mt-6 text-lg">

                      {blogs[0].description}

                    </p>

                    <div className="mt-6 flex gap-4">

                      <span className="bg-cyan-500 text-black px-4 py-2 rounded-full font-semibold">

                        {blogs[0].category}

                      </span>

                      <span className="text-gray-300">

                        By {blogs[0].author}

                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </section>

          )}

        </div>

        {/* BLOGS */}
        {/* BLOGS */}

<section className="py-20 bg-gray-50">

  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-14">

      Latest Articles

    </h2>

    {blogs.length === 0 ? (

      <div className="text-center py-20">

        <h2 className="text-3xl font-bold text-gray-700">

          No Blogs Available

        </h2>

        <p className="text-gray-500 mt-4">

          There are no published blogs yet.

        </p>

      </div>

    ) : (

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {blogs.map((blog) => (

          <div
            key={blog._id}
            className="flip-card h-[540px]"
          >

            <div
              className={`flip-card-inner ${
                flippedCards[blog._id] ? "flipped" : ""
              }`}
            >

              {/* FRONT */}

              <div className="flip-card-front bg-white rounded-3xl shadow-xl overflow-hidden">

                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-60 object-cover"
                />

                <div className="p-6">

                  <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">

                    {blog.category}

                  </span>

                  <h3 className="text-2xl font-bold mt-4 text-gray-900">

                    {blog.title}

                  </h3>

                  <p className="text-gray-600 mt-4 line-clamp-4">

                    {blog.description}

                  </p>

                  <div className="mt-6 flex items-center justify-between">

                    <span className="text-sm text-gray-500">

                      By {blog.author}

                    </span>

                    <button
                      onClick={() => toggleCard(blog._id)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl transition"
                    >
                      Read More →
                    </button>

                  </div>

                </div>

              </div>

              {/* BACK */}

              <div className="flip-card-back bg-gradient-to-br from-indigo-700 to-purple-700 text-white rounded-3xl p-8 flex flex-col">

                <h2 className="text-3xl font-bold">

                  {blog.title}

                </h2>

                <div className="mt-4 text-sm text-indigo-100">

                  {blog.category} • {blog.author}

                </div>

                <div className="mt-6 overflow-y-auto flex-1">

                  <p className="leading-8 whitespace-pre-line">

                    {blog.content}

                  </p>

                </div>

                <button
                  onClick={() => toggleCard(blog._id)}
                  className="mt-8 bg-white text-indigo-700 font-semibold py-3 rounded-xl hover:bg-gray-100 transition"
                >
                  ← Back
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    )}

  </div>

</section>
<WhyChooseUs />

</div>

<Footer />

</>

);

}

export default Blog;