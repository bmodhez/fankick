import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useCart } from './CartContext';
import { useLike } from './LikeContext';
import { useAuth } from './AuthContext';
import { orderApi } from '@/services/orderApi';
import { userApi } from '@/services/userApi';
import { UserOrder } from '@/types/user';

interface RealTimeState {
  // Cart real-time data
  cartCount: number;
  cartTotal: number;
  cartLastUpdated: number;
  
  // User real-time data
  orderCount: number;
  likeCount: number;
  userLastUpdated: number;
  
  // System real-time data
  lastSyncTime: number;
  isOnline: boolean;
  
  // Methods
  forceSync: () => void;
  updateCartStats: () => void;
  updateUserStats: () => void;
  showNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const RealTimeContext = createContext<RealTimeState | undefined>(undefined);

interface RealTimeProviderProps {
  children: ReactNode;
}

export function RealTimeProvider({ children }: RealTimeProviderProps) {
  const { items, totalPrice, totalItems } = useCart();
  const { likeCount } = useLike();
  const { user, isAuthenticated } = useAuth();
  
  // Real-time state
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartLastUpdated, setCartLastUpdated] = useState(Date.now());
  const [orderCount, setOrderCount] = useState(0);
  const [userLikeCount, setUserLikeCount] = useState(0);
  const [userLastUpdated, setUserLastUpdated] = useState(Date.now());
  const [lastSyncTime, setLastSyncTime] = useState(Date.now());
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [notifications, setNotifications] = useState<Array<{id: string, message: string, type: string}>>([]);

  // Real-time cart synchronization
  useEffect(() => {
    setCartCount(totalItems);
    setCartTotal(totalPrice);
    setCartLastUpdated(Date.now());
    
    // Show notification for cart changes
    if (totalItems > cartCount) {
      showNotification('Item added to cart!', 'success');
    } else if (totalItems < cartCount && cartCount > 0) {
      showNotification('Item removed from cart', 'info');
    }
  }, [totalItems, totalPrice, items]);

  // Real-time user data synchronization
  useEffect(() => {
    setUserLikeCount(likeCount);
    setUserLastUpdated(Date.now());
  }, [likeCount]);

  // Real-time order count updates
  useEffect(() => {
    if (isAuthenticated && user) {
      loadOrderCount();
    }
  }, [isAuthenticated, user]);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      showNotification('Back online! Syncing data...', 'success');
      forceSync();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      showNotification('Connection lost. Changes will sync when back online.', 'error');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Auto-sync every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (isOnline && isAuthenticated) {
        forceSync();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isOnline, isAuthenticated]);

  const loadOrderCount = async () => {
    if (!user?.id) return;
    
    try {
      const orders = await orderApi.getUserOrders(user.id);
      setOrderCount(orders.length);
    } catch (error) {
      console.error('Failed to load order count:', error);
    }
  };

  const updateCartStats = useCallback(() => {
    setCartCount(totalItems);
    setCartTotal(totalPrice);
    setCartLastUpdated(Date.now());
  }, [totalItems, totalPrice]);

  const updateUserStats = useCallback(async () => {
    if (!isAuthenticated || !user) return;
    
    try {
      // Reload order count
      await loadOrderCount();
      
      // Update user data timestamp
      setUserLastUpdated(Date.now());
    } catch (error) {
      console.error('Failed to update user stats:', error);
    }
  }, [isAuthenticated, user]);

  const forceSync = useCallback(async () => {
    if (!isOnline) return;
    
    try {
      updateCartStats();
      await updateUserStats();
      setLastSyncTime(Date.now());
    } catch (error) {
      console.error('Sync failed:', error);
    }
  }, [isOnline, updateCartStats, updateUserStats]);

  const showNotification = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString();
    const newNotification = { id, message, type };
    
    setNotifications(prev => [...prev, newNotification]);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  }, []);

  const value: RealTimeState = {
    cartCount,
    cartTotal,
    cartLastUpdated,
    orderCount,
    likeCount: userLikeCount,
    userLastUpdated,
    lastSyncTime,
    isOnline,
    forceSync,
    updateCartStats,
    updateUserStats,
    showNotification
  };

  return (
    <RealTimeContext.Provider value={value}>
      {children}
      
      {/* Real-time Notifications */}
      <div className="fixed bottom-4 right-4 z-[9999] space-y-2">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`px-4 py-2 rounded-lg shadow-lg text-white font-medium transform transition-all duration-300 animate-slide-in ${
              notification.type === 'success' ? 'bg-green-500' :
              notification.type === 'error' ? 'bg-red-500' :
              'bg-blue-500'
            }`}
          >
            {notification.message}
          </div>
        ))}
      </div>
      
      {/* Connection Status Indicator */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 bg-red-500 text-white text-center py-2 z-[9998]">
          <span className="font-medium">⚠️ No internet connection - Changes will sync when back online</span>
        </div>
      )}
    </RealTimeContext.Provider>
  );
}

export function useRealTime() {
  const context = useContext(RealTimeContext);
  if (context === undefined) {
    throw new Error('useRealTime must be used within a RealTimeProvider');
  }
  return context;
}
