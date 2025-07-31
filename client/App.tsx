import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import AdminPanel from "./pages/AdminPanel";
import TermsConditions from "./pages/TermsConditions";
import ShippingPolicy from "./pages/ShippingPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="fankick-theme">
      <CurrencyProvider>
        <AuthProvider>
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
                    path="/football"
                    element={
                      <>
                        <Navigation />
                        <CategoryPage />
                      </>
                    }
                  />
                  <Route
                    path="/anime"
                    element={
                      <>
                        <Navigation />
                        <CategoryPage />
                      </>
                    }
                  />
                  <Route
                    path="/pop-culture"
                    element={
                      <>
                        <Navigation />
                        <CategoryPage />
                      </>
                    }
                  />
                  <Route
                    path="/collections"
                    element={
                      <>
                        <Navigation />
                        <PlaceholderPage
                          title="All Collections"
                          description="Browse all our curated collections across football, anime, and pop culture categories."
                        />
                      </>
                    }
                  />
                  <Route
                    path="/trending"
                    element={
                      <>
                        <Navigation />
                        <PlaceholderPage
                          title="Trending Now"
                          description="Stay ahead of the game with the hottest football merchandise trending among fans worldwide."
                        />
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
                  <Route path="/admin/products" element={<AdminPanel />} />
                  <Route path="/admin/orders" element={<AdminPanel />} />
                  <Route path="/admin/customers" element={<AdminPanel />} />
                  <Route path="/admin/categories" element={<AdminPanel />} />
                  <Route path="/admin/analytics" element={<AdminPanel />} />
                  <Route path="/admin/content" element={<AdminPanel />} />
                  <Route path="/admin/marketing" element={<AdminPanel />} />
                  <Route path="/admin/chatbot" element={<AdminPanel />} />
                  <Route path="/admin/settings" element={<AdminPanel />} />
                  <Route path="/admin/test" element={<AdminPanel />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </CurrencyProvider>
    </ThemeProvider>
  </QueryClientProvider>
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
