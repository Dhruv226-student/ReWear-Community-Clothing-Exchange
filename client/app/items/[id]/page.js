"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useItem } from "@/hooks/useItems";
import { useCreateSwapRequest } from "@/hooks/useSwaps";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Heart,
  Share2,
  Flag,
  Star,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function ItemDetailPage({ params }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [swapMessage, setSwapMessage] = useState("");
  const [showSwapDialog, setShowSwapDialog] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { data: item, isLoading, error } = useItem(params.id);
  const createSwapMutation = useCreateSwapRequest();
  const router = useRouter();
  const { toast } = useToast();

  const handleSwapRequest = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please log in to request a swap.",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }

    try {
      await createSwapMutation.mutateAsync({
        requesterId: user.id,
        ownerId: item.userId,
        itemId: item.id,
        pointsOffered: item.exchange_points,
        message: swapMessage,
      });

      toast({
        title: "Swap request sent!",
        description: "The owner will be notified of your request.",
      });
      setShowSwapDialog(false);
      setSwapMessage("");
    } catch (error) {
      toast({
        title: "Failed to send request",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleRedeemWithPoints = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please log in to redeem with points.",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }

    if (!user || user.points < item.exchange_points) {
      toast({
        title: "Insufficient points",
        description: `You need ${item.exchange_points} points to redeem this item.`,
        variant: "destructive",
      });
      return;
    }

    // Mock redemption
    toast({
      title: "Item redeemed!",
      description: `You've successfully redeemed this item for ${item.exchange_points} points.`,
    });
  };

  console.log({ item });
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8">
          <div className="animate-pulse">
            <div className="h-6 bg-muted rounded w-24 mb-6" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="aspect-square bg-muted rounded-lg" />
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square bg-muted rounded-lg"
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="h-8 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                  <div className="h-6 bg-muted rounded w-1/4" />
                  <div className="h-20 bg-muted rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Item not found</h1>
            <p className="text-muted-foreground mb-4">
              The item you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => router.back()}>Go Back</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Browse
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={
                  item?.images && item?.images[selectedImage]
                    ? item?.images[selectedImage]
                    : "/placeholder.svg"
                }
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {item.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${item.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{item.category}</Badge>
                    <Badge variant="outline">{item.size}</Badge>
                    <Badge variant="outline">{item.condition}</Badge>
                  </div>
                </div>
              </div>

              <div className="text-2xl font-bold text-green-600 mb-4">
                {item.exchange_points} Points
              </div>

              <p className="text-muted-foreground mb-4">{item.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {item.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Owner Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={item.userAvatar || "/placeholder.svg"}
                      alt={item?.userName}
                    />
                    <AvatarFallback>{item?.userName?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Dialog open={showSwapDialog} onOpenChange={setShowSwapDialog}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="w-full"
                    disabled={createSwapMutation.isPending}
                  >
                    {createSwapMutation.isPending
                      ? "Sending Request..."
                      : "Request Swap"}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Request a Swap</DialogTitle>
                    <DialogDescription>
                      Send a message to {item.userName} about swapping for this
                      item.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="message">Message (optional)</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell them why you're interested in this item..."
                        value={swapMessage}
                        onChange={(e) => setSwapMessage(e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSwapRequest}
                        className="flex-1"
                        disabled={createSwapMutation.isPending}
                      >
                        {createSwapMutation.isPending
                          ? "Sending..."
                          : "Send Request"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowSwapDialog(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button
                size="lg"
                variant="outline"
                className="w-full bg-transparent"
                onClick={handleRedeemWithPoints}
                disabled={
                  !isAuthenticated ||
                  (user && user.points < item.exchange_points)
                }
              >
                Redeem with Points ({item.exchange_points} pts)
                {user && user.points < item.exchange_points && (
                  <span className="ml-2 text-xs text-muted-foreground">
                    (Need {item.exchange_points - user.points} more)
                  </span>
                )}
              </Button>
            </div>

            {/* Item Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Item Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span>{item.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span>{item.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Size:</span>
                  <span>{item.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Condition:</span>
                  <span>{item.condition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Listed:</span>
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
