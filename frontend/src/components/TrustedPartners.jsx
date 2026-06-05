const brands = [
  {
    name: "GlowBerry",
    image: "/brands/glowberry.jpg",
    industry: "Beauty & Skincare",
    reach: "1.2M+ Reach",
    rating: "4.9",
  },
  {
    name: "FitFuel",
    image: "/brands/fitfuel.jpg",
    industry: "Fitness",
    reach: "950K+ Reach",
    rating: "4.8",
  },
  {
    name: "TechVerse",
    image: "/brands/techverse.jpg",
    industry: "Technology",
    reach: "2M+ Reach",
    rating: "5.0",
  },
  {
    name: "StyleHub",
    image: "/brands/stylehub.jpg",
    industry: "Fashion",
    reach: "1.5M+ Reach",
    rating: "4.7",
  },
];

export default function TrustedPartners() {
  return (
    <section className="py-20 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center mb-16 animated-heading ">
          Trusted Partner For Growing Brands
        </h2>

        <div className="overflow-hidden">

          <div className="animate-brand-scroll gap-8">

            {[...brands, ...brands, ...brands].map((brand, index) => (

              <div
                key={index}
                className="group perspective flex-shrink-0 w-72 neon-card"
              >

                <div className="relative h-80 w-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">

                  {/* FRONT */}

                  <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden card-front">

                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/30"></div>

                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md p-4">

                      <h3 className="text-white text-xl font-bold text-center">
                        {brand.name}
                      </h3>

                    </div>

                  </div>

                  {/* BACK */}

                  <div className="absolute inset-0 rotate-y-180 backface-hidden rounded-2xl card-back text-white flex flex-col justify-center items-center p-6">

                    <h3 className="text-3xl font-bold mb-4 neon-title">
                      {brand.name}
                    </h3>

                    <p className="text-lg mb-2">
                      {brand.industry}
                    </p>

                    <p className="mb-3">
                      📈 {brand.reach}
                    </p>

                    <p className="neon-rating text-xl font-bold">
                      ⭐ {brand.rating}
                    </p>

                    

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>
    </section>
  );
}