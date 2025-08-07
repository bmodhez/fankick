import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Footer } from "@/components/Footer";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useProducts } from "@/contexts/ProductContext";
import { useCart } from "@/contexts/CartContext";
import { useLike } from "@/contexts/LikeContext";
import { useAuthRequired } from "@/hooks/useAuthRequired";
import { convertPrice, formatPrice } from "@/utils/currency";
import {
  Search,
  Filter,
  SlidersHorizontal,
  Star,
  Heart,
  ShoppingCart,
  TrendingUp,
  Grid,
  List,
  ArrowUpDown,
  Eye,
  Timer,
  Truck,
  Shield,
  Zap,
  Crown,
  Award,
  Target,
  Sparkles,
} from "lucide-react";

export default function CollectionsPage() {
  const { collection } = useParams<{ collection: string }>();
  const { selectedCurrency } = useCurrency();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { toggleLike, isLiked } = useLike();
  const { requireAuth, AuthModalComponent } = useAuthRequired();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("trending");
  const [priceRange, setPriceRange] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");

  // Collection configurations
  const collectionConfigs = {
    football: {
      title: "Football Legends Collection",
      subtitle:
        "Official jerseys, boots & gear from the world's greatest players",
      description:
        "Discover authentic merchandise from Messi, Ronaldo, Mbappé and other football legends. Premium quality jerseys, professional boots, and exclusive fan gear.",
      categories: ["jerseys", "boots", "accessories"],
      hero: "https://cdn.builder.io/api/v1/image/assets%2Fddba8a59ba1f49149550d5bc623e56d7%2F61ece27bc9db40fcb5161b972d368a2e?format=webp&width=800",
      color: "from-green-600 to-blue-600",
      icon: "⚽",
    },
    anime: {
      title: "Anime Universe Collection",
      subtitle: "Premium anime merchandise from your favorite series",
      description:
        "Explore official anime hoodies, rings, necklaces and collectibles from Naruto, Demon Slayer, Attack on Titan, and more beloved series.",
      categories: ["hoodies", "rings", "necklaces", "accessories"],
      hero: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80",
      color: "from-purple-600 to-pink-600",
      icon: "🎌",
    },
    "pop-culture": {
      title: "Pop Culture Collection",
      subtitle: "Trending merchandise from music, movies & celebrities",
      description:
        "Official merchandise from Taylor Swift, BTS, Marvel, and the hottest pop culture phenomena. Limited edition items and exclusive releases.",
      categories: ["hoodies", "tshirts", "accessories"],
      hero: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80",
      color: "from-red-600 to-orange-600",
      icon: "🎭",
    },
    accessories: {
      title: "Accessories Collection",
      subtitle: "Premium accessories, rings, necklaces & gear",
      description:
        "Discover our exclusive collection of rings, necklaces, boots, and other premium accessories from football, anime, and pop culture. Complete your look with authentic merchandise.",
      categories: ["rings", "necklaces", "boots", "accessories"],
      hero: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=80",
      color: "from-amber-600 to-orange-600",
      icon: "💎",
    },
    all: {
      title: "All Collections",
      subtitle: "Discover our complete range of premium merchandise",
      description:
        "Browse through our entire collection of football legends, anime universe, and pop culture items. Find exactly what you're looking for.",
      categories: [
        "jerseys",
        "hoodies",
        "rings",
        "boots",
        "tshirts",
        "accessories",
      ],
      hero: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
      color: "from-indigo-600 to-purple-600",
      icon: "✨",
    },
  };

  const currentCollection =
    collectionConfigs[collection as keyof typeof collectionConfigs] ||
    collectionConfigs.all;

  // Filter products based on collection
  const getFilteredProducts = () => {
    let filtered = products;

    // Filter by collection/category
    if (collection && collection !== "all") {
      if (collection === "accessories") {
        // Special handling for accessories - show items from specific subcategories across all categories
        const accessorySubcategories = ["rings", "necklaces", "boots", "accessories"];
        filtered = filtered.filter((product) =>
          accessorySubcategories.includes(product.subcategory)
        );
      } else {
        filtered = filtered.filter((product) => product.category === collection);
      }
    }

    // Filter by subcategory
    if (selectedSubcategory !== "all") {
      filtered = filtered.filter(
        (product) => product.subcategory === selectedSubcategory,
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    // Filter by price range
    if (priceRange !== "all") {
      const ranges = {
        "under-1000": [0, 1000],
        "1000-3000": [1000, 3000],
        "3000-5000": [3000, 5000],
        "above-5000": [5000, Infinity],
      };
      const [min, max] = ranges[priceRange as keyof typeof ranges] || [
        0,
        Infinity,
      ];
      filtered = filtered.filter(
        (product) => product.basePrice >= min && product.basePrice <= max,
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case "price-high":
        filtered.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "trending":
      default:
        filtered.sort(
          (a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0),
        );
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultVariant = product.variants[0];
    addToCart(product, defaultVariant, 1);
  };

  // Get unique subcategories for current collection
  const getSubcategories = () => {
    let collectionProducts = products;
    if (collection && collection !== "all") {
      collectionProducts = products.filter((p) => p.category === collection);
    }
    return [...new Set(collectionProducts.map((p) => p.subcategory))];
  };

  const subcategories = getSubcategories();

  // Scroll to top when component mounts or collection changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [collection]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className={`relative bg-gradient-to-br ${currentCollection.color} py-20 overflow-hidden`}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${currentCollection.hero})` }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="text-6xl mb-4">{currentCollection.icon}</div>
          <h1 className="text-4xl lg:text-6xl font-sport font-bold mb-4">
            {currentCollection.title}
          </h1>
          <p className="text-xl lg:text-2xl mb-6 max-w-3xl mx-auto opacity-90">
            {currentCollection.subtitle}
          </p>
          <p className="text-lg mb-8 max-w-4xl mx-auto opacity-80">
            {currentCollection.description}
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Badge className="bg-white/20 text-white px-4 py-2 text-sm backdrop-blur-sm">
              <Truck className="w-4 h-4 mr-2" />
              Free Worldwide Shipping
            </Badge>
            <Badge className="bg-white/20 text-white px-4 py-2 text-sm backdrop-blur-sm">
              <Shield className="w-4 h-4 mr-2" />
              Authentic Products
            </Badge>
            <Badge className="bg-white/20 text-white px-4 py-2 text-sm backdrop-blur-sm">
              <Award className="w-4 h-4 mr-2" />
              Premium Quality
            </Badge>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 items-center">
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="all">All Categories</option>
                {subcategories.map((sub) => (
                  <option key={sub} value={sub} className="capitalize">
                    {sub.charAt(0).toUpperCase() + sub.slice(1)}
                  </option>
                ))}
              </select>

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="all">All Prices</option>
                <option value="under-1000">Under ₹1,000</option>
                <option value="1000-3000">₹1,000 - ₹3,000</option>
                <option value="3000-5000">₹3,000 - ₹5,000</option>
                <option value="above-5000">Above ₹5,000</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="trending">Trending</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid/List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              {filteredProducts.length} Products Found
            </h2>
            <div className="text-muted-foreground">
              Showing results for "{collection || "all collections"}"
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold mb-4">No products found</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Try adjusting your search criteria or browse our full collection
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSubcategory("all");
                  setPriceRange("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product) => {
                const convertedPrice = convertPrice(
                  product.basePrice,
                  selectedCurrency.code,
                  "INR",
                );
                const convertedOriginalPrice = convertPrice(
                  product.originalPrice,
                  selectedCurrency.code,
                  "INR",
                );

                if (viewMode === "list") {
                  return (
                    <Card
                      key={product.id}
                      className="hover:shadow-lg transition-all duration-300 group"
                    >
                      <CardContent className="p-0">
                        <Link
                          to={`/product/${product.id}`}
                          className="flex gap-6 p-6"
                        >
                          <div className="relative w-48 h-48 flex-shrink-0">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                            />
                            {product.isTrending && (
                              <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                TRENDING
                              </Badge>
                            )}
                            <div className="absolute top-2 right-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`bg-white/90 hover:bg-white transition-all duration-300 hover:scale-110 ${
                                  isLiked(product.id)
                                    ? "shadow-lg shadow-red-500/25"
                                    : ""
                                }`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  requireAuth(() => toggleLike(product.id));
                                }}
                              >
                                <Heart
                                  className={`w-4 h-4 transition-all duration-300 ${
                                    isLiked(product.id)
                                      ? "fill-red-500 text-red-500 scale-110"
                                      : "text-gray-600 hover:text-red-500"
                                  }`}
                                />
                              </Button>
                            </div>
                          </div>

                          <div className="flex-1">
                            <div className="flex gap-2 mb-2">
                              {product.badges
                                .slice(0, 2)
                                .map((badge, index) => (
                                  <Badge
                                    key={index}
                                    className="bg-primary/10 text-primary text-xs"
                                  >
                                    {badge}
                                  </Badge>
                                ))}
                            </div>

                            <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                              {product.name}
                            </h3>

                            <p className="text-muted-foreground mb-4 line-clamp-2">
                              {product.description}
                            </p>

                            <div className="flex items-center gap-2 mb-4">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < Math.floor(product.rating)
                                        ? "text-yellow-400 fill-current"
                                        : "text-muted"
                                    }`}
                                  />
                                ))}
                                <span className="text-sm text-muted-foreground ml-2">
                                  {product.rating} (
                                  {product.reviews.toLocaleString()})
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-2xl font-bold text-primary">
                                  {formatPrice(
                                    convertedPrice,
                                    selectedCurrency,
                                  )}
                                </span>
                                <span className="text-muted-foreground line-through text-lg ml-2">
                                  {formatPrice(
                                    convertedOriginalPrice,
                                    selectedCurrency,
                                  )}
                                </span>
                              </div>

                              <Button
                                onClick={(e) => handleAddToCart(product, e)}
                                className="bg-primary text-black hover:bg-primary/90"
                              >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Add to Cart
                              </Button>
                            </div>
                          </div>
                        </Link>
                      </CardContent>
                    </Card>
                  );
                }

                // Grid view
                return (
                  <Card
                    key={product.id}
                    className="group cursor-pointer hover:shadow-2xl hover:shadow-primary/10 hover:scale-105 transition-all duration-500 overflow-hidden border border-border/50 hover:border-primary/30 bg-card/80 backdrop-blur-sm"
                  >
                    <CardContent className="p-0">
                      <Link to={`/product/${product.id}`}>
                        <div className="relative">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                          />

                          <div className="absolute top-2 left-2 space-y-1">
                            {product.isTrending && (
                              <Badge className="bg-red-500 text-white text-xs">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                TRENDING
                              </Badge>
                            )}
                            {product.badges
                              .slice(0, 2)
                              .map((badge, badgeIndex) => (
                                <Badge
                                  key={badgeIndex}
                                  className="bg-black/80 text-white text-xs block"
                                >
                                  {badge}
                                </Badge>
                              ))}
                          </div>

                          <div className="absolute top-2 right-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`bg-white/90 hover:bg-white transition-all duration-300 hover:scale-110 ${
                                isLiked(product.id)
                                  ? "shadow-lg shadow-red-500/25"
                                  : ""
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                requireAuth(() => toggleLike(product.id));
                              }}
                            >
                              <Heart
                                className={`w-4 h-4 transition-all duration-300 ${
                                  isLiked(product.id)
                                    ? "fill-red-500 text-red-500 scale-110"
                                    : "text-gray-600 hover:text-red-500"
                                }`}
                              />
                            </Button>
                          </div>

                          <div className="absolute bottom-2 right-2 flex items-center space-x-1 bg-black/70 text-white px-2 py-1 rounded text-xs">
                            <Eye className="w-3 h-3" />
                            <span>
                              {(product.reviews / 100).toFixed(1)}K views
                            </span>
                          </div>
                        </div>

                        <div className="p-4">
                          <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {product.name}
                          </h3>

                          <div className="flex items-center gap-1 mb-3">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(product.rating)
                                      ? "text-yellow-400 fill-current"
                                      : "text-muted"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              ({product.reviews.toLocaleString()})
                            </span>
                          </div>

                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <span className="text-xl font-bold text-primary">
                                {formatPrice(convertedPrice, selectedCurrency)}
                              </span>
                              <span className="text-muted-foreground line-through text-sm ml-2">
                                {formatPrice(
                                  convertedOriginalPrice,
                                  selectedCurrency,
                                )}
                              </span>
                            </div>
                          </div>

                          <Button
                            onClick={(e) => handleAddToCart(product, e)}
                            className="w-full bg-primary text-black hover:bg-primary/90"
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <AuthModalComponent />
    </div>
  );
}
