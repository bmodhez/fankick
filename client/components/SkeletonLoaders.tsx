import { motion } from "framer-motion";

export function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className="h-48 bg-gray-200 dark:bg-gray-700 shimmer"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded shimmer"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 shimmer"></div>
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 shimmer"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20 shimmer"></div>
        </div>
      </div>
    </div>
  );
}

export function NavigationSkeleton() {
  return (
    <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shimmer">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-full">
        <div className="flex items-center space-x-8">
          <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded shimmer"></div>
          <div className="hidden md:flex space-x-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded shimmer"></div>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full shimmer"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="h-96 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 shimmer">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <div className="h-12 w-96 bg-white/20 rounded shimmer"></div>
          <div className="h-6 w-64 bg-white/20 rounded shimmer mx-auto"></div>
          <div className="h-12 w-32 bg-white/20 rounded shimmer mx-auto"></div>
        </div>
      </div>
    </div>
  );
}

export function LoadingSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      <NavigationSkeleton />
      <HeroSkeleton />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <ProductCardSkeleton />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
