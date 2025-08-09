import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useGSAP, useMagneticEffect, useScrollProgress } from '@/hooks/useGSAP';
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  Heart,
  Zap,
  Star,
  Crown,
  Sparkles
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function AnimatedNavigation() {
  const { user, logout, isAdmin } = useAuth();
  const { items } = useCart();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Animation refs
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const progressRef = useScrollProgress();
  const magneticButtonRef = useMagneticEffect(0.4);

  // Animated background gradient
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Main navigation animations
  useGSAP(() => {
    // Initial load animation
    gsap.fromTo(navRef.current, 
      {
        y: -100,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
      }
    );

    // Logo animation
    gsap.fromTo(logoRef.current,
      {
        scale: 0,
        rotation: -180
      },
      {
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 0.5
      }
    );

    // Menu items stagger animation
    const menuItems = menuRef.current?.querySelectorAll('.nav-item');
    gsap.fromTo(menuItems,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.7
      }
    );

    // Scroll-triggered background change
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top -50',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const progress = self.progress;
        
        if (navRef.current) {
          gsap.to(navRef.current, {
            backgroundColor: progress > 0.1 
              ? 'rgba(17, 24, 39, 0.95)' 
              : 'rgba(17, 24, 39, 0.8)',
            backdropFilter: progress > 0.1 ? 'blur(20px)' : 'blur(10px)',
            duration: 0.3
          });
        }
      }
    });

    // Animated background gradient
    if (backgroundRef.current) {
      gsap.to(backgroundRef.current, {
        backgroundPosition: '100% 50%',
        duration: 3,
        ease: 'none',
        repeat: -1,
        yoyo: true
      });
    }
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.to('.mobile-menu', {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: 'power3.out'
      });
      
      gsap.fromTo('.mobile-menu-item',
        {
          opacity: 0,
          x: 50
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.1,
          delay: 0.2,
          ease: 'power2.out'
        }
      );
    } else {
      gsap.to('.mobile-menu', {
        opacity: 0,
        x: '100%',
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  }, [isMobileMenuOpen]);

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { label: '🏠 Home', path: '/' },
    { label: '⚽ Football', path: '/category/football' },
    { label: '🎌 Anime', path: '/category/anime' },
    { label: '🎭 Pop Culture', path: '/category/pop-culture' },
    { label: '📦 Collections', path: '/collections' }
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        ref={progressRef}
        className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-blue-500 z-50 scale-x-0 origin-left"
      />

      {/* Main Navigation */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'py-2 shadow-2xl border-b border-white/10' 
            : 'py-4'
        }`}
        style={{
          backgroundColor: 'rgba(17, 24, 39, 0.8)',
          backdropFilter: 'blur(10px)'
        }}
      >
        {/* Animated Background Gradient */}
        <div
          ref={backgroundRef}
          className="absolute inset-0 opacity-10"
          style={{
            background: 'linear-gradient(45deg, #10b981, #8b5cf6, #f59e0b, #ef4444, #10b981)',
            backgroundSize: '400% 400%'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div 
                ref={logoRef}
                className="relative flex items-center space-x-2"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-12">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Sparkles className="w-2 h-2 text-gray-900" />
                  </div>
                </div>
                <div className="hidden sm:block">
                  <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    FAN
                  </span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                    KICK
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div ref={menuRef} className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
                    location.pathname === item.path
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Search Button */}
              <button
                className="nav-item p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 relative group"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              </button>

              {/* Cart Button */}
              <Link
                to="/cart"
                className="nav-item relative p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 group"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center animate-pulse">
                    {cartItemCount}
                  </Badge>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              </Link>

              {/* User Menu */}
              {user ? (
                <div className="flex items-center space-x-2">
                  {isAdmin() && (
                    <Link to="/admin">
                      <Button
                        ref={magneticButtonRef}
                        size="sm"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                      >
                        <Crown className="w-4 h-4 mr-1" />
                        Admin
                      </Button>
                    </Link>
                  )}
                  
                  <button
                    onClick={logout}
                    className="nav-item p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 group"
                  >
                    <User className="w-5 h-5" />
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  </button>
                </div>
              ) : (
                <Link to="/login">
                  <Button
                    ref={magneticButtonRef}
                    size="sm"
                    className="bg-gradient-to-r from-primary to-green-600 hover:from-green-600 hover:to-primary text-black font-medium shadow-lg hover:shadow-primary/25 transition-all duration-300"
                  >
                    <Zap className="w-4 h-4 mr-1" />
                    Login
                  </Button>
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className="mobile-menu lg:hidden fixed top-full right-0 w-80 h-screen bg-gray-900/95 backdrop-blur-xl border-l border-gray-700 opacity-0 translate-x-full"
          style={{ transform: 'translateX(100%)' }}
        >
          <div className="p-6">
            <div className="space-y-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`mobile-menu-item block px-4 py-3 rounded-xl text-lg font-medium transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-700">
                {!user && (
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="mobile-menu-item w-full bg-gradient-to-r from-primary to-green-600 text-black font-medium">
                      <Zap className="w-4 h-4 mr-2" />
                      Login / Sign Up
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
