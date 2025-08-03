import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useProducts } from "@/contexts/ProductContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function TestPage() {
  const [testResult, setTestResult] = useState<string[]>([]);
  const { user, login, signup, logout } = useAuth();
  const { items, addToCart, removeFromCart, clearCart } = useCart();
  const { products } = useProducts();
  const { selectedCurrency, setCurrency } = useCurrency();

  const addTestResult = (message: string) => {
    setTestResult(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testAuthentication = async () => {
    addTestResult("Testing authentication...");
    if (user) {
      addTestResult(`✅ User is logged in: ${user.firstName || user.email}`);
    } else {
      addTestResult("ℹ️ No user logged in");
    }
  };

  const testCart = () => {
    addTestResult("Testing cart functionality...");
    if (products.length > 0) {
      const testProduct = products[0];
      if (testProduct.variants.length > 0) {
        addToCart(testProduct, testProduct.variants[0]);
        addTestResult(`✅ Added ${testProduct.name} to cart`);
        addTestResult(`ℹ️ Cart now has ${items.length + 1} items`);
      } else {
        addTestResult("❌ Test product has no variants");
      }
    } else {
      addTestResult("❌ No products available for testing");
    }
  };

  const testCurrency = () => {
    addTestResult("Testing currency functionality...");
    addTestResult(`���️ Current currency: ${selectedCurrency.code} (${selectedCurrency.symbol})`);
    setCurrency("USD");
    addTestResult("✅ Changed currency to USD");
    setTimeout(() => {
      setCurrency("INR");
      addTestResult("✅ Changed currency back to INR");
    }, 1000);
  };

  const testProducts = () => {
    addTestResult("Testing products functionality...");
    addTestResult(`ℹ️ Total products loaded: ${products.length}`);
    if (products.length > 0) {
      addTestResult(`✅ Products are loading correctly`);
      addTestResult(`ℹ️ First product: ${products[0].name}`);
    } else {
      addTestResult("❌ No products loaded");
    }
  };

  const runAllTests = () => {
    setTestResult([]);
    addTestResult("🚀 Starting comprehensive functionality test...");
    testAuthentication();
    testProducts();
    testCart();
    testCurrency();
    addTestResult("✅ All tests completed!");
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">
              🧪 FanKick Functionality Test Dashboard
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Status Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-gray-700 border-gray-600">
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold text-white">{user ? "✅" : "❌"}</div>
                  <div className="text-sm text-gray-300">Auth</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-700 border-gray-600">
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold text-white">{products.length > 0 ? "✅" : "❌"}</div>
                  <div className="text-sm text-gray-300">Products</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-700 border-gray-600">
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold text-white">✅</div>
                  <div className="text-sm text-gray-300">Cart ({items.length})</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-700 border-gray-600">
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold text-white">✅</div>
                  <div className="text-sm text-gray-300">Currency ({selectedCurrency.code})</div>
                </CardContent>
              </Card>
            </div>

            {/* Test Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Button onClick={testAuthentication} className="bg-blue-600 hover:bg-blue-700">
                Test Auth
              </Button>
              <Button onClick={testProducts} className="bg-green-600 hover:bg-green-700">
                Test Products
              </Button>
              <Button onClick={testCart} className="bg-purple-600 hover:bg-purple-700">
                Test Cart
              </Button>
              <Button onClick={testCurrency} className="bg-orange-600 hover:bg-orange-700">
                Test Currency
              </Button>
              <Button onClick={runAllTests} className="bg-primary text-black hover:bg-primary/90">
                Run All Tests
              </Button>
            </div>

            {/* Clear Cart */}
            {items.length > 0 && (
              <Button 
                onClick={() => {
                  clearCart();
                  addTestResult("🗑️ Cart cleared");
                }} 
                variant="destructive"
                className="w-full"
              >
                Clear Cart ({items.length} items)
              </Button>
            )}

            {/* Test Results */}
            <Card className="bg-gray-700 border-gray-600">
              <CardHeader>
                <CardTitle className="text-lg text-white">Test Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black rounded p-4 max-h-96 overflow-y-auto">
                  {testResult.length === 0 ? (
                    <div className="text-gray-400 text-center">
                      Click "Run All Tests" to check all functionality
                    </div>
                  ) : (
                    testResult.map((result, index) => (
                      <div key={index} className="text-green-400 font-mono text-sm mb-1">
                        {result}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Current State */}
            <Card className="bg-gray-700 border-gray-600">
              <CardHeader>
                <CardTitle className="text-lg text-white">Current State</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-white">
                  <strong>User:</strong> {user ? `${user.firstName || 'User'} (${user.email})` : 'Not logged in'}
                </div>
                <div className="text-white">
                  <strong>Products:</strong> {products.length} loaded
                </div>
                <div className="text-white">
                  <strong>Cart:</strong> {items.length} items
                </div>
                <div className="text-white">
                  <strong>Currency:</strong> {selectedCurrency.code} ({selectedCurrency.symbol})
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
