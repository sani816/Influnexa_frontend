function CaseStudies() {
  const studies = [
    {
      title: "Fashion Brand Campaign",
      influencers: 20,
      reach: "1.2M",
      engagement: "50K",
      roi: "3.8X",
      likes: "20K",
      color: "from-pink-500 to-purple-500",
    },
    {
      title: "Beauty Product Launch",
      influencers: 15,
      reach: "850K",
      engagement: "35K",
      roi: "3.2X",
      likes: "14K",
      color: "from-orange-400 to-red-500",
    },
    {
      title: "Tech Gadget Promotion",
      influencers: 25,
      reach: "2.1M",
      engagement: "90K",
      roi: "5.1X",
      likes: "40K",
      color: "from-cyan-400 to-blue-600",
    },
  ];

  return (
    <section className="py-24 text-white relative z-10">

      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-5xl font-bold text-center mb-16 animated-heading ">
          Case Studies
        </h2>

        {/* Timeline Layout */}
        <div className="relative border-l-2 border-white/10 pl-10 space-y-14">

          {studies.map((study, index) => (
            <div key={index} className="relative group">

              {/* Pulse Dot */}
              <div className="absolute -left-[18px] top-2 w-4 h-4 rounded-full bg-white animate-ping group-hover:scale-150 transition" />
              <div className="absolute -left-[18px] top-2 w-4 h-4 rounded-full bg-white" />

              {/* Card */}
              <div className="
                relative bg-black/30 backdrop-blur-xl
                border border-white/10 rounded-2xl p-8
                transition-all duration-500

                group-hover:scale-[1.03]
                group-hover:-translate-y-2
                group-hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]
              ">

                {/* Glow Background */}
                <div className={`
                  absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition
                  bg-gradient-to-r ${study.color} blur-2xl
                `}></div>

                {/* TITLE (FIXED - NO HOVER EFFECT) */}
                <h3 className="text-2xl font-bold mb-4 relative z-10 text-white">
                  {study.title}

                  {/* subtle underline hover (optional but clean) */}
                  <span className="block h-[2px] w-0 group-hover:w-24 transition-all duration-500 bg-white/50 mt-2"></span>
                </h3>

                {/* Stats */}
                <div className="grid md:grid-cols-5 gap-4 text-sm text-gray-300 relative z-10">

                  <div className="group-hover:translate-y-[-2px] transition">
                    👥 <span className="text-white">{study.influencers}</span>
                    <p className="text-xs">Influencers</p>
                  </div>

                  <div className="group-hover:translate-y-[-2px] transition">
                    📈 <span className="text-white">{study.reach}</span>
                    <p className="text-xs">Reach</p>
                  </div>

                  <div className="group-hover:translate-y-[-2px] transition">
                    ❤️ <span className="text-white">{study.engagement}</span>
                    <p className="text-xs">Engagement</p>
                  </div>

                  <div className="group-hover:translate-y-[-2px] transition">
                    💰 <span className="text-white">{study.roi}</span>
                    <p className="text-xs">ROI</p>
                  </div>

                  <div className="group-hover:translate-y-[-2px] transition">
                    🔥 <span className="text-white">{study.likes}</span>
                    <p className="text-xs">Likes</p>
                  </div>

                </div>

                {/* Bottom glow line */}
                <div className="
                  mt-6 h-[2px] w-0
                  group-hover:w-full
                  transition-all duration-700
                  bg-gradient-to-r from-transparent via-white/70 to-transparent
                "></div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default CaseStudies;