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
} from "lucide-react";

export default function UserProfile() {
  const { user, logout } = useAuth();
  const { items: cartItems, totalPrice } = useCart();
  const { selectedCurrency } = useCurrency();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "123 Main St, City, Country",
    bio: "FanKick enthusiast since 2024",
  });

  // Mock data for orders and wishlist
  const [orders] = useState([
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "delivered",
      total: 89.99,
      items: 3,
      image: "/placeholder.svg",
      products: [
        "Naruto Akatsuki Hoodie",
        "Messi Jersey",
        "Taylor Swift T-Shirt",
      ],
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      status: "shipped",
      total: 159.99,
      items: 2,
      image: "/placeholder.svg",
      products: ["Attack on Titan Hoodie", "BTS Merchandise"],
    },
    {
      id: "ORD-003",
      date: "2024-01-05",
      status: "processing",
      total: 45.99,
      items: 1,
      image: "/placeholder.svg",
      products: ["One Piece Straw Hat"],
    },
  ]);

  const [wishlist] = useState([
    {
      id: "wish-1",
      name: "Demon Slayer Tanjiro Hoodie",
      price: 69.99,
      image: "/placeholder.svg",
      inStock: true,
    },
    {
      id: "wish-2",
      name: "Cristiano Ronaldo Jersey",
      price: 89.99,
      image: "/placeholder.svg",
      inStock: false,
    },
    {
      id: "wish-3",
      name: "Marvel Spider-Man Hoodie",
      price: 79.99,
      image: "/placeholder.svg",
      inStock: true,
    },
  ]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

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
    { id: "wishlist", label: "Wishlist", icon: Heart, count: wishlist.length },
    { id: "cart", label: "Cart", icon: ShoppingCart, count: cartItems.length },
  ];

  return (
    <div className="min-h-screen bg-gray-900">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Header */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-black" />
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                  <Badge className="bg-green-500 text-white">✓ Verified</Badge>
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
                      {wishlist.length}
                    </div>
                    <div className="text-gray-400">Wishlist</div>
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
                        Jan 2024
                      </div>
                      <div className="text-sm text-gray-400">Member Since</div>
                    </div>

                    <div className="text-center p-4 bg-gray-700 rounded-lg">
                      <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                      <div className="text-lg font-bold text-white">Gold</div>
                      <div className="text-sm text-gray-400">Member Tier</div>
                    </div>

                    <div className="text-center p-4 bg-gray-700 rounded-lg">
                      <Gift className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <div className="text-lg font-bold text-white">3</div>
                      <div className="text-sm text-gray-400">Rewards</div>
                    </div>

                    <div className="text-center p-4 bg-gray-700 rounded-lg">
                      <Truck className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <div className="text-lg font-bold text-white">15</div>
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
              {orders.map((order) => (
                <Card key={order.id} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
                      <div className="flex items-center space-x-4">
                        <img
                          src={order.image}
                          alt="Order"
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-white">
                              Order #{order.id}
                            </h3>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400 mb-1">
                            {order.products.join(", ")}
                          </p>
                          <p className="text-xs text-gray-500">
                            {order.items} items • {order.date}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">
                            {formatPrice(
                              convertPrice(order.total, selectedCurrency.code),
                              selectedCurrency,
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 text-gray-300"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 text-gray-300"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Invoice
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === "wishlist" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <Card key={item.id} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                    <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-primary">
                        {formatPrice(
                          convertPrice(item.price, selectedCurrency.code),
                          selectedCurrency,
                        )}
                      </span>
                      <Badge
                        className={
                          item.inStock
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }
                      >
                        {item.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        disabled={!item.inStock}
                        className="flex-1 bg-primary text-black hover:bg-primary/90 disabled:opacity-50"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-red-400"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                      <Button className="bg-primary text-black hover:bg-primary/90">
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
