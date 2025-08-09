import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Download,
  Eye,
  Truck,
  Package,
  CheckCircle,
  XCircle,
  Clock,
  RotateCcw,
  MapPin,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  RefreshCw,
  AlertTriangle,
  Edit,
  MoreVertical,
} from "lucide-react";
import { orderApi } from "@/services/orderApi";
import { UserOrder } from "@/types/user";
import { useRealTime } from "@/contexts/RealTimeContext";

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    country: string;
    flag: string;
  };
  items: Array<{
    name: string;
    variant: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  status:
    | "pending"
    | "confirmed"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "refunded";
  payment: {
    method: string;
    status: "pending" | "paid" | "failed" | "refunded";
    amount: number;
  };
  shipping: {
    method: string;
    cost: number;
    trackingNumber?: string;
    estimatedDelivery: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Minimal test data - only 1 order for demo
const testOrder: Order = {
  id: "test-001",
  orderNumber: "FK-TEST",
  customer: {
    name: "Test User",
    email: "test@example.com",
    phone: "+91 9999999999",
    address: "Test Address, India",
    country: "India",
    flag: "🇮🇳",
  },
  items: [
    {
      name: "Test Product",
      variant: "Size: M",
      quantity: 1,
      price: 999,
      image: "/placeholder.svg",
    },
  ],
  status: "pending",
  payment: {
    method: "Test",
    status: "paid",
    amount: 999,
  },
  shipping: {
    method: "Standard",
    cost: 0,
    estimatedDelivery: "2024-01-30",
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

function getStatusColor(status: string) {
  switch (status) {
    case "pending":
      return "bg-yellow-500";
    case "confirmed":
      return "bg-blue-500";
    case "shipped":
      return "bg-purple-500";
    case "delivered":
      return "bg-green-500";
    case "cancelled":
      return "bg-red-500";
    case "refunded":
      return "bg-gray-500";
    default:
      return "bg-gray-500";
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "pending":
      return Clock;
    case "confirmed":
      return CheckCircle;
    case "shipped":
      return Truck;
    case "delivered":
      return Package;
    case "cancelled":
      return XCircle;
    case "refunded":
      return RotateCcw;
    default:
      return Clock;
  }
}

export function OrderManager() {
  const [orders, setOrders] = useState<Order[]>([testOrder]); // Start with 1 test order
  const [realTimeOrders, setRealTimeOrders] = useState<UserOrder[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useRealTime();

  // Load real orders from API with cache busting
  const loadRealOrders = async () => {
    try {
      setIsLoading(true);
      console.log('🔄 Loading orders from API...');

      // Add cache busting to ensure fresh data
      const apiOrders = await orderApi.getAllOrders();
      console.log(`📦 Loaded ${apiOrders.length} orders from API:`, apiOrders);
      setRealTimeOrders(apiOrders);

      // Convert API orders to admin format and combine with minimal test data
      const convertedOrders = apiOrders.map(order => ({
        id: order.id,
        orderNumber: order.orderNumber,
        customer: {
          name: order.shippingAddress?.firstName ?
            `${order.shippingAddress.firstName} ${order.shippingAddress.lastName || ''}`.trim() :
            'Customer',
          email: order.shippingAddress?.email || 'N/A',
          phone: order.shippingAddress?.phone || 'N/A',
          address: order.shippingAddress ?
            `${order.shippingAddress.address || ''}, ${order.shippingAddress.city || ''}, ${order.shippingAddress.state || ''}`.replace(/^,\s*|,\s*$/g, '') :
            'N/A',
          country: order.shippingAddress?.country || 'India',
          flag: "🇮🇳",
        },
        items: order.items?.map(item => ({
          name: item.productName || 'Product',
          variant: item.variantDetails || 'Standard',
          quantity: item.quantity,
          price: item.unitPrice,
          image: "/placeholder.svg",
        })) || [],
        status: order.orderStatus as Order["status"],
        payment: {
          method: order.paymentMethod || 'Unknown',
          status: order.paymentStatus as "pending" | "paid" | "failed" | "refunded",
          amount: order.totalAmount,
        },
        shipping: {
          method: "Standard Delivery",
          cost: 0,
          estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        },
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      }));

      // Combine real orders with minimal test data
      setOrders([testOrder, ...convertedOrders]);
      const timestamp = new Date().toLocaleTimeString();
      showNotification(`✅ ${timestamp}: Loaded ${apiOrders.length} real orders`, 'success');
      console.log(`✅ Successfully updated orders at ${timestamp}`);
    } catch (error) {
      console.error('Failed to load orders:', error);
      showNotification('Failed to load orders', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Load orders on mount and set up real-time refresh
  useEffect(() => {
    loadRealOrders();

    // Aggressive real-time refresh every 5 seconds for true real-time experience
    const interval = setInterval(loadRealOrders, 5000);

    return () => clearInterval(interval);
  }, []);

  // Also refresh when component becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadRealOrders();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Refresh function for manual sync
  const handleRefresh = () => {
    showNotification('Syncing orders...', 'info');
    loadRealOrders();
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = async (orderId: string, newStatus: Order["status"]) => {
    try {
      // Update in API if it's a real order (not test order)
      if (orderId !== "test-001") {
        await orderApi.updateOrderStatus(orderId, { orderStatus: newStatus });
        showNotification(`Order status updated to ${newStatus}`, 'success');
      }

      // Update local state immediately for UI feedback
      setOrders(
        orders.map((order) =>
          order.id === orderId
            ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
            : order,
        ),
      );

      // Refresh from API to ensure consistency
      if (orderId !== "test-001") {
        setTimeout(loadRealOrders, 1000);
      }
    } catch (error) {
      console.error('Failed to update order status:', error);
      showNotification('Failed to update order status', 'error');
    }
  };

  const orderStats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    revenue: orders.reduce((sum, o) => sum + o.payment.amount, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">🛒 Order Management</h2>
          <p className="text-gray-400">Track and manage customer orders</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-xs text-gray-400">
            Auto-refresh: 5s
          </div>
          <Button
            className="bg-primary text-black hover:bg-primary/90 font-bold"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Syncing...' : '🔄 Refresh Now'}
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-300">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">
                {orderStats.total}
              </p>
              <p className="text-sm text-gray-400">Total Orders</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-400">
                {orderStats.pending}
              </p>
              <p className="text-sm text-gray-400">Pending</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-400">
                {orderStats.shipped}
              </p>
              <p className="text-sm text-gray-400">Shipped</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">
                {orderStats.delivered}
              </p>
              <p className="text-sm text-gray-400">Delivered</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                ₹{(orderStats.revenue / 1000).toFixed(0)}K
              </p>
              <p className="text-sm text-gray-400">Revenue</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders by number, customer name, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex items-center space-x-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Refunded</option>
              </select>

              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredOrders.map((order) => {
                  const StatusIcon = getStatusIcon(order.status);
                  return (
                    <tr key={order.id} className="hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-white">
                            #{order.orderNumber}
                          </p>
                          {order.shipping.trackingNumber && (
                            <p className="text-xs text-gray-400">
                              Track: {order.shipping.trackingNumber}
                            </p>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{order.customer.flag}</span>
                          <div>
                            <p className="text-sm font-medium text-white">
                              {order.customer.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {order.customer.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          {order.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-6 h-6 rounded object-cover"
                              />
                              <span className="text-xs text-gray-300">
                                {item.quantity}x {item.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Badge
                            className={`${getStatusColor(order.status)} text-white text-xs`}
                          >
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </Badge>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm text-white">
                            {order.payment.method}
                          </p>
                          <Badge
                            className={`text-xs ${
                              order.payment.status === "paid"
                                ? "bg-green-600"
                                : order.payment.status === "pending"
                                  ? "bg-yellow-600"
                                  : order.payment.status === "failed"
                                    ? "bg-red-600"
                                    : "bg-gray-600"
                            } text-white`}
                          >
                            {order.payment.status}
                          </Badge>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm font-medium text-white">
                          ₹{order.payment.amount.toLocaleString()}
                        </p>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm text-gray-300">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                            className="text-gray-400 hover:text-white"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-white"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white">
                  Order #{selectedOrder.orderNumber}
                </CardTitle>
                <p className="text-gray-400">Order details and management</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedOrder(null)}
              >
                ✕
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-white mb-3">
                    Customer Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">
                        {selectedOrder.customer.flag}
                      </span>
                      <span className="text-white">
                        {selectedOrder.customer.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">
                        {selectedOrder.customer.email}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">
                        {selectedOrder.customer.phone}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">
                        {selectedOrder.customer.address}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-3">
                    Order Status
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={`${getStatusColor(selectedOrder.status)} text-white`}
                      >
                        {selectedOrder.status.charAt(0).toUpperCase() +
                          selectedOrder.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {["pending", "confirmed", "shipped", "delivered"].map(
                        (status) => (
                          <Button
                            key={status}
                            size="sm"
                            variant={
                              selectedOrder.status === status
                                ? "default"
                                : "outline"
                            }
                            onClick={() =>
                              updateOrderStatus(
                                selectedOrder.id,
                                status as Order["status"],
                              )
                            }
                            className="mr-2 mb-2"
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </Button>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-3">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-white font-medium">{item.name}</p>
                        <p className="text-gray-400 text-sm">{item.variant}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white">Qty: {item.quantity}</p>
                        <p className="text-primary font-bold">
                          ₹{item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
