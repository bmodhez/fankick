import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, ShoppingBag, MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  type: 'purchase' | 'visitor' | 'stock';
  message: string;
  location?: string;
  timeAgo: string;
  product?: string;
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'purchase',
    message: 'Sarah from New York just bought',
    location: '🇺🇸 New York',
    timeAgo: '2 minutes ago',
    product: 'Messi Barcelona Jersey'
  },
  {
    id: '2',
    type: 'purchase',
    message: 'Ahmed from Dubai just bought',
    location: '🇦🇪 Dubai',
    timeAgo: '5 minutes ago',
    product: 'Naruto Akatsuki Ring'
  },
  {
    id: '3',
    type: 'visitor',
    message: '43 people are viewing this page right now',
    timeAgo: 'Live',
    location: '🌍 Worldwide'
  },
  {
    id: '4',
    type: 'stock',
    message: 'Only 3 items left in stock!',
    timeAgo: 'Updated now',
    product: 'Taylor Swift 1989 Hoodie'
  },
  {
    id: '5',
    type: 'purchase',
    message: 'Mohammed from Saudi just bought',
    location: '🇸🇦 Riyadh',
    timeAgo: '8 minutes ago',
    product: 'Demon Slayer Tanjiro Sword'
  }
];

export function PopupNotifications() {
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [notificationIndex, setNotificationIndex] = useState(0);

  useEffect(() => {
    const showNotification = () => {
      setCurrentNotification(notifications[notificationIndex]);
      setIsVisible(true);

      // Hide after 5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      // Show next notification after 8 seconds
      setTimeout(() => {
        setNotificationIndex((prev) => (prev + 1) % notifications.length);
      }, 8000);
    };

    // Start showing notifications after 10 seconds
    const initialDelay = setTimeout(showNotification, 10000);

    // Show subsequent notifications every 8 seconds
    const interval = setInterval(showNotification, 15000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [notificationIndex]);

  if (!currentNotification || !isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm">
      <div className={cn(
        "bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 transform transition-all duration-500",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      )}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            {currentNotification.type === 'purchase' && (
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            )}
            {currentNotification.type === 'visitor' && (
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            )}
            {currentNotification.type === 'stock' && (
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            )}
            <Badge className={cn(
              "text-xs",
              currentNotification.type === 'purchase' && "bg-green-100 text-green-800",
              currentNotification.type === 'visitor' && "bg-blue-100 text-blue-800",
              currentNotification.type === 'stock' && "bg-red-100 text-red-800"
            )}>
              {currentNotification.type === 'purchase' && 'Recent Purchase'}
              {currentNotification.type === 'visitor' && 'Live Activity'}
              {currentNotification.type === 'stock' && 'Stock Alert'}
            </Badge>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0"
            onClick={() => setIsVisible(false)}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {currentNotification.message}
          </p>
          
          {currentNotification.product && (
            <p className="text-sm text-primary font-semibold">
              "{currentNotification.product}"
            </p>
          )}

          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {currentNotification.location}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {currentNotification.timeAgo}
            </div>
          </div>
        </div>

        {currentNotification.type === 'purchase' && (
          <Button 
            size="sm" 
            className="w-full mt-3 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90"
          >
            <ShoppingBag className="w-3 h-3 mr-1" />
            Shop Similar Items
          </Button>
        )}
      </div>
    </div>
  );
}
