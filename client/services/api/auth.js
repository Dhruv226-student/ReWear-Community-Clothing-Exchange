import axiosInstance from "@/lib/axiosInstance";

// Login API
export const loginUser = async (credentials) => {
  const response = await axiosInstance.post("auth/login", credentials);
  return response.data;
};

export const signupUser = async (userData) => {
  // Split the name into first_name and last_name
  const payload = {
    first_name: userData.firstName,
    last_name: userData.lastName,
    email: userData.email,
    password: userData.password,
  };
  console.log("=====payload=====", payload);
  const response = await axiosInstance.post("auth/register", payload);
  return response.data;
};

// Get current user
export const fetchCurrentUser = async () => {
  const response = await axiosInstance.get("user/get");
  return response.data;
};

// Logout API (if you have one)
export const logoutUser = async () => {
  const response = await axiosInstance.post("auth/logout");
  return response.data;
};

// Refresh token API (if you have one)
export const refreshToken = async (refreshToken) => {
  const response = await axiosInstance.post("auth/refresh", {
    refresh_token: refreshToken,
  });
  return response.data;
};
