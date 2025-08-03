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

  // Load products from backend API
  const loadProductsFromAPI = async () => {
    try {
      setIsLoading(true);
      const apiProducts = await productApi.getAll();
      setProducts(apiProducts);
    } catch (error) {
      console.error("Error loading products from API:", error);
      // On error, we could fallback to cached products or show an error state
      setProducts([]);
    } finally {
      setIsLoading(false);
      setIsInitialized(true);
    }
  };

  // Load products from API on mount
  useEffect(() => {
    loadProductsFromAPI();
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

  // Don't render children until context is fully initialized
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
