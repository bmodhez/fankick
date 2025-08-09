import React, { createContext, useContext, useState, useEffect } from "react";
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
  const { isAuthenticated, user } = useAuth();

  // Load liked products from server and localStorage as backup (only for authenticated users)
  useEffect(() => {
    if (isAuthenticated && user) {
      loadLikedProducts();
    } else {
      // Clear likes when user logs out
      setLikedProducts(new Set());
    }
  }, [isAuthenticated, user]);

  const loadLikedProducts = async () => {
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
  };

  // Save to localStorage whenever liked products change (only for authenticated users)
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem(
        `likedProducts_${user.id}`,
        JSON.stringify([...likedProducts]),
      );
    }
  }, [likedProducts, isAuthenticated, user]);

  const toggleLike = async (productId: string, onAuthRequired?: () => void): Promise<boolean> => {
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

      // Update localStorage
      if (user) {
        const newArray = [...likedProducts];
        if (wasLiked) {
          const index = newArray.indexOf(productId);
          if (index > -1) newArray.splice(index, 1);
        } else {
          newArray.push(productId);
        }
        localStorage.setItem(
          `likedProducts_${user.id}`,
          JSON.stringify(newArray)
        );
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
  };

  const refreshLikes = async () => {
    if (isAuthenticated && user) {
      await loadLikedProducts();
    }
  };

  const isLiked = (productId: string) => {
    return likedProducts.has(productId);
  };

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
