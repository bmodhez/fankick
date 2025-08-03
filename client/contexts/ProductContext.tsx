import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { PRODUCTS, Product } from "@/data/products";

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

  // Sync with localStorage for persistence
  useEffect(() => {
    const savedProducts = localStorage.getItem('fankick-products');

    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts);
        // Only use saved products if they contain data and have valid structure
        if (parsedProducts && Array.isArray(parsedProducts) && parsedProducts.length > 0) {
          setProducts(parsedProducts);
        } else {
          // If saved data is empty or invalid, use default products
          setProducts(PRODUCTS);
          localStorage.setItem('fankick-products', JSON.stringify(PRODUCTS));
        }
      } catch (error) {
        console.error('Error loading saved products:', error);
        // Fallback to default products
        setProducts(PRODUCTS);
        localStorage.setItem('fankick-products', JSON.stringify(PRODUCTS));
      }
    } else {
      // No saved products, use default and save to localStorage
      setProducts(PRODUCTS);
      localStorage.setItem('fankick-products', JSON.stringify(PRODUCTS));
    }
  }, []);

  // Save to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem('fankick-products', JSON.stringify(products));
  }, [products]);

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prevProducts => 
      prevProducts.filter(product => product.id !== id)
    );
  };

  const addProduct = (newProduct: Product) => {
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  const getProductById = (id: string): Product | undefined => {
    return products.find(product => product.id === id);
  };

  const getProductsByCategory = (category: string): Product[] => {
    return products.filter(product => product.category === category);
  };

  const getTrendingProducts = (limit: number = 8): Product[] => {
    return products.filter(product => product.isTrending).slice(0, limit);
  };

  const getProductsBySubcategory = (subcategory: string): Product[] => {
    return products.filter(product => product.subcategory === subcategory);
  };

  const searchProducts = (query: string): Product[] => {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  };

  const refreshProducts = () => {
    // Reset to original products (useful for testing)
    setProducts(PRODUCTS);
    localStorage.removeItem('fankick-products');
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
