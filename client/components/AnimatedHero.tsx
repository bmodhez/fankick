import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGSAP, useHeroTextReveal, useParallax, useMagneticEffect } from '@/hooks/useGSAP';
import { useMobileHeroAnimation, useMobilePerformanceOptimization } from '@/hooks/useResponsiveGSAP';
import { useHeroDropAnimation, useFloatingImageDrop } from '@/hooks/useScrollDrop';
import { useHeroDramaticDrop, showAnimationDebug } from '@/components/VisibleDropAnimation';
import { useParallaxBackground, useAdvancedParallax, useParallaxReveal } from '@/hooks/useParallaxScrolling';
import {
  ArrowRight,
  Star,
  Sparkles,
  Zap,
  Crown,
  Heart,
  ShoppingBag,
  TrendingUp,
  Award,
  Flame
} from 'lucide-react';

export function AnimatedHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Animation refs
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useHeroTextReveal();
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useParallax(0.3);
  const magneticButtonRef = useMagneticEffect(0.5);
  const responsiveHeroRef = useMobileHeroAnimation();
  const heroDropRef = useHeroDramaticDrop();

  // Optimize performance on mobile
  useMobilePerformanceOptimization();

  // Clean animations without debug

  // Stats animation refs
  const statsRef = useRef<HTMLDivElement>(null);

  const heroSlides = [
    {
      title: "ULTIMATE FAN GEAR",
      subtitle: "Discover premium football jerseys, anime collectibles, and pop culture merchandise",
      cta: "Shop Now",
      accent: "🏆 #1 Fan Store",
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc7d7a55a70cb48c2b58c8c2fd35f2ab0%2F922085d1ab7548b585d0596e342d2e5d?format=webp&width=800",
      gradient: "from-blue-600 via-purple-600 to-pink-600"
    },
    {
      title: "EXCLUSIVE COLLECTION",
      subtitle: "Limited edition anime merchandise and rare football collectibles",
      cta: "Explore Exclusives",
      accent: "⚡ Limited Edition",
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc7d7a55a70cb48c2b58c8c2fd35f2ab0%2F936c98762f5f474d8370b2d7a65496d9?format=webp&width=400",
      gradient: "from-green-600 via-blue-600 to-purple-600"
    },
    {
      title: "TRENDING DROPS",
      subtitle: "Latest releases from top brands and exclusive fan favorites",
      cta: "See Trending",
      accent: "🔥 Hot Drops",
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc7d7a55a70cb48c2b58c8c2fd35f2ab0%2F922085d1ab7548b585d0596e342d2e5d?format=webp&width=800",
      gradient: "from-orange-600 via-red-600 to-pink-600"
    }
  ];

  const stats = [
    { icon: Crown, label: "Premium Products", value: "10K+", suffix: "" },
    { icon: Heart, label: "Happy Customers", value: "50K+", suffix: "" },
    { icon: Award, label: "Years Excellence", value: "5", suffix: "+" },
    { icon: Flame, label: "Success Rate", value: "99", suffix: "%" }
  ];

  // Main hero animations
  useGSAP(() => {
    const tl = gsap.timeline();

    // Background gradient animation
    gsap.to(backgroundRef.current, {
      backgroundPosition: '200% 50%',
      duration: 8,
      ease: 'none',
      repeat: -1
    });

    // Particles animation
    if (particlesRef.current) {
      const particles = particlesRef.current.children;
      
      gsap.set(particles, {
        opacity: 0,
        scale: 0,
        x: () => gsap.utils.random(-100, 100),
        y: () => gsap.utils.random(-100, 100)
      });

      gsap.to(particles, {
        opacity: 0.6,
        scale: 1,
        x: 0,
        y: 0,
        duration: 2,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        delay: 1
      });

      // Floating animation
      gsap.to(particles, {
        y: () => gsap.utils.random(-20, 20),
        x: () => gsap.utils.random(-20, 20),
        duration: 3,
        ease: 'none',
        repeat: -1,
        yoyo: true,
        stagger: 0.2
      });
    }

    // Subtitle animation
    tl.fromTo(subtitleRef.current,
      {
        opacity: 0,
        y: 30,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out'
      }, 1.2
    );

    // CTA animation
    tl.fromTo(ctaRef.current,
      {
        opacity: 0,
        y: 40,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)'
      }, 1.5
    );

    // Image animation
    tl.fromTo(imageRef.current,
      {
        opacity: 0,
        scale: 0.8,
        rotation: -10
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: 'power3.out'
      }, 0.8
    );

    // Stats animation
    tl.fromTo(statsRef.current?.children,
      {
        opacity: 0,
        y: 50,
        scale: 0.5
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      }, 2
    );
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Slide change animation
  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );

    gsap.fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power2.out' }
    );

    gsap.fromTo(imageRef.current,
      { opacity: 0, scale: 0.9, rotation: 5 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, [currentSlide]);

  const currentSlideData = heroSlides[currentSlide];
  const floatingImageRef = useFloatingImageDrop(currentSlideData.image);

  return (
    <div ref={heroDropRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div
        ref={backgroundRef}
        className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.gradient} opacity-90`}
        style={{
          backgroundSize: '400% 400%'
        }}
      />

      {/* Animated Mesh Overlay */}
      <div className="absolute inset-0 bg-black/20" />
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)`
        }}
      />

      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Accent Badge */}
            <div className="inline-flex items-center space-x-2 mb-6">
              <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm px-4 py-2 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                {currentSlideData.accent}
              </Badge>
            </div>

            {/* Title */}
            <div ref={titleRef} className="mb-6">
              <h1 className="hero-title text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mobile-hero-title tablet-hero-title desktop-hero-title">
                {currentSlideData.title.split(' ').map((word, index) => (
                  <span key={index} className="word inline-block mr-2 sm:mr-4">
                    {word}
                  </span>
                ))}
              </h1>
            </div>

            {/* Subtitle */}
            <div ref={subtitleRef}>
              <p className="hero-subtitle text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 max-w-2xl mobile-hero-subtitle tablet-hero-elements desktop-hero-elements">
                {currentSlideData.subtitle}
              </p>
            </div>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="hero-cta flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 mobile-hero-cta tablet-hero-elements desktop-hero-elements">
              <Link to="/collections">
                <Button
                  ref={magneticButtonRef}
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100 font-bold text-lg px-8 py-4 rounded-2xl shadow-2xl hover:shadow-white/25 transition-all duration-300 group"
                >
                  {currentSlideData.cta}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link to="/category/trending">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-medium text-lg px-8 py-4 rounded-2xl transition-all duration-300"
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  View Trending
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="hero-stats grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mobile-hero-elements tablet-hero-elements desktop-hero-elements">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group mobile-optimized tablet-optimized desktop-enhanced">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-2 sm:mb-3 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                    <stat.icon className="w-6 h-6 text-white mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">
                      {stat.value}
                      <span className="text-lg">{stat.suffix}</span>
                    </div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            {/* Floating Product Image */}
            <div ref={floatingImageRef} className="absolute -top-20 -right-10 w-32 h-32"></div>

            <div ref={imageRef} className="hero-image relative group">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300" />
              
              {/* Main Image */}
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 group-hover:scale-105">
                <img
                  src={currentSlideData.image}
                  alt="Hero Product"
                  className="w-full h-auto max-w-md mx-auto rounded-2xl shadow-2xl"
                />
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-black p-3 rounded-full shadow-lg animate-bounce">
                  <Crown className="w-6 h-6" />
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-red-500 text-white p-3 rounded-full shadow-lg">
                  <Flame className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-12 space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm font-medium">Scroll for more</span>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
