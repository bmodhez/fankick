import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ParallaxNavigation } from "@/components/ParallaxNavigation";
import { ParallaxHero } from "@/components/ParallaxHero";
import { ParallaxSection } from "@/components/ParallaxSection";
import { ParallaxGallery } from "@/components/ParallaxGallery";
import { ParallaxStats } from "@/components/ParallaxStats";
import { PageTransition, LoadingScreen } from "@/components/PageTransition";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function ParallaxSite() {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Show loading screen for better UX
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 2000);

    // Smooth scrolling configuration
    gsap.config({
      force3D: true,
      nullTargetWarn: false,
    });

    // Create a smooth scroll experience
    let scrollTween: gsap.core.Tween;

    ScrollTrigger.normalizeScroll(true);
    ScrollTrigger.config({ ignoreMobileResize: true });

    return () => {
      clearTimeout(timer);
      if (scrollTween) scrollTween.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  if (showLoading) {
    return <LoadingScreen />;
  }

  return (
    <PageTransition>
      <div className="bg-black min-h-screen">
        {/* Navigation */}
        <ParallaxNavigation />

        {/* Hero Section */}
        <div id="hero">
          <ParallaxHero />
        </div>

        {/* Experience Section */}
        <div id="experience">
          <ParallaxSection
            backgroundImage="https://images.pexels.com/photos/2127038/pexels-photo-2127038.jpeg?auto=compress&cs=tinysrgb&w=4800&h=3200"
            title="Racing"
            subtitle="Performance & Precision"
            description="Experience the thrill of high-performance engineering where every millisecond matters. Our cutting-edge technology pushes the boundaries of what's possible, delivering unmatched speed and precision in every detail."
          >
            <div className="flex gap-4">
              <button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                Start Racing
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-full font-semibold transition-all duration-300">
                Learn More
              </button>
            </div>
          </ParallaxSection>
        </div>

        {/* Stats Section */}
        <ParallaxStats />

        {/* Gallery Section */}
        <div id="gallery">
          <ParallaxGallery />
        </div>

        {/* Innovation Section */}
        <div id="innovation">
          <ParallaxSection
            backgroundImage="https://images.pexels.com/photos/9072202/pexels-photo-9072202.jpeg?auto=compress&cs=tinysrgb&w=5890&h=3927"
            title="Gaming"
            subtitle="Immersive Experiences"
            description="Step into worlds beyond imagination where technology creates endless possibilities. Our gaming environments blend reality with digital artistry, providing experiences that captivate and inspire."
            reverse={true}
          >
            <div className="flex gap-4">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                Enter Game
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-full font-semibold transition-all duration-300">
                View Gallery
              </button>
            </div>
          </ParallaxSection>
        </div>

        {/* Final Section */}
        <ParallaxSection
          backgroundImage="https://images.pexels.com/photos/33337565/pexels-photo-33337565.jpeg?auto=compress&cs=tinysrgb&w=6000&h=4000"
          title="Serenity"
          subtitle="Digital Wellness"
          description="Find balance in the digital age. Our peaceful environments provide a sanctuary where technology enhances tranquility, creating spaces for reflection and renewal in an increasingly connected world."
        >
          <div className="flex gap-4">
            <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
              Find Peace
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-full font-semibold transition-all duration-300">
              Explore More
            </button>
          </div>
        </ParallaxSection>

        {/* Contact Section */}
        <div
          id="contact"
          className="py-32 bg-gradient-to-b from-black to-gray-900"
        >
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Ready to Begin?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join thousands who have already transformed their digital
              experience. The future is waiting for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                Start Your Journey
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-black px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
