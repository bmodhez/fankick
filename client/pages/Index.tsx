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
import { useLike } from "@/contexts/LikeContext";
import { useAuthRequired } from "@/hooks/useAuthRequired";
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
  Eye,
  Timer,
  Flame,
  ShieldCheck,
  Truck,
  CreditCard,
  Heart,
  Gift,
  Crown,
  Award,
} from "lucide-react";
import { LikeButton } from "@/components/LikeButton";

export default function Index() {
  const { selectedCurrency } = useCurrency();
  const { getTrendingProducts, products } = useProducts();
  const { addToCart } = useCart();
  const { toggleLike, isLiked } = useLike();
  const { requireAuth, AuthModalComponent } = useAuthRequired();
  const trendingProducts = getTrendingProducts(4);

  // Debug logging
  console.log("Homepage Products Debug:");
  console.log("Total products:", products.length);
  console.log("Trending products:", trendingProducts.length);
  if (trendingProducts.length > 0) {
    console.log("First trending product image:", trendingProducts[0].images[0]);
  }

  // Use original product images without override

  // Add global debug function
  (window as any).updateProductImages = () => {
    console.log("🔄 Manually updating product images...");
    console.log("New image URL:", builderImageUrl);
  };

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
      image:
        "https://cdn.builder.io/api/v1/image/assets%2Fddba8a59ba1f49149550d5bc623e56d7%2F8bebf119965a4b5ba2f2d45b556c0cb2?format=webp&width=800",
      description: "Official jerseys from Messi, Ronaldo & more",
      link: "/collections/football",
    },
    {
      name: "Anime Rings",
      items: 180,
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
      description: "Exclusive rings from Naruto, One Piece & more",
      link: "/collections/anime",
    },
    {
      name: "K-pop Merch",
      items: 240,
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
      description: "BTS, Blackpink, Stray Kids official items",
      link: "/collections/pop-culture",
    },
    {
      name: "Marvel Collection",
      items: 420,
      image:
        "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&q=80",
      description: "Superhero gear for true Marvel fans",
      link: "/collections/pop-culture",
    },
  ];

  const socialProof = [
    { metric: "500K+", label: "Happy Customers", icon: Users, color: "text-blue-500" },
    { metric: "150+", label: "Countries Shipped", icon: Globe, color: "text-green-500" },
    { metric: "4.8★", label: "Average Rating", icon: Award, color: "text-yellow-500" },
    { metric: "24/7", label: "Customer Support", icon: ShieldCheck, color: "text-purple-500" },
  ];

  const urgencyOffers = [
    { text: "🔥 LIMITED TIME: Extra 25% OFF on first order!", bgColor: "bg-red-500" },
    { text: "⚡ FREE shipping worldwide - No minimum order!", bgColor: "bg-blue-500" },
    { text: "🎁 Buy 2 Get 1 FREE on selected items!", bgColor: "bg-green-500" },
  ];

  const trustSignals = [
    { icon: ShieldCheck, text: "Secure Payment", desc: "SSL Protected" },
    { icon: Truck, text: "Fast Shipping", desc: "3-7 days delivery" },
    { icon: Award, text: "Premium Quality", desc: "Authentic products" },
    { icon: CreditCard, text: "Easy Returns", desc: "30-day guarantee" },
  ];

  const customerTestimonials = [
    {
      name: "Sarah M.",
      location: "🇺🇸 USA",
      text: "Best quality jerseys I've ever bought! My Messi jersey looks exactly like the real one. Fast shipping too!",
      rating: 5,
      verified: true
    },
    {
      name: "Alex K.",
      location: "🇬🇧 UK",
      text: "Amazing anime rings collection! Got my Naruto ring and it's perfect. Customer service is top-notch.",
      rating: 5,
      verified: true
    },
    {
      name: "Michael R.",
      location: "🇨🇦 Canada",
      text: "FanKick is my go-to for all pop culture merch. Quality is incredible and prices are unbeatable!",
      rating: 5,
      verified: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Urgent Offer Banner */}
      <div className="bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 text-white py-2 overflow-hidden">
        <div className="animate-scroll whitespace-nowrap">
          <span className="inline-block px-4 font-bold text-sm">
            🔥 MEGA SALE: 50% OFF Everything + FREE Worldwide Shipping! Limited Time Only!
          </span>
          <span className="inline-block px-4 font-bold text-sm">
            ⚡ Use Code: FANKICK50 | Order now and get instant 50% discount!
          </span>
          <span className="inline-block px-4 font-bold text-sm">
            🎁 Plus FREE Gift with every order above $50! Don't miss out!
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 py-8 sm:py-12 lg:py-20 overflow-hidden border-b border-border/20">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-5"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary to-cyan-500 opacity-20 dark:opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 dark:opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-orange-400 to-red-500 opacity-15 dark:opacity-8 rounded-full blur-2xl animate-pulse delay-500"></div>
          <div className="absolute top-3/4 left-1/3 w-48 h-48 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-15 dark:opacity-8 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-primary via-cyan-500 to-purple-500 text-white shadow-2xl shadow-primary/25 border border-white/20 backdrop-blur-sm font-bold px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg animate-pulse">
              <Globe className="w-5 h-5 mr-2" />
              Global Dropshipping �� Free Worldwide Shipping
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-sport font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              UNLEASH YOUR
              <span className="block bg-gradient-to-r from-primary via-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                FANDOM
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
              From Messi's magic to Naruto's jutsu, Taylor's melodies to
              Marvel's heroes - get authentic merchandise that defines your
              passion. Trusted by 500K+ fans worldwide.
            </p>

            {/* Enhanced Social Proof */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-3xl mx-auto">
              {socialProof.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="text-center bg-white/80 dark:bg-black/20 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-lg border border-white/20">
                    <IconComponent className={`w-6 h-6 mx-auto mb-2 ${item.color}`} />
                    <div className="text-lg sm:text-2xl font-bold text-primary">
                      {item.metric}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      {item.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8 max-w-4xl mx-auto">
              {trustSignals.map((signal, index) => {
                const IconComponent = signal.icon;
                return (
                  <div key={index} className="flex flex-col items-center bg-white/60 dark:bg-black/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-white/20">
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-primary mb-1" />
                    <div className="text-xs sm:text-sm font-semibold text-center">{signal.text}</div>
                    <div className="text-xs text-muted-foreground text-center">{signal.desc}</div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 text-white hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 font-bold px-6 sm:px-8 py-4 sm:py-5 text-base sm:text-lg transition-all duration-300 border border-white/20 backdrop-blur-sm relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 animate-pulse"></div>
                <Zap className="w-4 sm:w-5 h-4 sm:h-5 mr-2 relative z-10" />
                <span className="relative z-10">Get 50% OFF Now!</span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-gradient-to-r hover:from-primary hover:to-purple-500 hover:text-white hover:scale-105 px-6 sm:px-8 py-4 sm:py-5 text-base sm:text-lg shadow-lg hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 backdrop-blur-sm"
              >
                <Flame className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                Trending Products
              </Button>
            </div>

            {/* Limited Time Offer */}
            <div className="mt-6 sm:mt-8 text-center">
              <div className="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                ⏰ HURRY! Offer ends in: <span className="font-mono">23:59:45</span>
              </div>
            </div>
          </div>

          {/* Hero Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {heroCategories.map((category, index) => (
              <Link key={index} to={category.link}>
                <Card className="group cursor-pointer hover:scale-105 transition-all duration-300 overflow-hidden bg-gradient-to-br from-secondary to-background border-border shadow-lg hover:shadow-xl">
                  <CardContent className="p-0">
                    <div
                      className={`h-40 sm:h-48 bg-gradient-to-br ${category.color} relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300"></div>
                      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white">
                        <h3 className="font-sport font-bold text-lg sm:text-2xl mb-1">
                          {category.title}
                        </h3>
                        <p className="text-white/80 text-xs sm:text-sm mb-2 sm:mb-3">
                          {category.subtitle}
                        </p>
                        <Button className="bg-white text-black hover:bg-gray-100 font-semibold text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2">
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

      {/* Flash Sale Banner */}
      <section className="py-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 font-bold">
            <Zap className="w-6 h-6 animate-bounce" />
            <span className="text-lg">⚡ FLASH SALE: Extra 25% OFF for next 100 customers only!</span>
            <Crown className="w-6 h-6 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 bg-slate-50/50 dark:bg-muted border-y border-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center gap-2 mb-4">
              <Badge className="bg-red-500 text-white font-bold px-4 py-2 animate-pulse">
                <Flame className="w-4 h-4 mr-2" />
                🔥 HOT DEALS
              </Badge>
              <Badge className="bg-green-500 text-white font-bold px-4 py-2">
                <Gift className="w-4 h-4 mr-2" />
                FREE SHIPPING
              </Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sport font-bold text-foreground mb-3 sm:mb-4">
              🔥 BEST SELLERS - UP TO 70% OFF!
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
              <span className="font-bold text-red-500">LIMITED STOCK!</span> Join 500K+ fans who grabbed these trending items. <span className="font-bold">Only few pieces left!</span>
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {trendingProducts.map((product, index) => {
              const convertedPrice = convertPrice(
                product.basePrice,
                selectedCurrency.code,
                "INR",
              ); // Convert from INR base
              const convertedOriginalPrice = convertPrice(
                product.originalPrice,
                selectedCurrency.code,
                "INR",
              );

              return (
                <Link key={index} to={`/product/${product.id}`}>
                  <Card className="group cursor-pointer hover:shadow-2xl hover:shadow-primary/10 hover:scale-105 transition-all duration-500 overflow-hidden border border-border/50 hover:border-primary/30 bg-card/80 backdrop-blur-sm hover:bg-gradient-to-br hover:from-primary/5 hover:to-purple-500/5">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets%2Fddba8a59ba1f49149550d5bc623e56d7%2F61ece27bc9db40fcb5161b972d368a2e?format=webp&width=800"
                          alt={product.name}
                          className="w-full h-40 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                        />

                        {/* Enhanced Overlays */}
                        <div className="absolute top-2 left-2 space-y-1">
                          <Badge className="bg-red-500 text-white text-xs font-bold animate-pulse">
                            <Flame className="w-3 h-3 mr-1" />
                            🔥 70% OFF
                          </Badge>
                          {product.isTrending && (
                            <Badge className="bg-yellow-500 text-black text-xs font-bold">
                              <Crown className="w-3 h-3 mr-1" />
                              #1 BESTSELLER
                            </Badge>
                          )}
                          <Badge className="bg-green-500 text-white text-xs font-bold">
                            <Heart className="w-3 h-3 mr-1" />
                            1.2K LOVES
                          </Badge>
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
                          <LikeButton
                            productId={product.id}
                            variant="ghost"
                            size="sm"
                            className="bg-white/90 hover:bg-white"
                          />
                        </div>

                        <div className="absolute bottom-2 left-2">
                          <Badge className="bg-red-500 text-white text-xs font-bold animate-pulse">
                            ⚠️ Only 3 left!
                          </Badge>
                        </div>

                        {/* Urgency Timer */}
                        <div className="absolute top-2 right-2">
                          <div className="bg-black/80 text-white px-2 py-1 rounded text-xs font-bold">
                            <Timer className="w-3 h-3 inline mr-1" />
                            2h 15m left
                          </div>
                        </div>

                        <div className="absolute bottom-2 right-2 flex items-center space-x-1 bg-black/70 text-white px-2 py-1 rounded text-xs">
                          <Eye className="w-3 h-3" />
                          <span>
                            {(product.reviews / 100).toFixed(1)}K views
                          </span>
                        </div>
                      </div>

                      <div className="p-3 sm:p-4">
                        <h3 className="font-semibold mb-2 text-xs sm:text-sm line-clamp-2">
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
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground ml-1 sm:ml-2 hidden sm:inline">
                            {product.rating} ({product.reviews.toLocaleString()}
                            )
                          </span>
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className="font-bold text-primary text-sm sm:text-lg">
                              {formatPrice(
                                convertedPrice,
                                selectedCurrency.code,
                              )}
                            </span>
                            <span className="text-muted-foreground line-through text-xs sm:text-sm ml-1 sm:ml-2">
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
                          className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 font-bold text-xs sm:text-sm py-2 sm:py-2.5 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (product.variants.length > 0) {
                              addToCart(product, product.variants[0]);
                            }
                          }}
                        >
                          <Zap className="w-3 h-3 mr-1" />
                          Buy Now - 70% OFF!
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
      <section className="py-8 sm:py-12 lg:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-4 py-2">
              <Crown className="w-4 h-4 mr-2" />
              PREMIUM COLLECTIONS
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sport font-bold text-foreground mb-3 sm:mb-4">
              SHOP BY YOUR PASSION
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
              <span className="font-bold text-primary">500K+ fans trust us</span> for authentic merchandise. Find your perfect collection below!
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {categories.map((category, index) => (
              <Link key={index} to={category.link}>
                <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 h-full border border-border/50 hover:border-primary/20 bg-card">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-32 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-red-500 text-white text-xs font-bold">
                          UP TO 70% OFF
                        </Badge>
                      </div>
                      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white">
                        <h3 className="font-bold text-sm sm:text-lg mb-1">
                          {category.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-white/80">
                          {category.items} products • <span className="text-yellow-400 font-bold">⭐ 4.8 rating</span>
                        </p>
                      </div>
                    </div>
                    <div className="p-3 sm:p-4">
                      <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">
                        {category.description}
                      </p>
                      <Button
                        className="w-full bg-gradient-to-r from-primary to-purple-500 text-white hover:from-purple-500 hover:to-pink-500 font-bold text-xs sm:text-sm py-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        Shop Now - 70% OFF!
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
      <section className="py-8 sm:py-12 bg-gradient-to-r from-primary to-purple-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-foreground">
            <div className="flex items-center justify-center mb-4">
              <Globe className="w-6 sm:w-8 h-6 sm:h-8 mr-2 sm:mr-3" />
              <h2 className="text-xl sm:text-2xl font-sport font-bold">
                WORLDWIDE SHIPPING
              </h2>
            </div>
            <p className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 px-4">
              Free shipping to 150+ countries • Express delivery • Track your
              order in real-time
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-medium">
              <span className="bg-black/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                🇺🇸 USA: 5-7 days
              </span>
              <span className="bg-black/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                🇬🇧 UK: 7-10 days
              </span>
              <span className="bg-black/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                🇩🇪 Germany: 6-9 days
              </span>
              <span className="bg-black/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                🇨🇦 Canada: 8-12 days
              </span>
              <span className="bg-black/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                🇸🇦 Saudi: 5-8 days
              </span>
              <span className="bg-black/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                🇮🇳 India: 3-5 days
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="mb-4 bg-green-500 text-white font-bold px-4 py-2">
              <ShieldCheck className="w-4 h-4 mr-2" />
              VERIFIED REVIEWS
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sport font-bold text-foreground mb-3 sm:mb-4">
              500K+ HAPPY CUSTOMERS WORLDWIDE
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
              Don't just take our word for it - see what our fans are saying!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customerTestimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-200 dark:border-green-800">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    {testimonial.verified && (
                      <Badge className="ml-2 bg-green-100 text-green-800 text-xs">
                        <ShieldCheck className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold text-sm">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button className="bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 font-bold px-8 py-3">
              <Star className="w-4 h-4 mr-2" />
              Read All 50K+ Reviews
            </Button>
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-8 sm:py-12 lg:py-16 bg-slate-50/50 dark:bg-muted border-y border-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold px-4 py-2">
              <Instagram className="w-4 h-4 mr-2" />
              1M+ FOLLOWERS
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sport font-bold text-foreground mb-3 sm:mb-4">
              JOIN THE FANKICK COMMUNITY
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 px-4">
              <span className="font-bold text-primary">1M+ fans worldwide</span> are already showing off their FanKick gear! <span className="font-bold">Tag us and get featured!</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90 font-semibold">
                <Instagram className="w-4 h-4 mr-2" />
                Follow @fankick_global
              </Button>
              <Button variant="outline" className="border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white font-semibold">
                <Heart className="w-4 h-4 mr-2" />
                Share Your Style
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
            {Array.from({ length: 6 }, (_, i) => (
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

      {/* Final Urgency Call-to-Action */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="mb-6">
            <Badge className="bg-yellow-400 text-black font-bold px-4 py-2 text-lg animate-bounce">
              <Timer className="w-5 h-5 mr-2" />
              🚨 LAST CHANCE!
            </Badge>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sport font-bold mb-4">
            DON'T MISS OUT!
          </h2>

          <p className="text-xl sm:text-2xl mb-6">
            <span className="font-bold">70% OFF</span> ends in:
            <span className="block text-3xl font-mono font-bold mt-2 animate-pulse">
              23:59:45
            </span>
          </p>

          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">500K+</div>
                <div className="text-sm">Happy Customers</div>
              </div>
              <div>
                <div className="text-2xl font-bold">4.8★</div>
                <div className="text-sm">Rating</div>
              </div>
              <div>
                <div className="text-2xl font-bold">FREE</div>
                <div className="text-sm">Worldwide Shipping</div>
              </div>
              <div>
                <div className="text-2xl font-bold">30-Day</div>
                <div className="text-sm">Money Back</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-red-500 hover:bg-gray-100 font-bold px-8 py-4 text-xl shadow-2xl">
              <Zap className="w-6 h-6 mr-2" />
              CLAIM 70% OFF NOW!
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-red-500 font-bold px-8 py-4 text-xl">
              <Gift className="w-6 h-6 mr-2" />
              Free Gift Included
            </Button>
          </div>

          <p className="text-sm mt-4 opacity-90">
            ⚡ Over 1,000 customers bought in the last 24 hours! Only <span className="font-bold">few items left</span> at this price.
          </p>
        </div>
      </section>

      <Footer />
      <AuthModalComponent />
    </div>
  );
}
