import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Hook for immediately visible drop animation on page load
export const useImmediateDropAnimation = (
  startY: number = -200,
  duration: number = 1.5,
  delay: number = 0,
  ease: string = "elastic.out(1, 0.75)",
) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!elementRef.current) return;

    // Start element way above the screen
    gsap.set(elementRef.current, {
      y: startY,
      opacity: 0,
      scale: 0.8,
    });

    // Immediately drop into place
    gsap.to(elementRef.current, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: duration,
      ease: ease,
      delay: delay,
    });

    return () => {
      gsap.killTweensOf(elementRef.current);
    };
  }, [startY, duration, delay, ease]);

  return elementRef;
};

// Hook for scroll-triggered visible drop
export const useScrollVisibleDrop = (
  startY: number = -300,
  ease: string = "back.out(2)",
) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!elementRef.current) return;

    // Set initial state - start way above
    gsap.set(elementRef.current, {
      y: startY,
      opacity: 0,
      scale: 0.5,
    });

    // Create scroll trigger
    ScrollTrigger.create({
      trigger: elementRef.current,
      start: "top 95%", // Start early so it's visible
      onEnter: () => {
        gsap.to(elementRef.current, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: ease,
        });
      },
      onLeave: () => {
        gsap.to(elementRef.current, {
          y: startY,
          opacity: 0,
          scale: 0.5,
          duration: 0.6,
          ease: "power2.in",
        });
      },
      onEnterBack: () => {
        gsap.to(elementRef.current, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: ease,
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [startY, ease]);

  return elementRef;
};

// Hook for multiple items dropping in sequence (like bottles)
export const useBottleDropSequence = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.children;

    // Set all items way above screen initially
    gsap.set(items, {
      y: -400,
      opacity: 0,
      scale: 0.3,
      rotation: () => gsap.utils.random(-180, 180),
    });

    // Drop each item with staggered timing
    gsap.to(items, {
      y: 0,
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 1.5,
      ease: "bounce.out",
      stagger: {
        each: 0.2,
        from: "start",
      },
      delay: 0.5,
    });

    return () => {
      gsap.killTweensOf(items);
    };
  }, []);

  return containerRef;
};

// Hook for product cards with visible physics
export const useProductPhysicsDrop = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".product-card");

    cards.forEach((card, index) => {
      // Start each card way above with random horizontal offset
      const startY = -500 - index * 50;
      const startX = gsap.utils.random(-100, 100);

      gsap.set(card, {
        y: startY,
        x: startX,
        opacity: 0,
        scale: 0.2,
        rotation: gsap.utils.random(-360, 360),
      });

      // Create scroll trigger for this card
      ScrollTrigger.create({
        trigger: card,
        start: "top 100%",
        onEnter: () => {
          // Drop animation with physics
          gsap.to(card, {
            y: 0,
            x: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 2,
            ease: "elastic.out(1, 0.5)",
            delay: index * 0.1,
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return gridRef;
};

// Hook for hero elements dropping dramatically
export const useHeroDramaticDrop = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!heroRef.current) return;

    const title = heroRef.current.querySelector(".hero-title");
    const subtitle = heroRef.current.querySelector(".hero-subtitle");
    const cta = heroRef.current.querySelector(".hero-cta");
    const stats = heroRef.current.querySelector(".hero-stats");
    const image = heroRef.current.querySelector(".hero-image");

    // Title drops first with big impact
    if (title) {
      gsap.set(title, { y: -600, opacity: 0, scale: 0.3 });
      gsap.to(title, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: "bounce.out",
        delay: 0.5,
      });
    }

    // Subtitle drops second
    if (subtitle) {
      gsap.set(subtitle, { y: -400, opacity: 0, scale: 0.5 });
      gsap.to(subtitle, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "back.out(2)",
        delay: 1,
      });
    }

    // CTA buttons drop third
    if (cta) {
      gsap.set(cta, { y: -300, opacity: 0, scale: 0.7 });
      gsap.to(cta, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "elastic.out(1, 0.75)",
        delay: 1.5,
      });
    }

    // Stats drop last
    if (stats) {
      const statItems = stats.children;
      gsap.set(statItems, { y: -200, opacity: 0, scale: 0.5 });
      gsap.to(statItems, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
        stagger: 0.1,
        delay: 2,
      });
    }

    // Image drops with rotation
    if (image) {
      gsap.set(image, { y: -500, opacity: 0, scale: 0.2, rotation: 180 });
      gsap.to(image, {
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 2.5,
        ease: "elastic.out(1, 0.3)",
        delay: 0.8,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf([title, subtitle, cta, stats, image]);
    };
  }, []);

  return heroRef;
};

// Debug function disabled for production
export const showAnimationDebug = () => {
  // Debug removed for clean UI
};

export default useImmediateDropAnimation;
