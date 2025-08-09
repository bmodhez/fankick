import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    number: 10000,
    label: "Happy Customers",
    suffix: "+",
    icon: "👥",
  },
  {
    number: 500,
    label: "Projects Completed",
    suffix: "+",
    icon: "🚀",
  },
  {
    number: 99,
    label: "Success Rate",
    suffix: "%",
    icon: "⭐",
  },
  {
    number: 24,
    label: "Support Available",
    suffix: "/7",
    icon: "🛟",
  },
];

export function ParallaxStats() {
  const statsRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const statsSection = statsRef.current;
    const background = backgroundRef.current;

    if (!statsSection || !background) return;

    // Parallax background
    gsap.to(background, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: statsSection,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Stats animation
    const statItems = statsSection.querySelectorAll(".stat-item");

    statItems.forEach((item, index) => {
      const numberElement = item.querySelector(".stat-number");
      const number = stats[index].number;

      // Animate the containers
      gsap.fromTo(
        item,
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Animate the numbers
      gsap.fromTo(
        numberElement,
        {
          textContent: 0,
        },
        {
          textContent: number,
          duration: 2,
          ease: "power2.out",
          delay: 0.5 + index * 0.1,
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Floating animation
      gsap.to(item, {
        y: -10,
        duration: 3,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.5,
        scrollTrigger: {
          trigger: statsSection,
          start: "top 60%",
          end: "bottom 40%",
          toggleActions: "play pause play reverse",
        },
      });
    });
  }, []);

  return (
    <section ref={statsRef} className="relative py-32 overflow-hidden">
      {/* Parallax Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 w-full h-[120%] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/33319398/pexels-photo-33319398.jpeg?auto=compress&cs=tinysrgb&w=5726&h=3817')`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Our Impact
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Numbers that speak louder than words. Our commitment to excellence
            is reflected in every metric that matters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-item text-center p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <span className="stat-number">0</span>
                <span>{stat.suffix}</span>
              </div>
              <div className="text-lg text-gray-300 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
    </section>
  );
}
