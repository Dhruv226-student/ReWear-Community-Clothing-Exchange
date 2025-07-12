"use client";

import { useState } from "react";
import { useItems } from "@/hooks/useItems";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Package,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import Link from "next/link";
import { ITEM_CONSTANTS } from "@/constants/itemConstants";

export default function ItemsList({
  showFilters = true,
  showPagination = true,
  userId = null,
}) {
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  // Build query parameters
  const queryParams = {
    page,
    limit,
    ...(searchTerm && { search: searchTerm }),
    ...(selectedCategory && { category: selectedCategory }),
    ...(selectedCondition && { condition: selectedCondition }),
    ...(selectedSize && { size: selectedSize }),
    ...(userId && { userId }), // For user-specific items
  };

  const { data: itemsResponse, isLoading, error } = useItems(queryParams);
  const items = itemsResponse?.data || [];

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page when searching
  };

  const handleFilterChange = (filterType, value) => {
    setPage(1); // Reset to first page when filtering
    switch (filterType) {
      case "category":
        setSelectedCategory(value);
        break;
      case "condition":
        setSelectedCondition(value);
        break;
      case "size":
        setSelectedSize(value);
        break;
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedCondition("");
    setSelectedSize("");
    setPage(1);
  };

  if (error) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Error loading items</h3>
          <p className="text-muted-foreground">
            There was an error loading the items. Please try again.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      {showFilters && (
        <div className="space-y-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>

            <Select
              value={selectedCategory}
              onValueChange={(value) => handleFilterChange("category", value)}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {Object.entries(ITEM_CONSTANTS.CATEGORY).map(([key, value]) => (
                  <SelectItem key={key} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedCondition}
              onValueChange={(value) => handleFilterChange("condition", value)}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Conditions</SelectItem>
                {Object.entries(ITEM_CONSTANTS.CONDITION).map(
                  ([key, value]) => (
                    <SelectItem key={key} value={value}>
                      {value}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>

            <Select
              value={selectedSize}
              onValueChange={(value) => handleFilterChange("size", value)}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Sizes</SelectItem>
                {Object.entries(ITEM_CONSTANTS.SIZE).map(([key, value]) => (
                  <SelectItem key={key} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {(searchTerm ||
              selectedCategory ||
              selectedCondition ||
              selectedSize) && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Items Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(limit)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="w-full h-48 bg-muted rounded-t-lg" />
              <CardContent className="p-4 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-full" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <Card
              key={item._id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={
                    item.images?.[0]
                      ? `${
                          process.env.NEXT_PUBLIC_API_URL ||
                          "http://localhost:3001"
                        }/${item.images[0]}`
                      : "/placeholder.svg"
                  }
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge
                    variant={
                      item.status === "Approved"
                        ? "default"
                        : item.status === "Pending"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {item.status}
                  </Badge>
                </div>
                <div className="absolute top-2 left-2">
                  <Badge variant="outline" className="bg-white/90">
                    {item.exchange_points} pts
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-1 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-1 flex-wrap">
                    <Badge variant="outline" className="text-xs">
                      {item.size}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {item.condition}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                </div>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex gap-1 flex-wrap mb-3">
                    {item.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {item.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{item.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                )}
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <Link href={`/items/${item._id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No items found</h3>
            <p className="text-muted-foreground">
              {searchTerm ||
              selectedCategory ||
              selectedCondition ||
              selectedSize
                ? "Try adjusting your search or filters."
                : "No items available at the moment."}
            </p>
            {(searchTerm ||
              selectedCategory ||
              selectedCondition ||
              selectedSize) && (
              <Button variant="outline" className="mt-4" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {showPagination && items.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing page {page} of items
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <span className="text-sm px-3 py-1 bg-muted rounded">{page}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={items.length < limit}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
