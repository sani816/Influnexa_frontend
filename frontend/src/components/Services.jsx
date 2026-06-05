const services = [
  {
    title: "Influencer Marketing",
    video: "/services/influencer.mp4",
  },
  {
    title: "Instagram Campaigns",
    video: "/services/instagram.mp4",
  },
  {
    title: "YouTube Promotions",
    video: "/services/youtube.mp4",
  },
  {
    title: "Celebrity Endorsements",
    video: "/services/celebrity.mp4",
  },
  {
    title: "Product Reviews",
    video: "/services/review.mp4",
  },
  {
    title: "Brand Shoots with Live Video",
    video: "/services/shoot.mp4",
  },
  {
    title: "Creator Management",
    video: "/services/creator.mp4",
  },
 
  {
    title: "Influencer Outreach",
    video: "/services/outreach.mp4",
  },
  {
    title: "UGC Content Creation",
    video: "/services/ugc.mp4",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center mb-16 animated-heading ">
          Our Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {services.map((service, index) => (
            <div
              key={index}
              className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer"
            >

              {/* Video Background */}
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
              >
                <source src={service.video} type="video/mp4" />
              </video>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition duration-500"></div>

              {/* Neon Border */}
              <div className="absolute inset-0 rounded-3xl border border-white/20 group-hover:border-cyan-400 group-hover:shadow-[0_0_30px_#00ffff] transition-all duration-500"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">

                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition">
                  {service.title}
                </h3>

                <p className="mt-4 text-gray-300 opacity-0 group-hover:opacity-100 transition duration-500">
                  Professional campaigns designed to maximize brand visibility,
                  engagement and ROI.
                </p>

              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}