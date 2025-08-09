import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Hook for scroll-controlled drop animations
export const useScrollDrop = (
  startY: number = -200, // How far above to start
  endY: number = 0, // Final position
  triggerStart: string = "top 80%", // When to start animation
  triggerEnd: string = "top 30%", // When to end animation
  ease: string = "back.out(1.7)", // Easing function
) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    // Set initial position above final location
    gsap.set(element, {
      y: startY,
      opacity: 0,
    });

    // Create scroll-triggered animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start: triggerStart,
      end: triggerEnd,
      scrub: 1, // Smooth scrubbing, takes 1 second to "catch up"
      onUpdate: (self) => {
        const progress = self.progress;

        // Animate from startY to endY based on scroll progress
        const currentY = startY + (endY - startY) * progress;
        const currentOpacity = progress;

        gsap.set(element, {
          y: currentY,
          opacity: currentOpacity,
        });
      },
      onComplete: () => {
        // Ensure element is exactly at final position
        gsap.to(element, {
          y: endY,
          opacity: 1,
          duration: 0.3,
          ease: ease,
        });
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [startY, endY, triggerStart, triggerEnd, ease]);

  return elementRef;
};

// Hook for multiple elements dropping in sequence
export const useScrollDropSequence = (
  elements: Array<{
    startY?: number;
    endY?: number;
    delay?: number;
    triggerStart?: string;
    triggerEnd?: string;
  }> = [],
) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const children = Array.from(container.children);

    // Set up animations for each child element
    const scrollTriggers: ScrollTrigger[] = [];

    children.forEach((child, index) => {
      const config = elements[index] || {};
      const {
        startY = -150,
        endY = 0,
        delay = index * 0.1,
        triggerStart = "top 80%",
        triggerEnd = "top 20%",
      } = config;

      // Set initial position
      gsap.set(child, {
        y: startY,
        opacity: 0,
      });

      // Create scroll trigger for this element
      const st = ScrollTrigger.create({
        trigger: child,
        start: triggerStart,
        end: triggerEnd,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const currentY = startY + (endY - startY) * progress;
          const currentOpacity = progress;

          gsap.set(child, {
            y: currentY,
            opacity: currentOpacity,
          });
        },
        onComplete: () => {
          gsap.to(child, {
            y: endY,
            opacity: 1,
            duration: 0.3,
            ease: "back.out(1.7)",
            delay: delay,
          });
        },
      });

      scrollTriggers.push(st);
    });

    return () => {
      scrollTriggers.forEach((st) => st.kill());
    };
  }, [elements]);

  return containerRef;
};

// Hook for product cards dropping from above
export const useProductDropAnimation = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".product-card");

    cards.forEach((card, index) => {
      // Each card starts higher up
      const startY = -200 - (index % 4) * 50; // Stagger the start positions

      gsap.set(card, {
        y: startY,
        opacity: 0,
        scale: 0.8,
      });

      ScrollTrigger.create({
        trigger: card,
        start: "top 90%",
        end: "top 30%",
        scrub: 1.5, // Slower scrub for more control
        onUpdate: (self) => {
          const progress = self.progress;

          // Calculate current position
          const currentY = startY + (0 - startY) * progress;
          const currentOpacity = progress;
          const currentScale = 0.8 + 0.2 * progress;

          gsap.set(card, {
            y: currentY,
            opacity: currentOpacity,
            scale: currentScale,
          });
        },
        onComplete: () => {
          // Final settling animation
          gsap.to(card, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.75)",
            delay: index * 0.05,
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

// Hook for hero elements dropping in
export const useHeroDropAnimation = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!heroRef.current) return;

    const title = heroRef.current.querySelector(".hero-title");
    const subtitle = heroRef.current.querySelector(".hero-subtitle");
    const cta = heroRef.current.querySelector(".hero-cta");
    const stats = heroRef.current.querySelector(".hero-stats");

    // Set initial positions
    if (title) {
      gsap.set(title, { y: -300, opacity: 0 });
      ScrollTrigger.create({
        trigger: title,
        start: "top 80%",
        end: "top 40%",
        scrub: 2,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(title, {
            y: -300 + 300 * progress,
            opacity: progress,
          });
        },
        onComplete: () => {
          gsap.to(title, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "bounce.out",
          });
        },
      });
    }

    if (subtitle) {
      gsap.set(subtitle, { y: -200, opacity: 0 });
      ScrollTrigger.create({
        trigger: subtitle,
        start: "top 75%",
        end: "top 35%",
        scrub: 1.5,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(subtitle, {
            y: -200 + 200 * progress,
            opacity: progress,
          });
        },
        onComplete: () => {
          gsap.to(subtitle, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            delay: 0.2,
          });
        },
      });
    }

    if (cta) {
      gsap.set(cta, { y: -150, opacity: 0 });
      ScrollTrigger.create({
        trigger: cta,
        start: "top 70%",
        end: "top 30%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(cta, {
            y: -150 + 150 * progress,
            opacity: progress,
          });
        },
        onComplete: () => {
          gsap.to(cta, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(2)",
            delay: 0.4,
          });
        },
      });
    }

    if (stats) {
      gsap.set(stats, { y: -100, opacity: 0 });
      ScrollTrigger.create({
        trigger: stats,
        start: "top 65%",
        end: "top 25%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(stats, {
            y: -100 + 100 * progress,
            opacity: progress,
          });
        },
        onComplete: () => {
          gsap.to(stats, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(1.5)",
            delay: 0.6,
          });
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return heroRef;
};

// Hook for floating image with physics
export const useFloatingImageDrop = (imageSrc: string) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Create floating image element
    const img = document.createElement("img");
    img.src = imageSrc;
    img.className =
      "floating-product absolute w-32 h-32 object-cover rounded-xl shadow-2xl";
    img.style.zIndex = "10";

    container.appendChild(img);

    // Start way above viewport
    gsap.set(img, {
      y: -400,
      x: Math.random() * 200 - 100, // Random horizontal position
      opacity: 0,
      scale: 0.5,
      rotation: Math.random() * 360,
    });

    // Create scroll-based drop animation
    ScrollTrigger.create({
      trigger: container,
      start: "top 100%",
      end: "bottom top",
      scrub: 3, // Slower for more realistic physics
      onUpdate: (self) => {
        const progress = self.progress;

        // Simulate gravity and settle
        const currentY = -400 + 400 * progress;
        const currentOpacity = progress;
        const currentScale = 0.5 + 0.5 * progress;

        // Add some rotation as it falls
        const currentRotation = Math.random() * 360 * progress;

        gsap.set(img, {
          y: currentY,
          opacity: currentOpacity,
          scale: currentScale,
          rotation: currentRotation,
        });
      },
      onComplete: () => {
        // Final settling with elastic bounce
        gsap.to(img, {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (img.parentNode) {
        img.parentNode.removeChild(img);
      }
    };
  }, [imageSrc]);

  return containerRef;
};

export default useScrollDrop;
