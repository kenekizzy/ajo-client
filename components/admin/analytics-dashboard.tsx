"use client";

import React from "react";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Building,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock analytics data
const mockAnalytics = {
  userGrowth: [
    { month: "Jan", users: 1200 },
    { month: "Feb", users: 1450 },
    { month: "Mar", users: 1680 },
    { month: "Apr", users: 1920 },
    { month: "May", users: 2150 },
    { month: "Jun", users: 2400 }
  ],
  groupsByStatus: [
    { status: "Active", count: 89, percentage: 57 },
    { status: "Recruiting", count: 45, percentage: 29 },
    { status: "Completed", count: 18, percentage: 12 },
    { status: "Suspended", count: 4, percentage: 2 }
  ],
  monthlyVolume: [
    { month: "Jan", volume: 12500000 },
    { month: "Feb", volume: 15200000 },
    { month: "Mar", volume: 18900000 },
    { month: "Apr", volume: 22100000 },
    { month: "May", volume: 25800000 },
    { month: "Jun", volume: 28400000 }
  ],
  topPerformingGroups: [
    { name: "Lagos Professionals", members: 15, volume: 2400000, completion: 95 },
    { name: "Teachers Union", members: 12, volume: 1800000, completion: 92 },
    { name: "Market Traders", members: 20, volume: 3200000, completion: 88 },
    { name: "Tech Workers", members: 8, volume: 1600000, completion: 85 }
  ]
};

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Analytics Dashboard</h2>
        <p className="text-muted-foreground">Platform performance and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+23.5%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-ajo-success">+4.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Groups</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              57% of total groups
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Group Size</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.4</div>
            <p className="text-xs text-muted-foreground">
              Members per group
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">
              Groups completing cycles
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>User Growth Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnalytics.userGrowth.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{data.month}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div 
                        className="bg-ajo-primary h-2 rounded-full" 
                        style={{ width: `${(data.users / 2400) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-16 text-right">
                      {data.users.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Groups by Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="w-5 h-5" />
              <span>Groups by Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnalytics.groupsByStatus.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ 
                        backgroundColor: 
                          data.status === 'Active' ? '#22c55e' :
                          data.status === 'Recruiting' ? '#3b82f6' :
                          data.status === 'Completed' ? '#6b7280' : '#ef4444'
                      }}
                    />
                    <span className="text-sm font-medium">{data.status}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{data.count}</span>
                    <span className="text-xs text-muted-foreground">({data.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div> 
     {/* Monthly Volume and Top Groups */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Monthly Volume */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5" />
              <span>Monthly Transaction Volume</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnalytics.monthlyVolume.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{data.month}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div 
                        className="bg-ajo-success h-2 rounded-full" 
                        style={{ width: `${(data.volume / 28400000) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-20 text-right">
                      ₦{(data.volume / 1000000).toFixed(1)}M
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Groups */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Top Performing Groups</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnalytics.topPerformingGroups.map((group, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{group.name}</span>
                    <span className="text-xs text-muted-foreground">{group.completion}%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{group.members} members</span>
                    <span>₦{(group.volume / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1">
                    <div 
                      className="bg-ajo-primary h-1 rounded-full" 
                      style={{ width: `${group.completion}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Platform Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>System Uptime</span>
                <span className="text-ajo-success">99.9%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Active Sessions</span>
                <span>1,247</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Response Time</span>
                <span className="text-ajo-success">120ms</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Risk Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Low Risk Users</span>
                <span className="text-ajo-success">89%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Medium Risk</span>
                <span className="text-yellow-600">8%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>High Risk</span>
                <span className="text-red-600">3%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Payment Success</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Successful</span>
                <span className="text-ajo-success">96.2%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Pending</span>
                <span className="text-yellow-600">2.8%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Failed</span>
                <span className="text-red-600">1.0%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}