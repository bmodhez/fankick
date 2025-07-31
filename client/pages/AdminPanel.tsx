import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Dashboard } from "@/components/admin/Dashboard";
import { ProductManager } from "@/components/admin/ProductManager";
import { OrderManager } from "@/components/admin/OrderManager";
import { Analytics } from "@/components/admin/Analytics";
import { AdminTest } from "@/components/admin/AdminTest";

export default function AdminPanel() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user || !isAdmin()) {
      navigate("/");
    }
  }, [user, isAdmin, navigate]);

  if (!user || !isAdmin()) {
    return null;
  }

  // Determine which component to render based on route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/admin") return "Dashboard";
    if (path === "/admin/products") return "Product Management";
    if (path === "/admin/orders") return "Order Management";
    if (path === "/admin/customers") return "Customer Management";
    if (path === "/admin/categories") return "Category Management";
    if (path === "/admin/analytics") return "Analytics & Reports";
    if (path === "/admin/content") return "Content Management";
    if (path === "/admin/marketing") return "Marketing Tools";
    if (path === "/admin/chatbot") return "Chatbot Management";
    if (path === "/admin/settings") return "Settings";
    return "Admin Panel";
  };

  const renderPageContent = () => {
    const path = location.pathname;

    switch (path) {
      case "/admin":
        return <Dashboard />;
      case "/admin/products":
        return <ProductManager />;
      case "/admin/orders":
        return <OrderManager />;
      case "/admin/customers":
        return (
          <PlaceholderContent
            title="Customer Management"
            description="Manage customer accounts, view purchase history, and handle customer support."
          />
        );
      case "/admin/categories":
        return (
          <PlaceholderContent
            title="Category Management"
            description="Organize products into categories and manage collections."
          />
        );
      case "/admin/analytics":
        return <Analytics />;
      case "/admin/content":
        return (
          <PlaceholderContent
            title="Content Management"
            description="Manage homepage content, banners, and promotional materials."
          />
        );
      case "/admin/marketing":
        return (
          <PlaceholderContent
            title="Marketing Tools"
            description="Create campaigns, manage discount codes, and track marketing performance."
          />
        );
      case "/admin/chatbot":
        return (
          <PlaceholderContent
            title="Chatbot Management"
            description="Configure AI responses and manage customer chat interactions."
          />
        );
      case "/admin/settings":
        return (
          <PlaceholderContent
            title="Settings"
            description="Configure system settings, user roles, and integrations."
          />
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <AdminLayout title={getPageTitle()}>{renderPageContent()}</AdminLayout>
  );
}

function PlaceholderContent({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-4xl">🚧</span>
      </div>
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <p className="text-gray-400 max-w-md mx-auto mb-8">{description}</p>
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-lg mx-auto">
        <p className="text-sm text-gray-500">
          This section is currently under development.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Features will be available in the next update.
        </p>
      </div>
    </div>
  );
}
