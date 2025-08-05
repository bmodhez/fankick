import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { ThemeProvider } from "@/components/ThemeProvider";
import ErrorBoundary from "@/components/ErrorBoundary";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProductProvider } from "@/contexts/ProductContext";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
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
import { Footer } from "./components/Footer";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="fankick-theme">
        <CurrencyProvider>
          <AuthProvider>
            <ProductProvider>
              <CartProvider>
                <TooltipProvider>
                  <Toaster />
                  <Sonner />
                  <BrowserRouter>
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
                          element={<Navigate to="/category/anime" replace />}
                        />
                        <Route
                          path="/football"
                          element={<Navigate to="/category/football" replace />}
                        />
                        <Route
                          path="/pop-culture"
                          element={
                            <Navigate to="/category/pop-culture" replace />
                          }
                        />
                        <Route
                          path="/collections"
                          element={
                            <>
                              <Navigation />
                              <div className="min-h-screen bg-gray-900 py-16">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                  <div className="text-center mb-16">
                                    <h1 className="text-4xl lg:text-6xl font-sport font-bold text-white mb-4">
                                      ✨ COLLECTIONS
                                    </h1>
                                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                                      Discover our carefully curated collections
                                      across football, anime, and pop culture
                                    </p>
                                  </div>

                                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                                    <Link
                                      to="/category/football"
                                      className="group"
                                    >
                                      <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-xl p-8 text-center hover:scale-105 transition-transform">
                                        <div className="text-6xl mb-4">⚽</div>
                                        <h2 className="text-2xl font-bold text-white mb-2">
                                          Football Legends
                                        </h2>
                                        <p className="text-gray-200 mb-4">
                                          Messi, Ronaldo, Mbappé jerseys & gear
                                        </p>
                                        <div className="bg-white/20 rounded-lg p-4">
                                          <div className="text-white font-semibold">
                                            Featured: Official Jerseys
                                          </div>
                                        </div>
                                      </div>
                                    </Link>

                                    <Link
                                      to="/category/anime"
                                      className="group"
                                    >
                                      <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-8 text-center hover:scale-105 transition-transform">
                                        <div className="text-6xl mb-4">🎌</div>
                                        <h2 className="text-2xl font-bold text-white mb-2">
                                          Anime Universe
                                        </h2>
                                        <p className="text-gray-200 mb-4">
                                          Naruto, Demon Slayer, One Piece merch
                                        </p>
                                        <div className="bg-white/20 rounded-lg p-4">
                                          <div className="text-white font-semibold">
                                            Featured: Premium Hoodies
                                          </div>
                                        </div>
                                      </div>
                                    </Link>

                                    <Link
                                      to="/category/pop-culture"
                                      className="group"
                                    >
                                      <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-xl p-8 text-center hover:scale-105 transition-transform">
                                        <div className="text-6xl mb-4">🎭</div>
                                        <h2 className="text-2xl font-bold text-white mb-2">
                                          Pop Culture
                                        </h2>
                                        <p className="text-gray-200 mb-4">
                                          Taylor Swift, BTS, Marvel merch
                                        </p>
                                        <div className="bg-white/20 rounded-lg p-4">
                                          <div className="text-white font-semibold">
                                            Featured: Artist Merch
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                              <Footer />
                            </>
                          }
                        />
                        <Route path="/search" element={<SearchResults />} />
                        <Route path="/profile" element={<UserProfile />} />
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
                          path="/football/:category"
                          element={
                            <>
                              <Navigation />
                              <PlaceholderPage
                                title="Football Category"
                                description="Browse specific football merchandise categories."
                              />
                            </>
                          }
                        />
                        <Route
                          path="/anime/:category"
                          element={
                            <>
                              <Navigation />
                              <PlaceholderPage
                                title="Anime Category"
                                description="Browse specific anime merchandise categories."
                              />
                            </>
                          }
                        />
                        <Route
                          path="/pop-culture/:category"
                          element={
                            <>
                              <Navigation />
                              <PlaceholderPage
                                title="Pop Culture Category"
                                description="Browse specific pop culture merchandise categories."
                              />
                            </>
                          }
                        />
                        <Route path="/product/:id" element={<ProductPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/checkout" element={<Checkout />} />
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
                        <Route path="/admin/orders" element={<AdminPanel />} />
                        <Route
                          path="/admin/customers"
                          element={<AdminPanel />}
                        />
                        <Route
                          path="/admin/categories"
                          element={<AdminPanel />}
                        />
                        <Route path="/admin/images" element={<AdminPanel />} />
                        <Route
                          path="/admin/analytics"
                          element={<AdminPanel />}
                        />
                        <Route path="/admin/content" element={<AdminPanel />} />
                        <Route
                          path="/admin/marketing"
                          element={<AdminPanel />}
                        />
                        <Route path="/admin/chatbot" element={<AdminPanel />} />
                        <Route
                          path="/admin/settings"
                          element={<AdminPanel />}
                        />
                        <Route path="/admin/test" element={<AdminPanel />} />
                        <Route path="/test" element={<TestPage />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </div>
                  </BrowserRouter>
                </TooltipProvider>
              </CartProvider>
            </ProductProvider>
          </AuthProvider>
        </CurrencyProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

const rootElement = document.getElementById("root")!;

// Store root globally to prevent recreation on hot reload
declare global {
  var __APP_ROOT__: ReturnType<typeof createRoot> | undefined;
}

if (!globalThis.__APP_ROOT__) {
  globalThis.__APP_ROOT__ = createRoot(rootElement);
}

globalThis.__APP_ROOT__.render(<App />);
