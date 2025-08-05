import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { PaymentModal } from "@/components/PaymentModal";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useProducts } from "@/contexts/ProductContext";
import { convertPrice, formatPrice } from "@/utils/currency";
import {
  getAvailablePaymentMethods,
  calculateShippingCost,
  isCODAvailable,
} from "@/utils/payments";
import {
  Star,
  ShoppingCart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  MapPin,
  Clock,
  CreditCard,
  Banknote,
} from "lucide-react";
import { LikeButton } from "@/components/LikeButton";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { selectedCurrency } = useCurrency();
  const { getProductById, getTrendingProducts } = useProducts();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const product = getProductById(id || "");
  const relatedProducts = getTrendingProducts(3);

  useEffect(() => {
    if (product && product.variants.length > 0) {
      setSelectedVariant(product.variants[0].id);
    }
  }, [product]);

  // Scroll to top when component mounts or product ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Product Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The product you're looking for doesn't exist.
          </p>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const currentVariant =
    product.variants.find((v) => v.id === selectedVariant) ||
    product.variants[0];
  const convertedPrice = convertPrice(
    currentVariant.price,
    selectedCurrency.code,
    "INR",
  );
  const convertedOriginalPrice = convertPrice(
    currentVariant.originalPrice,
    selectedCurrency.code,
    "INR",
  );

  const paymentMethods = getAvailablePaymentMethods(
    selectedCurrency.code === "INR" ? "IN" : "US",
  );
  const codAvailable = isCODAvailable(
    selectedCurrency.code === "INR" ? "IN" : "US",
  );
  const shippingInfo = calculateShippingCost(
    selectedCurrency.code === "INR" ? "IN" : "US",
    convertedPrice * quantity,
    product.shippingDays,
  );

  const reviews = [
    {
      id: 1,
      name: "Arjun K.",
      rating: 5,
      date: "2 days ago",
      comment:
        "Amazing quality! The product fits perfectly and the material is top-notch. Delivery was super fast.",
      verified: true,
    },
    {
      id: 2,
      name: "Priya S.",
      rating: 5,
      date: "1 week ago",
      comment:
        "Got this as a gift and they absolutely loved it. Great quality and authentic feel.",
      verified: true,
    },
    {
      id: 3,
      name: "Rohit M.",
      rating: 4,
      date: "2 weeks ago",
      comment:
        "Good product but sizing runs a bit large. Quality is excellent though.",
      verified: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link
            to={`/${product.category}`}
            className="hover:text-primary capitalize"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F6c1dea172d6a4b98b66fa189fb2ab1aa%2F4081c4ae39a24ffbbaf62dab017528d2?format=webp&width=800"
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 space-y-2">
                {product.badges.map((badge, index) => (
                  <Badge key={index} className="bg-red-500 text-white">
                    {badge}
                  </Badge>
                ))}
                <Badge className="bg-green-600 text-white">
                  {Math.round(
                    ((convertedOriginalPrice - convertedPrice) /
                      convertedOriginalPrice) *
                      100,
                  )}
                  % OFF
                </Badge>
              </div>

              <div className="absolute top-4 right-4 space-y-2">
                <LikeButton
                  productId={product.id}
                  size="sm"
                  variant="outline"
                  className="bg-background"
                />
                <Button size="sm" variant="outline" className="bg-background">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F6c1dea172d6a4b98b66fa189fb2ab1aa%2F4081c4ae39a24ffbbaf62dab017528d2?format=webp&width=800"
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-sport font-bold text-foreground mb-2">
                {product.name}
              </h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className="text-primary border-primary"
                >
                  In Stock ({currentVariant.stock} left)
                </Badge>
              </div>

              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(convertedPrice, selectedCurrency)}
                </span>
                <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
                  {formatPrice(convertedOriginalPrice, selectedCurrency)}
                </span>
                <Badge className="bg-red-100 text-red-800">
                  Save{" "}
                  {formatPrice(
                    convertedOriginalPrice - convertedPrice,
                    selectedCurrency.code,
                  )}
                </Badge>
              </div>
            </div>

            {/* Variant Selection */}
            {product.variants.some((v) => v.size) && (
              <div>
                <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
                  Size
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants
                    .filter((v) => v.size)
                    .map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant.id)}
                        className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                          selectedVariant === variant.id
                            ? "border-primary bg-primary text-black"
                            : "border-gray-300 hover:border-gray-400 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        }`}
                      >
                        {variant.size}
                      </button>
                    ))}
                </div>
              </div>
            )}

            {product.variants.some((v) => v.color) && (
              <div>
                <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
                  Color
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants
                    .filter((v) => v.color)
                    .map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant.id)}
                        className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                          selectedVariant === variant.id
                            ? "border-primary bg-primary text-black"
                            : "border-gray-300 hover:border-gray-400 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        }`}
                      >
                        {variant.color}
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
                Quantity
              </h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center font-medium text-gray-900 dark:text-white">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setQuantity(Math.min(currentVariant.stock, quantity + 1))
                  }
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-primary text-black hover:bg-primary/90 font-semibold py-4"
                disabled={currentVariant.stock === 0}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart -{" "}
                {formatPrice(convertedPrice * quantity, selectedCurrency)}
              </Button>

              {codAvailable && (
                <Button size="lg" variant="outline" className="w-full py-4">
                  <Banknote className="w-5 h-5 mr-2" />
                  Buy Now with COD
                </Button>
              )}

              <Button
                size="lg"
                className="w-full bg-black text-white hover:bg-gray-800 py-4"
                onClick={() => setShowPaymentModal(true)}
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Quick Checkout
              </Button>
            </div>

            {/* Shipping Info */}
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">
                    {shippingInfo.isFree
                      ? "FREE"
                      : formatPrice(
                          shippingInfo.cost,
                          selectedCurrency.code,
                        )}{" "}
                    Shipping
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Estimated delivery in {shippingInfo.estimatedDays} days
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Global Shipping Available</p>
                  <p className="text-sm text-muted-foreground">
                    Ships to 150+ countries
                  </p>
                </div>
              </div>

              {codAvailable && (
                <div className="flex items-center space-x-3">
                  <Banknote className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Cash on Delivery Available</p>
                    <p className="text-sm text-muted-foreground">
                      Pay when you receive
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-200">
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Authentic
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  100% genuine
                </p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Easy Returns
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  15 days policy
                </p>
              </div>
              <div className="text-center">
                <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Fast Shipping
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {product.shippingDays} days
                </p>
              </div>
            </div>

            {/* Product Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Product Details
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>

              {product.features && (
                <div>
                  <h4 className="font-medium mb-2 text-gray-900 dark:text-white">
                    Features:
                  </h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-gray-700 dark:text-gray-300"
                      >
                        <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.materials && (
                <div>
                  <h4 className="font-medium mb-2 text-gray-900 dark:text-white">
                    Materials:
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {product.materials.join(", ")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-sport font-bold text-gray-900 dark:text-white">
              Customer Reviews
            </h2>
            <Button variant="outline">Write a Review</Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {product.rating}
                  </div>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {product.reviews} total reviews
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-6">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {review.name}
                          </span>
                          {review.verified && (
                            <Badge variant="outline" className="text-xs">
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < review.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {review.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {review.comment}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-sport font-bold mb-8">
            You might also like
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct, index) => {
              const relatedConvertedPrice = convertPrice(
                relatedProduct.basePrice,
                selectedCurrency.code,
                "INR",
              );
              const relatedConvertedOriginalPrice = convertPrice(
                relatedProduct.originalPrice,
                selectedCurrency.code,
                "INR",
              );

              return (
                <Link key={index} to={`/product/${relatedProduct.id}`}>
                  <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={relatedProduct.images[0]}
                          alt={relatedProduct.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                          Sale
                        </Badge>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2 text-sm line-clamp-2">
                          {relatedProduct.name}
                        </h3>
                        <div className="flex items-center mb-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-muted-foreground ml-1">
                            {relatedProduct.rating}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-bold text-primary">
                              {formatPrice(
                                relatedConvertedPrice,
                                selectedCurrency.code,
                              )}
                            </span>
                            <span className="text-gray-400 line-through text-sm ml-2">
                              {formatPrice(
                                relatedConvertedOriginalPrice,
                                selectedCurrency.code,
                              )}
                            </span>
                          </div>
                          <Button size="sm">Add to Cart</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        product={{
          name: product.name,
          image: product.images[0],
          price: convertedPrice,
          quantity: quantity,
        }}
        shippingCost={shippingInfo.cost}
        codAvailable={codAvailable}
      />

      <Footer />
    </div>
  );
}
