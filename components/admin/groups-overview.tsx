"use client";

import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  Eye, 
  MoreHorizontal, 
  Users, 
  DollarSign,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Pause,
  Play
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
import { GroupDetailsModal } from "./group-details-modal";

// Mock data for groups
const mockGroups = [
  {
    id: "1",
    name: "Lagos Savings Circle",
    creator: "John Doe",
    members: 8,
    maxMembers: 12,
    contributionAmount: 50000,
    frequency: "MONTHLY",
    status: "ACTIVE",
    totalContributions: 400000,
    nextPayout: "2024-02-15",
    createdAt: "2024-01-01",
    riskLevel: "LOW"
  },
  {
    id: "2", 
    name: "Teachers Union Group",
    creator: "Sarah Johnson",
    members: 15,
    maxMembers: 15,
    contributionAmount: 25000,
    frequency: "WEEKLY",
    status: "ACTIVE",
    totalContributions: 1875000,
    nextPayout: "2024-02-10",
    createdAt: "2023-12-15",
    riskLevel: "LOW"
  }
];

export function GroupsOverview() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-ajo-success/10 text-ajo-success border-ajo-success/20";
      case "RECRUITING":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "COMPLETED":
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
      case "SUSPENDED":
        return "bg-red-500/10 text-red-600 border-red-500/20";
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

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Groups Management</h2>
          <p className="text-muted-foreground">Monitor and manage all ajo savings groups</p>
        </div>
      </div>      {/*
 Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search groups by name, creator, or ID..."
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

      {/* Groups Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Groups ({mockGroups.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Group Name</TableHead>
                <TableHead>Creator</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Contribution</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Next Payout</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockGroups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{group.name}</div>
                      <div className="text-sm text-muted-foreground">ID: {group.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>{group.creator}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{group.members}/{group.maxMembers}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span>₦{group.contributionAmount.toLocaleString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(group.status)}>
                      {group.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={getRiskColor(group.riskLevel)}>
                      {group.riskLevel}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{group.nextPayout}</span>
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
                        <DropdownMenuItem 
                          onClick={() => {
                            setSelectedGroup(group);
                            setShowDetailsModal(true);
                          }}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pause className="w-4 h-4 mr-2" />
                          Suspend Group
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          Flag for Review
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

      {/* Group Details Modal */}
      {showDetailsModal && selectedGroup && (
        <GroupDetailsModal
          group={selectedGroup}
          isOpen={showDetailsModal}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedGroup(null);
          }}
        />
      )}
    </div>
  );
}