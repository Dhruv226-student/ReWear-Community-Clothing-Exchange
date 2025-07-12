"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useCreateOrUpdateItem, useItemDetails } from "@/hooks/useItems";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  ITEM_CONSTANTS,
  getCategoryOptions,
  getTypeOptions,
  getSizeOptions,
  getConditionOptions,
  getTagOptions,
} from "@/constants/itemConstants";

export default function AddItemPage() {
  const { user, isAuthenticated } = useAuth();
  const createOrUpdateItemMutation = useCreateOrUpdateItem();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  // Get itemId from URL search params
  const itemId = searchParams.get("id");
  const isEditing = !!itemId;

  // Fetch existing item data if editing
  const { data: existingItem, isLoading: isLoadingItem } =
    useItemDetails(itemId);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    size: "",
    condition: "",
    tags: [],
    images: [],
    remove_images: [],
    exchange_points: 0,
  });
  const [newTag, setNewTag] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // Helper function to find value by label
  const findValueByLabel = (options, label) => {
    const option = options.find((opt) => opt.label === label);
    return option ? option.value : "";
  };

  // Load existing item data if editing
  useEffect(() => {
    if (existingItem?.data && isEditing) {
      const item = existingItem.data;

      console.log({ item });
      setFormData({
        title: item.title || "",
        description: item.description || "",
        category: item.category || "",
        type: item.type || "", // Use the value directly, not reverse lookup
        size: item.size || "", // Use the value directly, not reverse lookup
        condition: item.condition || "", // Use the value directly, not reverse lookup
        tags: item.tags || [],
        images: [], // New images will be in imageFiles
        remove_images: [],
        exchange_points: item.exchange_points || 0,
      });
      setExistingImages(item.images || []);
      setImageFiles([]); // Clear any previously selected new images
    }
  }, [existingItem, isEditing]);
  console.log({ formData });
  // Reset form when switching between add/edit modes
  useEffect(() => {
    if (!isEditing) {
      setFormData({
        title: "",
        description: "",
        category: "",
        type: "",
        size: "",
        condition: "",
        tags: [],
        images: [],
        remove_images: [],
        exchange_points: 0,
      });
      setImageFiles([]);
      setExistingImages([]);
      setNewTag("");
    }
  }, [isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to list an item.",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }

    // Validate required fields
    if (!formData.title.trim()) {
      toast({
        title: "Title is required",
        description: "Please enter a title for your item.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.description.trim()) {
      toast({
        title: "Description is required",
        description: "Please enter a description for your item.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.category) {
      toast({
        title: "Category is required",
        description: "Please select a category for your item.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.size) {
      toast({
        title: "Size is required",
        description: "Please select a size for your item.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.condition) {
      toast({
        title: "Condition is required",
        description: "Please select a condition for your item.",
        variant: "destructive",
      });
      return;
    }

    // Check if at least one image exists (existing or new)
    // if (existingImages.length === 0 && imageFiles.length === 0) {
    //   toast({
    //     title: "At least one image is required",
    //     description: "Please add at least one image of your item.",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    try {
      const itemData = {
        ...formData,
        images: imageFiles, // New image files
        userId: user.id,
        userName: user.name,
      };

      // Add itemId if updating
      if (isEditing) {
        itemData.itemId = itemId;
      }

      await createOrUpdateItemMutation.mutateAsync(itemData);

      toast({
        title: isEditing
          ? "Item updated successfully!"
          : "Item listed successfully!",
        description: isEditing
          ? "Your item has been updated."
          : "Your item is now available for swapping.",
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Error submitting item:", error);
      toast({
        title: isEditing ? "Failed to update item" : "Failed to list item",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const remainingSlots = 5 - (existingImages.length + imageFiles.length);
      const filesToAdd = files.slice(0, remainingSlots);

      // Validate file types
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      const invalidFiles = filesToAdd.filter(
        (file) => !validTypes.includes(file.type)
      );

      if (invalidFiles.length > 0) {
        toast({
          title: "Invalid file type",
          description: "Please upload only image files (JPEG, PNG, GIF, WebP).",
          variant: "destructive",
        });
        return;
      }

      // Check file sizes (max 5MB per file)
      const maxSize = 5 * 1024 * 1024; // 5MB
      const oversizedFiles = filesToAdd.filter((file) => file.size > maxSize);

      if (oversizedFiles.length > 0) {
        toast({
          title: "File too large",
          description: "Each image must be less than 5MB.",
          variant: "destructive",
        });
        return;
      }

      setImageFiles((prev) => [...prev, ...filesToAdd]);
    }
  };

  const removeNewImage = (indexToRemove) => {
    setImageFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const removeExistingImage = (imagePath) => {
    setExistingImages((prev) => prev.filter((img) => img !== imagePath));
    setFormData((prev) => ({
      ...prev,
      remove_images: [...prev.remove_images, imagePath],
    }));
  };
  const categoryOptions = getCategoryOptions();
  const typeOptions = getTypeOptions();
  const sizeOptions = getSizeOptions();
  const conditionOptions = getConditionOptions();
  const tagOptions = getTagOptions();

  // Loading state for editing
  if (isEditing && isLoadingItem) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading item details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state for editing
  if (isEditing && !isLoadingItem && !existingItem) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8 max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-destructive">
              Item Not Found
            </h1>
            <p className="text-muted-foreground mb-4">
              The item you're trying to edit could not be found.
            </p>
            <Button onClick={() => router.push("/dashboard")}>
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {isEditing ? "Edit Item" : "List a New Item"}
          </h1>
          <p className="text-muted-foreground">
            {isEditing
              ? "Update your item details."
              : "Share details about your item to attract the right swappers."}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
            <CardDescription>
              Provide accurate information to help others find your item.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Images */}
              <div className="space-y-2">
                <Label>Images (up to 5) *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Existing Images */}
                  {existingImages.map((image, index) => (
                    <div key={`existing-${index}`} className="relative">
                      <img
                        src={image}
                        alt={`Existing ${index + 1}`}
                        className="w-full h-32 object-cover rounded border"
                        onError={(e) => {
                          e.target.src = "/placeholder-image.jpg"; // Fallback image
                        }}
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        className="absolute top-1 right-1 h-6 w-6 p-0"
                        onClick={() => removeExistingImage(image)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}

                  {/* New Images */}
                  {imageFiles.map((file, index) => (
                    <div key={`new-${index}`} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`New ${index + 1}`}
                        className="w-full h-32 object-cover rounded border"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        className="absolute top-1 right-1 h-6 w-6 p-0"
                        onClick={() => removeNewImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}

                  {/* Upload Button */}
                  {existingImages.length + imageFiles.length < 5 && (
                    <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-muted-foreground/25 rounded cursor-pointer hover:border-muted-foreground/50 transition-colors">
                      <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground text-center">
                        Add Photo
                      </span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {existingImages.length + imageFiles.length}/5 images uploaded
                </p>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Vintage Leather Jacket"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                </div>
                {console.log(
                  formData,
                  "formData.categoryformData.categoryformData.categoryformData.category"
                )}
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleInputChange("category", value)
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your item's condition, style, fit, and any special features..."
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleInputChange("type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {typeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Size *</Label>
                  <Select
                    value={formData.size}
                    onValueChange={(value) => handleInputChange("size", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {sizeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="condition">Condition *</Label>
                  <Select
                    value={formData.condition}
                    onValueChange={(value) =>
                      handleInputChange("condition", value)
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exchange_points">Exchange Points</Label>
                  <Input
                    id="exchange_points"
                    type="number"
                    placeholder="Points"
                    min="0"
                    value={formData.exchange_points}
                    onChange={(e) =>
                      handleInputChange(
                        "exchange_points",
                        parseInt(e.target.value) || 0
                      )
                    }
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Select value={newTag} onValueChange={setNewTag}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select a tag" />
                    </SelectTrigger>
                    <SelectContent>
                      {tagOptions
                        .filter(
                          (option) => !formData.tags.includes(option.value)
                        )
                        .map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    size="sm"
                    onClick={addTag}
                    disabled={!newTag.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                        onClick={() => removeTag(tag)}
                      >
                        {tag}
                        <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={createOrUpdateItemMutation.isPending}
                  className="flex-1"
                >
                  {createOrUpdateItemMutation.isPending
                    ? isEditing
                      ? "Updating Item..."
                      : "Listing Item..."
                    : isEditing
                    ? "Update Item"
                    : "List Item"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/dashboard")}
                  disabled={createOrUpdateItemMutation.isPending}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
