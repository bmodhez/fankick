import { useState, useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useLike } from '@/contexts/LikeContext';
import {
  Heart,
  ShoppingBag,
  Star,
  Eye,
  TrendingUp,
  Crown,
  ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ModernProductCardProps {
  product: Product;
  index?: number;
}

export function ModernProductCard({ product, index = 0 }: ModernProductCardProps) {
  const { addToCart } = useCart();
  const { toggleLike, isLiked } = useLike();
  const [isHovered, setIsHovered] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);

  const isProductLiked = isLiked(product.id);
  const discount = Math.round(((product.originalPrice - product.basePrice) / product.originalPrice) * 100);

  // Smooth scroll-triggered animation
  useLayoutEffect(() => {
    if (!cardRef.current) return;

    gsap.set(cardRef.current, {
      opacity: 0,
      y: 30,
      scale: 0.95
    });

    ScrollTrigger.create({
      trigger: cardRef.current,
      start: "top 85%",
      onEnter: () => {
        gsap.to(cardRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          delay: index * 0.1
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [index]);

  const handleAddToCart = () => {
    if (product.variants && product.variants.length > 0) {
      addToCart({
        productId: product.id,
        variantId: product.variants[0].id,
        quantity: 1
      });
    }
  };

  const handleToggleLike = () => {
    toggleLike(product.id);
  };

  return (
    <div
      ref={cardRef}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {discount > 0 && (
            <Badge className="bg-red-500 text-white font-bold px-2 py-1 text-xs">
              -{discount}%
            </Badge>
          )}
          
          {product.isTrending && (
            <Badge className="bg-orange-500 text-white font-bold px-2 py-1 text-xs flex items-center">
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
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 shadow-lg"
        >
          <Heart 
            className={`w-5 h-5 transition-all duration-200 ${
              isProductLiked 
                ? 'text-red-500 fill-red-500' 
                : 'text-gray-600 hover:text-red-400'
            }`}
          />
        </button>

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex space-x-2">
            <Link to={`/product/${product.id}`}>
              <Button
                size="sm"
                variant="outline"
                className="bg-white/90 border-white text-gray-900 hover:bg-white"
              >
                <Eye className="w-4 h-4 mr-1" />
                View
              </Button>
            </Link>
            
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <ShoppingBag className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </div>

        {/* Rating */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1">
          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
          <span className="text-gray-900 text-xs font-medium">{product.rating}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {product.name}
          </h3>
          <p className="text-gray-500 text-xs capitalize mt-1">
            {product.category} • {product.subcategory}
          </p>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              ₹{product.basePrice.toLocaleString()}
            </span>
            {discount > 0 && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          <div className="text-right">
            <div className="text-xs text-gray-500">
              {product.reviews} reviews
            </div>
          </div>
        </div>

        {/* Quick Add Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full bg-gray-100 hover:bg-blue-600 text-gray-700 hover:text-white transition-all duration-300 group/btn"
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Add to Cart
          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}

// Grid container with smooth animations
export function ModernProductGrid({ 
  products, 
  title 
}: { 
  products: Product[];
  title?: string;
}) {
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!gridRef.current) return;

    gsap.set(gridRef.current, {
      opacity: 0,
      y: 30
    });

    ScrollTrigger.create({
      trigger: gridRef.current,
      start: "top 90%",
      onEnter: () => {
        gsap.to(gridRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={gridRef} className="space-y-8">
      {title && (
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ModernProductCard
            key={product.id}
            product={product}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
