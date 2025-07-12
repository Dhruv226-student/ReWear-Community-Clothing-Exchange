import axiosInstance from "@/lib/axiosInstance";

// Create or Update Item API
export const createOrUpdateItem = async (itemData) => {
  const formData = new FormData();

  // Add all form fields
  Object.keys(itemData).forEach((key) => {
    if (key === "images" && itemData[key]) {
      // Handle new image files
      itemData[key].forEach((file, index) => {
        if (file instanceof File) {
          formData.append("images", file);
        }
      });
    } else if (key === "tags" && Array.isArray(itemData[key])) {
      // Handle tags array
      itemData[key].forEach((tag) => {
        formData.append("tags[]", tag);
      });
    } else if (key === "remove_images" && Array.isArray(itemData[key])) {
      // Handle images to remove
      itemData[key].forEach((imagePath) => {
        formData.append("remove_images[]", imagePath);
      });
    } else if (itemData[key] !== undefined && itemData[key] !== null) {
      formData.append(key, itemData[key]);
    }
  });

  const response = await axiosInstance.post(
    "user/item/create-update",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Get all items
export const fetchItems = async (params = {}) => {
  const response = await axiosInstance.get("user/item/list", { params });
  return response.data;
};

// Get single item by ID
export const fetchItemById = async (itemId) => {
  const response = await axiosInstance.get(`user/item/details/${itemId}`);
  return response.data.data;
};

// Get item details by ID (for editing)
export const fetchItemDetails = async (itemId) => {
  const response = await axiosInstance.get(`user/item/details/${itemId}`);
  return response.data;
};

// Delete item
export const deleteItem = async (itemId) => {
  const response = await axiosInstance.delete(`user/item/${itemId}`);
  return response.data;
};

// Get user's items
export const fetchUserItems = async (userId) => {
  const response = await axiosInstance.get(`user/items/${userId}`);
  return response.data;
};
