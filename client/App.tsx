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
        <Routes>
          <Route path="/" element={
            <div>
              <Navigation />
              <Index />
            </div>
          } />
          <Route path="/football" element={<CategoryPage />} />
          <Route path="/anime" element={<CategoryPage />} />
          <Route path="/pop-culture" element={<CategoryPage />} />
          <Route path="/collections" element={
            <PlaceholderPage
              title="All Collections"
              description="Browse all our curated collections across football, anime, and pop culture categories."
            />
          } />
          <Route path="/trending" element={
            <PlaceholderPage 
              title="Trending Now" 
              description="Stay ahead of the game with the hottest football merchandise trending among fans worldwide." 
            />
          } />
          <Route path="/football/:category" element={
            <PlaceholderPage
              title="Football Category"
              description="Browse specific football merchandise categories."
            />
          } />
          <Route path="/anime/:category" element={
            <PlaceholderPage
              title="Anime Category"
              description="Browse specific anime merchandise categories."
            />
          } />
          <Route path="/pop-culture/:category" element={
            <PlaceholderPage
              title="Pop Culture Category"
              description="Browse specific pop culture merchandise categories."
            />
          } />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </CurrencyProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
