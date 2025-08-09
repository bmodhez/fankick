import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGSAP, useScrollFadeIn, useStaggerAnimation, useCounterAnimation, useParallax } from '@/hooks/useGSAP';
import { useScrollDrop, useScrollDropSequence } from '@/hooks/useScrollDrop';
import {
  ArrowRight,
  Star,
  Users,
  Package,
  Award,
  TrendingUp,
  Crown,
  Zap,
  Heart,
  Shield,
  Truck,
  CreditCard,
  Sparkles,
  Globe,
  Trophy
} from 'lucide-react';

// Hero Categories Section
export function AnimatedCategoriesSection() {
  const sectionRef = useScrollFadeIn(0.1);
  const cardsRef = useScrollDropSequence([
    { startY: -200, endY: 0, delay: 0, triggerStart: "top 80%", triggerEnd: "top 40%" },
    { startY: -250, endY: 0, delay: 0.1, triggerStart: "top 80%", triggerEnd: "top 40%" },
    { startY: -300, endY: 0, delay: 0.2, triggerStart: "top 80%", triggerEnd: "top 40%" }
  ]);

  const categories = [
    {
      title: "⚽ Football",
      subtitle: "Premium Jerseys & Gear",
      description: "Official team jerseys, boots, and training equipment",
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc7d7a55a70cb48c2b58c8c2fd35f2ab0%2F922085d1ab7548b585d0596e342d2e5d?format=webp&width=800",
      link: "/category/football",
      gradient: "from-green-500 to-blue-600",
      icon: "⚽",
      stats: "500+ Products"
    },
    {
      title: "🎌 Anime",
      subtitle: "Collectibles & Merch",
      description: "Exclusive anime merchandise and collectibles",
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc7d7a55a70cb48c2b58c8c2fd35f2ab0%2F936c98762f5f474d8370b2d7a65496d9?format=webp&width=400",
      link: "/category/anime",
      gradient: "from-purple-500 to-pink-600",
      icon: "🎌",
      stats: "300+ Items"
    },
    {
      title: "🎭 Pop Culture",
      subtitle: "Trending Merchandise",
      description: "Latest trends and pop culture collectibles",
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc7d7a55a70cb48c2b58c8c2fd35f2ab0%2F922085d1ab7548b585d0596e342d2e5d?format=webp&width=800",
      link: "/category/pop-culture",
      gradient: "from-orange-500 to-red-600",
      icon: "🎭",
      stats: "200+ Products"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Explore Categories
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Shop by{' '}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Passion
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover our premium collection of fan gear across your favorite categories
          </p>
        </div>

        {/* Categories Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {categories.map((category, index) => (
            <Link key={index} to={category.link} className="group mobile-optimized tablet-optimized desktop-enhanced">
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gray-800 border border-gray-700 hover:border-primary/50 transition-all duration-500 hover:scale-105">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-80 group-hover:opacity-90 transition-opacity duration-500`} />
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 h-80 flex flex-col justify-between">
                  <div>
                    <div className="text-6xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                      {category.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                      {category.title}
                    </h3>
                    <p className="text-primary font-semibold mb-3">
                      {category.subtitle}
                    </p>
                    <p className="text-gray-300 text-sm mb-4">
                      {category.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge className="bg-white/10 text-white border-white/20">
                      {category.stats}
                    </Badge>
                    <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Stats Section
export function AnimatedStatsSection() {
  const sectionRef = useScrollFadeIn(0.1);
  const statsRef = useStaggerAnimation(0.1);
  
  const stats = [
    { icon: Users, label: "Happy Customers", value: 50000, suffix: "+" },
    { icon: Package, label: "Products Sold", value: 100000, suffix: "+" },
    { icon: Globe, label: "Countries Served", value: 25, suffix: "+" },
    { icon: Award, label: "Years Excellence", value: 5, suffix: "+" }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Fans Worldwide
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Join millions of satisfied customers who trust FanKick for their fan gear
          </p>
        </div>

        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon: Icon, label, value, suffix }: {
  icon: any;
  label: string;
  value: number;
  suffix: string;
}) {
  const counterRef = useCounterAnimation(value, 2);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const handleMouseEnter = () => {
      gsap.to(cardRef.current, {
        scale: 1.05,
        rotationY: 5,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cardRef.current, {
        scale: 1,
        rotationY: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="text-center bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-primary/50 transition-all duration-300 group"
    >
      <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <div className="text-3xl md:text-4xl font-bold text-white mb-2">
        <span ref={counterRef}>0</span>
        <span>{suffix}</span>
      </div>
      <p className="text-gray-400 font-medium">{label}</p>
    </div>
  );
}

// Features Section
export function AnimatedFeaturesSection() {
  const sectionRef = useScrollFadeIn(0.1);
  const featuresRef = useStaggerAnimation(0.15);

  const features = [
    {
      icon: Shield,
      title: "Authentic Products",
      description: "100% genuine merchandise with authenticity guarantee",
      color: "text-green-400"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Express shipping to your doorstep in 2-5 business days",
      color: "text-blue-400"
    },
    {
      icon: CreditCard,
      title: "Secure Payment",
      description: "Multiple payment options with bank-level security",
      color: "text-purple-400"
    },
    {
      icon: Heart,
      title: "Customer Love",
      description: "24/7 customer support with 99% satisfaction rate",
      color: "text-red-400"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gray-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 px-4 py-2">
            <Trophy className="w-4 h-4 mr-2" />
            Why Choose FanKick
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Experience{' '}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Excellence
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We deliver premium fan gear with unmatched quality and service
          </p>
        </div>

        <div ref={featuresRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group cursor-pointer"
            >
              <div className="bg-gray-700 rounded-2xl p-8 hover:bg-gray-600 transition-all duration-300 group-hover:scale-105 border border-gray-600 hover:border-primary/30">
                <div className={`w-16 h-16 rounded-2xl bg-gray-600 flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-500 transition-colors duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Call-to-Action Section
export function AnimatedCTASection() {
  const sectionRef = useScrollFadeIn(0.1);
  const parallaxRef = useParallax(0.5);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Parallax Background */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-600/20 to-pink-600/20"
      />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-12 border border-gray-700">
          <Sparkles className="w-16 h-16 text-primary mx-auto mb-6" />
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Show Your{' '}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Fan Spirit?
            </span>
          </h2>
          
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join millions of fans worldwide and get exclusive access to premium merchandise, 
            early releases, and special discounts.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/collections">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-green-500 hover:from-green-500 hover:to-primary text-black font-bold text-lg px-8 py-4 rounded-2xl shadow-2xl hover:shadow-primary/25 transition-all duration-300 group"
              >
                <Crown className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Shop Premium Collection
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link to="/category/trending">
              <Button
                variant="outline"
                size="lg"
                className="border-primary/30 text-primary hover:bg-primary/10 backdrop-blur-sm font-medium text-lg px-8 py-4 rounded-2xl transition-all duration-300"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                View Trending Items
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
