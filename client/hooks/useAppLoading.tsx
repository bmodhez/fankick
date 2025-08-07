import { useState, useEffect } from "react";

export function useAppLoading() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    // Check if this is the first load
    const hasLoadedBefore = sessionStorage.getItem("app-has-loaded");
    
    if (hasLoadedBefore) {
      setIsLoading(false);
      setIsFirstLoad(false);
      return;
    }

    // Simulate app initialization time
    const minimumLoadTime = 2000; // 2 seconds minimum
    const startTime = Date.now();

    // Wait for DOM and resources to be ready
    const handleLoad = () => {
      const loadTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minimumLoadTime - loadTime);

      setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem("app-has-loaded", "true");
      }, remainingTime);
    };

    // If document is already loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  const resetLoading = () => {
    sessionStorage.removeItem("app-has-loaded");
    setIsLoading(true);
    setIsFirstLoad(true);
  };

  return {
    isLoading,
    isFirstLoad,
    resetLoading,
    setIsLoading: (loading: boolean) => setIsLoading(loading),
  };
}
