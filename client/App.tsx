import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";
import ProductPage from "./pages/ProductPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          <Route path="/players" element={
            <PlaceholderPage 
              title="Player Collections" 
              description="Discover exclusive merchandise from your favorite football stars including Messi, Ronaldo, Mbappé and more." 
            />
          } />
          <Route path="/clubs" element={
            <PlaceholderPage 
              title="Club Collections" 
              description="Support your favorite teams with official merchandise from Al Nassr, PSG, Barcelona and clubs worldwide." 
            />
          } />
          <Route path="/accessories" element={
            <PlaceholderPage 
              title="Football Accessories" 
              description="Complete your fan collection with phone covers, mugs, caps and other premium accessories." 
            />
          } />
          <Route path="/trending" element={
            <PlaceholderPage 
              title="Trending Now" 
              description="Stay ahead of the game with the hottest football merchandise trending among fans worldwide." 
            />
          } />
          <Route path="/accessories/:category" element={
            <PlaceholderPage
              title="Accessories Collection"
              description="Browse our curated selection of premium football accessories."
            />
          } />
          <Route path="/product/:id" element={<ProductPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
