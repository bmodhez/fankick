import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    url: "https://images.pexels.com/photos/2127038/pexels-photo-2127038.jpeg?auto=compress&cs=tinysrgb&w=4800&h=3200",
    title: "Racing Excellence",
    description: "High-performance technology meets precision engineering"
  },
  {
    url: "https://images.pexels.com/photos/9072202/pexels-photo-9072202.jpeg?auto=compress&cs=tinysrgb&w=5890&h=3927",
    title: "Gaming Paradise",
    description: "Immersive experiences in cutting-edge environments"
  },
  {
    url: "https://images.pexels.com/photos/33319398/pexels-photo-33319398.jpeg?auto=compress&cs=tinysrgb&w=5726&h=3817",
    title: "Urban Innovation",
    description: "Where city life meets modern technology"
  },
  {
    url: "https://images.pexels.com/photos/33337565/pexels-photo-33337565.jpeg?auto=compress&cs=tinysrgb&w=6000&h=4000",
    title: "Natural Serenity",
    description: "Finding peace in the digital age"
  }
];

export function ParallaxGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    const container = containerRef.current;

    if (!gallery || !container) return;

    // Image reveal animations
    const images = gallery.querySelectorAll('.gallery-image');
    
    images.forEach((image, index) => {
      gsap.fromTo(image,
        {
          scale: 1.3,
          opacity: 0,
          clipPath: "inset(100% 0 0 0)"
        },
        {
          scale: 1,
          opacity: 1,
          clipPath: "inset(0% 0 0 0)",
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: image,
            start: "top 80%",
            end: "top 30%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Parallax effect for each image
      gsap.to(image, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: image,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Text animations
    const textElements = gallery.querySelectorAll('.gallery-text');
    
    textElements.forEach((text, index) => {
      gsap.fromTo(text,
        {
          y: 80,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: text,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, []);

  return (
    <section ref={galleryRef} className="py-20 bg-black">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Visual Journey
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore a curated collection of moments that define excellence, 
            innovation, and the beauty of modern design.
          </p>
        </div>

        <div className="space-y-32">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="flex-1 relative overflow-hidden rounded-2xl">
                <div
                  className="gallery-image aspect-[16/10] w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${image.url}')`
                  }}
                />
              </div>
              
              <div className="flex-1 gallery-text">
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  {image.title}
                </h3>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
                  {image.description}
                </p>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                  Explore More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
