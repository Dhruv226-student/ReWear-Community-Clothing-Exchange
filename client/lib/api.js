// Mock API functions - replace with actual API calls
import axiosInstance from "@/lib/axiosInstance";

export const api = {
  // Items
  getItems: async (filters = {}) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockItems = [
      {
        id: "1",
        title: "Vintage Leather Jacket",
        description: "Classic brown leather jacket in excellent condition",
        category: "Outerwear",
        type: "Jacket",
        size: "M",
        condition: "Excellent",
        tags: ["vintage", "leather", "classic"],
        images: ["/placeholder.svg?height=300&width=300"],
        userId: "user1",
        userName: "Sarah Chen",
        pointsValue: 45,
        status: "available",
        createdAt: "2024-01-15",
      },
      {
        id: "2",
        title: "Designer Summer Dress",
        description: "Floral print midi dress, perfect for summer occasions",
        category: "Dresses",
        type: "Midi Dress",
        size: "S",
        condition: "Like New",
        tags: ["designer", "floral", "summer"],
        images: ["/placeholder.svg?height=300&width=300"],
        userId: "user2",
        userName: "Emma Wilson",
        pointsValue: 35,
        status: "available",
        createdAt: "2024-01-14",
      },
      {
        id: "3",
        title: "Premium Denim Jeans",
        description: "High-quality raw denim with perfect fade",
        category: "Bottoms",
        type: "Jeans",
        size: "L",
        condition: "Good",
        tags: ["denim", "premium", "raw"],
        images: ["/placeholder.svg?height=300&width=300"],
        userId: "user3",
        userName: "Mike Johnson",
        pointsValue: 30,
        status: "available",
        createdAt: "2024-01-13",
      },
      {
        id: "4",
        title: "Cozy Wool Sweater",
        description: "Hand-knitted merino wool sweater, incredibly soft",
        category: "Tops",
        type: "Sweater",
        size: "M",
        condition: "Excellent",
        tags: ["wool", "handmade", "cozy"],
        images: ["/placeholder.svg?height=300&width=300"],
        userId: "user4",
        userName: "Lisa Park",
        pointsValue: 40,
        status: "available",
        createdAt: "2024-01-12",
      },
      {
        id: "5",
        title: "Athletic Running Shoes",
        description: "Barely used running shoes with excellent support",
        category: "Shoes",
        type: "Running Shoes",
        size: "9",
        condition: "Like New",
        tags: ["athletic", "running", "comfortable"],
        images: ["/placeholder.svg?height=300&width=300"],
        userId: "user5",
        userName: "David Kim",
        pointsValue: 50,
        status: "available",
        createdAt: "2024-01-11",
      },
    ];

    return mockItems;
  },

  // Replace the existing getFeaturedItems method in your lib/api.js

  getFeaturedItems: async (limit = 1000000) => {
    try {
      const response = await axiosInstance.get(
        `item/list?limit=${limit}&page=1`
      );
      const data = await response?.data;

      if (!data.success) {
        throw new Error("Failed to fetch featured items");
      }
      // Transform the API response to match your component's expected format
      return data.data.results.map((item) => ({
        id: item._id,
        title: item.title,
        description: item.description,
        category: item.category,
        type: item.type,
        size: item.size,
        condition: item.condition,
        tags: item.tags,
        images: item.images.length > 0 ? item.images : ["/placeholder.svg"],
        userId: item.owner._id,
        userName: `${item.owner.first_name} ${item.owner.last_name}`,
        pointsValue: item.exchange_points,
        status: item.status.toLowerCase(),
        createdAt: item.createdAt,
      }));
    } catch (error) {
      console.error("Error fetching featured items:", error);
      throw error;
    }
  },

  getItemById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const items = await api.getItems();
    return items.find((item) => item.id === id);
  },

  getUserItems: async (userId) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [
      {
        id: "user-1",
        title: "Vintage Band T-Shirt",
        description: "Rare vintage band tee from the 90s",
        category: "Tops",
        type: "T-Shirt",
        size: "M",
        condition: "Good",
        tags: ["vintage", "band", "rare"],
        images: ["/placeholder.svg?height=200&width=200"],
        userId: userId,
        userName: "You",
        pointsValue: 25,
        status: "available",
        createdAt: "2024-01-10",
      },
      {
        id: "user-2",
        title: "Designer Sneakers",
        description: "Limited edition sneakers, barely worn",
        category: "Shoes",
        type: "Sneakers",
        size: "9",
        condition: "Like New",
        tags: ["designer", "limited", "sneakers"],
        images: ["/placeholder.svg?height=200&width=200"],
        userId: userId,
        userName: "You",
        pointsValue: 60,
        status: "pending",
        createdAt: "2024-01-08",
      },
    ];
  },

  createItem: async (itemData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      id: Date.now().toString(),
      ...itemData,
      status: "available",
      createdAt: new Date().toISOString(),
    };
  },

  // Swaps
  getUserSwaps: async (userId) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      incoming: [
        {
          id: "1",
          requesterId: "user2",
          requesterName: "Emma Wilson",
          ownerId: userId,
          ownerName: "You",
          itemId: "1",
          itemTitle: "Vintage Band T-Shirt",
          itemImage: "/placeholder.svg?height=100&width=100",
          pointsOffered: 25,
          status: "pending",
          message: "Love this vintage tee! Would you accept points for it?",
          createdAt: "2024-01-15",
        },
      ],
      outgoing: [],
    };
  },

  createSwapRequest: async (swapData) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      id: Date.now().toString(),
      ...swapData,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
  },

  // Admin
  getPendingItems: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [
      {
        id: "pending-1",
        title: "Designer Handbag",
        description: "Authentic designer handbag in great condition",
        category: "Accessories",
        condition: "Excellent",
        images: ["/placeholder.svg?height=200&width=200"],
        userName: "Jane Smith",
        submittedAt: "2024-01-16",
        status: "pending",
      },
      {
        id: "pending-2",
        title: "Vintage Concert Tee",
        description: "Rare vintage band t-shirt from 1990s tour",
        category: "Tops",
        condition: "Good",
        images: ["/placeholder.svg?height=200&width=200"],
        userName: "Mike Johnson",
        submittedAt: "2024-01-16",
        status: "pending",
      },
    ];
  },

  getReportedItems: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [
      {
        id: "report-1",
        title: "Suspicious Listing",
        description: "Item description seems fake or misleading",
        category: "Outerwear",
        userName: "Unknown User",
        reportedBy: "Sarah Wilson",
        reportReason: "Misleading description",
        reportedAt: "2024-01-15",
      },
    ];
  },

  getUsers: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [
      {
        id: "1",
        name: "Sarah Chen",
        email: "sarah@example.com",
        joinDate: "2024-01-01",
        itemsListed: 12,
        swapsCompleted: 8,
        points: 150,
        status: "active",
      },
      {
        id: "2",
        name: "Mike Johnson",
        email: "mike@example.com",
        joinDate: "2024-01-05",
        itemsListed: 6,
        swapsCompleted: 4,
        points: 80,
        status: "active",
      },
    ];
  },
};
