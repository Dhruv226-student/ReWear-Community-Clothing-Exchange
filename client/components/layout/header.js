"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Recycle, User, Settings, LogOut, Plus } from "lucide-react";

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky px-4 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Recycle className="h-6 w-6 text-green-600" />
          <span className="text-xl font-bold">ReWear</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/browse"
            className="text-sm font-medium hover:text-primary"
          >
            Browse Items
          </Link>
          <Link
            href="/how-it-works"
            className="text-sm font-medium hover:text-primary"
          >
            How It Works
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:text-primary"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {isAuthenticated && user ? (
            <>
              <Button asChild size="sm">
                <Link href="/add-item">
                  <Plus className="h-4 w-4 mr-2" />
                  List Item
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user?.avatar || "/placeholder.svg"}
                        alt={user?.first_name}
                      />
                      <AvatarFallback>
                        {user?.first_name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                      <p className="text-sm text-green-600 font-medium">
                        {user.points} points
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
