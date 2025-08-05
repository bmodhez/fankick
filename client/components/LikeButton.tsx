import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { userApi } from "@/services/userApi";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  productId: string;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  showLoginMessage?: boolean;
}

export function LikeButton({ 
  productId, 
  className, 
  size = "sm", 
  variant = "outline",
  showLoginMessage = true 
}: LikeButtonProps) {
  const { user, isAuthenticated } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if product is already liked on component mount
  useEffect(() => {
    if (isAuthenticated && user) {
      checkIfLiked();
    }
  }, [isAuthenticated, user, productId]);

  const checkIfLiked = async () => {
    try {
      const wishlist = await userApi.getWishlist();
      setIsLiked(wishlist.some(item => item.productId === productId));
    } catch (error) {
      console.error('Error checking if product is liked:', error);
    }
  };

  const handleLikeToggle = async () => {
    if (!isAuthenticated) {
      if (showLoginMessage) {
        alert('Please log in to like products');
      }
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    try {
      if (isLiked) {
        await userApi.removeFromWishlist(productId);
        setIsLiked(false);
      } else {
        await userApi.addToWishlist(productId);
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      // Revert the state on error
      setIsLiked(!isLiked);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size={size}
      variant={variant}
      className={cn(
        "transition-all duration-200",
        isLiked && "text-red-500 hover:text-red-600",
        !isLiked && "hover:text-red-500",
        isLoading && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={handleLikeToggle}
      disabled={isLoading}
      aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart 
        className={cn(
          "w-4 h-4 transition-all duration-200",
          isLiked && "fill-current"
        )} 
      />
    </Button>
  );
}
