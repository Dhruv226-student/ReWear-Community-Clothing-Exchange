"use client";

import { useState } from "react";
import { usePendingItems, useReportedItems, useUsers } from "@/hooks/useAdmin";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Users,
  Package,
  Flag,
  Search,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const { toast } = useToast();

  const { data: pendingItems = [], isLoading: pendingLoading } =
    usePendingItems();
  const { data: reportedItems = [], isLoading: reportsLoading } =
    useReportedItems();
  const { data: users = [], isLoading: usersLoading } = useUsers();

  const handleApproveItem = (itemId) => {
    // Mock approval - replace with actual API call
    toast({
      title: "Item approved",
      description: "The item has been approved and is now live.",
    });
  };

  const handleRejectItem = (itemId) => {
    // Mock rejection - replace with actual API call
    toast({
      title: "Item rejected",
      description: "The item has been rejected and removed.",
      variant: "destructive",
    });
  };

  const handleResolveReport = (itemId) => {
    // Mock resolution - replace with actual API call
    toast({
      title: "Report resolved",
      description: "The reported item has been reviewed and resolved.",
    });
  };

  const stats = [
    {
      title: "Pending Reviews",
      value: pendingItems.length,
      icon: AlertTriangle,
      color: "text-yellow-600",
    },
    {
      title: "Active Users",
      value: users.filter((u) => u.status === "active").length,
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Total Items",
      value: 156,
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Reports",
      value: reportedItems.length,
      icon: Flag,
      color: "text-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage items, users, and platform moderation.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">
              Pending Items
              {pendingItems.length > 0 && (
                <Badge
                  variant="destructive"
                  className="ml-2 h-5 w-5 p-0 text-xs"
                >
                  {pendingItems.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="reports">
              Reports
              {reportedItems.length > 0 && (
                <Badge
                  variant="destructive"
                  className="ml-2 h-5 w-5 p-0 text-xs"
                >
                  {reportedItems.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Pending Item Reviews</h2>
            </div>

            {pendingLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 bg-muted rounded" />
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
            ) : pendingItems.length > 0 ? (
              <div className="space-y-4">
                {pendingItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <img
                          src={item.images[0] || "/placeholder.svg"}
                          alt={item.title}
                          className="w-24 h-24 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">
                                {item.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                by {item.userName} • {item.category} •{" "}
                                {item.condition}
                              </p>
                            </div>
                            <Badge variant="outline">Pending Review</Badge>
                          </div>
                          <p className="text-sm mb-4 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleApproveItem(item.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleRejectItem(item.id)}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                            <Button size="sm" variant="outline">
                              View Details
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
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
                  <p className="text-muted-foreground">
                    No items pending review at the moment.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Reported Items</h2>
            </div>

            {reportsLoading ? (
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-1/2" />
                        <div className="h-3 bg-muted rounded w-3/4" />
                        <div className="h-3 bg-muted rounded w-1/4" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : reportedItems.length > 0 ? (
              <div className="space-y-4">
                {reportedItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Listed by {item.userName} • Reported by{" "}
                            {item.reportedBy}
                          </p>
                        </div>
                        <Badge variant="destructive">Reported</Badge>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-1">
                          Report Reason:
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.reportReason}
                        </p>
                      </div>
                      <p className="text-sm mb-4">{item.description}</p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleResolveReport(item.id)}
                        >
                          Resolve Report
                        </Button>
                        <Button size="sm" variant="destructive">
                          Remove Item
                        </Button>
                        <Button size="sm" variant="outline">
                          Contact User
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No reports!</h3>
                  <p className="text-muted-foreground">
                    No reported items to review at the moment.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">User Management</h2>
            </div>

            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {usersLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="flex justify-between">
                        <div className="space-y-2">
                          <div className="h-4 bg-muted rounded w-32" />
                          <div className="h-3 bg-muted rounded w-48" />
                          <div className="h-3 bg-muted rounded w-24" />
                        </div>
                        <div className="flex gap-4">
                          <div className="h-8 bg-muted rounded w-16" />
                          <div className="h-8 bg-muted rounded w-16" />
                          <div className="h-8 bg-muted rounded w-16" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {users.map((user) => (
                  <Card key={user.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="font-semibold">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {user.email}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Joined{" "}
                              {new Date(user.joinDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="text-lg font-semibold">
                              {user.itemsListed}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Items
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold">
                              {user.swapsCompleted}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Swaps
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold text-green-600">
                              {user.points}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Points
                            </div>
                          </div>
                          <Badge
                            variant={
                              user.status === "active"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {user.status}
                          </Badge>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              View Profile
                            </Button>
                            <Button size="sm" variant="outline">
                              Message
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
