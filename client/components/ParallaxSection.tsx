import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  description: string;
  reverse?: boolean;
  children?: React.ReactNode;
}

export function ParallaxSection({
  backgroundImage,
  title,
  subtitle,
  description,
  reverse = false,
  children,
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const background = backgroundRef.current;
    const content = contentRef.current;

    if (!section || !background || !content) return;

    // Parallax background
    gsap.to(background, {
      yPercent: reverse ? 30 : -30,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Content animation
    gsap.fromTo(
      content,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Individual element animations
    const elements = content.querySelectorAll(".animate-element");
    gsap.fromTo(
      elements,
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, [reverse]);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      {/* Parallax Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 w-full h-[120%] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 h-full flex items-center">
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full ${
            reverse ? "text-right" : "text-left"
          }`}
        >
          <div className={`max-w-2xl ${reverse ? "ml-auto" : "mr-auto"}`}>
            <h2 className="animate-element text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              {title}
            </h2>
            <h3 className="animate-element text-2xl md:text-3xl text-blue-200 mb-8 font-light">
              {subtitle}
            </h3>
            <p className="animate-element text-lg md:text-xl text-gray-200 leading-relaxed mb-12">
              {description}
            </p>
            {children && <div className="animate-element">{children}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
