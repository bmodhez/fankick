import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ParallaxHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const background = backgroundRef.current;
    const content = contentRef.current;
    const overlay = overlayRef.current;

    if (!hero || !background || !content || !overlay) return;

    // Parallax background effect
    gsap.to(background, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Content fade and move effect
    gsap.fromTo(content,
      {
        y: 100,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 2,
        ease: "power3.out",
        delay: 0.5
      }
    );

    // Overlay animation
    gsap.fromTo(overlay,
      {
        opacity: 0.3
      },
      {
        opacity: 0.6,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );

    // Floating animation for title
    gsap.to(".floating-title", {
      y: -20,
      duration: 3,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true
    });

  }, []);

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden">
      {/* Parallax Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 w-full h-[120%] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/4014731/pexels-photo-4014731.jpeg?auto=compress&cs=tinysrgb&w=6000&h=4000')`
        }}
      />
      
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"
      />
      
      {/* Content */}
      <div ref={contentRef} className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-4xl px-4">
          <h1 className="floating-title text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Experience
          </h1>
          <h2 className="text-4xl md:text-6xl font-light mb-8 opacity-90">
            The Future
          </h2>
          <p className="text-xl md:text-2xl mb-12 opacity-80 max-w-2xl mx-auto">
            Immerse yourself in a world where technology meets nature, 
            where innovation creates beauty.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            Explore Now
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white opacity-60">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full animate-bounce mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
