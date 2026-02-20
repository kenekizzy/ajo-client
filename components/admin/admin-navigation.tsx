"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Building, 
  CreditCard, 
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    title: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
    description: "Dashboard overview and quick actions"
  },
  {
    title: "Groups",
    href: "/admin/groups", 
    icon: Building,
    description: "Manage ajo savings groups",
    badge: "12"
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
    description: "User management and verification"
  },
  {
    title: "Payments",
    href: "/admin/payments",
    icon: CreditCard,
    description: "Transaction monitoring and processing",
    badge: "3"
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    description: "Platform insights and reports"
  }
];

interface AdminNavigationProps {
  children: React.ReactNode;
}

export function AdminNavigation({ children }: AdminNavigationProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r border-border bg-card">
        {/* Logo */}
        <div className="flex h-16 items-center px-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-ajo-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <h1 className="font-semibold text-foreground">AjoConnect</h1>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-ajo-primary text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="flex-1">{item.title}</span>
                {item.badge && (
                  <Badge 
                    className={cn(
                      "text-xs",
                      isActive 
                        ? "bg-white/20 text-white border-white/20" 
                        : "bg-ajo-primary/10 text-ajo-primary border-ajo-primary/20"
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-border space-y-2">
          <Button variant="outline" className="w-full justify-start" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" className="w-full justify-start" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-foreground">
              {navigationItems.find(item => item.href === pathname)?.title || "Admin Dashboard"}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search..."
                className="pl-10 w-64"
              />
            </div>

            {/* Notifications */}
            <Button variant="outline" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-red-500 text-white border-red-500">
                3
              </Badge>
            </Button>

            {/* Admin Profile */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-ajo-primary/10 rounded-full flex items-center justify-center">
                <span className="text-ajo-primary font-medium text-sm">A</span>
              </div>
              <div className="text-sm">
                <p className="font-medium text-foreground">Admin User</p>
                <p className="text-muted-foreground">admin@ajoconnect.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}