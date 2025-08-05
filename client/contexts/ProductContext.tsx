import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "@/data/products";
import { productApi } from "@/services/api";

interface ProductContextType {
  products: Product[];
  setProducts: (products: Product[]) => void;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addProduct: (
    product: Omit<
      Product,
      "id" | "rating" | "reviews" | "createdAt" | "updatedAt"
    >,
  ) => Promise<Product>;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  getTrendingProducts: (limit?: number) => Product[];
  getProductsBySubcategory: (subcategory: string) => Product[];
  searchProducts: (query: string) => Product[];
  refreshProducts: () => Promise<void>;
  isLoading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export function ProductProvider({ children }: ProductProviderProps) {
  const builderImageUrl =
    "https://cdn.builder.io/api/v1/image/assets%2F6c1dea172d6a4b98b66fa189fb2ab1aa%2Ffac74a824cd940739911733438f9924b?format=webp&width=800";
  const [products, setProducts] = useState<Product[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load local products immediately on initialization
  useEffect(() => {
    const loadLocalProducts = async () => {
      try {
        const { PRODUCTS } = await import("@/data/products");

        // Immediately update all product images to Builder.io image
        const updatedProducts = PRODUCTS.map((product) => ({
          ...product,
          images: [
            builderImageUrl,
            builderImageUrl,
            builderImageUrl,
            builderImageUrl,
          ],
        }));

        console.log("FORCING PRODUCT IMAGES UPDATE:");
        console.log("First product:", updatedProducts[0]?.name);
        console.log("First product image:", updatedProducts[0]?.images[0]);

        // Force immediate state update
        setProducts([...updatedProducts]);
        setIsLoading(false);
        setIsInitialized(true);

        console.log("✅ Products loaded with Builder.io images");
      } catch (error) {
        console.error("❌ Failed to load local products:", error);
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    loadLocalProducts();
  }, [builderImageUrl]);

  // Load products from backend API with local fallback
  const loadProductsFromAPI = async (signal?: AbortSignal) => {
    try {
      // Try to load from API with a shorter timeout for faster fallback
      const timeoutController = new AbortController();
      const combinedSignal = signal
        ? // Create a combined signal that aborts when either signal aborts
          (() => {
            const combined = new AbortController();
            const abort = () => combined.abort();
            signal.addEventListener("abort", abort);
            timeoutController.signal.addEventListener("abort", abort);
            return combined.signal;
          })()
        : timeoutController.signal;

      const apiTimeout = setTimeout(() => timeoutController.abort(), 3000); // 3 second timeout

      const apiProducts = await productApi.getAll();
      clearTimeout(apiTimeout);

      if (!signal?.aborted) {
        setProducts(apiProducts);
        console.log("Successfully loaded products from API");
      }
    } catch (error) {
      // Don't log errors for cancelled requests
      if (
        error instanceof Error &&
        error.name !== "AbortError" &&
        !error.message.includes("cancelled") &&
        !signal?.aborted
      ) {
        console.warn(
          "API failed, falling back to local products data:",
          error.message,
        );

        // Always fall back to local data on any API failure
        try {
          const { PRODUCTS } = await import("@/data/products");
          if (!signal?.aborted) {
            setProducts(PRODUCTS);
            console.log("Successfully loaded local products data as fallback");
          }
        } catch (fallbackError) {
          console.error("Failed to load fallback products:", fallbackError);
        }
      }
    } finally {
      if (!signal?.aborted) {
        setIsLoading(false);
        setIsInitialized(true);
      }
    }
  };

  // Try to enhance with API data (non-blocking)
  useEffect(() => {
    const abortController = new AbortController();

    // Give local data time to load first, then try API
    const delayedApiLoad = setTimeout(() => {
      loadProductsFromAPI(abortController.signal)
        .catch(() => {
          // API failed, but we already have local data loaded
          console.log("API enhancement failed, continuing with local data");
        })
        .finally(() => {
          if (!abortController.signal.aborted) {
            setIsLoading(false);
            setIsInitialized(true);
          }
        });
    }, 1000); // Slightly longer delay to ensure local data loads first

    // Ensure we're not loading forever
    const maxTimeout = setTimeout(() => {
      if (!abortController.signal.aborted) {
        setIsLoading(false);
        setIsInitialized(true);
      }
    }, 8000); // Reduced from 10s to 8s

    return () => {
      abortController.abort();
      clearTimeout(delayedApiLoad);
      clearTimeout(maxTimeout);
    };
  }, []);

  // CRUD operations with API calls

  const updateProduct = async (updatedProduct: Product) => {
    try {
      await productApi.update(updatedProduct.id, updatedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product,
        ),
      );
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await productApi.delete(id);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id),
      );
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  };

  const addProduct = async (
    newProduct: Omit<
      Product,
      "id" | "rating" | "reviews" | "createdAt" | "updatedAt"
    >,
  ) => {
    try {
      const createdProduct = await productApi.create(newProduct);
      setProducts((prevProducts) => [...prevProducts, createdProduct]);
      return createdProduct;
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  };

  const getProductById = (id: string): Product | undefined => {
    return products.find((product) => product.id === id);
  };

  const getProductsByCategory = (category: string): Product[] => {
    return products.filter((product) => product.category === category);
  };

  const getTrendingProducts = (limit: number = 8): Product[] => {
    return products.filter((product) => product.isTrending).slice(0, limit);
  };

  const getProductsBySubcategory = (subcategory: string): Product[] => {
    return products.filter((product) => product.subcategory === subcategory);
  };

  const searchProducts = (query: string): Product[] => {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
    );
  };

  const refreshProducts = async () => {
    // Force immediate refresh with Builder.io images
    const builderImageUrl =
      "https://cdn.builder.io/api/v1/image/assets%2F6c1dea172d6a4b98b66fa189fb2ab1aa%2Ffac74a824cd940739911733438f9924b?format=webp&width=800";
    const { PRODUCTS } = await import("@/data/products");
    const updatedProducts = PRODUCTS.map((product) => ({
      ...product,
      images: [
        builderImageUrl,
        builderImageUrl,
        builderImageUrl,
        builderImageUrl,
      ],
    }));

    setProducts(updatedProducts);
    console.log("Manually refreshed products with Builder.io images");

    // Also try to reload from API
    try {
      await loadProductsFromAPI();
    } catch (error) {
      console.log("API refresh failed, keeping local Builder.io images");
    }
  };

  const value: ProductContextType = {
    products,
    setProducts,
    updateProduct,
    deleteProduct,
    addProduct,
    getProductById,
    getProductsByCategory,
    getTrendingProducts,
    getProductsBySubcategory,
    searchProducts,
    refreshProducts,
    isLoading,
  };

  return (
    <ProductContext.Provider value={value}>
      {!isInitialized && products.length === 0 ? (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        children
      )}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
