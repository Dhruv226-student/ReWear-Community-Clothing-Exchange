"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  loginUser,
  fetchCurrentUser,
  logoutUser,
  signupUser,
} from "@/services/api/auth";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // // Fetch current user query
  // const { data: currentUser, isLoading: isLoadingUser } = useQuery({
  //   queryKey: ["currentUser"],
  //   queryFn: fetchCurrentUser,
  //   enabled: isAuthenticated,
  //   onSuccess: (data) => {
  //     setUser(data.data.user);
  //   },
  //   onError: () => {
  //     // If fetching user fails, logout
  //     handleLogout();
  //   },
  // });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data.success) {
        // Store tokens
        localStorage.setItem("access_token", data.data.tokens.access.token);
        localStorage.setItem("refresh_token", data.data.tokens.refresh.token);

        // Update state
        setUser(data.data.user);
        setIsAuthenticated(true);

        // Invalidate and refetch user data
        queryClient.invalidateQueries(["currentUser"]);
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      handleLogout();
    },
    onError: () => {
      // Even if logout API fails, clear local data
      handleLogout();
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    setIsAuthenticated(false);
    queryClient.clear();
  };

  // Login function
  const login = async (email, password) => {
    try {
      const result = await loginMutation.mutateAsync({ email, password });
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await signupUser(userData);

      if (response.success) {
        // Store tokens in localStorage or cookies
        localStorage.setItem("accessToken", response.data.tokens.access.token);
        localStorage.setItem(
          "refreshToken",
          response.data.tokens.refresh.token
        );

        // Set user data
        setUser(response.data.user);

        return { success: true, user: response.data.user };
      } else {
        return { success: false, error: response.message || "Signup failed" };
      }
    } catch (error) {
      console.error("Signup error:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Network error occurred",
      };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading: isLoading || loginMutation.isLoading,
    login,
    logout,
    signup,
    loginError: loginMutation.error,
    isLoginLoading: loginMutation.isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
