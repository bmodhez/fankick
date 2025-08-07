import { motion } from "framer-motion";

interface QuickLoadingProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
}

export function QuickLoading({ isLoading, children, className = "" }: QuickLoadingProps) {
  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Loading...
            </span>
          </div>
        </motion.div>
      )}
      {children}
    </div>
  );
}

export function ButtonLoading({ isLoading, children, disabled, ...props }: any) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`relative ${props.className}`}
    >
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-current rounded"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
          />
        </motion.div>
      )}
      <span className={isLoading ? "opacity-0" : "opacity-100"}>
        {children}
      </span>
    </button>
  );
}

export function CardLoading({ isLoading, children, className = "" }: QuickLoadingProps) {
  if (isLoading) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Professional loading dots like Amazon/Flipkart
export function LoadingDots({ size = "md", color = "primary" }: { size?: "sm" | "md" | "lg"; color?: string }) {
  const dotSizes = {
    sm: "w-1 h-1",
    md: "w-2 h-2", 
    lg: "w-3 h-3"
  };

  const dotColors = {
    primary: "bg-primary",
    white: "bg-white",
    gray: "bg-gray-400"
  };

  return (
    <div className="flex space-x-1">
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          className={`${dotSizes[size]} ${dotColors[color as keyof typeof dotColors] || `bg-${color}`} rounded-full`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
