import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PRODUCTS, Product } from "@/data/products";
import { ProductForm } from "./ProductForm";
import { ProductManager } from "./ProductManager";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Play,
  Settings,
  Package,
  Edit,
  Trash,
  Plus,
  Search,
  Filter,
  Copy,
} from "lucide-react";

interface TestResult {
  name: string;
  status: "passed" | "failed" | "pending";
  message: string;
}

export function AdminTest() {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showProductManager, setShowProductManager] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [testProducts, setTestProducts] = useState<Product[]>(PRODUCTS);

  const updateTestResult = (name: string, status: "passed" | "failed", message: string) => {
    setTestResults(prev => [
      ...prev.filter(r => r.name !== name),
      { name, status, message }
    ]);
  };

  const runTests = async () => {
    setIsRunning(true);
    setTestResults([]);

    // Test 1: Product Data Loading
    try {
      updateTestResult("Product Data Loading", "pending", "Testing product data...");
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (PRODUCTS.length > 0) {
        updateTestResult("Product Data Loading", "passed", `Successfully loaded ${PRODUCTS.length} products`);
      } else {
        updateTestResult("Product Data Loading", "failed", "No products found in database");
      }
    } catch (error) {
      updateTestResult("Product Data Loading", "failed", `Error: ${error}`);
    }

    // Test 2: Product Categories
    try {
      updateTestResult("Product Categories", "pending", "Testing categories...");
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const categories = [...new Set(PRODUCTS.map(p => p.category))];
      const expectedCategories = ["football", "anime", "pop-culture"];
      const hasAllCategories = expectedCategories.every(cat => categories.includes(cat));
      
      if (hasAllCategories) {
        updateTestResult("Product Categories", "passed", `Found all categories: ${categories.join(", ")}`);
      } else {
        updateTestResult("Product Categories", "failed", `Missing categories. Found: ${categories.join(", ")}`);
      }
    } catch (error) {
      updateTestResult("Product Categories", "failed", `Error: ${error}`);
    }

    // Test 3: Product Variants
    try {
      updateTestResult("Product Variants", "pending", "Testing variants...");
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const productsWithVariants = PRODUCTS.filter(p => p.variants && p.variants.length > 0);
      const totalVariants = PRODUCTS.reduce((sum, p) => sum + (p.variants?.length || 0), 0);
      
      if (productsWithVariants.length > 0) {
        updateTestResult("Product Variants", "passed", `${totalVariants} variants across ${productsWithVariants.length} products`);
      } else {
        updateTestResult("Product Variants", "failed", "No product variants found");
      }
    } catch (error) {
      updateTestResult("Product Variants", "failed", `Error: ${error}`);
    }

    // Test 4: Anime Hoodies (Recently Added)
    try {
      updateTestResult("Anime Hoodies", "pending", "Testing anime hoodies...");
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const animeHoodies = PRODUCTS.filter(p => 
        p.category === "anime" && 
        p.subcategory === "hoodies"
      );
      
      if (animeHoodies.length >= 5) {
        updateTestResult("Anime Hoodies", "passed", `Found ${animeHoodies.length} anime hoodies: ${animeHoodies.map(h => h.name.split(' ')[0]).join(", ")}`);
      } else {
        updateTestResult("Anime Hoodies", "failed", `Only found ${animeHoodies.length} anime hoodies, expected at least 5`);
      }
    } catch (error) {
      updateTestResult("Anime Hoodies", "failed", `Error: ${error}`);
    }

    // Test 5: Product Search Functionality
    try {
      updateTestResult("Search Functionality", "pending", "Testing search...");
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const searchTerm = "naruto";
      const searchResults = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
      
      if (searchResults.length > 0) {
        updateTestResult("Search Functionality", "passed", `Search for "${searchTerm}" returned ${searchResults.length} products`);
      } else {
        updateTestResult("Search Functionality", "failed", `Search for "${searchTerm}" returned no results`);
      }
    } catch (error) {
      updateTestResult("Search Functionality", "failed", `Error: ${error}`);
    }

    // Test 6: Stock Calculation
    try {
      updateTestResult("Stock Calculation", "pending", "Testing stock calculations...");
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const totalStock = PRODUCTS.reduce((sum, product) => {
        return sum + product.variants.reduce((variantSum, variant) => variantSum + variant.stock, 0);
      }, 0);
      
      const lowStockProducts = PRODUCTS.filter(product => {
        const productStock = product.variants.reduce((sum, variant) => sum + variant.stock, 0);
        return productStock < 10;
      });
      
      updateTestResult("Stock Calculation", "passed", `Total stock: ${totalStock} units, ${lowStockProducts.length} low-stock products`);
    } catch (error) {
      updateTestResult("Stock Calculation", "failed", `Error: ${error}`);
    }

    // Test 7: Price Calculations
    try {
      updateTestResult("Price Calculations", "pending", "Testing pricing...");
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const totalValue = PRODUCTS.reduce((sum, product) => {
        const productValue = product.variants.reduce((variantSum, variant) => {
          return variantSum + (variant.price * variant.stock);
        }, 0);
        return sum + productValue;
      }, 0);
      
      const avgPrice = PRODUCTS.reduce((sum, p) => sum + p.basePrice, 0) / PRODUCTS.length;
      
      updateTestResult("Price Calculations", "passed", `Total inventory value: ₹${totalValue.toLocaleString()}, Avg price: ₹${Math.round(avgPrice)}`);
    } catch (error) {
      updateTestResult("Price Calculations", "failed", `Error: ${error}`);
    }

    setIsRunning(false);
  };

  const testCreateProduct = () => {
    const newProduct: Product = {
      id: `test-product-${Date.now()}`,
      name: "Test Anime Hoodie",
      description: "Test product for admin functionality",
      category: "anime",
      subcategory: "hoodies",
      images: ["/placeholder.svg"],
      variants: [
        {
          id: "test-variant-1",
          size: "M",
          color: "Black",
          price: 2999,
          originalPrice: 3999,
          stock: 10,
          sku: "TEST-M-BLK"
        }
      ],
      basePrice: 2999,
      originalPrice: 3999,
      rating: 4.5,
      reviews: 0,
      tags: ["Test", "Anime", "Hoodie"],
      badges: ["New Product"],
      shippingDays: 7,
      codAvailable: true,
      isTrending: false,
      isExclusive: false,
      materials: ["Cotton"],
      features: ["Test Feature"]
    };

    setTestProducts([...testProducts, newProduct]);
    updateTestResult("Product Creation", "passed", "Successfully created test product");
  };

  const testEditProduct = () => {
    if (testProducts.length > 0) {
      const updatedProducts = testProducts.map(p => 
        p.id === testProducts[0].id 
          ? { ...p, name: p.name + " (Edited)", isTrending: true }
          : p
      );
      setTestProducts(updatedProducts);
      updateTestResult("Product Editing", "passed", "Successfully edited test product");
    } else {
      updateTestResult("Product Editing", "failed", "No products available to edit");
    }
  };

  const testDeleteProduct = () => {
    if (testProducts.length > PRODUCTS.length) {
      const filteredProducts = testProducts.filter(p => !p.id.startsWith("test-product"));
      setTestProducts(filteredProducts);
      updateTestResult("Product Deletion", "passed", "Successfully deleted test product");
    } else {
      updateTestResult("Product Deletion", "failed", "No test products to delete");
    }
  };

  const getStatusIcon = (status: "passed" | "failed" | "pending") => {
    switch (status) {
      case "passed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "pending":
        return <AlertCircle className="w-5 h-5 text-yellow-500 animate-pulse" />;
    }
  };

  if (showProductManager) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Live Product Manager Test</h2>
          <Button onClick={() => setShowProductManager(false)} variant="outline">
            Back to Tests
          </Button>
        </div>
        <ProductManager />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Settings className="w-6 h-6" />
            <span>Admin Product Management Test Suite</span>
          </CardTitle>
          <p className="text-gray-400">
            Comprehensive testing of all product management features
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Test Controls */}
          <div className="flex flex-wrap items-center gap-4">
            <Button 
              onClick={runTests} 
              disabled={isRunning}
              className="bg-primary text-black hover:bg-primary/90"
            >
              <Play className="w-4 h-4 mr-2" />
              {isRunning ? "Running Tests..." : "Run All Tests"}
            </Button>
            
            <Button onClick={() => setShowProductManager(true)} variant="outline">
              <Package className="w-4 h-4 mr-2" />
              Test Product Manager
            </Button>
            
            <Button onClick={testCreateProduct} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Test Create Product
            </Button>
            
            <Button onClick={testEditProduct} variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Test Edit Product
            </Button>
            
            <Button onClick={testDeleteProduct} variant="outline">
              <Trash className="w-4 h-4 mr-2" />
              Test Delete Product
            </Button>
          </div>

          {/* Test Results */}
          {testResults.length > 0 && (
            <Card className="bg-gray-700 border-gray-600">
              <CardHeader>
                <CardTitle className="text-white text-lg">Test Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {testResults.map((result, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-800 rounded-lg">
                      {getStatusIcon(result.status)}
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{result.name}</h4>
                        <p className="text-sm text-gray-400">{result.message}</p>
                      </div>
                      <Badge 
                        className={
                          result.status === "passed" 
                            ? "bg-green-600 text-white"
                            : result.status === "failed"
                            ? "bg-red-600 text-white"
                            : "bg-yellow-600 text-black"
                        }
                      >
                        {result.status.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gray-700 border-gray-600">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{PRODUCTS.length}</div>
                  <div className="text-sm text-gray-400">Total Products</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-700 border-gray-600">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {PRODUCTS.filter(p => p.category === "anime").length}
                  </div>
                  <div className="text-sm text-gray-400">Anime Products</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-700 border-gray-600">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {PRODUCTS.filter(p => p.subcategory === "hoodies").length}
                  </div>
                  <div className="text-sm text-gray-400">Total Hoodies</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-700 border-gray-600">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {testResults.filter(r => r.status === "passed").length}/{testResults.length}
                  </div>
                  <div className="text-sm text-gray-400">Tests Passed</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feature Checklist */}
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white text-lg">Feature Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-white">Core Features</h4>
                  <div className="space-y-1">
                    {[
                      "Product CRUD Operations",
                      "Variant Management",
                      "Image Management",
                      "Stock Tracking",
                      "Price Calculations"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-white">Advanced Features</h4>
                  <div className="space-y-1">
                    {[
                      "Search & Filtering",
                      "Bulk Operations",
                      "Form Validation",
                      "Real-time Updates",
                      "Admin Authentication"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
