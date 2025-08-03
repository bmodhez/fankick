import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { PRODUCTS, Product } from "@/data/products";
import { isStorageQuotaExceeded } from "@/utils/storage";

interface ProductContextType {
  products: Product[];
  setProducts: (products: Product[]) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addProduct: (product: Product) => void;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  getTrendingProducts: (limit?: number) => Product[];
  getProductsBySubcategory: (subcategory: string) => Product[];
  searchProducts: (query: string) => Product[];
  refreshProducts: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export function ProductProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [isInitialized, setIsInitialized] = useState(false);

  // Helper function to safely save to localStorage
  const saveToLocalStorage = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      if (isStorageQuotaExceeded(error)) {
        console.warn(
          "localStorage quota exceeded. Clearing old data and retrying...",
        );
        try {
          // Clear localStorage and try again
          localStorage.clear();
          localStorage.setItem(key, JSON.stringify(data));
          return true;
        } catch (retryError) {
          console.error(
            "Failed to save to localStorage even after clearing:",
            retryError,
          );
          return false;
        }
      } else {
        console.error("Error saving to localStorage:", error);
        return false;
      }
    }
  };

  // Sync with localStorage for persistence
  useEffect(() => {
    const savedProducts = localStorage.getItem("fankick-products");
    const savedVersion = localStorage.getItem("fankick-products-version");
    const savedChanges = localStorage.getItem("fankick-product-changes");

    try {
      // Check if we have a changes-based storage
      if (savedVersion === "changes" && savedChanges) {
        const changes = JSON.parse(savedChanges);
        if (Array.isArray(changes)) {
          // Apply changes to original PRODUCTS
          const updatedProducts = [...PRODUCTS];
          changes.forEach((changedProduct) => {
            const index = updatedProducts.findIndex(
              (p) => p.id === changedProduct.id,
            );
            if (index >= 0) {
              updatedProducts[index] = changedProduct;
            } else {
              updatedProducts.push(changedProduct);
            }
          });
          setProducts(updatedProducts);
          return;
        }
      }

      // Fallback to full products storage
      if (savedProducts) {
        const parsedProducts = JSON.parse(savedProducts);
        // Only use saved products if they contain data and have valid structure
        if (
          parsedProducts &&
          Array.isArray(parsedProducts) &&
          parsedProducts.length > 0
        ) {
          setProducts(parsedProducts);
        } else {
          // If saved data is empty or invalid, use default products
          setProducts(PRODUCTS);
        }
      } else {
        // No saved products, use default products
        setProducts(PRODUCTS);
      }
    } catch (error) {
      console.error("Error loading saved products:", error);
      // Fallback to default products
      setProducts(PRODUCTS);
      // Clear corrupted data
      localStorage.removeItem("fankick-products");
      localStorage.removeItem("fankick-product-changes");
      localStorage.removeItem("fankick-products-version");
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever products change (with error handling)
  useEffect(() => {
    // Only save if products have been modified from the original PRODUCTS
    // This prevents unnecessary saves and reduces quota usage
    const hasChanges =
      products.length !== PRODUCTS.length ||
      products.some((product, index) => {
        const original = PRODUCTS[index];
        return (
          !original ||
          product.id !== original.id ||
          JSON.stringify(product) !== JSON.stringify(original)
        );
      });

    if (hasChanges) {
      // Instead of saving the entire products array, save only the changes
      // to reduce localStorage usage
      const changes = products.filter((product) => {
        const original = PRODUCTS.find((p) => p.id === product.id);
        return (
          !original || JSON.stringify(product) !== JSON.stringify(original)
        );
      });

      // If there are too many changes (indicating mostly new products),
      // save the full array, otherwise save just the changes
      if (changes.length > PRODUCTS.length * 0.5) {
        saveToLocalStorage("fankick-products", products);
      } else {
        saveToLocalStorage("fankick-product-changes", changes);
        saveToLocalStorage("fankick-products-version", "changes");
      }
    }
  }, [products]);

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      ),
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id),
    );
  };

  const addProduct = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
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

  const refreshProducts = () => {
    // Reset to original products (useful for testing)
    setProducts(PRODUCTS);
    localStorage.removeItem("fankick-products");
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
  };

  // Don't render children until context is fully initialized
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <ProductContext.Provider value={value}>
      {children}
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
