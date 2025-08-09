import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  useGSAP,
  useScrollFadeIn,
  useStaggerAnimation,
  useCounterAnimation,
  useMagneticEffect,
} from "@/hooks/useGSAP";
import { animationUtils } from "@/utils/gsapConfig";
import {
  Sparkles,
  Zap,
  Star,
  Crown,
  Heart,
  Rocket,
  Music,
  Gift,
  Trophy,
  Camera,
} from "lucide-react";

export function AnimationShowcase() {
  const showcaseRef = useScrollFadeIn(0.1);
  const gridRef = useStaggerAnimation(0.1);
  const counterRef = useCounterAnimation(999, 2);
  const magneticButtonRef = useMagneticEffect(0.5);

  const features = [
    {
      icon: Sparkles,
      title: "Stunning Animations",
      description: "GSAP-powered animations that captivate users",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for performance across all devices",
      color: "from-blue-400 to-purple-500",
    },
    {
      icon: Star,
      title: "User Friendly",
      description: "Intuitive interactions and smooth transitions",
      color: "from-green-400 to-blue-500",
    },
    {
      icon: Crown,
      title: "Premium Quality",
      description: "Professional-grade animations and effects",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: Heart,
      title: "Loved by Users",
      description: "Engaging experiences that users remember",
      color: "from-red-400 to-pink-500",
    },
    {
      icon: Rocket,
      title: "Next Level UX",
      description: "Cutting-edge design meets functionality",
      color: "from-cyan-400 to-blue-500",
    },
  ];

  return (
    <section
      ref={showcaseRef}
      className="py-20 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 px-6 py-3 text-lg">
            <Trophy className="w-5 h-5 mr-2" />
            Animation Showcase
          </Badge>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Experience the{" "}
            <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Magic
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Welcome to FanKick's revolutionary animated experience. Every
            scroll, hover, and interaction has been crafted with precision using
            GSAP and ScrollTrigger for the ultimate user experience.
          </p>

          {/* Animated Counter */}
          <div className="inline-flex items-center space-x-4 bg-white/5 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/10">
            <Camera className="w-8 h-8 text-primary" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                <span ref={counterRef}>0</span>+
              </div>
              <div className="text-sm text-gray-400">Animations Created</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-primary/50 transition-all duration-500 hover:scale-105 mobile-optimized tablet-optimized desktop-enhanced"
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}
              />

              <div className="relative z-10">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none rounded-2xl" />
            </div>
          ))}
        </div>

        {/* Interactive Demo Section */}
        <div className="text-center space-y-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Interactive Animation Demo
          </h3>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              ref={magneticButtonRef}
              size="lg"
              className="bg-gradient-to-r from-primary to-green-500 hover:from-green-500 hover:to-primary text-black font-bold text-lg px-8 py-4 rounded-2xl shadow-2xl hover:shadow-primary/25 transition-all duration-300 group"
              onClick={() => {
                // Trigger demo animation
                animationUtils.scrollTo("body", 0);
              }}
            >
              <Rocket className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Experience the Magic
              <Sparkles className="w-5 h-5 ml-2 group-hover:scale-125 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-primary/30 text-primary hover:bg-primary/10 backdrop-blur-sm font-medium text-lg px-8 py-4 rounded-2xl transition-all duration-300"
              onClick={() => {
                // Refresh all animations
                animationUtils.refresh();
              }}
            >
              <Music className="w-5 h-5 mr-2" />
              Refresh Animations
            </Button>
          </div>

          {/* Animation Tips */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 max-w-2xl mx-auto">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center justify-center">
              <Gift className="w-5 h-5 mr-2 text-primary" />
              Pro Animation Tips
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>Hover over cards for micro-interactions</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>Scroll to trigger entrance animations</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>Try the magnetic button effect</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>Notice the smooth parallax scrolling</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
