import { useState } from "react";
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

  const blogs = [
    {
      id: 1,
      title: "How to Choose the Right Influencers for Your Brand",
      category: "Influencer Marketing",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      description:
        "Learn how to identify influencers that align with your brand goals, audience, and budget.",
      article:
        "Choosing the right influencer starts with understanding your target audience. Analyze engagement rates, audience demographics, content quality, and authenticity. Focus on creators whose values align with your brand. Long-term partnerships often produce better results than one-time collaborations.",
    },
    {
      id: 2,
      title: "Top Influencer Marketing Trends in 2026",
      category: "Marketing Trends",
      image:
        "https://i.pinimg.com/736x/13/de/1d/13de1d01c8e03692bcfe0fe520b4226b.jpg",
      description:
        "Explore the latest influencer marketing strategies that are driving results in 2026.",
      article:
        "In 2026, brands are focusing more on micro-influencers, AI-powered creator discovery, short-form videos, and authentic content. User-generated content and community-driven campaigns continue to outperform traditional advertising approaches.",
    },
    {
      id: 3,
      title: "Instagram Growth Strategies for Brands",
      category: "Instagram",
      image:
        "https://images.unsplash.com/photo-1611262588024-d12430b98920",
      description:
        "Proven methods to increase followers, engagement, and conversions on Instagram.",
      article:
        "Successful Instagram growth comes from consistent posting, high-quality visuals, engaging reels, influencer collaborations, and strategic hashtag usage. Brands should focus on building relationships with their audience rather than chasing vanity metrics.",
    },
    {
      id: 4,
      title: "Ultimate Guide to Brand Collaborations",
      category: "Branding",
      image:
        "https://images.unsplash.com/photo-1556155092-490a1ba16284",
      description:
        "Everything you need to know about successful influencer-brand collaborations.",
      article:
        "Strong brand collaborations require clear communication, realistic expectations, and mutual value. Brands should provide creative freedom while maintaining campaign goals. Transparent contracts and measurable KPIs help ensure success.",
    },
    {
      id: 5,
      title: "Why UGC Content Converts Better Than Ads",
      category: "UGC",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
      description:
        "Understand how user-generated content helps improve trust and conversions.",
      article:
        "UGC content feels authentic because it comes from real customers. Consumers trust recommendations from people more than direct advertisements. UGC improves credibility, engagement, and purchase intent while reducing content production costs.",
    },
    {
      id: 6,
      title: "YouTube Influencer Marketing Guide",
      category: "YouTube",
      image:
        "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb",
      description:
        "How brands can leverage YouTube creators for long-term audience growth.",
      article:
        "YouTube provides long-form content opportunities that help build trust and authority. Brands can collaborate with creators through reviews, tutorials, sponsorships, and educational content to generate sustained audience engagement.",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-b from-cyan-600 via-purple-900 to-pink-300 text-white">

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
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
                className="w-full h-60 sm:h-80 md:h-full object-cover"
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

        {/* BLOGS */}
        <section className="py-12 sm:py-20">

          <div className="max-w-7xl mx-auto px-4 sm:px-6">

            <h2 className="text-3xl sm:text-5xl font-bold text-center mb-8 sm:mb-12 text-black">
              Latest Articles
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

              {blogs.map((blog) => (
                <div key={blog.id} className="flip-card h-[420px] sm:h-[480px] md:h-[500px]">

                  <div className={`flip-card-inner ${flippedCards[blog.id] ? "flipped" : ""}`}>

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
                          onClick={() => toggleCard(blog.id)}
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
                        {blog.article}
                      </p>

                      <button
                        onClick={() => toggleCard(blog.id)}
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