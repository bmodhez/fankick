import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PRODUCTS, Product } from "@/data/products";
import { ProductForm } from "./ProductForm";
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
  product: any;
  onEdit: (product: any) => void;
  onDelete: (id: string) => void;
  onDuplicate: (product: any) => void;
}

function ProductCard({
  product,
  onEdit,
  onDelete,
  onDuplicate,
}: ProductCardProps) {
  const [showActions, setShowActions] = useState(false);
  const totalStock = product.variants.reduce(
    (sum: number, variant: any) => sum + variant.stock,
    0,
  );
  const isLowStock = totalStock < 10;

  return (
    <Card className="bg-gray-800 border-gray-700 hover:border-primary/50 transition-colors">
      <CardContent className="p-4">
        <div className="relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
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
          <div className="absolute top-2 left-2">
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
                  <button className="w-full text-left px-3 py-2 hover:bg-gray-600 flex items-center space-x-2 text-sm text-white">
                    <Eye className="w-4 h-4" />
                    <span>Preview</span>
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
  const [products, setProducts] = useState(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [showAddModal, setShowAddModal] = useState(false);

  const categories = ["all", "football", "anime", "pop-culture"];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
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
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleEdit = (product: any) => {
    console.log("Edit product:", product.id);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleDuplicate = (product: any) => {
    const newProduct = {
      ...product,
      id: `${product.id}-copy-${Date.now()}`,
      name: `${product.name} (Copy)`,
    };
    setProducts([...products, newProduct]);
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
          <h2 className="text-2xl font-bold text-white">
            📦 Product Management
          </h2>
          <p className="text-gray-400">
            Manage your inventory and product catalog
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-gray-600 text-gray-300">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-300">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button
            className="bg-primary text-black hover:bg-primary/90"
            onClick={() => setShowAddModal(true)}
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
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
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
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
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
            Try adjusting your search or filters
          </p>
          <Button className="bg-primary text-black hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Product
          </Button>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Add New Product</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddModal(false)}
              >
                ✕
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-12">
                <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-400 mb-2">
                  Product Form
                </h3>
                <p className="text-gray-500">
                  Detailed product creation form would be implemented here
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
