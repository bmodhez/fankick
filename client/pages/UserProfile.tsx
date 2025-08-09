import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useProducts } from "@/contexts/ProductContext";
import { useLike } from "@/contexts/LikeContext";
import { userApi, WishlistItem } from "@/services/userApi";
import { orderApi } from "@/services/orderApi";
import { UserOrder } from "@/types/user";
import { useRealTime } from "@/contexts/RealTimeContext";
import { formatPrice, convertPrice } from "@/utils/currency";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  Heart,
  ShoppingCart,
  Star,
  Calendar,
  Edit,
  Save,
  Crown,
  Truck,
  CreditCard,
  Gift,
  Settings,
  LogOut,
  Eye,
  Download,
  X,
  ArrowLeft,
} from "lucide-react";

export default function UserProfile() {
  const { user, logout, isAdmin, isAuthenticated } = useAuth();
  const { items: cartItems, totalPrice, addToCart } = useCart();
  const { selectedCurrency } = useCurrency();
  const { products } = useProducts();
  const { likeCount, refreshLikes, likedProducts } = useLike();
  const navigate = useNavigate();
  const { cartCount, cartTotal, orderCount, showNotification, updateUserStats } = useRealTime();

  const [activeTab, setActiveTab] = useState("profile");
  const [userWishlist, setUserWishlist] = useState<WishlistItem[]>([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load user wishlist when component mounts or user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      loadWishlist();
    }
  }, [isAuthenticated, user]);

  // Refresh wishlist when like count changes (real-time updates)
  useEffect(() => {
    if (isAuthenticated && user && activeTab === "wishlist") {
      loadWishlist();
    }
  }, [likeCount, isAuthenticated, user, activeTab]);

  // Load orders when user is authenticated and orders tab is active
  useEffect(() => {
    if (isAuthenticated && user && activeTab === "orders") {
      loadOrders();
    }
  }, [isAuthenticated, user, activeTab]);

  // Log cart changes for debugging real-time updates
  useEffect(() => {
    console.log("Cart items updated:", cartItems.length);
    console.log("Total price updated:", totalPrice);
  }, [cartItems, totalPrice]);

  const loadWishlist = async () => {
    try {
      setWishlistLoading(true);
      const wishlistData = await userApi.getWishlist();
      setUserWishlist(wishlistData);
    } catch (error) {
      console.error("Error loading wishlist:", error);
    } finally {
      setWishlistLoading(false);
    }
  };

  const loadOrders = async () => {
    try {
      setOrdersLoading(true);
      const ordersData = await orderApi.getUserOrders(user.id);
      setOrders(ordersData);
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      await userApi.removeFromWishlist(productId);
      setUserWishlist((prev) =>
        prev.filter((item) => item.productId !== productId),
      );
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.firstName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    bio: "",
  });

  // Real user orders loaded from API
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Use real-time wishlist data from context instead of hardcoded empty array
  // const [wishlist] = useState([]); // Removed - using userWishlist from API instead

  // Update form when user data changes
  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.firstName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: "",
        bio: "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!user) {
    return null;
  }

  const handleSaveProfile = () => {
    // In a real app, you'd save to backend
    alert("Profile updated successfully!");
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500 text-white";
      case "shipped":
        return "bg-blue-500 text-white";
      case "confirmed":
        return "bg-blue-400 text-white";
      case "placed":
        return "bg-yellow-500 text-black";
      case "processing":
        return "bg-yellow-500 text-black";
      case "cancelled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User, count: null },
    { id: "orders", label: "Orders", icon: Package, count: orders.length },
    { id: "wishlist", label: "Liked Products", icon: Heart, count: likeCount },
    { id: "cart", label: "Cart", icon: ShoppingCart, count: cartItems.length },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        {/* User Header */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center">
                {isAdmin() ? (
                  <Crown className="w-10 h-10 text-black" />
                ) : (
                  <User className="w-10 h-10 text-black" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl font-bold text-white">
                    {user.firstName || "User"}
                  </h1>
                  {isAdmin() && (
                    <Badge className="bg-gradient-to-r from-primary to-purple-500 text-black">
                      <Crown className="w-3 h-3 mr-1" />
                      Admin
                    </Badge>
                  )}
                  {user.isVerified ? (
                    <Badge className="bg-green-500 text-white">
                      ✓ Verified
                    </Badge>
                  ) : (
                    <Badge className="bg-yellow-500 text-black">
                      ⚠ Unverified
                    </Badge>
                  )}
                </div>

                <p className="text-gray-400 mb-3">{user.email}</p>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">
                      {orders.length}
                    </div>
                    <div className="text-gray-400">Orders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">
                      {likeCount}
                    </div>
                    <div className="text-gray-400">Liked Products</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">
                      {cartItems.length}
                    </div>
                    <div className="text-gray-400">Cart Items</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">
                      {formatPrice(
                        convertPrice(totalPrice, selectedCurrency.code, "INR"),
                        selectedCurrency,
                      )}
                    </div>
                    <div className="text-gray-400">Cart Total</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                {isAdmin() && (
                  <Link to="/admin">
                    <Button className="bg-gradient-to-r from-primary to-purple-500 text-black hover:opacity-90">
                      <Settings className="w-4 h-4 mr-2" />
                      Admin Panel
                    </Button>
                  </Link>
                )}
                <Button
                  variant="outline"
                  onClick={logout}
                  className="border-gray-600 text-gray-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-t-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-black border-b-2 border-primary"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== null && tab.count > 0 && (
                <Badge className="bg-gray-600 text-white text-xs">
                  {tab.count}
                </Badge>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">
                      Personal Information
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                      className="border-gray-600 text-gray-300"
                    >
                      {isEditing ? (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </>
                      ) : (
                        <>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <Input
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    ) : (
                      <p className="text-gray-300">{editForm.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Email
                    </label>
                    {isEditing ? (
                      <Input
                        value={editForm.email}
                        onChange={(e) =>
                          setEditForm({ ...editForm, email: e.target.value })
                        }
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    ) : (
                      <p className="text-gray-300">{editForm.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Phone
                    </label>
                    {isEditing ? (
                      <Input
                        value={editForm.phone}
                        onChange={(e) =>
                          setEditForm({ ...editForm, phone: e.target.value })
                        }
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    ) : (
                      <p className="text-gray-300">{editForm.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Address
                    </label>
                    {isEditing ? (
                      <Textarea
                        value={editForm.address}
                        onChange={(e) =>
                          setEditForm({ ...editForm, address: e.target.value })
                        }
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    ) : (
                      <p className="text-gray-300">{editForm.address}</p>
                    )}
                  </div>

                  {isEditing && (
                    <Button
                      onClick={handleSaveProfile}
                      className="w-full bg-primary text-black hover:bg-primary/90"
                    >
                      Save Changes
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    Account Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-700 rounded-lg">
                      <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                      <div className="text-lg font-bold text-white">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString(
                              "en-US",
                              { month: "short", year: "numeric" },
                            )
                          : "New User"}
                      </div>
                      <div className="text-sm text-gray-400">Member Since</div>
                    </div>

                    <div className="text-center p-4 bg-gray-700 rounded-lg">
                      <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                      <div className="text-lg font-bold text-white">
                        {orders.length >= 5 ? "Gold" : "Silver"}
                      </div>
                      <div className="text-sm text-gray-400">Member Tier</div>
                    </div>

                    <div className="text-center p-4 bg-gray-700 rounded-lg">
                      <Gift className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <div className="text-lg font-bold text-white">
                        {Math.floor(orders.length / 2)}
                      </div>
                      <div className="text-sm text-gray-400">Rewards</div>
                    </div>

                    <div className="text-center p-4 bg-gray-700 rounded-lg">
                      <Truck className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <div className="text-lg font-bold text-white">
                        {
                          orders.filter((order) => order.status === "delivered")
                            .length
                        }
                      </div>
                      <div className="text-sm text-gray-400">Deliveries</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              {ordersLoading ? (
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-12 text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Loading orders...
                    </h3>
                    <p className="text-gray-400">Please wait while we fetch your order history</p>
                  </CardContent>
                </Card>
              ) : orders.length === 0 ? (
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-12 text-center">
                    <Package className="w-20 h-20 text-gray-600 mx-auto mb-6" />
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      No orders yet
                    </h3>
                    <p className="text-gray-400 mb-6 max-w-md mx-auto">
                      When you place orders, they'll appear here. Start shopping
                      to see your order history!
                    </p>
                    <Link to="/">
                      <Button className="bg-primary text-black hover:bg-primary/90">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Start Shopping
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                orders.map((order) => (
                  <Card key={order.id} className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-500 rounded-lg flex items-center justify-center">
                            <Package className="w-8 h-8 text-black" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-white">
                                {order.orderNumber}
                              </h3>
                              <Badge className={getStatusColor(order.orderStatus)}>
                                {order.orderStatus.charAt(0).toUpperCase() +
                                  order.orderStatus.slice(1)}
                              </Badge>
                              <Badge className={order.paymentStatus === 'paid' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'}>
                                {order.paymentStatus.charAt(0).toUpperCase() +
                                  order.paymentStatus.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-400 mb-1">
                              {order.items?.map(item => item.productName).join(", ") || "Order items"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {order.items?.length || 0} items • {new Date(order.createdAt).toLocaleDateString()} • {order.paymentMethod || 'Unknown method'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary">
                              {formatPrice(
                                convertPrice(
                                  order.totalAmount,
                                  order.currency,
                                  selectedCurrency.code
                                ),
                                selectedCurrency,
                              )}
                            </div>
                            <div className="text-xs text-gray-500">
                              {order.currency}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-600 text-gray-300 hover:bg-gray-700"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-600 text-gray-300 hover:bg-gray-700"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Invoice
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === "wishlist" && (
            <div>
              {wishlistLoading ? (
                <div className="text-center py-8">
                  <div className="text-gray-400">Loading liked products...</div>
                </div>
              ) : likeCount === 0 ? (
                <div className="text-center py-8">
                  <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-400 mb-2">
                    No liked products yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Start liking products to see them here!
                  </p>
                  <Link to="/">
                    <Button className="bg-primary text-black hover:bg-primary/90">
                      Explore Products
                    </Button>
                  </Link>
                </div>
              ) : (
                <div>
                  <div className="mb-4">
                    <p className="text-gray-400 text-sm">
                      Showing {likeCount} liked product
                      {likeCount !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Display products from real-time liked products context */}
                    {[...likedProducts].map((productId) => {
                      const product = products.find((p) => p.id === productId);
                      if (!product) return null;

                      return (
                        <Card
                          key={productId}
                          className="bg-gray-800 border-gray-700"
                        >
                          <CardContent className="p-4">
                            <Link to={`/product/${product.id}`}>
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-32 object-cover rounded-lg mb-4 hover:scale-105 transition-transform"
                              />
                            </Link>
                            <Link to={`/product/${product.id}`}>
                              <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2 hover:text-primary transition-colors">
                                {product.name}
                              </h3>
                            </Link>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-lg font-bold text-primary">
                                {formatPrice(
                                  convertPrice(
                                    product.variants[0]?.price ||
                                      product.basePrice,
                                    selectedCurrency.code,
                                    "INR",
                                  ),
                                  selectedCurrency,
                                )}
                              </span>
                              <Badge
                                className={
                                  product.stockQuantity > 0
                                    ? "bg-green-500 text-white"
                                    : "bg-red-500 text-white"
                                }
                              >
                                {product.stockQuantity > 0
                                  ? "In Stock"
                                  : "Out of Stock"}
                              </Badge>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                disabled={product.stockQuantity === 0}
                                className="flex-1 bg-primary text-black hover:bg-primary/90 disabled:opacity-50"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (product.variants.length > 0) {
                                    addToCart(product, product.variants[0]);
                                  } else {
                                    // Create a default variant if none exist
                                    const defaultVariant = {
                                      id: `${product.id}-default`,
                                      size: "Default",
                                      color: "Default",
                                      price: product.basePrice,
                                      stock: product.stockQuantity,
                                    };
                                    addToCart(product, defaultVariant);
                                  }
                                }}
                              >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Add to Cart
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-600 text-red-400 hover:bg-red-500 hover:text-white"
                                onClick={async () => {
                                  await removeFromWishlist(product.id);
                                  // Also refresh the like context
                                  refreshLikes();
                                }}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Cart Tab */}
          {activeTab === "cart" && (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Shopping Cart</CardTitle>
              </CardHeader>
              <CardContent>
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-400 mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Add some amazing products to get started!
                    </p>
                    <Link to="/">
                      <Button className="bg-primary text-black hover:bg-primary/90">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-white">
                            {item.product.name}
                          </h4>
                          <p className="text-sm text-gray-400">
                            {item.variant.size && `Size: ${item.variant.size}`}
                            {item.variant.color &&
                              ` • Color: ${item.variant.color}`}
                          </p>
                          <p className="text-primary font-semibold">
                            {formatPrice(
                              convertPrice(
                                item.variant.price,
                                selectedCurrency.code,
                                "INR",
                              ),
                              selectedCurrency,
                            )}{" "}
                            × {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div className="border-t border-gray-600 pt-4 flex justify-between items-center">
                      <span className="text-lg font-semibold text-white">
                        Total:{" "}
                        {formatPrice(
                          convertPrice(
                            totalPrice,
                            selectedCurrency.code,
                            "INR",
                          ),
                          selectedCurrency,
                        )}
                      </span>
                      <Button
                        onClick={() => {
                          if (!user) {
                            navigate("/login", {
                              state: { from: { pathname: "/checkout" } },
                            });
                            return;
                          }
                          navigate("/checkout");
                        }}
                        className="bg-primary text-black hover:bg-primary/90 font-semibold"
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Checkout
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
