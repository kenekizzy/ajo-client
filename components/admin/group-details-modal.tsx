"use client";

import React from "react";
import { 
  X, 
  Users, 
  DollarSign, 
  Calendar, 
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  User,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GroupDetailsModalProps {
  group: any;
  isOpen: boolean;
  onClose: () => void;
}

// Mock data for group details
const mockMembers = [
  { id: 1, name: "John Doe", email: "john@example.com", joinedAt: "2024-01-01", payoutPosition: 1, hasReceivedPayout: false, contributionStatus: "UP_TO_DATE" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", joinedAt: "2024-01-02", payoutPosition: 2, hasReceivedPayout: false, contributionStatus: "LATE" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", joinedAt: "2024-01-03", payoutPosition: 3, hasReceivedPayout: true, contributionStatus: "UP_TO_DATE" }
];

const mockPayments = [
  { id: 1, member: "John Doe", amount: 50000, type: "CONTRIBUTION", status: "COMPLETED", date: "2024-02-01" },
  { id: 2, member: "Jane Smith", amount: 50000, type: "CONTRIBUTION", status: "PENDING", date: "2024-02-01" },
  { id: 3, member: "Bob Johnson", amount: 600000, type: "PAYOUT", status: "COMPLETED", date: "2024-01-15" }
];

export function GroupDetailsModal({ group, isOpen, onClose }: GroupDetailsModalProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "UP_TO_DATE":
      case "COMPLETED":
        return "bg-ajo-success/10 text-ajo-success border-ajo-success/20";
      case "LATE":
      case "PENDING":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "OVERDUE":
      case "FAILED":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Group Details: {group.name}</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Group Overview */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-2xl font-bold">{group.members}</p>
                    <p className="text-xs text-muted-foreground">Members</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-2xl font-bold">₦{(group.totalContributions / 1000000).toFixed(1)}M</p>
                    <p className="text-xs text-muted-foreground">Total Volume</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-2xl font-bold">{group.frequency}</p>
                    <p className="text-xs text-muted-foreground">Frequency</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-2xl font-bold">{group.riskLevel}</p>
                    <p className="text-xs text-muted-foreground">Risk Level</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>     
     {/* Detailed Information Tabs */}
          <Tabs defaultValue="members" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="activity">Activity Log</TabsTrigger>
            </TabsList>

            <TabsContent value="members">
              <Card>
                <CardHeader>
                  <CardTitle>Group Members ({mockMembers.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-ajo-primary/10 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-ajo-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                            <p className="text-xs text-muted-foreground">Position: #{member.payoutPosition}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(member.contributionStatus)}>
                            {member.contributionStatus.replace('_', ' ')}
                          </Badge>
                          {member.hasReceivedPayout && (
                            <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                              PAID OUT
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockPayments.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-ajo-primary/10 rounded-full flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-ajo-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{payment.member}</p>
                            <p className="text-sm text-muted-foreground">
                              {payment.type} - ₦{payment.amount.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">{payment.date}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Log</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                      <div className="w-10 h-10 bg-ajo-success/10 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-ajo-success" />
                      </div>
                      <div>
                        <p className="font-medium">Group created</p>
                        <p className="text-sm text-muted-foreground">Group was successfully created by {group.creator}</p>
                        <p className="text-xs text-muted-foreground">{group.createdAt}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                      <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Members joined</p>
                        <p className="text-sm text-muted-foreground">{group.members} members have joined the group</p>
                        <p className="text-xs text-muted-foreground">Various dates</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Flag Group
            </Button>
            <Button variant="outline">
              Suspend Group
            </Button>
            <Button>
              Send Message
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}