import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useBottleDropSequence, useImmediateDropAnimation } from '@/components/VisibleDropAnimation';
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Crown,
  Gift
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function AnimationTestSection() {
  // Use the user's uploaded image
  const testImage = "https://cdn.builder.io/api/v1/image/assets%2Fc7d7a55a70cb48c2b58c8c2fd35f2ab0%2Fccb843686000436c9595becec62b0d73?format=webp&width=800";
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useImmediateDropAnimation(-400, 2, 0.5, "bounce.out");
  const subtitleRef = useImmediateDropAnimation(-300, 1.5, 1, "back.out(2)");
  const cardsRef = useBottleDropSequence();
  const imageRef = useImmediateDropAnimation(-500, 2.5, 0.8, "elastic.out(1, 0.3)");

  // Create multiple floating bottles effect
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const container = sectionRef.current;
    
    // Create 5 floating product images
    for (let i = 0; i < 5; i++) {
      const img = document.createElement('img');
      img.src = testImage;
      img.className = `floating-bottle-${i} absolute w-16 h-20 object-cover rounded-lg shadow-xl opacity-70`;
      img.style.zIndex = '10';
      img.style.left = `${20 + (i * 15)}%`;
      img.style.top = '10%';
      
      container.appendChild(img);

      // Start way above screen
      gsap.set(img, {
        y: -800 - (i * 100),
        x: gsap.utils.random(-50, 50),
        opacity: 0,
        scale: 0.2,
        rotation: gsap.utils.random(-180, 180)
      });

      // Drop with physics
      gsap.to(img, {
        y: gsap.utils.random(-50, 50),
        x: 0,
        opacity: 0.7,
        scale: 1,
        rotation: 0,
        duration: 2 + (i * 0.3),
        ease: "elastic.out(1, 0.5)",
        delay: 1 + (i * 0.2)
      });

      // Continuous floating
      gsap.to(img, {
        y: "+=30",
        duration: 3 + i,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        delay: 3 + (i * 0.2)
      });
    }

    return () => {
      const floatingBottles = container.querySelectorAll('[class*="floating-bottle-"]');
      floatingBottles.forEach(img => img.remove());
    };
  }, [testImage]);

  const testCards = [
    { title: "Premium Jersey", price: "₹2,499", icon: Crown, color: "bg-purple-500" },
    { title: "Anime Ring", price: "₹1,299", icon: Star, color: "bg-blue-500" },
    { title: "Pop Culture Tee", price: "₹899", icon: Heart, color: "bg-pink-500" },
    { title: "Collector's Item", price: "₹3,999", icon: Gift, color: "bg-green-500" }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 relative overflow-hidden min-h-screen">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl animate-pulse" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="text-center mb-16">
          <div ref={titleRef}>
            <Badge className="bg-primary/20 text-primary border-primary/30 mb-6 px-6 py-3 text-lg">
              <Zap className="w-5 h-5 mr-2" />
              🎬 Animation Demo
            </Badge>
            
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
              देखिए{' '}
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                ANIMATION
              </span>
            </h2>
          </div>
          
          <div ref={subtitleRef}>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
              Elements dropping from above like bottles! <br />
              Scroll करके देखें amazing effects 🚀
            </p>
          </div>
        </div>

        {/* Main Product Image */}
        <div className="flex justify-center mb-16">
          <div ref={imageRef} className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
              <img
                src={testImage}
                alt="Featured Product"
                className="w-80 h-96 object-cover rounded-2xl shadow-xl"
              />
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-primary text-black p-3 rounded-full shadow-lg animate-bounce">
                <Crown className="w-6 h-6" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-red-500 text-white p-3 rounded-full shadow-lg">
                <span className="text-sm font-bold">NEW</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {testCards.map((card, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-primary/50 transition-all duration-300 group"
            >
              <div className={`w-16 h-16 ${card.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <card.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                {card.title}
              </h3>
              
              <p className="text-2xl font-bold text-primary mb-4">{card.price}</p>
              
              <Button 
                size="sm"
                className="w-full bg-gradient-to-r from-primary to-green-500 text-black font-medium hover:scale-105 transition-transform duration-300"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="text-center">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              🎯 Animation Effects देखें
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-sm">1</span>
                </div>
                <span className="text-gray-300">Elements drop from above</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <span className="text-gray-300">Elastic bounce effect</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <span className="text-gray-300">Floating animations</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                <span className="text-gray-300">Scroll-triggered effects</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
