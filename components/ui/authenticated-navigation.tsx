"use client";

import { useAuth } from "@/stores/auth-context";
import { Navigation, type NavigationItem } from "./navigation";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "./dropdown-menu";
import { 
  Home, 
  Users, 
  CreditCard, 
  Settings, 
  LogOut, 
  User 
} from "lucide-react";
import { useRouter } from "next/navigation";

// Navigation items for authenticated users
const dashboardNavigationItems: NavigationItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Groups", href: "/groups", icon: Users },
  { label: "Payments", href: "/payments", icon: CreditCard },
  { label: "Settings", href: "/settings", icon: Settings },
];

interface AuthenticatedNavigationProps {
  className?: string;
}

export function AuthenticatedNavigation({ className }: AuthenticatedNavigationProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleProfile = () => {
    router.push("/profile");
  };

  // User avatar and dropdown menu
  const userActions = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar} alt={user?.fullName} />
            <AvatarFallback>
              {user?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.fullName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleProfile}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/settings")}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Logo for authenticated navigation
  const logo = (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-ajo-primary rounded-lg flex items-center justify-center">
        <span className="text-ajo-primary-foreground font-bold text-lg">A</span>
      </div>
      <span className="text-xl font-bold">Ajo Loop</span>
    </div>
  );

  return (
    <Navigation
      items={dashboardNavigationItems}
      logo={logo}
      actions={userActions}
      className={className}
    />
  );
}