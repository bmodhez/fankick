import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useLike } from '@/contexts/LikeContext';
import { useGSAP, useScrollFadeIn, useMagneticEffect } from '@/hooks/useGSAP';
import { useResponsiveCardAnimation, useTouchGestures } from '@/hooks/useResponsiveGSAP';
import {
  Heart,
  ShoppingBag,
  Star,
  Eye,
  Sparkles,
  Zap,
  Crown,
  TrendingUp,
  Award,
  ArrowRight
} from 'lucide-react';

interface AnimatedProductCardProps {
  product: Product;
  index?: number;
  variant?: 'default' | 'featured' | 'trending';
}

export function AnimatedProductCard({ 
  product, 
  index = 0,
  variant = 'default' 
}: AnimatedProductCardProps) {
  const { addToCart } = useCart();
  const { likedProducts, toggleLike, isLiked } = useLike();
  const [isHovered, setIsHovered] = useState(false);
  
  const cardRef = useScrollFadeIn(0.2);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const magneticButtonRef = useMagneticEffect(0.3);
  const touchRef = useTouchGestures();

  const isLiked = likedProducts.includes(product.id);
  const discount = Math.round(((product.originalPrice - product.basePrice) / product.originalPrice) * 100);

  // Card hover animations
  useGSAP(() => {
    const handleMouseEnter = () => {
      setIsHovered(true);
      
      const tl = gsap.timeline();
      
      // Card elevation and glow
      tl.to(cardRef.current, {
        y: -10,
        scale: 1.02,
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25), 0 0 50px rgba(16, 185, 129, 0.15)',
        duration: 0.4,
        ease: 'power2.out'
      });

      // Image zoom and rotation
      tl.to(imageRef.current, {
        scale: 1.1,
        rotation: 2,
        duration: 0.6,
        ease: 'power2.out'
      }, 0);

      // Overlay fade in
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      }, 0.1);

      // Content slide up
      tl.fromTo(overlayRef.current?.children,
        {
          y: 20,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: 'power2.out'
        }, 0.2
      );

      // Badge animation
      if (badgeRef.current) {
        tl.to(badgeRef.current, {
          scale: 1.1,
          rotation: 5,
          duration: 0.3,
          ease: 'back.out(1.7)'
        }, 0);
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      
      const tl = gsap.timeline();
      
      // Reset card position
      tl.to(cardRef.current, {
        y: 0,
        scale: 1,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        duration: 0.4,
        ease: 'power2.out'
      });

      // Reset image
      tl.to(imageRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, 0);

      // Hide overlay
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in'
      }, 0);

      // Reset badge
      if (badgeRef.current) {
        tl.to(badgeRef.current, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: 'power2.out'
        }, 0);
      }
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

  const handleAddToCart = () => {
    if (product.variants && product.variants.length > 0) {
      addToCart({
        productId: product.id,
        variantId: product.variants[0].id,
        quantity: 1
      });

      // Success animation
      gsap.to(cardRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      });
    }
  };

  const handleToggleLike = () => {
    toggleLike(product.id);
    
    // Like animation
    gsap.to('.heart-icon', {
      scale: 1.5,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });
  };

  const cardClasses = {
    default: 'bg-gray-800 border-gray-700',
    featured: 'bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30',
    trending: 'bg-gradient-to-br from-green-900/50 to-blue-900/50 border-green-500/30'
  };

  return (
    <div
      ref={cardRef}
      className={`relative group rounded-xl sm:rounded-2xl border overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 mobile-card tablet-card desktop-card mobile-optimized tablet-optimized desktop-enhanced ${cardClasses[variant]}`}
      style={{
        animationDelay: `${index * 0.1}s`
      }}
    >
      {/* Background Gradient Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden">
        <div ref={imageRef} className="w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {discount > 0 && (
            <Badge 
              ref={badgeRef}
              className="bg-red-500 text-white font-bold px-2 py-1 text-xs"
            >
              -{discount}%
            </Badge>
          )}
          
          {product.isTrending && (
            <Badge className="bg-yellow-500 text-black font-bold px-2 py-1 text-xs flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              Hot
            </Badge>
          )}

          {product.isExclusive && (
            <Badge className="bg-purple-500 text-white font-bold px-2 py-1 text-xs flex items-center">
              <Crown className="w-3 h-3 mr-1" />
              VIP
            </Badge>
          )}
        </div>

        {/* Like Button */}
        <button
          onClick={handleToggleLike}
          className="absolute top-3 right-3 p-2 bg-black/20 backdrop-blur-sm rounded-full hover:bg-black/40 transition-all duration-300 group/like"
        >
          <Heart 
            className={`heart-icon w-5 h-5 transition-all duration-300 ${
              isLiked 
                ? 'text-red-500 fill-red-500 scale-110' 
                : 'text-white group-hover/like:text-red-400'
            }`}
          />
        </button>

        {/* Hover Overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 transition-all duration-300"
        >
          <div className="flex space-x-3">
            <Link to={`/product/${product.id}`}>
              <Button
                size="sm"
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <Eye className="w-4 h-4 mr-1" />
                View
              </Button>
            </Link>
            
            <Button
              ref={magneticButtonRef}
              size="sm"
              onClick={handleAddToCart}
              className="bg-primary text-black hover:bg-primary/90 font-medium"
            >
              <ShoppingBag className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </div>

        {/* Rating */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-black/20 backdrop-blur-sm rounded-full px-2 py-1">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-white text-xs font-medium">{product.rating}</span>
        </div>
      </div>

      {/* Content Section */}
      <div ref={contentRef} className="p-4">
        <div className="mb-3">
          <h3 className="font-semibold text-white text-sm line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-gray-400 text-xs capitalize mt-1">
            {product.category} • {product.subcategory}
          </p>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-primary">
              ₹{product.basePrice.toLocaleString()}
            </span>
            {discount > 0 && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-1 text-gray-400 text-xs">
            <Award className="w-3 h-3" />
            <span>{product.reviews} reviews</span>
          </div>
        </div>

        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.tags.slice(0, 2).map((tag, tagIndex) => (
              <Badge
                key={tagIndex}
                variant="outline"
                className="text-xs border-gray-600 text-gray-300 px-2 py-0.5"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Quick Add Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-primary to-green-500 hover:from-green-500 hover:to-primary text-black font-medium transition-all duration-300 group/btn"
        >
          <ShoppingBag className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
          Quick Add
          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
    </div>
  );
}

// Grid container with stagger animation
export function AnimatedProductGrid({ 
  products, 
  title,
  variant = 'default' 
}: { 
  products: Product[];
  title?: string;
  variant?: 'default' | 'featured' | 'trending';
}) {
  const gridRef = useScrollFadeIn(0.1);

  return (
    <div ref={gridRef} className="space-y-6">
      {title && (
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full" />
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product, index) => (
          <AnimatedProductCard
            key={product.id}
            product={product}
            index={index}
            variant={variant}
          />
        ))}
      </div>
    </div>
  );
}
