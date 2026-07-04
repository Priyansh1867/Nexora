import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import Stats from "../components/landing/Stats";
import HowItWorks from "../components/landing/HowItWorks";
import Testimonials from "../components/landing/Testimonials";
import FAQ from "../components/landing/FAQ";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <Hero />

      <Features />
      <Stats />

      <HowItWorks />

      <Testimonials />

      <FAQ />

      <CTA />

      <Footer />
    </div>
  );
}

export default Landing;