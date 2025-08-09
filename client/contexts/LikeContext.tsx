import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { userApi } from "@/services/userApi";

interface LikeContextType {
  likedProducts: Set<string>;
  toggleLike: (productId: string, onAuthRequired?: () => void) => Promise<boolean>;
  isLiked: (productId: string) => boolean;
  refreshLikes: () => Promise<void>;
  likeCount: number;
}

const LikeContext = createContext<LikeContextType | undefined>(undefined);

export function LikeProvider({ children }: { children: React.ReactNode }) {
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
  const { isAuthenticated, user, onAuthStateChange } = useAuth();

  // Memoize loadLikedProducts to prevent recreation on every render
  const loadLikedProducts = useCallback(async () => {
    try {
      // Load from server first
      const wishlist = await userApi.getWishlist();
      const likedProductIds = wishlist.map(item => item.productId);
      const newLikedProducts = new Set(likedProductIds);
      setLikedProducts(newLikedProducts);

      // Update localStorage as backup
      if (user) {
        localStorage.setItem(
          `likedProducts_${user.id}`,
          JSON.stringify(likedProductIds)
        );
      }
    } catch (error) {
      console.error("Error loading liked products from server:", error);

      // Fallback to localStorage if server fails
      if (user) {
        const stored = localStorage.getItem(`likedProducts_${user.id}`);
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            setLikedProducts(new Set(parsed));
          } catch (parseError) {
            console.error("Error parsing liked products from localStorage:", parseError);
          }
        }
      }
    }
  }, [user]); // Only depend on user to prevent infinite loops

  // Load liked products from server and localStorage as backup (only for authenticated users)
  useEffect(() => {
    if (isAuthenticated && user) {
      loadLikedProducts();
    } else {
      // Clear likes when user logs out
      setLikedProducts(new Set());
    }
  }, [isAuthenticated, user, loadLikedProducts]);

  // Listen for auth state changes to refresh likes immediately
  useEffect(() => {
    if (!onAuthStateChange) return;

    const unsubscribe = onAuthStateChange((isAuth, userData) => {
      if (isAuth && userData) {
        // User just logged in - the main useEffect will handle loading
        // We don't need to call loadLikedProducts here to avoid double loading
      } else {
        // User logged out, clear likes
        setLikedProducts(new Set());
      }
    });

    return unsubscribe;
  }, [onAuthStateChange]);

  // Save to localStorage whenever liked products change (only for authenticated users)
  useEffect(() => {
    if (isAuthenticated && user && likedProducts.size > 0) {
      localStorage.setItem(
        `likedProducts_${user.id}`,
        JSON.stringify([...likedProducts]),
      );
    }
  }, [likedProducts, isAuthenticated, user]);

  const toggleLike = useCallback(async (productId: string, onAuthRequired?: () => void): Promise<boolean> => {
    if (!isAuthenticated) {
      // Call the callback to show auth modal or redirect
      if (onAuthRequired) {
        onAuthRequired();
      }
      return false;
    }

    try {
      const wasLiked = likedProducts.has(productId);

      // Optimistically update UI
      setLikedProducts((prev) => {
        const newSet = new Set(prev);
        if (wasLiked) {
          newSet.delete(productId);
        } else {
          newSet.add(productId);
        }
        return newSet;
      });

      // Update server
      if (wasLiked) {
        await userApi.removeFromWishlist(productId);
      } else {
        await userApi.addToWishlist(productId);
      }

      return true;
    } catch (error) {
      console.error("Error toggling like:", error);

      // Revert optimistic update on error
      setLikedProducts((prev) => {
        const newSet = new Set(prev);
        if (prev.has(productId)) {
          newSet.delete(productId);
        } else {
          newSet.add(productId);
        }
        return newSet;
      });

      return false;
    }
  }, [isAuthenticated, likedProducts]);

  const refreshLikes = useCallback(async () => {
    if (isAuthenticated && user) {
      await loadLikedProducts();
    }
  }, [isAuthenticated, user, loadLikedProducts]);

  const isLiked = useCallback((productId: string) => {
    return likedProducts.has(productId);
  }, [likedProducts]);

  return (
    <LikeContext.Provider value={{
      likedProducts,
      toggleLike,
      isLiked,
      refreshLikes,
      likeCount: likedProducts.size
    }}>
      {children}
    </LikeContext.Provider>
  );
}

export function useLike() {
  const context = useContext(LikeContext);
  if (!context) {
    throw new Error("useLike must be used within a LikeProvider");
  }
  return context;
}
