import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Custom hook for GSAP animations
export const useGSAP = (
  callback: () => void,
  dependencies: any[] = []
) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      callback();
    }, containerRef);

    return () => ctx.revert();
  }, dependencies);

  return containerRef;
};

// Hero text reveal animation
export const useHeroTextReveal = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      const words = textRef.current?.querySelectorAll('.word');
      
      gsap.set(words, { 
        opacity: 0, 
        y: 100,
        rotationX: -90,
        transformOrigin: '50% 50% -50px'
      });

      gsap.to(words, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        delay: 0.5
      });
    }, textRef);

    return () => ctx.revert();
  }, []);

  return textRef;
};

// Scroll-triggered fade in animation
export const useScrollFadeIn = (threshold = 0.1) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(elementRef.current, 
        {
          opacity: 0,
          y: 60,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: elementRef.current,
            start: `top ${100 - threshold * 100}%`,
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, elementRef);

    return () => ctx.revert();
  }, [threshold]);

  return elementRef;
};

// Parallax effect hook
export const useParallax = (speed = 0.5) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(elementRef.current, {
        yPercent: -50 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }, elementRef);

    return () => ctx.revert();
  }, [speed]);

  return elementRef;
};

// Counter animation hook
export const useCounterAnimation = (endValue: number, duration = 2) => {
  const counterRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!counterRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(counterRef.current, 
        { textContent: 0 },
        {
          textContent: endValue,
          duration,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: counterRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, counterRef);

    return () => ctx.revert();
  }, [endValue, duration]);

  return counterRef;
};

// Stagger animation for cards/items
export const useStaggerAnimation = (staggerDelay = 0.1) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = containerRef.current?.children;
      
      gsap.fromTo(items, 
        {
          opacity: 0,
          y: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: staggerDelay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [staggerDelay]);

  return containerRef;
};

// Magnetic button effect
export const useMagneticEffect = (strength = 0.3) => {
  const elementRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = element.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) * strength;
      const y = (e.clientY - top - height / 2) * strength;
      
      gsap.to(element, {
        x,
        y,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return elementRef;
};

// Page transition hook
export const usePageTransition = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  const animateIn = () => {
    if (!pageRef.current) return;

    gsap.fromTo(pageRef.current,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      }
    );
  };

  const animateOut = () => {
    if (!pageRef.current) return;

    return gsap.to(pageRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.4,
      ease: 'power2.in'
    });
  };

  return { pageRef, animateIn, animateOut };
};

// Scroll progress indicator
export const useScrollProgress = () => {
  const progressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!progressRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(progressRef.current, {
        scaleX: 1,
        transformOrigin: 'left center',
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true
        }
      });
    }, progressRef);

    return () => ctx.revert();
  }, []);

  return progressRef;
};

export default useGSAP;
