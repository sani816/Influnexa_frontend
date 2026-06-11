import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  const teamMembers = [
    {
      name: "Rahul Sharma",
      role: "Founder & CEO",
      image: "https://i.pinimg.com/1200x/7a/61/8f/7a618f247fe88e16b52463359ba10bf5.jpg"
    },
    {
      name: "Priya Verma",
      role: "Campaign Manager",
      image: "https://i.pinimg.com/736x/b2/4f/6f/b24f6f8a40671b67b98221c102cba557.jpg"
    },
    {
      name: "Amit Roy",
      role: "Creator Relations",
      image:"https://i.pinimg.com/1200x/7a/61/8f/7a618f247fe88e16b52463359ba10bf5.jpg"
    }
  ];

  const values = [
    "Transparency",
    "Innovation",
    "Trust",
    "Results Driven",
    "Long-Term Relationships",
    "Creativity"
  ];

  return (
    <>
      <Navbar />

      {/* HERO + STORY */}
      <div className="bg-gradient-to-b from-indigo-900 via-purple-900 to-black text-white">

        <section className="py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl sm:text-5xl font-bold mb-6">
              About InfluNexa
            </h1>
            <p className="text-base sm:text-xl max-w-3xl mx-auto text-gray-200text-xl max-w-3xl mx-auto text-gray-200">
              Building meaningful connections between brands and creators.
            </p>
          </div>
        </section>

        <section className="pb-16 sm:pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-200 leading-7 sm:leading-8">
              InfluNexa was created to bridge the gap between brands and authentic creators.
              Many businesses struggle to find the right influencers while creators struggle
              to discover genuine brand opportunities.
            </p>

            <p className="text-gray-200 text-gray-200 leading-7 sm:leading-8 mt-4 sm:mt-6-8 mt-6">
              Our mission is to simplify influencer marketing and help businesses generate
              measurable growth through trusted creator partnerships.
            </p>
          </div>
        </section>
      </div>

      {/* MISSION + VISION */}
      <section className="relative py-16 sm:py-24 bg-gray-100 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 via-purple-100 to-indigo-100 opacity-70"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

          <h2 className="text-2xl sm:text-4xl font-bold text-center mb-10 sm:mb-16 text-gray-900">
            Mission & Vision
          </h2>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">

            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-indigo-500 opacity-40"></div>

            <div className="p-6 sm:p-10 rounded-3xl bg-white/70 backdrop-blur-xl border shadow-lg hover:scale-105 transition">
              <h3 className="text-xl sm:text-3xl font-bold mb-4 text-indigo-700">
                Mission
              </h3>
              <p className="text-gray-700">
                To help brands achieve growth through strategic influencer marketing campaigns,
                powered by authentic creators and data-driven execution.
              </p>
            </div>

            <div className="p-6 sm:p-10 rounded-3xl bg-white/70 backdrop-blur-xl border shadow-lg hover:scale-105 transition">
              <h3 className="text-xl sm:text-3xl font-bold mb-4 text-purple-700">
                Vision
              </h3>
              <p className="text-gray-700">
                To become India’s most trusted influencer marketing ecosystem,
                connecting brands and creators with transparency, innovation, and impact.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 🚀 EXPERIENCE SECTION (ONLY CARD UPGRADED — TIMELINE SAME) */}
      <section className="relative py-20 sm:py-32 bg-[#050816] text-white overflow-hidden">

        {/* glow background */}
<div className="absolute inset-0 overflow-hidden">

  {/* TOP LEFT GLOW */}
  <div
    className="
      absolute 
      top-10 sm:top-16 md:top-20
      left-1/2 sm:left-10
      -translate-x-1/2 sm:translate-x-0

      w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72
      bg-indigo-500/20
      blur-3xl
      rounded-full
    "
  />

  {/* BOTTOM RIGHT GLOW */}
  <div
    className="
      absolute 
      bottom-10 sm:bottom-16 md:bottom-20
      left-1/2 sm:left-auto sm:right-10
      -translate-x-1/2 sm:translate-x-0

      w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72
      bg-purple-500/20
      blur-3xl
      rounded-full
    "
  />

</div>

        {/* title */}
<div className="text-center mb-10 sm:mb-16 md:mb-20 px-4">
  
  <h2 className="
    text-2xl sm:text-3xl md:text-4xl lg:text-5xl
    font-bold text-black
    leading-tight
  ">
    Industry Experience
  </h2>

  <p className="
    text-sm sm:text-base md:text-lg
    text-gray-800 mt-2 sm:mt-3
  ">
    Our journey
  </p>

</div>

{/* container */}
<div className="
  relative 
  max-w-5xl 
  mx-auto 

  px-4 sm:px-6 md:px-6
">
          {/* vertical line (hidden on mobile) */}
<div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 opacity-40"></div>

<div className="space-y-10 sm:space-y-7">

  {/* ITEM 1 */}
  <div className="relative flex flex-col sm:flex-row sm:justify-start items-center">

    <div className="w-full sm:w-1/2 sm:pr-10">
      <div className="
        p-6 sm:p-8 rounded-2xl
        bg-white/5 backdrop-blur-xl
        border border-white/10
        shadow-lg
        transition-all duration-500
        hover:scale-105 sm:hover:scale-110
        hover:border-indigo-400
        hover:shadow-[0_0_25px_rgba(99,102,241,0.4)]
      ">
        <h3 className="text-2xl sm:text-4xl font-bold text-indigo-400">
          500+
        </h3>
        <p className="text-gray-300 mt-2 text-sm sm:text-base">
          Creators onboarded
        </p>
      </div>
    </div>

    <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-indigo-500 rounded-full shadow-[0_0_20px_#6366f1]"></div>
  </div>

  {/* ITEM 2 */}
  <div className="relative flex flex-col sm:flex-row sm:justify-end items-center">

    <div className="w-full sm:w-1/2 sm:pl-10">
      <div className="
        p-6 sm:p-8 rounded-2xl
        bg-white/5 backdrop-blur-xl
        border border-white/10
        shadow-lg
        transition-all duration-500
        hover:scale-105 sm:hover:scale-110
        hover:border-purple-400
        hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]
      ">
        <h3 className="text-2xl sm:text-4xl font-bold text-purple-400">
          100+
        </h3>
        <p className="text-gray-300 mt-2 text-sm sm:text-base">
          Successful campaigns
        </p>
      </div>
    </div>

    <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_20px_#a855f7]"></div>
  </div>

  {/* ITEM 3 */}
  <div className="relative flex flex-col sm:flex-row sm:justify-start items-center">

    <div className="w-full sm:w-1/2 sm:pr-10">
      <div className="
        p-6 sm:p-8 rounded-2xl
        bg-white/5 backdrop-blur-xl
        border border-white/10
        shadow-lg
        transition-all duration-500
        hover:scale-105 sm:hover:scale-110
        hover:border-pink-400
        hover:shadow-[0_0_25px_rgba(236,72,153,0.4)]
      ">
        <h3 className="text-2xl sm:text-4xl font-bold text-pink-400">
          50+
        </h3>
        <p className="text-gray-300 mt-2 text-sm sm:text-base">
          Trusted brands
        </p>
      </div>
    </div>

    <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-pink-500 rounded-full shadow-[0_0_20px_#ec4899]"></div>
  </div>

  {/* ITEM 4 */}
  <div className="relative flex flex-col sm:flex-row sm:justify-end items-center">

    <div className="w-full sm:w-1/2 sm:pl-10">
      <div className="
        p-6 sm:p-8 rounded-2xl
        bg-white/5 backdrop-blur-xl
        border border-white/10
        shadow-lg
        transition-all duration-500
        hover:scale-105 sm:hover:scale-110
        hover:border-cyan-400
        hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]
      ">
        <h3 className="text-2xl sm:text-4xl font-bold text-cyan-400">
          5M+
        </h3>
        <p className="text-gray-300 mt-2 text-sm sm:text-base">
          Audience reach
        </p>
      </div>
    </div>

    <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-cyan-500 rounded-full shadow-[0_0_20px_#22d3ee]"></div>
  </div>

</div>
</div>
      </section>
{/* 🌟 VALUES SECTION */}
<section className="relative py-10 sm:py-20 bg-[#050816] text-white overflow-hidden">

  {/* background glow (responsive) */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-10 left-1/2 sm:left-10 -translate-x-1/2 sm:translate-x-0 w-40 h-40 sm:w-72 sm:h-72 bg-fuchsia-600/40 blur-3xl rounded-full"></div>

    <div className="absolute bottom-10 right-1/2 sm:right-10 translate-x-1/2 sm:translate-x-0 w-40 h-40 sm:w-72 sm:h-72 bg-sky-600/40 blur-3xl rounded-full"></div>
  </div>

  {/* title */}
  <h2 className="text-2xl sm:text-4xl font-bold text-center mb-10 sm:mb-20">
    Our Values
  </h2>

  {/* ORBIT WRAPPER */}
  <div className="relative mx-auto w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px]">

    <div className="absolute inset-0 animate-spin-slow">

      {values.map((value, index) => {

        const neon = [
          "from-pink-500 via-rose-500 to-red-500",
          "from-cyan-400 via-sky-500 to-blue-600",
          "from-purple-500 via-indigo-500 to-blue-500",
          "from-emerald-400 via-green-500 to-teal-600",
          "from-yellow-400 via-orange-500 to-amber-600",
          "from-fuchsia-500 via-pink-600 to-purple-600"
        ];

        const angle = (index / values.length) * 360;

        // RESPONSIVE ORBIT DISTANCE
        const radius = window.innerWidth < 640 ? 90 : window.innerWidth < 1024 ? 130 : 160;

        return (
          <div
            key={index}
            className="absolute top-1/2 left-1/2"
            style={{
              transform: `
                translate(-50%, -50%)
                rotate(${angle}deg)
                translate(${radius}px)
              `
            }}
          >
            <div className={`
              w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48
              rounded-full flex items-center justify-center
              text-[10px] sm:text-sm md:text-base
              font-semibold text-black
              bg-gradient-to-br ${neon[index % neon.length]}
              transition-all duration-500
              hover:scale-110 sm:hover:scale-125
            `}>
              {value}
            </div>
          </div>
        );
      })}

    </div>
  </div>

  {/* animation */}
  <style>
    {`
      .animate-spin-slow {
        animation: spin 18s linear infinite;
      }

      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `}
  </style>

</section>
  {/* TEAM */}
<section className="py-16 sm:py-24 relative overflow-hidden bg-[#050816]">

  {/* neon background effects (responsive) */}
  <div className="absolute top-10 left-1/2 sm:left-10 -translate-x-1/2 sm:translate-x-0 w-40 h-40 sm:w-72 sm:h-72 bg-pink-500/20 blur-3xl rounded-full"></div>

  <div className="absolute bottom-10 right-1/2 sm:right-10 translate-x-1/2 sm:translate-x-0 w-40 h-40 sm:w-72 sm:h-72 bg-cyan-500/20 blur-3xl rounded-full"></div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

    {/* title */}
    <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center mb-10 sm:mb-16 text-black">
      Meet Our Team
    </h2>

    {/* grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">

      {teamMembers.map((member, index) => (
        <div
          key={index}
          className="
            relative p-6 sm:p-8 rounded-2xl text-center
            bg-white/5 backdrop-blur-xl
            border border-white/10
            transition-all duration-500
            hover:scale-105 hover:-translate-y-2
            hover:border-cyan-400
            group
          "
        >

          {/* glow layer */}
          <div className="
            absolute inset-0 rounded-2xl
            bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10
            opacity-0 group-hover:opacity-100
            transition duration-500
          "></div>

          {/* image */}
          <img
            src={member.image}
            className="
              w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32
              rounded-full mx-auto mb-4 sm:mb-5
              border-4 border-white/10
              group-hover:border-cyan-400
              transition
            "
          />

          {/* name */}
          <h3 className="
            text-lg sm:text-xl md:text-2xl
            font-bold text-black group-hover:text-cyan-300 transition
          ">
            {member.name}
          </h3>

          {/* role */}
          <p className="
            text-sm sm:text-base text-gray-800 mt-2
            group-hover:text-pink-500 transition
          ">
            {member.role}
          </p>

          {/* bottom glow line */}
          <div className="
            absolute bottom-0 left-0 w-0 h-[3px]
            bg-gradient-to-r from-cyan-400 to-pink-500
            group-hover:w-full transition-all duration-500
          "></div>

        </div>
      ))}

    </div>
  </div>
</section>

{/* TRUST */}
<section className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white py-14 sm:py-20">

  <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">

    <h2 className="
      text-2xl sm:text-4xl md:text-5xl
      font-bold mb-4 sm:mb-6 text-black
    ">
      People Trust People, Not Software
    </h2>

    <p className="
      text-sm sm:text-lg md:text-xl
      text-black
    ">
      We focus on authentic relationships that drive real business growth.
    </p>

  </div>

</section>

      <Footer />
    </>
  );
}

export default About;