import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Product, ProductVariant } from "@/data/products";
import {
  Plus,
  Trash,
  Upload,
  X,
  Save,
  Eye,
  Star,
  TrendingUp,
  Zap,
  Package,
  DollarSign,
  Tag,
  Image as ImageIcon,
  AlertTriangle,
  Copy,
} from "lucide-react";

interface ProductFormProps {
  product?: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  mode: "create" | "edit";
}

interface FormData {
  id: string;
  name: string;
  description: string;
  category: "football" | "anime" | "pop-culture";
  subcategory: string;
  images: string[];
  variants: ProductVariant[];
  basePrice: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  tags: string[];
  badges: string[];
  shippingDays: number;
  codAvailable: boolean;
  isTrending: boolean;
  isExclusive: boolean;
  stockAlert?: string;
  brand?: string;
  materials?: string[];
  features?: string[];
  sizeGuide?: {
    sizes: string[];
    measurements: Record<string, string>;
  };
}

const subcategoryOptions = {
  football: ["jerseys", "boots", "accessories", "training"],
  anime: ["hoodies", "rings", "necklaces", "t-shirts", "accessories"],
  "pop-culture": ["hoodies", "t-shirts", "accessories", "collectibles"],
};

const sizeOptions = {
  clothing: ["XS", "S", "M", "L", "XL", "XXL"],
  footwear: ["6", "7", "8", "9", "10", "11", "12"],
  accessories: ["One Size"],
};

export function ProductForm({ product, isOpen, onClose, onSave, mode }: ProductFormProps) {
  const [formData, setFormData] = useState<FormData>({
    id: "",
    name: "",
    description: "",
    category: "football",
    subcategory: "",
    images: ["/placeholder.svg"],
    variants: [],
    basePrice: 0,
    originalPrice: 0,
    rating: 4.5,
    reviews: 0,
    tags: [],
    badges: [],
    shippingDays: 7,
    codAvailable: true,
    isTrending: false,
    isExclusive: false,
    materials: [],
    features: [],
  });

  const [newTag, setNewTag] = useState("");
  const [newBadge, setNewBadge] = useState("");
  const [newMaterial, setNewMaterial] = useState("");
  const [newFeature, setNewFeature] = useState("");
  const [newImage, setNewImage] = useState("");
  const [activeTab, setActiveTab] = useState("basic");
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (product && mode === "edit") {
      setFormData({
        ...product,
        materials: product.materials || [],
        features: product.features || [],
      });
    } else if (mode === "create") {
      setFormData({
        id: `product-${Date.now()}`,
        name: "",
        description: "",
        category: "football",
        subcategory: "",
        images: ["/placeholder.svg"],
        variants: [],
        basePrice: 0,
        originalPrice: 0,
        rating: 4.5,
        reviews: 0,
        tags: [],
        badges: [],
        shippingDays: 7,
        codAvailable: true,
        isTrending: false,
        isExclusive: false,
        materials: [],
        features: [],
      });
    }
  }, [product, mode]);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addVariant = () => {
    const newVariant: ProductVariant = {
      id: `variant-${Date.now()}`,
      size: "",
      color: "",
      price: formData.basePrice,
      originalPrice: formData.originalPrice,
      stock: 0,
      sku: `${formData.id}-${formData.variants.length + 1}`,
    };
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, newVariant],
    }));
  };

  const updateVariant = (index: number, field: keyof ProductVariant, value: any) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[index] = { ...updatedVariants[index], [field]: value };
    setFormData((prev) => ({ ...prev, variants: updatedVariants }));
  };

  const removeVariant = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const addItem = (field: "tags" | "badges" | "materials" | "features", value: string) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], value.trim()],
      }));
    }
  };

  const removeItem = (field: "tags" | "badges" | "materials" | "features", index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const addImage = () => {
    if (newImage.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, newImage.trim()],
      }));
      setNewImage("");
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.description || formData.variants.length === 0) {
      alert("Please fill in all required fields and add at least one variant.");
      return;
    }

    onSave(formData as Product);
    onClose();
  };

  if (!isOpen) return null;

  const tabs = [
    { id: "basic", label: "Basic Info", icon: Package },
    { id: "variants", label: "Variants", icon: Copy },
    { id: "media", label: "Images", icon: ImageIcon },
    { id: "details", label: "Details", icon: Tag },
    { id: "seo", label: "SEO & Tags", icon: TrendingUp },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-6xl max-h-[95vh] overflow-hidden bg-gray-800 border-gray-700">
        <CardHeader className="border-b border-gray-700">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center space-x-2">
              <Package className="w-5 h-5" />
              <span>{mode === "create" ? "Add New Product" : "Edit Product"}</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => handleSave()} className="text-white border-gray-600">
                <Save className="w-4 h-4 mr-2" />
                Save Product
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mt-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-black"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-6 overflow-y-auto max-h-[calc(95vh-200px)]">
          {activeTab === "basic" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Product Name *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter product name"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => {
                        handleInputChange("category", e.target.value);
                        handleInputChange("subcategory", "");
                      }}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="football">⚽ Football</option>
                      <option value="anime">🎌 Anime</option>
                      <option value="pop-culture">🎭 Pop Culture</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Subcategory *
                    </label>
                    <select
                      value={formData.subcategory}
                      onChange={(e) => handleInputChange("subcategory", e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select subcategory</option>
                      {subcategoryOptions[formData.category]?.map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Brand
                    </label>
                    <Input
                      value={formData.brand || ""}
                      onChange={(e) => handleInputChange("brand", e.target.value)}
                      placeholder="Enter brand name"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Base Price (₹) *
                      </label>
                      <Input
                        type="number"
                        value={formData.basePrice}
                        onChange={(e) => handleInputChange("basePrice", Number(e.target.value))}
                        placeholder="0"
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Original Price (₹) *
                      </label>
                      <Input
                        type="number"
                        value={formData.originalPrice}
                        onChange={(e) => handleInputChange("originalPrice", Number(e.target.value))}
                        placeholder="0"
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Shipping Days
                      </label>
                      <Input
                        type="number"
                        value={formData.shippingDays}
                        onChange={(e) => handleInputChange("shippingDays", Number(e.target.value))}
                        placeholder="7"
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Reviews Count
                      </label>
                      <Input
                        type="number"
                        value={formData.reviews}
                        onChange={(e) => handleInputChange("reviews", Number(e.target.value))}
                        placeholder="0"
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.codAvailable}
                        onChange={(e) => handleInputChange("codAvailable", e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-white">COD Available</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.isTrending}
                        onChange={(e) => handleInputChange("isTrending", e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-white">Trending</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.isExclusive}
                        onChange={(e) => handleInputChange("isExclusive", e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-white">Exclusive</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Description *
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Enter detailed product description"
                  rows={4}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
          )}

          {activeTab === "variants" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Product Variants</h3>
                <Button onClick={addVariant} className="bg-primary text-black hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Variant
                </Button>
              </div>

              {formData.variants.length === 0 ? (
                <div className="text-center py-8">
                  <Copy className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No variants added yet. Create your first variant.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {formData.variants.map((variant, index) => (
                    <Card key={variant.id} className="bg-gray-700 border-gray-600">
                      <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                          <div>
                            <label className="block text-sm font-medium text-white mb-2">
                              Size
                            </label>
                            <Input
                              value={variant.size || ""}
                              onChange={(e) => updateVariant(index, "size", e.target.value)}
                              placeholder="Size"
                              className="bg-gray-600 border-gray-500 text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-white mb-2">
                              Color
                            </label>
                            <Input
                              value={variant.color || ""}
                              onChange={(e) => updateVariant(index, "color", e.target.value)}
                              placeholder="Color"
                              className="bg-gray-600 border-gray-500 text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-white mb-2">
                              Price (₹)
                            </label>
                            <Input
                              type="number"
                              value={variant.price}
                              onChange={(e) => updateVariant(index, "price", Number(e.target.value))}
                              className="bg-gray-600 border-gray-500 text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-white mb-2">
                              Original Price (₹)
                            </label>
                            <Input
                              type="number"
                              value={variant.originalPrice}
                              onChange={(e) => updateVariant(index, "originalPrice", Number(e.target.value))}
                              className="bg-gray-600 border-gray-500 text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-white mb-2">
                              Stock
                            </label>
                            <Input
                              type="number"
                              value={variant.stock}
                              onChange={(e) => updateVariant(index, "stock", Number(e.target.value))}
                              className="bg-gray-600 border-gray-500 text-white"
                            />
                          </div>
                          <div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeVariant(index)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "media" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Product Images</h3>
                <div className="flex items-center space-x-2">
                  <Input
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    placeholder="Enter image URL"
                    className="bg-gray-700 border-gray-600 text-white w-64"
                  />
                  <Button onClick={addImage} className="bg-primary text-black hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <Card key={index} className="bg-gray-700 border-gray-600">
                    <CardContent className="p-4">
                      <div className="relative">
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 text-red-400 hover:text-red-300 bg-black/50 hover:bg-black/70"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "details" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Materials
                    </label>
                    <div className="flex space-x-2 mb-2">
                      <Input
                        value={newMaterial}
                        onChange={(e) => setNewMaterial(e.target.value)}
                        placeholder="Add material"
                        className="bg-gray-700 border-gray-600 text-white"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            addItem("materials", newMaterial);
                            setNewMaterial("");
                          }
                        }}
                      />
                      <Button
                        onClick={() => {
                          addItem("materials", newMaterial);
                          setNewMaterial("");
                        }}
                        className="bg-primary text-black hover:bg-primary/90"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.materials?.map((material, index) => (
                        <Badge
                          key={index}
                          className="bg-gray-600 text-white hover:bg-gray-500 cursor-pointer"
                          onClick={() => removeItem("materials", index)}
                        >
                          {material} <X className="w-3 h-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Features
                    </label>
                    <div className="flex space-x-2 mb-2">
                      <Input
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        placeholder="Add feature"
                        className="bg-gray-700 border-gray-600 text-white"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            addItem("features", newFeature);
                            setNewFeature("");
                          }
                        }}
                      />
                      <Button
                        onClick={() => {
                          addItem("features", newFeature);
                          setNewFeature("");
                        }}
                        className="bg-primary text-black hover:bg-primary/90"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.features?.map((feature, index) => (
                        <Badge
                          key={index}
                          className="bg-gray-600 text-white hover:bg-gray-500 cursor-pointer"
                          onClick={() => removeItem("features", index)}
                        >
                          {feature} <X className="w-3 h-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Rating
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={formData.rating}
                      onChange={(e) => handleInputChange("rating", Number(e.target.value))}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Stock Alert Message
                    </label>
                    <Input
                      value={formData.stockAlert || ""}
                      onChange={(e) => handleInputChange("stockAlert", e.target.value)}
                      placeholder="e.g., Only 3 left in stock!"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "seo" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Tags
                    </label>
                    <div className="flex space-x-2 mb-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add tag"
                        className="bg-gray-700 border-gray-600 text-white"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            addItem("tags", newTag);
                            setNewTag("");
                          }
                        }}
                      />
                      <Button
                        onClick={() => {
                          addItem("tags", newTag);
                          setNewTag("");
                        }}
                        className="bg-primary text-black hover:bg-primary/90"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          className="bg-blue-600 text-white hover:bg-blue-500 cursor-pointer"
                          onClick={() => removeItem("tags", index)}
                        >
                          {tag} <X className="w-3 h-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Badges
                    </label>
                    <div className="flex space-x-2 mb-2">
                      <Input
                        value={newBadge}
                        onChange={(e) => setNewBadge(e.target.value)}
                        placeholder="Add badge"
                        className="bg-gray-700 border-gray-600 text-white"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            addItem("badges", newBadge);
                            setNewBadge("");
                          }
                        }}
                      />
                      <Button
                        onClick={() => {
                          addItem("badges", newBadge);
                          setNewBadge("");
                        }}
                        className="bg-primary text-black hover:bg-primary/90"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.badges.map((badge, index) => (
                        <Badge
                          key={index}
                          className="bg-purple-600 text-white hover:bg-purple-500 cursor-pointer"
                          onClick={() => removeItem("badges", index)}
                        >
                          {badge} <X className="w-3 h-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
