function WhyChooseUs() {
  return (
    <section className="py-24 relative z-10 ">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-black mb-16">
          Why Choose InfluNexa
        </h2>

        <div
          className="
            card-glass
            rounded-3xl
            p-10
            md:p-16
            flex
            flex-col
            lg:flex-row
            items-center
            gap-12
            border
            border-white/20
            hover:border-b-blue-500
            hover:shadow-[0_0_40px_rgba(217,70,239,0.7)]
            transition-all
            duration-500
          "
        >

          {/* Logo Section */}

          <div className="flex-shrink-0">

            <div
              className="
                w-60
                h-60
                rounded-full
                overflow-hidden
                shadow-[0_0_40px_rgba(217,70,239,0.8)]
                hover:scale-105
                hover:shadow-blue-500
                transition
                duration-500
              "
            >
              <img
                src="/logo/influnexa-logo.png"
                alt="InfluNexa"
                className="w-full h-full object-cover"
              />
            </div>

          </div>

          {/* Story Section */}

          <div>

            <h3 className="text-4xl font-bold text-black mb-6">
              India's Trusted Influencer Marketing Partner
            </h3>

            <p className="text-white text-lg leading-9 mb-6">
              At InfluNexa, we believe influencer marketing is much more than
              simply connecting brands with creators. It is about building
              authentic relationships, creating impactful stories, and helping
              businesses reach the right audience at the right time.
            </p>

            <p className="text-white text-lg leading-9 mb-6">
              Our platform combines data-driven strategies, verified creators,
              creative campaign planning, and dedicated campaign management to
              deliver measurable business results. Whether you are a startup,
              D2C brand, e-commerce business, or enterprise company, we help
              you discover influencers who genuinely connect with your target
              audience.
            </p>

            <p className="text-white text-lg leading-9 mb-6">
              With a growing network of creators across Instagram, YouTube,
              Facebook, and emerging platforms, we ensure every collaboration
              drives awareness, engagement, trust, and conversions. From
              influencer discovery and negotiation to content approvals,
              campaign execution, and detailed reporting, our team manages the
              entire process seamlessly.
            </p>

            <p className="text-white text-lg leading-9">
              Brands choose InfluNexa because we focus on transparency,
              innovation, creativity, and long-term success. Our mission is to
              empower brands and creators to grow together through meaningful
              collaborations that generate real business impact.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default WhyChooseUs;