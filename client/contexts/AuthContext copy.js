"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("rewear_user")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser(userData)
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    setLoading(true)
    try {
      // Mock authentication - replace with actual API call
      if (email && password) {
        const mockUser = {
          id: "1",
          email,
          name: email.split("@")[0],
          points: 150,
          avatar: "/placeholder.svg?height=40&width=40",
        }

        setUser(mockUser)
        setIsAuthenticated(true)
        localStorage.setItem("rewear_user", JSON.stringify(mockUser))
        return { success: true, user: mockUser }
      }
      throw new Error("Invalid credentials")
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const signup = async (userData) => {
    setLoading(true)
    try {
      // Mock registration - replace with actual API call
      const mockUser = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        points: 50, // Welcome bonus
        avatar: "/placeholder.svg?height=40&width=40",
      }

      setUser(mockUser)
      setIsAuthenticated(true)
      localStorage.setItem("rewear_user", JSON.stringify(mockUser))
      return { success: true, user: mockUser }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("rewear_user")
  }

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData }
    setUser(updatedUser)
    localStorage.setItem("rewear_user", JSON.stringify(updatedUser))
  }

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
