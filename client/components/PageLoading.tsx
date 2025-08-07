import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { LoadingSkeleton } from "./SkeletonLoaders";

interface PageLoadingProps {
  isLoading: boolean;
}

export function PageLoading({ isLoading }: PageLoadingProps) {
  const location = useLocation();

  if (!isLoading) return null;

  // Determine loading content based on route
  const getLoadingContent = () => {
    const path = location.pathname;
    
    if (path === "/") {
      return <LoadingSkeleton />;
    }
    
    if (path.includes("/product/")) {
      return <ProductPageLoading />;
    }
    
    if (path.includes("/category/") || path.includes("/collections")) {
      return <CategoryPageLoading />;
    }
    
    return <DefaultLoading />;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-white dark:bg-gray-900"
    >
      {getLoadingContent()}
    </motion.div>
  );
}

function ProductPageLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images Skeleton */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg shimmer"></div>
            <div className="flex space-x-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg shimmer"></div>
              ))}
            </div>
          </div>
          
          {/* Product Details Skeleton */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded shimmer"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 shimmer"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 shimmer"></div>
            </div>
            
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded shimmer"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryPageLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 shimmer"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
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
          ))}
        </div>
      </div>
    </div>
  );
}

function DefaultLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
        ></motion.div>
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
}
