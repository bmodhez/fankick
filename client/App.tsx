import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { AppInitializer } from "@/components/AppInitializer";
import { NavigationProgress } from "@/components/NavigationProgress";
import { Navigation } from "@/components/Navigation";
import { ThemeProvider } from "@/components/ThemeProvider";
import ErrorBoundary from "@/components/ErrorBoundary";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProductProvider } from "@/contexts/ProductContext";
import { CartProvider } from "@/contexts/CartContext";
import { LikeProvider } from "@/contexts/LikeContext";
import Index from "./pages/Index";
import IndexAnimated from "./pages/IndexAnimated";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import SearchResults from "./pages/SearchResults";
import UserProfile from "./pages/UserProfile";
import TrendingPage from "./pages/TrendingPage";
import AdminPanel from "./pages/AdminPanel";
import TermsConditions from "./pages/TermsConditions";
import ShippingPolicy from "./pages/ShippingPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";
import TestPage from "./pages/TestPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import CollectionsPage from "./pages/CollectionsPage";
import ScrollToTop from "./components/ScrollToTop";
import { Footer } from "./components/Footer";

const queryClient = new QueryClient();

const AppContent = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="fankick-theme">
          <CurrencyProvider>
            <AuthProvider>
              <ProductProvider>
                <CartProvider>
                  <LikeProvider>
                    <TooltipProvider>
                      <AppInitializer>
                        <Toaster />
                        <Sonner />
                        <BrowserRouter>
                          <NavigationProgress />
                          <ScrollToTop />
                          <div className="min-h-screen">
                            <Routes>
                              <Route
                                path="/"
                                element={
                                  <>
                                    <Navigation />
                                    <Index />
                                  </>
                                }
                              />
                              <Route
                                path="/category/:category"
                                element={
                                  <>
                                    <Navigation />
                                    <CategoryPage />
                                  </>
                                }
                              />
                              {/* Redirect old category URLs to new structure */}
                              <Route
                                path="/anime"
                                element={
                                  <Navigate to="/category/anime" replace />
                                }
                              />
                              <Route
                                path="/football"
                                element={
                                  <Navigate to="/category/football" replace />
                                }
                              />
                              <Route
                                path="/pop-culture"
                                element={
                                  <Navigate
                                    to="/category/pop-culture"
                                    replace
                                  />
                                }
                              />
                              <Route
                                path="/accessories"
                                element={
                                  <Navigate
                                    to="/collections/accessories"
                                    replace
                                  />
                                }
                              />
                              <Route
                                path="/category/accessories"
                                element={
                                  <Navigate
                                    to="/collections/accessories"
                                    replace
                                  />
                                }
                              />
                              <Route
                                path="/merchandise"
                                element={<Navigate to="/collections" replace />}
                              />
                              <Route
                                path="/products"
                                element={<Navigate to="/collections" replace />}
                              />
                              <Route
                                path="/shop"
                                element={<Navigate to="/collections" replace />}
                              />
                              <Route
                                path="/collections"
                                element={
                                  <>
                                    <Navigation />
                                    <CollectionsPage />
                                  </>
                                }
                              />
                              <Route
                                path="/search"
                                element={<SearchResults />}
                              />
                              <Route
                                path="/profile"
                                element={<UserProfile />}
                              />
                              <Route
                                path="/trending"
                                element={
                                  <>
                                    <Navigation />
                                    <TrendingPage />
                                  </>
                                }
                              />
                              <Route
                                path="/collections"
                                element={
                                  <>
                                    <Navigation />
                                    <CollectionsPage />
                                  </>
                                }
                              />
                              <Route
                                path="/collections/:collection"
                                element={
                                  <>
                                    <Navigation />
                                    <CollectionsPage />
                                  </>
                                }
                              />
                              <Route
                                path="/football/:category"
                                element={
                                  <>
                                    <Navigation />
                                    <CollectionsPage />
                                  </>
                                }
                              />
                              <Route
                                path="/anime/:category"
                                element={
                                  <>
                                    <Navigation />
                                    <CollectionsPage />
                                  </>
                                }
                              />
                              <Route
                                path="/pop-culture/:category"
                                element={
                                  <>
                                    <Navigation />
                                    <CollectionsPage />
                                  </>
                                }
                              />
                              <Route
                                path="/product/:id"
                                element={<ProductPage />}
                              />
                              <Route path="/login" element={<Login />} />
                              <Route path="/signup" element={<Signup />} />
                              <Route path="/checkout" element={<Checkout />} />
                              <Route
                                path="/order-success"
                                element={<OrderSuccess />}
                              />
                              <Route
                                path="/terms"
                                element={
                                  <>
                                    <Navigation />
                                    <TermsConditions />
                                  </>
                                }
                              />
                              <Route
                                path="/shipping"
                                element={
                                  <>
                                    <Navigation />
                                    <ShippingPolicy />
                                  </>
                                }
                              />
                              <Route
                                path="/refunds"
                                element={
                                  <>
                                    <Navigation />
                                    <RefundPolicy />
                                  </>
                                }
                              />
                              <Route
                                path="/privacy"
                                element={
                                  <>
                                    <Navigation />
                                    <PrivacyPolicy />
                                  </>
                                }
                              />
                              <Route
                                path="/contact"
                                element={
                                  <>
                                    <Navigation />
                                    <Contact />
                                  </>
                                }
                              />
                              <Route path="/admin" element={<AdminPanel />} />
                              <Route
                                path="/admin/products"
                                element={<AdminPanel />}
                              />
                              <Route
                                path="/admin/orders"
                                element={<AdminPanel />}
                              />
                              <Route
                                path="/admin/customers"
                                element={<AdminPanel />}
                              />
                              <Route
                                path="/admin/categories"
                                element={<AdminPanel />}
                              />
                              <Route
                                path="/admin/images"
                                element={<AdminPanel />}
                              />
                              <Route
                                path="/admin/analytics"
                                element={<AdminPanel />}
                              />
                              <Route
                                path="/admin/content"
                                element={<AdminPanel />}
                              />
                              <Route
                                path="/admin/marketing"
                                element={<AdminPanel />}
                              />
                              <Route
                                path="/admin/chatbot"
                                element={<AdminPanel />}
                              />
                              <Route
                                path="/admin/settings"
                                element={<AdminPanel />}
                              />
                              <Route
                                path="/admin/test"
                                element={<AdminPanel />}
                              />
                              <Route path="/test" element={<TestPage />} />
                              <Route path="*" element={<NotFound />} />
                            </Routes>
                          </div>
                        </BrowserRouter>
                      </AppInitializer>
                    </TooltipProvider>
                  </LikeProvider>
                </CartProvider>
              </ProductProvider>
            </AuthProvider>
          </CurrencyProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

const App = () => <AppContent />;

const rootElement = document.getElementById("root")!;

// Create root if not exists or in development mode for HMR
let root: ReturnType<typeof createRoot>;

// Check if we're in development mode and handle HMR properly
if (import.meta.hot) {
  // In development, always create a fresh root for proper HMR
  if (rootElement.children.length > 0) {
    rootElement.innerHTML = '';
  }
  root = createRoot(rootElement);
} else {
  // In production, use the singleton pattern
  declare global {
    var __APP_ROOT__: ReturnType<typeof createRoot> | undefined;
  }

  if (!globalThis.__APP_ROOT__) {
    globalThis.__APP_ROOT__ = createRoot(rootElement);
  }
  root = globalThis.__APP_ROOT__;
}

root.render(<App />);

// Handle HMR cleanup
if (import.meta.hot) {
  import.meta.hot.accept();
}
