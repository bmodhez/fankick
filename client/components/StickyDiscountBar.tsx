import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Zap, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StickyDiscountBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show when user scrolls up after scrolling down at least 500px
      if (currentScrollY < lastScrollY && currentScrollY > 500 && !isDismissed) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isDismissed]);

  if (isDismissed) return null;

  return (
    <div className={cn(
      "fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 text-white py-3 px-4 shadow-lg transform transition-all duration-500",
      isVisible ? "translate-y-0" : "-translate-y-full"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="animate-pulse">
            <Zap className="w-5 h-5" />
          </div>
          <div className="font-bold text-sm sm:text-base">
            🔥 Limited Time: Extra 70% OFF Everything + FREE Shipping!
          </div>
          <div className="hidden sm:flex items-center gap-1 bg-black/20 px-2 py-1 rounded text-xs">
            <Timer className="w-3 h-3" />
            Ends in: 23:59:45
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            className="bg-white text-red-500 hover:bg-gray-100 font-bold px-4"
          >
            Shop Now
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/20 p-1"
            onClick={() => setIsDismissed(true)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
