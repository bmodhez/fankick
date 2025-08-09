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

const mockOrders: Order[] = [
  {
    id: "ord-001",
    orderNumber: "FK2024001",
    customer: {
      name: "Arjun Kumar",
      email: "arjun.k@example.com",
      phone: "+91 9876543210",
      address: "Mumbai, Maharashtra, India",
      country: "India",
      flag: "🇮🇳",
    },
    items: [
      {
        name: "Messi Inter Miami Jersey",
        variant: "Size: M, Color: Pink",
        quantity: 1,
        price: 7999,
        image: "/placeholder.svg",
      },
    ],
    status: "shipped",
    payment: {
      method: "Razorpay",
      status: "paid",
      amount: 7999,
    },
    shipping: {
      method: "Standard Delivery",
      cost: 0,
      trackingNumber: "FK24001TRK",
      estimatedDelivery: "2024-01-28",
    },
    createdAt: "2024-01-25T10:30:00Z",
    updatedAt: "2024-01-26T14:20:00Z",
  },
  {
    id: "ord-002",
    orderNumber: "FK2024002",
    customer: {
      name: "Sarah Wilson",
      email: "sarah.w@example.com",
      phone: "+1 555-123-4567",
      address: "New York, NY, USA",
      country: "USA",
      flag: "🇺🇸",
    },
    items: [
      {
        name: "Taylor Swift Eras Hoodie",
        variant: "Size: L, Color: Lavender",
        quantity: 2,
        price: 3799,
        image: "/placeholder.svg",
      },
    ],
    status: "pending",
    payment: {
      method: "PayPal",
      status: "paid",
      amount: 7598,
    },
    shipping: {
      method: "Express Delivery",
      cost: 599,
      estimatedDelivery: "2024-01-30",
    },
    createdAt: "2024-01-26T08:15:00Z",
    updatedAt: "2024-01-26T08:15:00Z",
  },
  {
    id: "ord-003",
    orderNumber: "FK2024003",
    customer: {
      name: "Ahmed Al-Rashid",
      email: "ahmed.r@example.com",
      phone: "+966 50 123 4567",
      address: "Riyadh, Saudi Arabia",
      country: "Saudi Arabia",
      flag: "🇸🇦",
    },
    items: [
      {
        name: "Ronaldo Al Nassr Jersey",
        variant: "Size: XL",
        quantity: 1,
        price: 8499,
        image: "/placeholder.svg",
      },
      {
        name: "Football Boots",
        variant: "Size: 42",
        quantity: 1,
        price: 12999,
        image: "/placeholder.svg",
      },
    ],
    status: "delivered",
    payment: {
      method: "COD",
      status: "paid",
      amount: 21498,
    },
    shipping: {
      method: "Standard Delivery",
      cost: 0,
      trackingNumber: "FK24003TRK",
      estimatedDelivery: "2024-01-27",
    },
    createdAt: "2024-01-23T16:45:00Z",
    updatedAt: "2024-01-27T11:30:00Z",
  },
];

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
  const [orders, setOrders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
          : order,
      ),
    );
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
          <Button variant="outline" className="border-gray-600 text-gray-300">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Orders
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
