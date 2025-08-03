import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Footer } from "@/components/Footer";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useProducts } from "@/contexts/ProductContext";
import { useCart } from "@/contexts/CartContext";
import { convertPrice, formatPrice } from "@/utils/currency";
import {
  TrendingUp,
  Filter,
  Search,
  Star,
  Heart,
  ShoppingCart,
  Clock,
  Flame,
  Zap,
  Eye,
  SlidersHorizontal,
  Grid,
  List,
  ArrowUpDown,
} from "lucide-react";

export default function TrendingPage() {
  const navigate = useNavigate();
  const { selectedCurrency } = useCurrency();
  const { getTrendingProducts, products } = useProducts();
  const { addToCart } = useCart();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("trending");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get trending products and all products for filtering
  const trendingProducts = useMemo(() => {
    let filtered = products.filter(product => product.isTrending);
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Apply price range filter
    if (priceRange !== "all") {
      filtered = filtered.filter(product => {
        const price = convertPrice(product.basePrice, selectedCurrency.code, "INR");
        switch (priceRange) {
          case "under-25":
            return price < 25;
          case "25-50":
            return price >= 25 && price <= 50;
          case "50-100":
            return price >= 50 && price <= 100;
          case "over-100":
            return price > 100;
          default:
            return true;
        }
      });
    }
    
    // Apply sorting
    switch (sortBy) {
      case "price-low":
        return filtered.sort((a, b) => a.basePrice - b.basePrice);
      case "price-high":
        return filtered.sort((a, b) => b.basePrice - a.basePrice);
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      case "reviews":
        return filtered.sort((a, b) => b.reviews - a.reviews);
      case "newest":
        return filtered.sort((a, b) => b.id.localeCompare(a.id));
      default:
        return filtered.sort((a, b) => b.reviews - a.reviews); // Trending by reviews
    }
  }, [products, searchQuery, selectedCategory, priceRange, sortBy, selectedCurrency]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setPriceRange("all");
    setSortBy("trending");
  };

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.variants.length > 0) {
      addToCart(product, product.variants[0]);
    }
  };

  const stats = [
    { label: "Trending Products", value: trendingProducts.length, icon: TrendingUp, color: "text-red-400" },
    { label: "Categories", value: new Set(trendingProducts.map(p => p.category)).size, icon: Grid, color: "text-blue-400" },
    { label: "Avg Rating", value: (trendingProducts.reduce((sum, p) => sum + p.rating, 0) / trendingProducts.length || 0).toFixed(1), icon: Star, color: "text-yellow-400" },
    { label: "Total Reviews", value: trendingProducts.reduce((sum, p) => sum + p.reviews, 0).toLocaleString(), icon: Eye, color: "text-green-400" },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="py-16 text-center">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <Flame className="w-8 h-8 text-red-500 animate-pulse" />
            <h1 className="text-4xl lg:text-6xl font-sport font-bold text-white">
              TRENDING
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                {" "}NOW
              </span>
            </h1>
            <TrendingUp className="w-8 h-8 text-primary animate-bounce" />
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover the hottest products in football, anime, and pop culture that fans are obsessing over right now!
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardContent className="p-4 text-center">
                  <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Filters & Search */}
        <div className="mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search trending products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                
                {/* Quick Filters */}
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="border-gray-600 text-gray-300"
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                    {(selectedCategory !== "all" || priceRange !== "all") && (
                      <Badge className="ml-2 bg-primary text-black">
                        {[selectedCategory !== "all" ? 1 : 0, priceRange !== "all" ? 1 : 0].reduce((a, b) => a + b)}
                      </Badge>
                    )}
                  </Button>
                  
                  <div className="flex border border-gray-600 rounded-lg">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-r-none"
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-l-none"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Extended Filters */}
              {showFilters && (
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Category
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                      >
                        <option value="all">All Categories</option>
                        <option value="football">⚽ Football</option>
                        <option value="anime">🎌 Anime</option>
                        <option value="pop-culture">�� Pop Culture</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Price Range ({selectedCurrency.code})
                      </label>
                      <select
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                      >
                        <option value="all">All Prices</option>
                        <option value="under-25">Under {formatPrice(convertPrice(25, selectedCurrency.code), selectedCurrency)}</option>
                        <option value="25-50">{formatPrice(convertPrice(25, selectedCurrency.code), selectedCurrency)} - {formatPrice(convertPrice(50, selectedCurrency.code), selectedCurrency)}</option>
                        <option value="50-100">{formatPrice(convertPrice(50, selectedCurrency.code), selectedCurrency)} - {formatPrice(convertPrice(100, selectedCurrency.code), selectedCurrency)}</option>
                        <option value="over-100">Over {formatPrice(convertPrice(100, selectedCurrency.code), selectedCurrency)}</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Sort By
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                      >
                        <option value="trending">🔥 Most Trending</option>
                        <option value="rating">⭐ Highest Rated</option>
                        <option value="reviews">👥 Most Reviewed</option>
                        <option value="price-low">💰 Price: Low to High</option>
                        <option value="price-high">💎 Price: High to Low</option>
                        <option value="newest">🆕 Newest First</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      Showing {trendingProducts.length} trending products
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Products Grid/List */}
        <div className="mb-16">
          {trendingProducts.length === 0 ? (
            <div className="text-center py-16">
              <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                No trending products found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search terms
              </p>
              <Button onClick={clearFilters} className="bg-primary text-black hover:bg-primary/90">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className={
              viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }>
              {trendingProducts.map((product) => {
                const convertedPrice = convertPrice(
                  product.basePrice,
                  selectedCurrency.code,
                  "INR"
                );
                const convertedOriginalPrice = convertPrice(
                  product.originalPrice,
                  selectedCurrency.code,
                  "INR"
                );

                if (viewMode === "list") {
                  return (
                    <Card key={product.id} className="bg-gray-800 border-gray-700 hover:border-primary/50 transition-all">
                      <CardContent className="p-4">
                        <Link to={`/product/${product.id}`} className="flex space-x-4">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-white text-lg line-clamp-2">
                                {product.name}
                              </h3>
                              <div className="flex items-center space-x-2">
                                <Badge className="bg-red-500 text-white">
                                  <Flame className="w-3 h-3 mr-1" />
                                  Trending
                                </Badge>
                                {product.isExclusive && (
                                  <Badge className="bg-purple-500 text-white">
                                    <Zap className="w-3 h-3 mr-1" />
                                    Exclusive
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-4 mb-3">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < Math.floor(product.rating)
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-600"
                                    }`}
                                  />
                                ))}
                                <span className="text-sm text-muted-foreground ml-2">
                                  {product.rating} ({product.reviews.toLocaleString()})
                                </span>
                              </div>
                              
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="w-4 h-4 mr-1" />
                                {product.shippingDays} days delivery
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-2xl font-bold text-primary">
                                  {formatPrice(convertedPrice, selectedCurrency)}
                                </span>
                                <span className="text-muted-foreground line-through text-lg ml-2">
                                  {formatPrice(convertedOriginalPrice, selectedCurrency)}
                                </span>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-gray-600 text-gray-300"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    console.log(`Added ${product.name} to wishlist`);
                                  }}
                                >
                                  <Heart className="w-4 h-4" />
                                </Button>
                                <Button 
                                  onClick={(e) => handleAddToCart(product, e)}
                                  className="bg-primary text-black hover:bg-primary/90"
                                >
                                  <ShoppingCart className="w-4 h-4 mr-2" />
                                  Add to Cart
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </CardContent>
                    </Card>
                  );
                }

                return (
                  <Card
                    key={product.id}
                    className="bg-gray-800 border-gray-700 hover:border-primary/50 transition-all duration-300 group"
                  >
                    <CardContent className="p-0">
                      <Link to={`/product/${product.id}`}>
                        <div className="relative overflow-hidden">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          
                          {/* Trending Badge */}
                          <div className="absolute top-3 left-3">
            <Badge className="bg-red-500 text-white animate-pulse">
                              <Flame className="w-3 h-3 mr-1" />
                              Trending
                            </Badge>
                          </div>
                          
                          {/* Additional Badges */}
                          <div className="absolute top-3 right-3 flex flex-col gap-1">
                            {product.isExclusive && (
                              <Badge className="bg-purple-500 text-white text-xs">
                                <Zap className="w-3 h-3 mr-1" />
                                Exclusive
                              </Badge>
                            )}
                          </div>
                          
                          {/* Actions */}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="flex space-x-2">
                              <Button
                                variant="secondary"
                                size="sm"
                                className="bg-background/90 hover:bg-background"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  navigate(`/product/${product.id}`);
                                }}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="secondary"
                                size="sm"
                                className="bg-background/90 hover:bg-background"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  console.log(`Added ${product.name} to wishlist`);
                                }}
                              >
                                <Heart className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Link>

                      <div className="p-4">
                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(product.rating)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-600"
                                }`}
                              />
                            ))}
                            <span className="text-xs text-muted-foreground ml-1">
                              ({product.reviews.toLocaleString()})
                            </span>
                          </div>
                        </div>

                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2 hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                        </Link>

                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className="text-lg font-bold text-primary">
                              {formatPrice(convertedPrice, selectedCurrency)}
                            </span>
                            <span className="text-sm text-muted-foreground line-through ml-2">
                              {formatPrice(convertedOriginalPrice, selectedCurrency)}
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

                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {product.shippingDays} days
                          </span>
                          {product.codAvailable && (
                            <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                              COD
                            </Badge>
                          )}
                        </div>

                        <Button 
                          onClick={(e) => handleAddToCart(product, e)}
                          className="w-full bg-primary text-black hover:bg-primary/90"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Trending Categories */}
        <Card className="bg-gray-800 border-gray-700 mb-16">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              🔥 Trending by Category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["football", "anime", "pop-culture"].map((category) => {
                const categoryProducts = trendingProducts.filter(p => p.category === category);
                const categoryIcon = category === "football" ? "⚽" : category === "anime" ? "🎌" : "���";
                
                return (
                  <Link
                    key={category}
                    to={`/${category}`}
                    className="bg-gray-700 rounded-lg p-6 hover:bg-gray-600 transition-colors group"
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-4">{categoryIcon}</div>
                      <h3 className="text-xl font-semibold text-white mb-2 capitalize group-hover:text-primary transition-colors">
                        {category === "pop-culture" ? "Pop Culture" : category}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {categoryProducts.length} trending products
                      </p>
                      <Button variant="outline" className="border-gray-600 text-gray-300 group-hover:border-primary group-hover:text-primary">
                        Explore Category
                      </Button>
                    </div>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
