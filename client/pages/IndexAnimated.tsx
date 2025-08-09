import { useEffect, useState } from "react";
import { AnimatedNavigation } from "@/components/AnimatedNavigation";
import { AnimatedHero } from "@/components/AnimatedHero";
import {
  AnimatedCategoriesSection,
  AnimatedStatsSection,
  AnimatedFeaturesSection,
  AnimatedCTASection
} from "@/components/AnimatedSections";
import { AnimationShowcase } from "@/components/AnimationShowcase";
import { FloatingProductShowcase } from "@/components/FloatingProductShowcase";
import { AnimatedProductGrid } from "@/components/AnimatedProductCard";
import { PageTransition, LoadingScreen } from "@/components/PageTransition";
import { Footer } from "@/components/Footer";
import { QuickAdminAccess } from "@/components/admin/QuickAdminAccess";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { PopupNotifications } from "@/components/PopupNotifications";
import { StickyDiscountBar } from "@/components/StickyDiscountBar";
import { useProducts } from "@/contexts/ProductContext";
import { useAuthRequired } from "@/hooks/useAuthRequired";

export default function IndexAnimated() {
  const { products, isLoading } = useProducts();
  const { AuthModalComponent } = useAuthRequired();
  const [showLoading, setShowLoading] = useState(true);

  // Get different product collections
  const trendingProducts = products
    .filter((product) => product.isTrending)
    .slice(0, 8);

  const featuredProducts = products
    .filter((product) => product.isExclusive)
    .slice(0, 6);

  const newArrivals = products
    .sort((a, b) => new Date(b.id).getTime() - new Date(a.id).getTime())
    .slice(0, 8);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Show loading screen for a minimum time for better UX
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showLoading || isLoading) {
    return <LoadingScreen />;
  }

  return (
    <PageTransition>
      {/* Floating elements */}
      <FloatingActionButton />
      <PopupNotifications />
      <StickyDiscountBar />
      <AuthModalComponent />
      
      {/* Replace default navigation with animated version */}
      <AnimatedNavigation />
      
      <div className="min-h-screen bg-gray-900">
        {/* Hero Section with stunning animations */}
        <AnimatedHero />

        {/* Floating Product Showcase - Bottle Drop Effect */}
        <FloatingProductShowcase />

        {/* Categories Section with scroll animations */}
        <AnimatedCategoriesSection />

        {/* Stats Section with counter animations */}
        <AnimatedStatsSection />

        {/* Trending Products with animated cards */}
        {trendingProducts.length > 0 && (
          <section className="py-20 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AnimatedProductGrid 
                products={trendingProducts}
                title="🔥 Trending Now"
                variant="trending"
              />
            </div>
          </section>
        )}

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <section className="py-20 bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AnimatedProductGrid 
                products={featuredProducts}
                title="👑 Exclusive Collection"
                variant="featured"
              />
            </div>
          </section>
        )}

        {/* Features Section */}
        <AnimatedFeaturesSection />

        {/* New Arrivals */}
        {newArrivals.length > 0 && (
          <section className="py-20 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AnimatedProductGrid 
                products={newArrivals}
                title="✨ New Arrivals"
                variant="default"
              />
            </div>
          </section>
        )}

        {/* Animation Showcase */}
        <AnimationShowcase />

        {/* CTA Section */}
        <AnimatedCTASection />

        {/* Footer */}
        <Footer />
      </div>

      {/* Admin Access */}
      <QuickAdminAccess />
    </PageTransition>
  );
}
