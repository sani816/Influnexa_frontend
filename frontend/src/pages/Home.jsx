import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustedPartners from "../components/TrustedPartners";
import ServicesSection from "../components/Services";
import Categories from "../components/InfluencerCategories";
// import FeaturedCreators from "./FeaturedCreators";
// import WhyChooseUs from "../components/WhyChooseUs";
import CaseStudies from "../components/CaseStudies";
import Testimonials from "../components/Testimonials";
import HowItWorks from "../components/HowItWorks";
import FAQ from "../components/FAQ";
// import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

import ReelsBackground from "../components/ReelsBackground";

function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">

      {/* Video Background */}
      <ReelsBackground />

      {/* Website Content */}
      <div className="relative z-20 text-white">
        <Navbar />
        <Hero />
        <TrustedPartners />
        <ServicesSection />
        <Categories />
        {/* <FeaturedCreators /> */}
        {/* <WhyChooseUs /> */}
        <CaseStudies />
        <Testimonials />
        <HowItWorks />
        <FAQ />
        {/* <ContactForm /> */}
        <Footer />
      </div>

    </div>
  );
}

export default Home;