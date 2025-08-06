import React, { createContext, useContext, useState, useEffect } from "react";

interface LikeContextType {
  likedProducts: Set<string>;
  toggleLike: (productId: string) => void;
  isLiked: (productId: string) => boolean;
}

const LikeContext = createContext<LikeContextType | undefined>(undefined);

export function LikeProvider({ children }: { children: React.ReactNode }) {
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());

  // Load liked products from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("likedProducts");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setLikedProducts(new Set(parsed));
      } catch (error) {
        console.error("Error loading liked products:", error);
      }
    }
  }, []);

  // Save to localStorage whenever liked products change
  useEffect(() => {
    localStorage.setItem("likedProducts", JSON.stringify([...likedProducts]));
  }, [likedProducts]);

  const toggleLike = (productId: string) => {
    setLikedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const isLiked = (productId: string) => {
    return likedProducts.has(productId);
  };

  return (
    <LikeContext.Provider value={{ likedProducts, toggleLike, isLiked }}>
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
