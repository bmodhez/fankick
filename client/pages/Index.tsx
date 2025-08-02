import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { QuickAdminAccess } from "@/components/admin/QuickAdminAccess";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useProducts } from "@/contexts/ProductContext";
import { useCart } from "@/contexts/CartContext";
import { convertPrice, formatPrice } from "@/utils/currency";
import {
  Star,
  TrendingUp,
  Zap,
  ShoppingBag,
  Instagram,
  Clock,
  Users,
  Globe,
  Heart,
  Eye,
  Timer,
} from "lucide-react";

export default function Index() {
  const { selectedCurrency } = useCurrency();
  const { getTrendingProducts } = useProducts();
  const { addToCart } = useCart();
  const trendingProducts = getTrendingProducts(4);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const heroCategories = [
    {
      title: "Football Legends",
      subtitle: "Messi • Ronaldo • Mbappé",
      image: "/placeholder.svg",
      cta: "Shop Jerseys",
      link: "/football",
      color: "from-green-600 to-blue-600",
    },
    {
      title: "Anime Universe",
      subtitle: "Naruto • Chainsaw Man • Demon Slayer",
      image: "/placeholder.svg",
      cta: "Explore Anime",
      link: "/anime",
      color: "from-purple-600 to-pink-600",
    },
    {
      title: "Pop Culture",
      subtitle: "Taylor Swift • K-pop • Marvel",
      image: "/placeholder.svg",
      cta: "Discover More",
      link: "/pop-culture",
      color: "from-red-600 to-orange-600",
    },
  ];

  const categories = [
    {
      name: "Football Jerseys",
      items: 350,
      image: "/placeholder.svg",
      description: "Official jerseys from Messi, Ronaldo & more",
      link: "/football/jerseys",
    },
    {
      name: "Anime Rings",
      items: 180,
      image: "/placeholder.svg",
      description: "Exclusive rings from Naruto, One Piece & more",
      link: "/anime/rings",
    },
    {
      name: "K-pop Merch",
      items: 240,
      image: "/placeholder.svg",
      description: "BTS, Blackpink, Stray Kids official items",
      link: "/pop-culture/kpop",
    },
    {
      name: "Marvel Collection",
      items: 420,
      image: "/placeholder.svg",
      description: "Superhero gear for true Marvel fans",
      link: "/pop-culture/marvel",
    },
  ];

  const socialProof = [
    { metric: "500K+", label: "Happy Customers" },
    { metric: "150+", label: "Countries Shipped" },
    { metric: "4.8★", label: "Average Rating" },
    { metric: "24/7", label: "Customer Support" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-black py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-5"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-primary to-purple-500 text-black font-bold px-6 py-3 text-lg">
              <Globe className="w-5 h-5 mr-2" />
              Global Dropshipping • Free Worldwide Shipping
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-sport font-bold text-white mb-6 leading-tight">
              UNLEASH YOUR
              <span className="block bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                FANDOM
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              From Messi's magic to Naruto's jutsu, Taylor's melodies to
              Marvel's heroes - get authentic merchandise that defines your
              passion. Trusted by 500K+ fans worldwide.
            </p>

            {/* Social Proof */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
              {socialProof.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {item.metric}
                  </div>
                  <div className="text-sm text-gray-400">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-purple-500 text-black hover:opacity-90 font-bold px-8 py-4 text-lg"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Shop Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Trending Products
              </Button>
            </div>
          </div>

          {/* Hero Categories */}
          <div className="grid md:grid-cols-3 gap-6">
            {heroCategories.map((category, index) => (
              <Link key={index} to={category.link}>
                <Card className="group cursor-pointer hover:scale-105 transition-all duration-300 overflow-hidden bg-gradient-to-br from-gray-900 to-black border-gray-700">
                  <CardContent className="p-0">
                    <div
                      className={`h-48 bg-gradient-to-br ${category.color} relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300"></div>
                      <div className="absolute bottom-6 left-6 text-white">
                        <h3 className="font-sport font-bold text-2xl mb-1">
                          {category.title}
                        </h3>
                        <p className="text-white/80 text-sm mb-3">
                          {category.subtitle}
                        </p>
                        <Button className="bg-white text-black hover:bg-gray-100 font-semibold">
                          {category.cta}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-red-100 text-red-800 font-semibold px-4 py-2">
              <Timer className="w-4 h-4 mr-2" />
              Trending Now
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-sport font-bold text-foreground mb-4">
              WHAT'S HOT RIGHT NOW
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join millions of fans worldwide who are rocking these trending
              items
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product, index) => {
              const convertedPrice = convertPrice(
                product.basePrice,
                selectedCurrency.code,
                "INR"
              ); // Convert from INR base
              const convertedOriginalPrice = convertPrice(
                product.originalPrice,
                selectedCurrency.code,
                "INR"
              );

              return (
                <Link key={index} to={`/product/${product.id}`}>
                  <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                        />

                        {/* Overlays */}
                        <div className="absolute top-2 left-2 space-y-1">
                          {product.isTrending && (
                            <Badge className="bg-red-500 text-white text-xs">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              TRENDING
                            </Badge>
                          )}
                          {product.badges.map((badge, badgeIndex) => (
                            <Badge
                              key={badgeIndex}
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
                          <span>
                            {(product.reviews / 100).toFixed(1)}K views
                          </span>
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
                          <span className="text-xs text-muted-foreground ml-2">
                            {product.rating} ({product.reviews.toLocaleString()}
                            )
                          </span>
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className="font-bold text-primary text-lg">
                              {formatPrice(
                                convertedPrice,
                                selectedCurrency.code,
                              )}
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

                        <Button
                          className="w-full bg-black text-white hover:bg-gray-800 font-semibold"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (product.variants.length > 0) {
                              addToCart(product, product.variants[0]);
                              alert(`✅ ${product.name} added to cart!`);
                            }
                          }}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/trending">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-purple-500 text-black hover:opacity-90 font-bold px-8"
              >
                View All Trending Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-sport font-bold text-foreground mb-4">
              SHOP BY PASSION
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover curated collections that speak to your soul
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={index} to={category.link}>
                <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-bold text-lg mb-1">
                          {category.name}
                        </h3>
                        <p className="text-sm text-white/80">
                          {category.items} products
                        </p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-muted-foreground text-sm mb-4">
                        {category.description}
                      </p>
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all"
                      >
                        Explore Collection
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Global Shipping Banner */}
      <section className="py-12 bg-gradient-to-r from-primary to-purple-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-black">
            <div className="flex items-center justify-center mb-4">
              <Globe className="w-8 h-8 mr-3" />
              <h2 className="text-2xl font-sport font-bold">
                WORLDWIDE SHIPPING
              </h2>
            </div>
            <p className="text-lg mb-6">
              Free shipping to 150+ countries • Express delivery • Track your
              order in real-time
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
              <span className="bg-black/10 px-4 py-2 rounded-full">
                🇺🇸 USA: 5-7 days
              </span>
              <span className="bg-black/10 px-4 py-2 rounded-full">
                🇬🇧 UK: 7-10 days
              </span>
              <span className="bg-black/10 px-4 py-2 rounded-full">
                🇩🇪 Germany: 6-9 days
              </span>
              <span className="bg-black/10 px-4 py-2 rounded-full">
                🇨🇦 Canada: 8-12 days
              </span>
              <span className="bg-black/10 px-4 py-2 rounded-full">
                🇸🇦 Saudi: 5-8 days
              </span>
              <span className="bg-black/10 px-4 py-2 rounded-full">
                🇮🇳 India: 3-5 days
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-sport font-bold text-black mb-4">
              FANKICK COMMUNITY
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              See how fans worldwide rock their FanKick gear
            </p>
            <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90 font-semibold">
              <Instagram className="w-4 h-4 mr-2" />
              Follow @fankick_global
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="aspect-square bg-gray-200 rounded-xl overflow-hidden group cursor-pointer relative"
              >
                <img
                  src="/placeholder.svg"
                  alt={`Community post ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admin Access Section - For Testing */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              🔧 Admin Panel Access
            </h2>
            <p className="text-gray-400">
              Test all product management features with full admin access
            </p>
          </div>
          <div className="flex justify-center">
            <QuickAdminAccess />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
