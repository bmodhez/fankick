import { useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Hook to handle responsive animations
export const useResponsiveGSAP = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Set up responsive animations based on screen size
      const mm = gsap.matchMedia();

      // Desktop animations (1024px and up)
      mm.add("(min-width: 1024px)", () => {
        // Enhanced animations for desktop
        gsap.set(".desktop-enhanced", {
          y: 100,
          opacity: 0,
          scale: 0.9,
        });

        gsap.to(".desktop-enhanced", {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".desktop-enhanced",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        // Parallax effects for desktop
        gsap.to(".parallax-desktop", {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: ".parallax-desktop",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Tablet animations (768px to 1023px)
      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        // Moderate animations for tablet
        gsap.set(".tablet-optimized", {
          y: 60,
          opacity: 0,
        });

        gsap.to(".tablet-optimized", {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".tablet-optimized",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        // Reduced parallax for tablet
        gsap.to(".parallax-tablet", {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: ".parallax-tablet",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Mobile animations (under 768px)
      mm.add("(max-width: 767px)", () => {
        // Simplified animations for mobile
        gsap.set(".mobile-optimized", {
          y: 30,
          opacity: 0,
        });

        gsap.to(".mobile-optimized", {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".mobile-optimized",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });

        // No parallax on mobile for better performance
        gsap.set(".no-parallax-mobile", {
          transform: "none",
        });
      });

      return mm;
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
};

// Hook for mobile-first hero animations
export const useMobileHeroAnimation = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Mobile hero (under 768px)
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline();

        // Simpler hero animations for mobile
        tl.fromTo(
          ".mobile-hero-title",
          {
            opacity: 0,
            y: 50,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
          },
        );

        tl.fromTo(
          ".mobile-hero-subtitle",
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4",
        );

        tl.fromTo(
          ".mobile-hero-cta",
          {
            opacity: 0,
            y: 20,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          "-=0.2",
        );
      });

      // Tablet hero (768px to 1023px)
      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        const tl = gsap.timeline();

        tl.fromTo(
          ".tablet-hero-title",
          {
            opacity: 0,
            y: 80,
            rotationX: -45,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1,
            ease: "power3.out",
          },
        );

        tl.fromTo(
          ".tablet-hero-elements",
          {
            opacity: 0,
            y: 40,
            stagger: 0.1,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.5",
        );
      });

      // Desktop hero (1024px and up)
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline();

        // Full desktop hero animations
        tl.fromTo(
          ".desktop-hero-title",
          {
            opacity: 0,
            y: 100,
            rotationX: -90,
            transformOrigin: "50% 50% -50px",
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1.2,
            ease: "power3.out",
          },
        );

        tl.fromTo(
          ".desktop-hero-elements",
          {
            opacity: 0,
            y: 60,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.7)",
          },
          "-=0.6",
        );

        // Background animations
        tl.to(
          ".desktop-bg-elements",
          {
            rotation: 360,
            duration: 20,
            ease: "none",
            repeat: -1,
          },
          0,
        );
      });

      return mm;
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return heroRef;
};

// Hook for responsive card animations
export const useResponsiveCardAnimation = () => {
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!cardsRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Mobile cards (under 768px)
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          ".mobile-card",
          {
            opacity: 0,
            y: 30,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".mobile-card",
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // Simplified hover effects for mobile
        gsap.set(".mobile-card", {
          scale: 1,
        });

        // Touch-friendly interactions
        const cards = gsap.utils.toArray(".mobile-card");
        cards.forEach((card: any) => {
          card.addEventListener("touchstart", () => {
            gsap.to(card, {
              scale: 0.98,
              duration: 0.2,
              ease: "power2.out",
            });
          });

          card.addEventListener("touchend", () => {
            gsap.to(card, {
              scale: 1,
              duration: 0.3,
              ease: "elastic.out(1, 0.3)",
            });
          });
        });
      });

      // Tablet cards (768px to 1023px)
      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        gsap.fromTo(
          ".tablet-card",
          {
            opacity: 0,
            y: 50,
            rotationY: -20,
          },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".tablet-card",
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Desktop cards (1024px and up)
      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(
          ".desktop-card",
          {
            opacity: 0,
            y: 80,
            rotationX: -45,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".desktop-card",
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      return mm;
    }, cardsRef);

    return () => ctx.revert();
  }, []);

  return cardsRef;
};

// Hook for performance optimization on mobile
export const useMobilePerformanceOptimization = () => {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // Reduce animation quality on mobile for better performance
      gsap.config({
        force3D: true,
        nullTargetWarn: false,
      });

      // Disable complex animations on mobile
      ScrollTrigger.config({
        limitCallbacks: true,
        ignoreMobileResize: true,
      });

      // Optimize scroll triggers for mobile
      ScrollTrigger.refresh();
    }

    return () => {
      // Cleanup
    };
  }, []);
};

// Hook for touch gestures
export const useTouchGestures = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      isDragging = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;

      currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;

      // Apply subtle transform based on gesture
      gsap.to(element, {
        y: deltaY * 0.3,
        rotation: deltaY * 0.05,
        duration: 0.1,
        ease: "none",
      });
    };

    const handleTouchEnd = () => {
      isDragging = false;

      // Spring back to original position
      gsap.to(element, {
        y: 0,
        rotation: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    };

    element.addEventListener("touchstart", handleTouchStart, { passive: true });
    element.addEventListener("touchmove", handleTouchMove, { passive: true });
    element.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return elementRef;
};

export default useResponsiveGSAP;
