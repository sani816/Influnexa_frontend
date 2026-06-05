import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaInstagram,
  FaYoutube,
  FaBullhorn,
  FaVideo,
  FaUsers,
  FaStar,
} from "react-icons/fa";

function Services() {
  const services = [
    {
      title: "Influencer Marketing",
      icon: <FaBullhorn size={40} />,
      description:
        "Connect your brand with highly relevant influencers to maximize reach and engagement.",
    },
    {
      title: "Instagram Campaigns",
      icon: <FaInstagram size={40} />,
      description:
        "Boost visibility through reels, stories, posts, and collaborations.",
    },
    {
      title: "YouTube Promotions",
      icon: <FaYoutube size={40} />,
      description:
        "Product integrations, dedicated reviews, and sponsored content.",
    },
    {
      title: "Celebrity Endorsements",
      icon: <FaStar size={40} />,
      description:
        "Partner with celebrities to build trust and brand awareness.",
    },
    {
      title: "Product Reviews",
      icon: <FaVideo size={40} />,
      description:
        "Authentic reviews that influence purchase decisions.",
    },
    {
      title: "Brand Shoots with Live Video",
      icon: <FaVideo size={40} />,
      description:
        "Professional production and live promotional campaigns.",
    },
    {
      title: "Creator Management",
      icon: <FaUsers size={40} />,
      description:
        "End-to-end creator relationship management.",
    },
    {
      title: "Campaign Management",
      icon: <FaBullhorn size={40} />,
      description:
        "Planning, execution, tracking, and reporting.",
    },
    {
      title: "Influencer Outreach",
      icon: <FaUsers size={40} />,
      description:
        "Identify and recruit the perfect influencers.",
    },
    {
      title: "UGC Content Creation",
      icon: <FaVideo size={40} />,
      description:
        "High-performing user-generated content for ads and social media.",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-900 to-purple-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our Services
          </h1>

          <p className="text-xl max-w-3xl mx-auto">
            Full-service influencer marketing solutions
            designed to grow your brand.
          </p>

        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-12">
            What We Offer
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl p-8 hover:-translate-y-2 transition duration-300"
              >
                <div className="text-indigo-600 mb-4">
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4">
                  {service.title}
                </h3>

                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* Process */}
      <section className="bg-gray-100 py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-12">
            Our Process
          </h2>

          <div className="grid md:grid-cols-4 gap-8">

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-bold text-xl mb-3">
                1. Strategy
              </h3>
              <p>
                Understand your brand goals and audience.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-bold text-xl mb-3">
                2. Creator Selection
              </h3>
              <p>
                Match with relevant influencers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-bold text-xl mb-3">
                3. Execution
              </h3>
              <p>
                Launch and monitor campaigns.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-bold text-xl mb-3">
                4. Reporting
              </h3>
              <p>
                Analyze results and optimize performance.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="bg-indigo-700 text-white py-20">

        <div className="max-w-5xl mx-auto text-center px-6">

          <h2 className="text-5xl font-bold mb-6">
            Ready To Grow Your Brand?
          </h2>

          <p className="text-xl mb-8">
            Start your influencer marketing journey today.
          </p>

          <button className="bg-white text-indigo-700 px-8 py-4 rounded-lg font-bold hover:scale-105 transition">
            Book Free Consultation
          </button>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Services;