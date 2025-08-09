import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useScrollDrop, useFloatingImageDrop } from "@/hooks/useScrollDrop";
import { Star, ShoppingBag, Heart, Zap, Crown, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function FloatingProductShowcase() {
  // Use the user's uploaded image
  const productImage =
    "https://cdn.builder.io/api/v1/image/assets%2Fc7d7a55a70cb48c2b58c8c2fd35f2ab0%2Fec7a7628276e428785772b407d17037d?format=webp&width=800";

  const showcaseRef = useRef<HTMLDivElement>(null);
  const titleRef = useScrollDrop(-200, 0, "top 80%", "top 40%", "bounce.out");
  const productRef = useScrollDrop(
    -300,
    0,
    "top 75%",
    "top 35%",
    "elastic.out(1, 0.75)",
  );
  const detailsRef = useScrollDrop(
    -150,
    0,
    "top 70%",
    "top 30%",
    "back.out(1.7)",
  );

  useLayoutEffect(() => {
    if (!showcaseRef.current) return;

    // Create multiple floating product images
    const container = showcaseRef.current;
    const numImages = 3;

    for (let i = 0; i < numImages; i++) {
      const img = document.createElement("img");
      img.src = productImage;
      img.className = `floating-product-${i} absolute w-20 h-20 object-cover rounded-xl shadow-2xl opacity-30`;
      img.style.zIndex = "5";

      // Position randomly
      img.style.left = `${20 + i * 30}%`;
      img.style.top = "20%";

      container.appendChild(img);

      // Set initial position way above
      gsap.set(img, {
        y: -400 - i * 100,
        x: Math.random() * 100 - 50,
        opacity: 0,
        scale: 0.3,
        rotation: Math.random() * 360,
      });

      // Create scroll-triggered drop
      ScrollTrigger.create({
        trigger: container,
        start: "top 90%",
        end: "center center",
        scrub: 2 + i, // Different speeds for each image
        onUpdate: (self) => {
          const progress = self.progress;
          const currentY = -400 - i * 100 + (450 + i * 100) * progress;
          const currentOpacity = progress * 0.6;
          const currentScale = 0.3 + 0.4 * progress;

          gsap.set(img, {
            y: currentY,
            opacity: currentOpacity,
            scale: currentScale,
            rotation: Math.random() * 360 * progress,
          });
        },
        onComplete: () => {
          // Final floating animation
          gsap.to(img, {
            y: 50,
            opacity: 0.4,
            scale: 0.7,
            rotation: 0,
            duration: 1.5,
            ease: "elastic.out(1, 0.3)",
            delay: i * 0.2,
          });

          // Continuous floating
          gsap.to(img, {
            y: "+=20",
            duration: 3 + i,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
          });
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      // Clean up images
      const floatingImages = container.querySelectorAll(
        '[class*="floating-product-"]',
      );
      floatingImages.forEach((img) => img.remove());
    };
  }, [productImage]);

  return (
    <section
      ref={showcaseRef}
      className="py-20 bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 relative overflow-hidden min-h-screen"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Title */}
            <div ref={titleRef}>
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Featured Product
              </Badge>

              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Watch It{" "}
                <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                  Drop
                </span>
                <br />
                Into Place
              </h2>

              <p className="text-xl text-gray-300 max-w-lg">
                Experience our premium products with scroll-controlled
                animations. Each item gracefully falls into position as you
                explore our collection.
              </p>
            </div>

            {/* Product Details */}
            <div ref={detailsRef} className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                </div>
                <span className="text-white font-medium">
                  4.9/5 (2,341 reviews)
                </span>
              </div>

              <div className="flex items-center space-x-6">
                <div>
                  <span className="text-3xl font-bold text-primary">
                    ₹2,499
                  </span>
                  <span className="text-lg text-gray-400 line-through ml-2">
                    ₹3,999
                  </span>
                </div>
                <Badge className="bg-red-500 text-white font-bold px-3 py-1">
                  -38% OFF
                </Badge>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-green-500 hover:from-green-500 hover:to-primary text-black font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-primary/25 transition-all duration-300 group"
                >
                  <ShoppingBag className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Add to Cart
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary/30 text-primary hover:bg-primary/10 px-4 py-3 rounded-xl"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center p-3 bg-gray-800/50 rounded-xl">
                  <Zap className="w-6 h-6 text-primary mx-auto mb-2" />
                  <span className="text-sm text-gray-300">Fast Delivery</span>
                </div>
                <div className="text-center p-3 bg-gray-800/50 rounded-xl">
                  <Crown className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <span className="text-sm text-gray-300">Premium Quality</span>
                </div>
                <div className="text-center p-3 bg-gray-800/50 rounded-xl">
                  <Sparkles className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <span className="text-sm text-gray-300">Authentic</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Main Product */}
          <div className="relative flex items-center justify-center">
            <div ref={productRef} className="relative">
              {/* Main Product Image */}
              <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl">
                <img
                  src={productImage}
                  alt="Featured Product"
                  className="w-full max-w-md h-auto rounded-2xl shadow-xl"
                />

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-3xl blur-xl opacity-50" />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-primary text-black p-3 rounded-full shadow-lg animate-bounce">
                <Crown className="w-6 h-6" />
              </div>

              <div className="absolute -bottom-6 -left-6 bg-red-500 text-white p-3 rounded-full shadow-lg">
                <span className="text-sm font-bold">-38%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
