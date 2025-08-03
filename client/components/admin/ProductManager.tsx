import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/data/products";
import { ProductForm } from "./ProductForm";
import { SyncStatus } from "./SyncStatus";
import { useProducts } from "@/contexts/ProductContext";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash,
  Eye,
  Copy,
  Package,
  Image as ImageIcon,
  DollarSign,
  Tag,
  AlertTriangle,
  Download,
  Upload,
  Star,
  TrendingUp,
  Zap,
  ExternalLink,
} from "lucide-react";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onDuplicate: (product: Product) => void;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}

function ProductCard({
  product,
  onEdit,
  onDelete,
  onDuplicate,
  isSelected,
  onToggleSelect,
}: ProductCardProps) {
  const [showActions, setShowActions] = useState(false);
  const totalStock = product.variants.reduce(
    (sum: number, variant: any) => sum + variant.stock,
    0,
  );
  const isLowStock = totalStock < 10;

  return (
    <Card
      className={`bg-gray-800 border-gray-700 hover:border-primary/50 transition-colors ${isSelected ? "ring-2 ring-primary" : ""}`}
    >
      <CardContent className="p-4">
        <div className="relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />

          {/* Selection checkbox */}
          <div className="absolute top-2 left-2">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggleSelect(product.id)}
              className="w-4 h-4 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary focus:ring-2"
            />
          </div>

          <div className="absolute top-2 right-2 flex space-x-1">
            {product.isTrending && (
              <Badge className="bg-red-500 text-white text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                Trending
              </Badge>
            )}
            {product.isExclusive && (
              <Badge className="bg-purple-500 text-white text-xs">
                <Zap className="w-3 h-3 mr-1" />
                Exclusive
              </Badge>
            )}
          </div>
          <div className="absolute bottom-2 left-2">
            {isLowStock && (
              <Badge className="bg-yellow-500 text-black text-xs">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Low Stock
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-white text-sm line-clamp-2">
              {product.name}
            </h3>
            <p className="text-xs text-gray-400 capitalize">
              {product.category} • {product.subcategory}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-primary">
                ₹{product.basePrice.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-white">{totalStock} units</p>
              <p className="text-xs text-gray-400">
                {product.variants.length} variants
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-300">{product.rating}</span>
              <span className="text-xs text-gray-500">({product.reviews})</span>
            </div>
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowActions(!showActions)}
                className="text-gray-400 hover:text-white"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>

              {showActions && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => onEdit(product)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-600 flex items-center space-x-2 text-sm text-white"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => onDuplicate(product)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-600 flex items-center space-x-2 text-sm text-white"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Duplicate</span>
                  </button>
                  <button
                    onClick={() =>
                      window.open(`/product/${product.id}`, "_blank")
                    }
                    className="w-full text-left px-3 py-2 hover:bg-gray-600 flex items-center space-x-2 text-sm text-white"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Product</span>
                  </button>
                  <hr className="border-gray-600" />
                  <button
                    onClick={() => onDelete(product.id)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-600 flex items-center space-x-2 text-sm text-red-400"
                  >
                    <Trash className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ProductManager() {
  const {
    products,
    updateProduct,
    deleteProduct,
    addProduct,
    refreshProducts,
  } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
    new Set(),
  );
  const [lastSyncTime, setLastSyncTime] = useState<string>("");

  const categories = ["all", "football", "anime", "pop-culture"];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-high":
        return b.basePrice - a.basePrice;
      case "price-low":
        return a.basePrice - b.basePrice;
      case "stock":
        return (
          b.variants.reduce((sum, v) => sum + v.stock, 0) -
          a.variants.reduce((sum, v) => sum + v.stock, 0)
        );
      case "rating":
        return b.rating - a.rating;
      case "created":
        return new Date(b.id).getTime() - new Date(a.id).getTime();
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormMode("create");
    setShowProductForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormMode("edit");
    setShowProductForm(true);
  };

  const handleSaveProduct = async (productData: Product) => {
    try {
      if (formMode === "create") {
        await addProduct(productData);
        setLastSyncTime(new Date().toISOString());
        alert(
          `✅ Product "${productData.name}" has been created successfully!\n\nChanges are now saved to the backend and live on the main website.`,
        );
      } else {
        await updateProduct(productData);
        setLastSyncTime(new Date().toISOString());
        alert(
          `✅ Product "${productData.name}" has been updated successfully!\n\nChanges are now saved to the backend and live on the main website.`,
        );
      }
      setShowProductForm(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error saving product:", error);
      alert(
        `❌ Error saving product: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  };

  const handleDeleteProduct = async (id: string) => {
    const productToDelete = products.find((p) => p.id === id);
    if (
      confirm(
        "Are you sure you want to delete this product? This action cannot be undone.",
      )
    ) {
      try {
        await deleteProduct(id);
        setSelectedProducts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
        setLastSyncTime(new Date().toISOString());
        alert(
          `✅ Product "${productToDelete?.name || "Unknown"}" has been deleted successfully!\n\nChanges are now saved to the backend and live on the main website.`,
        );
      } catch (error) {
        console.error("Error deleting product:", error);
        alert(
          `❌ Error deleting product: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      }
    }
  };

  const handleDuplicateProduct = (product: Product) => {
    const newProduct: Product = {
      ...product,
      id: `${product.id}-copy-${Date.now()}`,
      name: `${product.name} (Copy)`,
      variants: product.variants.map((variant) => ({
        ...variant,
        id: `${variant.id}-copy-${Date.now()}`,
        sku: `${variant.sku}-COPY`,
      })),
    };
    addProduct(newProduct);
  };

  const handleBulkDelete = () => {
    if (selectedProducts.size === 0) return;
    if (
      confirm(
        `Are you sure you want to delete ${selectedProducts.size} products? This action cannot be undone.`,
      )
    ) {
      selectedProducts.forEach((id) => deleteProduct(id));
      setSelectedProducts(new Set());
    }
  };

  const toggleProductSelection = (productId: string) => {
    const newSet = new Set(selectedProducts);
    if (newSet.has(productId)) {
      newSet.delete(productId);
    } else {
      newSet.add(productId);
    }
    setSelectedProducts(newSet);
  };

  const selectAllProducts = () => {
    if (selectedProducts.size === sortedProducts.length) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(new Set(sortedProducts.map((p) => p.id)));
    }
  };

  const handleResetProducts = () => {
    if (
      confirm(
        "⚠️ This will reset all products to their original state and remove all your changes.\n\nAre you sure you want to continue?",
      )
    ) {
      refreshProducts();
      setSelectedProducts(new Set());
      alert(
        "✅ Products have been reset to original state.\n\nAll changes have been cleared.",
      );
    }
  };

  const lowStockCount = products.filter(
    (p) => p.variants.reduce((sum: number, v: any) => sum + v.stock, 0) < 10,
  ).length;

  const totalProducts = products.length;
  const totalValue = products.reduce(
    (sum, p) =>
      sum +
      p.basePrice *
        p.variants.reduce((vSum: number, v: any) => vSum + v.stock, 0),
    0,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h2 className="text-2xl font-bold text-white">
              📦 Product Management
            </h2>
            <SyncStatus lastUpdated={lastSyncTime} />
          </div>
          <p className="text-gray-400">
            Manage your inventory and product catalog • Changes sync to main
            website in real-time
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {selectedProducts.size > 0 && (
            <div className="flex items-center space-x-2 px-3 py-1 bg-primary/20 rounded-lg">
              <span className="text-primary text-sm font-medium">
                {selectedProducts.size} selected
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBulkDelete}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          )}
          <Button variant="outline" className="border-gray-600 text-gray-300">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-300">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button
            variant="outline"
            onClick={handleResetProducts}
            className="border-red-600 text-red-400 hover:bg-red-600/10"
          >
            🔄 Reset All
          </Button>
          <Button
            className="bg-primary text-black hover:bg-primary/90"
            onClick={handleAddProduct}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Products</p>
                <p className="text-2xl font-bold text-white">{totalProducts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Inventory Value</p>
                <p className="text-2xl font-bold text-white">
                  ₹{(totalValue / 100000).toFixed(1)}L
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Low Stock Items</p>
                <p className="text-2xl font-bold text-white">{lowStockCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Trending Items</p>
                <p className="text-2xl font-bold text-white">
                  {products.filter((p) => p.isTrending).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex items-center space-x-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={
                    selectedProducts.size === sortedProducts.length &&
                    sortedProducts.length > 0
                  }
                  onChange={selectAllProducts}
                  className="w-4 h-4 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary focus:ring-2"
                />
                <span className="text-white text-sm">Select All</span>
              </label>
            </div>

            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, tags, descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Categories</option>
                  <option value="football">⚽ Football</option>
                  <option value="anime">🎌 Anime</option>
                  <option value="pop-culture">🎭 Pop Culture</option>
                </select>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="name">Sort by Name</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
                <option value="stock">Stock Level</option>
                <option value="rating">Rating</option>
                <option value="created">Recently Added</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onDuplicate={handleDuplicateProduct}
            isSelected={selectedProducts.has(product.id)}
            onToggleSelect={toggleProductSelection}
          />
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-400 mb-2">
            No products found
          </h3>
          <p className="text-gray-500 mb-4">
            {searchQuery || selectedCategory !== "all"
              ? "Try adjusting your search or filters"
              : "Start by adding your first product to the catalog"}
          </p>
          <Button
            className="bg-primary text-black hover:bg-primary/90"
            onClick={handleAddProduct}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Product
          </Button>
        </div>
      )}

      {/* Product Form Modal */}
      <ProductForm
        product={editingProduct}
        isOpen={showProductForm}
        onClose={() => {
          setShowProductForm(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
        mode={formMode}
      />
    </div>
  );
}
