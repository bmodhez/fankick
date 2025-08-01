import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "./ImageUpload";
import {
  Upload,
  Download,
  FolderOpen,
  Image as ImageIcon,
  Copy,
  Share,
  Save,
  FileText,
  Grid3X3,
} from "lucide-react";

export function BulkImageManager() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [imageCategory, setImageCategory] = useState("products");
  const [imageTags, setImageTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const categories = [
    { id: "products", label: "Product Images", count: 156 },
    { id: "banners", label: "Banner Images", count: 23 },
    { id: "categories", label: "Category Images", count: 12 },
    { id: "logos", label: "Brand Logos", count: 45 },
    { id: "misc", label: "Miscellaneous", count: 34 },
  ];

  const addTag = () => {
    if (newTag.trim() && !imageTags.includes(newTag.trim())) {
      setImageTags([...imageTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (index: number) => {
    setImageTags(imageTags.filter((_, i) => i !== index));
  };

  const handleBulkSave = () => {
    if (uploadedImages.length === 0) {
      alert("No images to save!");
      return;
    }

    // In a real app, you'd save to your backend/database
    alert(`Successfully saved ${uploadedImages.length} images to ${imageCategory} category with tags: ${imageTags.join(", ")}`);
    
    // Reset form
    setUploadedImages([]);
    setImageTags([]);
  };

  const generateImageUrls = () => {
    const urls = uploadedImages.map((img, index) => `${window.location.origin}/uploads/${imageCategory}/${Date.now()}-${index}.jpg`).join('\n');
    navigator.clipboard.writeText(urls);
    alert("Image URLs copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            📁 Bulk Image Manager
          </h2>
          <p className="text-gray-400">
            Upload and organize multiple images for your store
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-gray-600 text-gray-300">
            <Download className="w-4 h-4 mr-2" />
            Export List
          </Button>
          <Button 
            onClick={handleBulkSave}
            disabled={uploadedImages.length === 0}
            className="bg-primary text-black hover:bg-primary/90"
          >
            <Save className="w-4 h-4 mr-2" />
            Save All ({uploadedImages.length})
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{category.count}</div>
                <div className="text-sm text-gray-400">{category.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <FolderOpen className="w-5 h-5" />
                <span>Upload Images</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                images={uploadedImages}
                onImagesChange={setUploadedImages}
                maxImages={50}
                maxFileSize={10}
              />
            </CardContent>
          </Card>
        </div>

        {/* Settings Section */}
        <div className="space-y-6">
          {/* Category Selection */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Image Category
                </label>
                <select
                  value={imageCategory}
                  onChange={(e) => setImageCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

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
                        addTag();
                      }
                    }}
                  />
                  <Button
                    onClick={addTag}
                    className="bg-primary text-black hover:bg-primary/90"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {imageTags.map((tag, index) => (
                    <Badge
                      key={index}
                      className="bg-blue-600 text-white hover:bg-blue-500 cursor-pointer"
                      onClick={() => removeTag(index)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={generateImageUrls}
                disabled={uploadedImages.length === 0}
                variant="outline"
                className="w-full border-gray-600 text-gray-300"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy URLs
              </Button>
              
              <Button
                disabled={uploadedImages.length === 0}
                variant="outline"
                className="w-full border-gray-600 text-gray-300"
              >
                <Share className="w-4 h-4 mr-2" />
                Share Collection
              </Button>
              
              <Button
                disabled={uploadedImages.length === 0}
                variant="outline"
                className="w-full border-gray-600 text-gray-300"
              >
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>

          {/* Upload Summary */}
          {uploadedImages.length > 0 && (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Upload Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Images:</span>
                    <span className="text-white">{uploadedImages.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Category:</span>
                    <span className="text-white">{categories.find(c => c.id === imageCategory)?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tags:</span>
                    <span className="text-white">{imageTags.length || "None"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <Badge className="bg-yellow-600 text-black">
                      Ready to Save
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Grid3X3 className="w-5 h-5" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-20 flex-col border-gray-600 text-gray-300"
              onClick={() => setUploadedImages(['https://via.placeholder.com/400x400/10b981/ffffff?text=Sample+1', 'https://via.placeholder.com/400x400/8b5cf6/ffffff?text=Sample+2'])}
            >
              <ImageIcon className="w-6 h-6 mb-2" />
              <span className="text-xs">Load Samples</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-20 flex-col border-gray-600 text-gray-300"
              onClick={() => setImageCategory("products")}
            >
              <FolderOpen className="w-6 h-6 mb-2" />
              <span className="text-xs">Products</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-20 flex-col border-gray-600 text-gray-300"
              onClick={() => setImageCategory("banners")}
            >
              <Copy className="w-6 h-6 mb-2" />
              <span className="text-xs">Banners</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-20 flex-col border-gray-600 text-gray-300"
              onClick={() => {
                setUploadedImages([]);
                setImageTags([]);
              }}
            >
              <Share className="w-6 h-6 mb-2" />
              <span className="text-xs">Clear All</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
