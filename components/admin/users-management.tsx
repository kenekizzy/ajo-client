"use client";

import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  Eye, 
  MoreHorizontal, 
  User, 
  Mail,
  Calendar,
  Shield,
  AlertTriangle,
  CheckCircle,
  Ban,
  UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for users
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phoneNumber: "+234123456789",
    joinedAt: "2024-01-15",
    status: "ACTIVE",
    isVerified: true,
    groupsCount: 3,
    totalContributions: 150000,
    riskScore: "LOW",
    provider: "CREDENTIALS"
  },
  {
    id: "2",
    name: "Jane Smith", 
    email: "jane@example.com",
    phoneNumber: "+234987654321",
    joinedAt: "2024-01-10",
    status: "ACTIVE",
    isVerified: true,
    groupsCount: 2,
    totalContributions: 75000,
    riskScore: "LOW",
    provider: "GOOGLE"
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com", 
    phoneNumber: "+234555666777",
    joinedAt: "2024-02-01",
    status: "FLAGGED",
    isVerified: false,
    groupsCount: 1,
    totalContributions: 25000,
    riskScore: "HIGH",
    provider: "FACEBOOK"
  }
];

export function UsersManagement() {
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-ajo-success/10 text-ajo-success border-ajo-success/20";
      case "SUSPENDED":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      case "FLAGGED":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "PENDING":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "LOW":
        return "text-ajo-success";
      case "MEDIUM":
        return "text-yellow-600";
      case "HIGH":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case "GOOGLE":
        return "🔍";
      case "FACEBOOK":
        return "📘";
      case "MICROSOFT":
        return "🪟";
      default:
        return "📧";
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Users Management</h2>
          <p className="text-muted-foreground">Monitor and manage platform users</p>
        </div>
      </div>    
  {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users ({mockUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Groups</TableHead>
                <TableHead>Contributions</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-ajo-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-ajo-primary" />
                      </div>
                      <div>
                        <div className="font-medium flex items-center space-x-2">
                          <span>{user.name}</span>
                          {user.isVerified && (
                            <CheckCircle className="w-4 h-4 text-ajo-success" />
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center space-x-1">
                          <span>{getProviderIcon(user.provider)}</span>
                          <span>ID: {user.id}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {user.phoneNumber}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{user.groupsCount}</span>
                  </TableCell>
                  <TableCell>
                    <span>₦{user.totalContributions.toLocaleString()}</span>
                  </TableCell>
                  <TableCell>
                    <span className={getRiskColor(user.riskScore)}>
                      {user.riskScore}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{user.joinedAt}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="w-4 h-4 mr-2" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="w-4 h-4 mr-2" />
                          Verify User
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          Flag User
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Ban className="w-4 h-4 mr-2" />
                          Suspend User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}