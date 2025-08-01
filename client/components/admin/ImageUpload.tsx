import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  X,
  Eye,
  FolderOpen,
  FileImage,
  CloudUpload,
  Loader,
  Trash,
  Image as ImageIcon,
} from "lucide-react";

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  maxFileSize?: number; // in MB
  acceptedTypes?: string[];
  className?: string;
}

export function ImageUpload({
  images,
  onImagesChange,
  maxImages = 10,
  maxFileSize = 5,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  className = "",
}: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [isUploading, setIsUploading] = useState(false);

  const fileToDataUrl = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }, []);

  const handleFileSelect = async (files: FileList) => {
    if (images.length >= maxImages) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }

    setIsUploading(true);
    const newImages: string[] = [];
    const remainingSlots = maxImages - images.length;
    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    for (let i = 0; i < filesToProcess.length; i++) {
      const file = filesToProcess[i];
      
      // Validate file type
      if (!acceptedTypes.includes(file.type)) {
        alert(`File ${file.name} is not a supported image format and will be skipped.`);
        continue;
      }

      // Validate file size
      if (file.size > maxFileSize * 1024 * 1024) {
        alert(`File ${file.name} is too large (max ${maxFileSize}MB) and will be skipped.`);
        continue;
      }

      try {
        // Simulate upload progress
        const fileId = `upload-${Date.now()}-${i}`;
        setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));

        // Convert file to data URL
        const dataUrl = await fileToDataUrl(file);
        
        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 25) {
          setUploadProgress(prev => ({ ...prev, [fileId]: progress }));
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        newImages.push(dataUrl);
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[fileId];
          return newProgress;
        });
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
        alert(`Failed to upload ${file.name}`);
      }
    }

    // Add all successfully uploaded images
    if (newImages.length > 0) {
      onImagesChange([...images, ...newImages]);
    }

    setIsUploading(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  const triggerFileSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = acceptedTypes.join(',');
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        handleFileSelect(files);
      }
    };
    input.click();
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const clearAllImages = () => {
    if (confirm('Are you sure you want to remove all images?')) {
      onImagesChange([]);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <Card className="bg-gray-700 border-gray-600">
        <CardContent className="p-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
              isDragOver
                ? 'border-primary bg-primary/10'
                : images.length >= maxImages
                ? 'border-gray-600 bg-gray-600/20 cursor-not-allowed'
                : 'border-gray-500 hover:border-primary/50 hover:bg-gray-600/50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={images.length < maxImages ? triggerFileSelect : undefined}
          >
            <CloudUpload className={`w-12 h-12 mx-auto mb-4 ${
              isDragOver ? 'text-primary' : 
              images.length >= maxImages ? 'text-gray-600' : 'text-gray-400'
            }`} />
            
            {images.length >= maxImages ? (
              <>
                <p className="text-gray-500 font-medium mb-2">
                  Maximum images reached ({maxImages})
                </p>
                <p className="text-gray-600 text-sm">
                  Remove some images to upload more
                </p>
              </>
            ) : (
              <>
                <p className="text-white font-medium mb-2">
                  {isDragOver ? 'Drop images here' : 'Drag & drop images here'}
                </p>
                <p className="text-gray-400 text-sm mb-4">
                  or click to browse from your computer
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerFileSelect();
                  }}
                  disabled={images.length >= maxImages}
                >
                  <FolderOpen className="w-4 h-4 mr-2" />
                  Choose Files
                </Button>
                <p className="text-xs text-gray-500 mt-3">
                  {acceptedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')} 
                  (Max {maxFileSize}MB each, {maxImages - images.length} slots remaining)
                </p>
              </>
            )}
          </div>

          {/* Upload Progress */}
          {Object.keys(uploadProgress).length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="text-sm font-medium text-white">Uploading...</h4>
              {Object.entries(uploadProgress).map(([fileId, progress]) => (
                <div key={fileId} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Processing image...</span>
                    <span className="text-primary">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Loading State */}
          {isUploading && (
            <div className="mt-4 flex items-center justify-center p-3 bg-gray-600/50 rounded-lg">
              <Loader className="w-4 h-4 animate-spin text-primary mr-2" />
              <span className="text-sm text-white">Processing images...</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Images Grid */}
      {images.length > 0 && (
        <Card className="bg-gray-700 border-gray-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-medium">
                Uploaded Images ({images.length}/{maxImages})
              </h4>
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllImages}
                className="border-gray-600 text-gray-300 hover:bg-gray-600"
              >
                <Trash className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square bg-gray-600 rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  
                  {/* Image Actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(image, '_blank')}
                      className="text-white hover:text-primary bg-black/70 hover:bg-black/90"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeImage(index)}
                      className="text-red-400 hover:text-red-300 bg-black/70 hover:bg-black/90"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Primary Image Badge */}
                  {index === 0 && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-primary text-black text-xs">
                        Primary
                      </Badge>
                    </div>
                  )}

                  {/* Image Index */}
                  <div className="absolute bottom-2 right-2">
                    <Badge className="bg-black/70 text-white text-xs">
                      {index + 1}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {images.length === 0 && (
        <div className="text-center py-8">
          <ImageIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">
            No images uploaded yet. Use the upload area above to add images.
          </p>
        </div>
      )}
    </div>
  );
}
