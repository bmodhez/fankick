import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useCurrency } from "@/contexts/CurrencyContext";
import { getProductsByCategory, Product } from "@/data/products";
import { convertPrice, formatPrice } from "@/utils/currency";
import {
  Star,
  Filter,
  SlidersHorizontal,
  Heart,
  Eye,
  TrendingUp,
} from "lucide-react";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const { selectedCurrency } = useCurrency();
  const [sortBy, setSortBy] = useState("trending");
  const [priceRange, setPriceRange] = useState("all");

  const allProducts = getProductsByCategory(category || "");

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Price filtering
    if (priceRange !== "all") {
      filtered = filtered.filter((product) => {
        const price = convertPrice(
          product.basePrice / 84.15,
          selectedCurrency.code,
        );
        switch (priceRange) {
          case "under-1000":
            return price < 1000;
          case "1000-3000":
            return price >= 1000 && price <= 3000;
          case "over-3000":
            return price > 3000;
          default:
            return true;
        }
      });
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.basePrice - b.basePrice;
        case "price-high":
          return b.basePrice - a.basePrice;
        case "rating":
          return b.rating - a.rating;
        case "trending":
          return (
            (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0) ||
            b.reviews - a.reviews
          );
        default:
          return 0;
      }
    });

    return filtered;
  }, [allProducts, sortBy, priceRange, selectedCurrency.code]);

  const getCategoryTitle = (cat: string) => {
    switch (cat) {
      case "football":
        return "Football Collection";
      case "anime":
        return "Anime Universe";
      case "pop-culture":
        return "Pop Culture";
      default:
        return "All Products";
    }
  };

  const getCategoryDescription = (cat: string) => {
    switch (cat) {
      case "football":
        return "Official jerseys, boots and gear from football legends worldwide";
      case "anime":
        return "Exclusive merchandise from your favorite anime series";
      case "pop-culture":
        return "Trending merchandise from music, movies, and pop culture";
      default:
        return "Browse our complete collection";
    }
  };

  const categoryEmoji = {
    football: "⚽",
    anime: "🎌",
    "pop-culture": "🎭",
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900 capitalize">{category}</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">
            {categoryEmoji[category as keyof typeof categoryEmoji] || "🛍️"}
          </div>
          <h1 className="text-4xl lg:text-5xl font-sport font-bold text-black mb-4">
            {getCategoryTitle(category || "")}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {getCategoryDescription(category || "")}
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium">Price Range:</span>
            </div>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded text-sm"
            >
              <option value="all">All Prices</option>
              <option value="under-1000">
                Under{" "}
                {formatPrice(
                  convertPrice(1000 / 84.15, selectedCurrency.code),
                  selectedCurrency.code,
                )}
              </option>
              <option value="1000-3000">
                {formatPrice(
                  convertPrice(1000 / 84.15, selectedCurrency.code),
                  selectedCurrency.code,
                )}{" "}
                -{" "}
                {formatPrice(
                  convertPrice(3000 / 84.15, selectedCurrency.code),
                  selectedCurrency.code,
                )}
              </option>
              <option value="over-3000">
                Over{" "}
                {formatPrice(
                  convertPrice(3000 / 84.15, selectedCurrency.code),
                  selectedCurrency.code,
                )}
              </option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium">Sort by:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded text-sm"
            >
              <option value="trending">Trending</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredAndSortedProducts.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => {
            const convertedPrice = convertPrice(
              product.basePrice / 84.15,
              selectedCurrency.code,
            );
            const convertedOriginalPrice = convertPrice(
              product.originalPrice / 84.15,
              selectedCurrency.code,
            );

            return (
              <Link key={product.id} to={`/product/${product.id}`}>
                <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Overlays */}
                      <div className="absolute top-2 left-2 space-y-1">
                        {product.isTrending && (
                          <Badge className="bg-red-500 text-white text-xs">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            TRENDING
                          </Badge>
                        )}
                        {product.isExclusive && (
                          <Badge className="bg-purple-500 text-white text-xs">
                            EXCLUSIVE
                          </Badge>
                        )}
                        {product.badges.slice(0, 2).map((badge, index) => (
                          <Badge
                            key={index}
                            className="bg-black/80 text-white text-xs"
                          >
                            {badge}
                          </Badge>
                        ))}
                      </div>

                      <div className="absolute top-2 right-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="bg-white/90 hover:bg-white"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="absolute bottom-2 left-2">
                        {product.stockAlert && (
                          <Badge className="bg-primary text-black text-xs font-bold">
                            {product.stockAlert}
                          </Badge>
                        )}
                      </div>

                      <div className="absolute bottom-2 right-2 flex items-center space-x-1 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        <Eye className="w-3 h-3" />
                        <span>{(product.reviews / 100).toFixed(1)}K</span>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold mb-2 text-sm line-clamp-2">
                        {product.name}
                      </h3>

                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600 ml-2">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="font-bold text-primary text-lg">
                            {formatPrice(convertedPrice, selectedCurrency.code)}
                          </span>
                          <span className="text-gray-400 line-through text-sm ml-2">
                            {formatPrice(
                              convertedOriginalPrice,
                              selectedCurrency.code,
                            )}
                          </span>
                        </div>
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          {Math.round(
                            ((convertedOriginalPrice - convertedPrice) /
                              convertedOriginalPrice) *
                              100,
                          )}
                          % OFF
                        </Badge>
                      </div>

                      <Button className="w-full bg-black text-white hover:bg-gray-800 font-semibold">
                        Quick Buy
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😕</div>
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or browse other categories
            </p>
            <Link to="/">
              <Button>Browse All Products</Button>
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
