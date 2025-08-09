import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  ShoppingBag,
  Star,
  Users,
  Award,
  Truck,
  Shield,
  Heart,
  Sparkles
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function ModernHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    if (!heroRef.current) return;

    const tl = gsap.timeline();

    // Smooth fade in animations
    tl.fromTo('.hero-badge', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    )
    .fromTo('.hero-title', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.6'
    )
    .fromTo('.hero-subtitle', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.8'
    )
    .fromTo('.hero-buttons', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6'
    )
    .fromTo('.hero-stats', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.1 }, '-=0.4'
    )
    .fromTo('.hero-image', 
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }, '-=1'
    );

    return () => {
      tl.kill();
    };
  }, []);

  const stats = [
    { icon: Users, value: '50K+', label: 'Happy Customers' },
    { icon: Award, value: '10K+', label: 'Products' },
    { icon: Shield, value: '100%', label: 'Authentic' },
    { icon: Truck, value: '24/7', label: 'Support' }
  ];

  return (
    <section ref={heroRef} className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-20" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-50 to-purple-50 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="hero-badge">
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-4 py-2 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                India's #1 Fan Store
              </Badge>
            </div>

            {/* Title */}
            <div className="hero-title">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Premium{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Fan Gear
                </span>{' '}
                <br />
                for True Fans
              </h1>
            </div>

            {/* Subtitle */}
            <div className="hero-subtitle">
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                Discover authentic football jerseys, exclusive anime collectibles, 
                and trending pop culture merchandise. Quality products for passionate fans.
              </p>
            </div>

            {/* Buttons */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-4">
              <Link to="/collections">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <ShoppingBag className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Shop Collection
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link to="/category/trending">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300"
                >
                  <Star className="w-5 h-5 mr-2" />
                  View Trending
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="hero-stats grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200">
                    <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-100 transition-colors duration-300">
                      <stat.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative flex items-center justify-center">
            <div className="hero-image relative">
              {/* Main Product Showcase */}
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fc7d7a55a70cb48c2b58c8c2fd35f2ab0%2Fafabbcd6d8dc49f0bba88c69743766b6?format=webp&width=800"
                  alt="Premium Fan Gear"
                  className="w-full max-w-md h-auto rounded-2xl"
                />
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg">
                  <Heart className="w-6 h-6" />
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-green-500 text-white p-3 rounded-full shadow-lg">
                  <span className="text-sm font-bold">NEW</span>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-3xl blur-xl -z-10" />
              </div>

              {/* Background Decorations */}
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-blue-200 rounded-full opacity-60" />
              <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-purple-200 rounded-full opacity-60" />
              <div className="absolute top-1/2 -left-12 w-8 h-8 bg-green-200 rounded-full opacity-60" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center pb-8">
          <div className="inline-flex items-center space-x-2 text-gray-500 animate-bounce">
            <span className="text-sm">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
