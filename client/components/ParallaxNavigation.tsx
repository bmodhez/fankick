import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ParallaxNavigation() {
  const navRef = useRef<HTMLNavElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Initial animation
    gsap.fromTo(
      nav,
      {
        y: -100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
      },
    );

    // Scroll-based background change
    ScrollTrigger.create({
      start: "top -80",
      end: "bottom bottom",
      onUpdate: (self) => {
        setIsScrolled(self.progress > 0);
      },
    });

    // Smooth scroll to sections
    const links = nav.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = link.getAttribute("href");
        if (href) {
          const target = document.querySelector(href);
          if (target) {
            gsap.to(window, {
              duration: 1.5,
              scrollTo: { y: target, offsetY: 80 },
              ease: "power2.inOut",
            });
          }
        }
      });
    });
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-lg border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              PARALLAX
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#hero"
                className="text-white hover:text-blue-300 transition-colors duration-300 text-sm font-medium"
              >
                Home
              </a>
              <a
                href="#experience"
                className="text-white hover:text-blue-300 transition-colors duration-300 text-sm font-medium"
              >
                Experience
              </a>
              <a
                href="#gallery"
                className="text-white hover:text-blue-300 transition-colors duration-300 text-sm font-medium"
              >
                Gallery
              </a>
              <a
                href="#innovation"
                className="text-white hover:text-blue-300 transition-colors duration-300 text-sm font-medium"
              >
                Innovation
              </a>
              <a
                href="#contact"
                className="text-white hover:text-blue-300 transition-colors duration-300 text-sm font-medium"
              >
                Contact
              </a>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white hover:text-blue-300 transition-colors duration-300">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
