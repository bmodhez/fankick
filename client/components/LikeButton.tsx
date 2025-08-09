import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLike } from "@/contexts/LikeContext";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  productId: string;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  showLoginMessage?: boolean;
  onAuthRequired?: () => void;
}

export function LikeButton({
  productId,
  className,
  size = "sm",
  variant = "outline",
  showLoginMessage = true,
  onAuthRequired,
}: LikeButtonProps) {
  const { isAuthenticated } = useAuth();
  const { isLiked, toggleLike } = useLike();
  const [isLoading, setIsLoading] = useState(false);

  const handleLikeToggle = async () => {
    if (!isAuthenticated) {
      if (showLoginMessage) {
        alert("Please log in to like products");
      }
      if (onAuthRequired) {
        onAuthRequired();
      }
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    try {
      console.log("🔄 Toggling like for product:", productId);
      const success = await toggleLike(productId, onAuthRequired);
      console.log("✅ Like toggle result:", success);
    } catch (error) {
      console.error("❌ Error toggling like:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const productIsLiked = isLiked(productId);

  return (
    <Button
      size={size}
      variant={variant}
      className={cn(
        "transition-all duration-200",
        productIsLiked && "text-red-500 hover:text-red-600",
        !productIsLiked && "hover:text-red-500",
        isLoading && "opacity-50 cursor-not-allowed",
        className,
      )}
      onClick={handleLikeToggle}
      disabled={isLoading}
      aria-label={productIsLiked ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        className={cn(
          "w-4 h-4 transition-all duration-200",
          productIsLiked && "fill-current",
        )}
      />
    </Button>
  );
}
