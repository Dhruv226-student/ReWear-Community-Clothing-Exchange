"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useItems } from "@/hooks/useItems";
import { useUserSwaps } from "@/hooks/useSwaps";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Package, ArrowUpDown, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ItemsList from "@/components/ItemsList"; // Import the ItemsList component

export default function DashboardPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  // Get user's items (first 6 for quick overview)
  const { data: userItemsResponse = {}, isLoading: itemsLoading } = useItems({
    // limit: 1,
    // page: 1,
    // Add userId filter when your API supports it
    // userId: user?.id
  });

  const {
    data: swapsData = { incoming: [], outgoing: [] },
    isLoading: swapsLoading,
  } = useUserSwaps();

  console.log(swapsData, "swapsData.....");
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/3" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="h-4 bg-muted rounded w-1/2 mb-2" />
                    <div className="h-8 bg-muted rounded w-1/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const userItems = userItemsResponse?.data || [];

  const stats = [
    {
      title: "Total Points",
      value: user.points || 0,
      icon: Star,
      color: "text-green-600",
    },
    {
      title: "Items Listed",
      value: userItems.length,
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Swaps Completed",
      value: 12, // You can replace this with actual data
      icon: ArrowUpDown,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user.first_name}!
          </h1>
          <p className="text-muted-foreground">
            Manage your items, track swaps, and discover new pieces for your
            wardrobe.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="items" className="space-y-6">
          <TabsList>
            <TabsTrigger value="items">My Items</TabsTrigger>
            <TabsTrigger value="swaps">
              Swap Requests
              {swapsData.incoming.length > 0 && (
                <Badge
                  variant="destructive"
                  className="ml-2 h-5 w-5 p-0 text-xs"
                >
                  {swapsData.incoming.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="items" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Your Items</h2>
              <Button asChild>
                <Link href="/add-item">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Item
                </Link>
              </Button>
            </div>

            {itemsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
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
            ) : userItems.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userItems.map((item) => (
                    <Card key={item._id} className="overflow-hidden">
                      <div className="relative">
                        <img
                          src={
                            item.images?.[0]
                              ? item.images[0]
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
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-xs">
                              {item.size}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {item.condition}
                            </Badge>
                          </div>
                          <div className="text-sm font-medium text-green-600">
                            {item.exchange_points} pts
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            asChild
                          >
                            <Link href={`/items/${item._id}`}>View</Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            asChild
                          >
                            <Link href={`/add-item?id=${item._id}`}>Edit</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No items yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start by listing your first item to begin swapping!
                  </p>
                  <Button asChild>
                    <Link href="/add-item">List Your First Item</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="browse" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Browse All Items</h2>
            </div>
            <ItemsList showFilters={true} showPagination={true} />
          </TabsContent>

          <TabsContent value="swaps" className="space-y-6">
            <h2 className="text-2xl font-semibold">Swap Requests</h2>

            {swapsLoading ? (
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-muted rounded" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-muted rounded w-1/2" />
                          <div className="h-3 bg-muted rounded w-3/4" />
                          <div className="h-3 bg-muted rounded w-1/4" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : swapsData.incoming.length > 0 ? (
              <div className="space-y-4">
                {swapsData.incoming.map((swap) => (
                  <Card key={swap.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={swap.itemImage || "/placeholder.svg"}
                          alt={swap.itemTitle}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{swap.itemTitle}</h3>
                            <Badge variant="outline">{swap.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>{swap.requesterName}</strong> wants to swap
                            for <strong>{swap.pointsOffered} points</strong>
                          </p>
                          {swap.message && (
                            <p className="text-sm mb-3 p-2 bg-muted rounded">
                              "{swap.message}"
                            </p>
                          )}
                          <div className="flex gap-2">
                            <Button size="sm">Accept</Button>
                            <Button size="sm" variant="outline">
                              Decline
                            </Button>
                            <Button size="sm" variant="ghost">
                              Message
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <ArrowUpDown className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No swap requests yet
                  </h3>
                  <p className="text-muted-foreground">
                    When someone wants to swap with your items, you'll see their
                    requests here.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <h2 className="text-2xl font-semibold">Swap History</h2>
            <Card>
              <CardContent className="p-8 text-center">
                <ArrowUpDown className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No completed swaps yet
                </h3>
                <p className="text-muted-foreground">
                  Your completed swaps and transactions will appear here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
