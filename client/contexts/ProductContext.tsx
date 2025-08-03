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
  const [products, setProducts] = useState<Product[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load products from backend API with local fallback
  const loadProductsFromAPI = async (signal?: AbortSignal) => {
    try {
      setIsLoading(true);

      // Try to load from API with a shorter timeout for faster fallback
      const timeoutController = new AbortController();
      const apiTimeout = setTimeout(() => timeoutController.abort(), 5000); // 5 second timeout

      const apiProducts = await productApi.getAll();
      clearTimeout(apiTimeout);
      setProducts(apiProducts);
    } catch (error) {
      // Don't log errors for cancelled requests
      if (
        error instanceof Error &&
        error.name !== "AbortError" &&
        !error.message.includes("cancelled")
      ) {
        console.warn("API failed, falling back to local products data:", error.message);

        // Always fall back to local data on any API failure
        try {
          const { PRODUCTS } = await import("@/data/products");
          setProducts(PRODUCTS);
          console.log("Successfully loaded local products data as fallback");
          return; // Exit early since we have data
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

  // Load products from API on mount
  useEffect(() => {
    const abortController = new AbortController();

    // Add a timeout to prevent hanging indefinitely
    const timeoutId = setTimeout(() => {
      console.warn('Product loading timeout, initializing with empty state');
      setProducts([]);
      setIsLoading(false);
      setIsInitialized(true);
    }, 10000); // 10 second timeout

    loadProductsFromAPI(abortController.signal).finally(() => {
      clearTimeout(timeoutId);
    });

    return () => {
      abortController.abort();
      clearTimeout(timeoutId);
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
    // Reload products from API
    await loadProductsFromAPI();
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
      {!isInitialized ? (
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
