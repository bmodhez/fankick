import { useState, useEffect } from "react";

interface AppInitializerProps {
  children: React.ReactNode;
}

export function AppInitializer({ children }: AppInitializerProps) {
  const [isInitializing, setIsInitializing] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if app has been loaded before in this session
    const hasLoaded = sessionStorage.getItem("app-loaded");

    if (hasLoaded) {
      setIsInitializing(false);
      return;
    }

    // Simulate app loading
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsInitializing(false);
            sessionStorage.setItem("app-loaded", "true");
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (isInitializing) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Loading Content */}
        <div className="relative z-10 text-center">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-primary via-cyan-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl shadow-primary/25 mx-auto mb-6 animate-spin">
              <span className="text-white font-bold text-3xl">⚡</span>
            </div>

            <h1 className="font-sport font-bold text-5xl tracking-wide text-white mb-2">
              FAN<span className="text-primary">KICK</span>
            </h1>
            <p className="text-gray-300 text-lg">Your Ultimate Fan Store</p>
          </div>

          {/* Progress Bar */}
          <div className="w-64 mx-auto">
            <div className="w-full bg-gray-700 rounded-full h-3 mb-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="text-gray-300 text-sm">
              Loading... {Math.round(Math.min(progress, 100))}%
            </p>
          </div>

          {/* Loading Dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 bg-primary rounded-full animate-pulse"
                style={{ animationDelay: `${index * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <div>{children}</div>;
}
