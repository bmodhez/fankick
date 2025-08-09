import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Enhanced parallax hook for background images
export function useParallaxBackground(speed: number = 0.5) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const parallaxTween = gsap.to(element, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      parallaxTween.kill();
    };
  }, [speed]);

  return elementRef;
}

// Multi-layer parallax effect
export function useMultiLayerParallax(layers: Array<{ speed: number; selector: string }>) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const tweens = layers.map(({ speed, selector }) => {
      const elements = container.querySelectorAll(selector);
      
      return gsap.to(elements, {
        yPercent: -100 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    return () => {
      tweens.forEach(tween => tween.kill());
    };
  }, [layers]);

  return containerRef;
}

// Parallax with rotation and scale effects
export function useAdvancedParallax(config: {
  yPercent?: number;
  rotation?: number;
  scale?: number;
  opacity?: number;
}) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const {
      yPercent = -30,
      rotation = 0,
      scale = 1,
      opacity = 1
    } = config;

    const parallaxTween = gsap.to(element, {
      yPercent,
      rotation,
      scale,
      opacity,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

    return () => {
      parallaxTween.kill();
    };
  }, [config]);

  return elementRef;
}

// Smooth reveal parallax for content
export function useParallaxReveal(direction: 'up' | 'down' | 'left' | 'right' = 'up') {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let fromProps: any = { opacity: 0 };
    let toProps: any = { opacity: 1 };

    switch (direction) {
      case 'up':
        fromProps.y = 100;
        toProps.y = 0;
        break;
      case 'down':
        fromProps.y = -100;
        toProps.y = 0;
        break;
      case 'left':
        fromProps.x = 100;
        toProps.x = 0;
        break;
      case 'right':
        fromProps.x = -100;
        toProps.x = 0;
        break;
    }

    gsap.fromTo(element, fromProps, {
      ...toProps,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        end: "top 50%",
        toggleActions: "play none none reverse"
      }
    });

  }, [direction]);

  return elementRef;
}

// Image parallax with tilt effect
export function useImageParallax(intensity: number = 1) {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    const parallaxTween = gsap.to(image, {
      yPercent: -20 * intensity,
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: image,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      parallaxTween.kill();
    };
  }, [intensity]);

  return imageRef;
}
