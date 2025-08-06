import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/AuthModal";

export function useAuthRequired() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated } = useAuth();

  const requireAuth = (action: () => void, feature?: string) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return false;
    }
    action();
    return true;
  };

  const AuthModalComponent = () => (
    <AuthModal
      isOpen={showAuthModal}
      onClose={() => setShowAuthModal(false)}
      defaultMode="login"
    />
  );

  return {
    requireAuth,
    AuthModalComponent,
    isAuthenticated,
  };
}
