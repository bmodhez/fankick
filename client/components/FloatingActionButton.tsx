import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Zap, X, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FloatingActionButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded Menu */}
      {isExpanded && (
        <div className="flex flex-col gap-2 animate-slide-in">
          <Button
            size="sm"
            className="bg-green-500 hover:bg-green-600 text-white shadow-lg"
            onClick={() => window.open('https://wa.me/your-whatsapp', '_blank')}
          >
            💬 WhatsApp Support
          </Button>
          <Button
            size="sm"
            className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
          >
            🎁 Free Gift
          </Button>
          <Button
            size="sm"
            className="bg-purple-500 hover:bg-purple-600 text-white shadow-lg"
          >
            ⭐ Reviews
          </Button>
        </div>
      )}

      {/* Main FAB */}
      <Button
        size="lg"
        className={cn(
          "rounded-full w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-2xl transform transition-all duration-300",
          isExpanded ? "rotate-45" : "hover:scale-110 animate-pulse"
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="flex flex-col items-center">
            <Zap className="w-5 h-5" />
            <span className="text-xs font-bold">70%</span>
          </div>
        )}
      </Button>

      {/* Pulsing Ring */}
      {!isExpanded && (
        <div className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping opacity-75"></div>
      )}
    </div>
  );
}
