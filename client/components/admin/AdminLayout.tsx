import { useState, useEffect, ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useRealTime } from "@/contexts/RealTimeContext";
import { orderApi } from "@/services/orderApi";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Home,
  TrendingUp,
  FileText,
  MessageSquare,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  Crown,
  Zap,
  Globe,
  DollarSign,
  Image,
  Tag,
  Megaphone,
  Bot,
  Shield,
  Calendar,
  ArrowLeft,
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

const getNavigation = (orderCount: number = 1) => [
  {
    name: "Dashboard",
    href: "/admin",
    icon: BarChart3,
    emoji: "📊",
    current: true,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: Package,
    emoji: "📦",
    badge: "12", // Minimal test data
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
    emoji: "🛒",
    badge: orderCount.toString(), // Real-time count
  },
  {
    name: "Customers",
    href: "/admin/customers",
    icon: Users,
    emoji: "👥",
    badge: "5", // Minimal test data
  },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: Tag,
    emoji: "🏷️",
  },
  {
    name: "Images",
    href: "/admin/images",
    icon: Image,
    emoji: "🖼️",
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: TrendingUp,
    emoji: "📈",
  },
  {
    name: "Content",
    href: "/admin/content",
    icon: FileText,
    emoji: "📝",
  },
  {
    name: "Marketing",
    href: "/admin/marketing",
    icon: Megaphone,
    emoji: "📢",
  },
  {
    name: "Chatbot",
    href: "/admin/chatbot",
    icon: Bot,
    emoji: "🤖",
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
    emoji: "⚙️",
  },
  {
    name: "Test Suite",
    href: "/admin/test",
    icon: Shield,
    emoji: "🧪",
  },
];

const quickStats = [
  {
    name: "Live Visitors",
    value: "234",
    change: "+12%",
    icon: Globe,
    color: "text-green-400",
  },
  {
    name: "Today Sales",
    value: "₹45.2K",
    change: "+8%",
    icon: DollarSign,
    color: "text-green-400",
  },
  {
    name: "Pending Orders",
    value: "23",
    change: "-5%",
    icon: ShoppingCart,
    color: "text-red-400",
  },
  {
    name: "Stock Alerts",
    value: "8",
    change: "0%",
    icon: Bell,
    color: "text-yellow-400",
  },
];

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderCount, setOrderCount] = useState(1); // Start with 1 (test order)
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { showNotification } = useRealTime();

  // Load real-time order count
  useEffect(() => {
    const loadOrderCount = async () => {
      try {
        const orders = await orderApi.getAllOrders();
        setOrderCount(orders.length + 1); // +1 for test order
      } catch (error) {
        console.error('Failed to load order count:', error);
      }
    };

    loadOrderCount();

    // Refresh count every 60 seconds
    const interval = setInterval(loadOrderCount, 60000);

    return () => clearInterval(interval);
  }, []);

  const navigation = getNavigation(orderCount);

  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed left-0 top-0 bottom-0 w-64 bg-gray-800 border-r border-gray-700">
          <SidebarContent
            currentPath={currentPath}
            onItemClick={() => setSidebarOpen(false)}
          />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-64 bg-gray-800 border-r border-gray-700">
        <SidebarContent currentPath={currentPath} />
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-gray-900 border-b border-gray-700 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-gray-400 hover:text-white"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="text-gray-400 hover:text-white flex items-center space-x-2"
                title="Back to Store"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>

              <div>
                <h1 className="text-xl font-bold text-white">{title}</h1>
                <p className="text-sm text-gray-400">FanKick Admin Panel</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden sm:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-400"
                />
              </div>

              {/* Notifications */}
              <Button
                variant="ghost"
                size="sm"
                className="relative text-gray-400 hover:text-white"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </Button>

              {/* User menu */}
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <p className="text-xs text-gray-400">Super Admin</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center">
                  <Crown className="w-4 h-4 text-black" />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-gray-400 hover:text-white"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quick stats bar */}
          <div className="py-4 border-t border-gray-700">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {quickStats.map((stat, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">{stat.name}</p>
                      <p className="text-lg font-bold text-white">
                        {stat.value}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                      <span className={`text-xs ${stat.color}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}

function SidebarContent({
  currentPath,
  onItemClick,
}: {
  currentPath: string;
  onItemClick?: () => void;
}) {
  return (
    <div className="h-full flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center">
            <Zap className="w-4 h-4 text-black" />
          </div>
          <span className="font-sport font-bold text-lg">
            FAN<span className="text-primary">KICK</span>
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive =
            currentPath === item.href ||
            (item.href !== "/admin" && currentPath.startsWith(item.href));

          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={onItemClick}
              className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-gradient-to-r from-primary/20 to-purple-500/20 text-primary border border-primary/30"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{item.emoji}</span>
                <span className="font-medium">{item.name}</span>
              </div>
              {item.badge && (
                <Badge className="bg-gray-600 text-white text-xs">
                  {item.badge}
                </Badge>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom actions */}
      <div className="p-4 border-t border-gray-700">
        <Link
          to="/"
          className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg"
        >
          <Home className="h-4 w-4" />
          <span>Back to Store</span>
        </Link>
      </div>
    </div>
  );
}
