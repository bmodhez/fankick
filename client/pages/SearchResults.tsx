import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useProducts } from "@/contexts/ProductContext";
import { convertPrice, formatPrice } from "@/utils/currency";
import {
  Search,
  Filter,
  SlidersHorizontal,
  Star,
  Heart,
  ShoppingCart,
  TrendingUp,
  Clock,
  X,
} from "lucide-react";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { selectedCurrency } = useCurrency();
  const { searchProducts, products } = useProducts();
  
  const [searchQuery, setSearchQuery] = useState(query);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);

  // Scroll to top when search query changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [query]);

  // Search results
  const searchResults = useMemo(() => {
    if (!query) return [];
    
    let results = searchProducts(query);
    
    // Filter by category
    if (selectedCategory !== "all") {
      results = results.filter(product => product.category === selectedCategory);
    }
    
    // Filter by price range
    if (priceRange !== "all") {
      results = results.filter(product => {
        const price = convertPrice(product.basePrice, selectedCurrency.code, "INR");
        switch (priceRange) {
          case "under-1000":
            return price < 1000;
          case "1000-3000":
            return price >= 1000 && price <= 3000;
          case "3000-5000":
            return price >= 3000 && price <= 5000;
          case "over-5000":
            return price > 5000;
          default:
            return true;
        }
      });
    }
    
    // Sort results
    switch (sortBy) {
      case "price-low":
        return results.sort((a, b) => a.basePrice - b.basePrice);
      case "price-high":
        return results.sort((a, b) => b.basePrice - a.basePrice);
      case "rating":
        return results.sort((a, b) => b.rating - a.rating);
      case "newest":
        return results.sort((a, b) => b.id.localeCompare(a.id));
      default:
        return results;
    }
  }, [query, searchProducts, selectedCategory, priceRange, sortBy, selectedCurrency]);

  // Popular searches
  const popularSearches = [
    "Naruto", "Messi", "Football Jersey", "Anime Hoodie", "Taylor Swift", 
    "BTS", "Marvel", "Akatsuki", "Ronaldo", "One Piece"
  ];

  // Search suggestions
  const searchSuggestions = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    
    const allTerms = products.flatMap(product => [
      product.name,
      ...product.tags,
      product.category,
      product.subcategory,
      product.brand || ""
    ]).filter(term => term.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return [...new Set(allTerms)].slice(0, 8);
  }, [searchQuery, products]);

  const handleSearch = (newQuery: string) => {
    if (newQuery.trim()) {
      setSearchParams({ q: newQuery.trim() });
      setSearchQuery(newQuery.trim());
    }
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setPriceRange("all");
    setSortBy("relevance");
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search products, brands, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSearch(searchQuery);
                    }
                  }}
                  className="pl-10 pr-12 py-3 bg-gray-800 border-gray-700 text-white text-lg"
                />
                <Button
                  onClick={() => handleSearch(searchQuery)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-black hover:bg-primary/90"
                  size="sm"
                >
                  Search
                </Button>
              </div>
              
              {/* Search Suggestions */}
              {searchSuggestions.length > 0 && searchQuery !== query && (
                <div className="absolute top-full left-0 right-0 bg-gray-800 border border-gray-700 rounded-lg mt-1 z-10 max-h-60 overflow-y-auto">
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(suggestion)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-700 text-white border-b border-gray-700 last:border-b-0"
                    >
                      <Search className="w-4 h-4 inline mr-2 text-muted-foreground" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-gray-700 text-gray-300 lg:w-auto w-full"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
              {(selectedCategory !== "all" || priceRange !== "all") && (
                <Badge className="ml-2 bg-primary text-black">
                  {[selectedCategory !== "all" ? 1 : 0, priceRange !== "all" ? 1 : 0].reduce((a, b) => a + b)}
                </Badge>
              )}
            </Button>
          </div>
          
          {/* Results Info */}
          <div className="mt-4">
            {query ? (
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  {searchResults.length > 0 ? (
                    <>
                      Showing <span className="text-white font-medium">{searchResults.length}</span> results for{" "}
                      <span className="text-primary font-medium">"{query}"</span>
                    </>
                  ) : (
                    <>
                      No results found for <span className="text-primary font-medium">"{query}"</span>
                    </>
                  )}
                </p>
                
                {searchResults.length > 0 && (
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm"
                  >
                    <option value="relevance">Sort by Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                  </select>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-white mb-2">
                  Search FanKick Products
                </h2>
                <p className="text-muted-foreground mb-6">
                  Find your favorite anime, football, and pop culture merchandise
                </p>
                
                {/* Popular Searches */}
                <div className="max-w-2xl mx-auto">
                  <p className="text-sm text-muted-foreground mb-3">Popular searches:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {popularSearches.map((term, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSearch(term)}
                        className="border-gray-700 text-gray-300 hover:bg-gray-800"
                      >
                        {term}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <Card className="bg-gray-800 border-gray-700 mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Filters</h3>
                {(selectedCategory !== "all" || priceRange !== "all") && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category Filter */}
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
                    <option value="pop-culture">🎭 Pop Culture</option>
                  </select>
                </div>
                
                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Price Range ({selectedCurrency})
                  </label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                  >
                    <option value="all">All Prices</option>
                    <option value="under-1000">Under {formatPrice(1000, selectedCurrency)}</option>
                    <option value="1000-3000">{formatPrice(1000, selectedCurrency)} - {formatPrice(3000, selectedCurrency)}</option>
                    <option value="3000-5000">{formatPrice(3000, selectedCurrency)} - {formatPrice(5000, selectedCurrency)}</option>
                    <option value="over-5000">Over {formatPrice(5000, selectedCurrency)}</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {query && searchResults.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {searchResults.map((product) => {
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

              return (
                <Card
                  key={product.id}
                  className="bg-gray-800 border-gray-700 hover:border-primary/50 transition-all duration-300 group"
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        {product.isTrending && (
                          <Badge className="bg-red-500 text-white text-xs">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                        {product.isExclusive && (
                          <Badge className="bg-purple-500 text-white text-xs">
                            Exclusive
                          </Badge>
                        )}
                      </div>
                      
                      {/* Actions */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-background/90 hover:bg-background"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

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
                          <span className="text-xs text-gray-400 ml-1">
                            ({product.reviews})
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
                          <span className="text-sm text-gray-400 line-through ml-2">
                            {formatPrice(convertedOriginalPrice, selectedCurrency)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {product.shippingDays} days delivery
                        </span>
                        {product.codAvailable && (
                          <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                            COD Available
                          </Badge>
                        )}
                      </div>

                      <Button className="w-full bg-primary text-black hover:bg-primary/90">
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

        {/* No Results */}
        {query && searchResults.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">
              No results found for "{query}"
            </h2>
            <p className="text-gray-400 mb-6">
              Try searching with different keywords or check out our popular products
            </p>
            
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {popularSearches.slice(0, 5).map((term, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSearch(term)}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Try "{term}"
                </Button>
              ))}
            </div>
            
            <Button 
              onClick={clearFilters}
              className="bg-primary text-black hover:bg-primary/90"
            >
              Clear Filters & Browse All
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
