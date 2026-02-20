"use client"

import * as React from "react"
import { TrendingUp, TrendingDown, DollarSign, Calendar, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface FinancialSummary {
  totalContributions: number
  totalReceived: number
  pendingAmount: number
  nextPayoutDate?: Date
}

interface FinancialSummaryProps {
  summary: FinancialSummary
  className?: string
}

interface MetricCardProps {
  title: string
  value: string
  icon: React.ComponentType<{ className?: string }>
  trend?: {
    value: number
    isPositive: boolean
  }
  highlight?: boolean
  warning?: boolean
  className?: string
}

function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  highlight, 
  warning,
  className 
}: MetricCardProps) {
  return (
    <div className={cn(
      "p-4 rounded-lg border transition-colors duration-200",
      highlight && "bg-ajo-primary/5 border-ajo-primary/20",
      warning && "bg-ajo-warning/5 border-ajo-warning/20",
      !highlight && !warning && "bg-card border-border",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>
          <p className={cn(
            "text-2xl font-bold",
            highlight && "text-ajo-primary",
            warning && "text-ajo-warning",
            !highlight && !warning && "text-foreground"
          )}>
            {value}
          </p>
        </div>
        <div className={cn(
          "p-2 rounded-full",
          highlight && "bg-ajo-primary/10",
          warning && "bg-ajo-warning/10",
          !highlight && !warning && "bg-muted"
        )}>
          <Icon className={cn(
            "h-5 w-5",
            highlight && "text-ajo-primary",
            warning && "text-ajo-warning",
            !highlight && !warning && "text-muted-foreground"
          )} />
        </div>
      </div>
      
      {trend && (
        <div className="flex items-center gap-1 mt-2">
          {trend.isPositive ? (
            <TrendingUp className="h-3 w-3 text-ajo-success" />
          ) : (
            <TrendingDown className="h-3 w-3 text-ajo-error" />
          )}
          <span className={cn(
            "text-xs font-medium",
            trend.isPositive ? "text-ajo-success" : "text-ajo-error"
          )}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </span>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
      )}
    </div>
  )
}

export function FinancialSummary({ summary, className }: FinancialSummaryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-NG', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date)
  }
  
  const netBalance = summary.totalReceived - summary.totalContributions
  const isPositiveBalance = netBalance >= 0
  
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">
          Financial Summary
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-4">
          <MetricCard
            title="Total Contributions"
            value={formatCurrency(summary.totalContributions)}
            icon={TrendingUp}
            trend={{
              value: 12.5,
              isPositive: true
            }}
          />
          
          <MetricCard
            title="Total Received"
            value={formatCurrency(summary.totalReceived)}
            icon={DollarSign}
            highlight={summary.totalReceived > 0}
            trend={{
              value: 8.2,
              isPositive: true
            }}
          />
          
          <MetricCard
            title="Pending Amount"
            value={formatCurrency(summary.pendingAmount)}
            icon={AlertCircle}
            warning={summary.pendingAmount > 0}
            className="sm:col-span-2 xl:col-span-1 2xl:col-span-2"
          />
        </div>
        
        {/* Net Balance */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-ajo-primary/5 to-ajo-accent/5 border border-ajo-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Net Balance
              </p>
              <p className={cn(
                "text-3xl font-bold",
                isPositiveBalance ? "text-ajo-success" : "text-ajo-error"
              )}>
                {formatCurrency(Math.abs(netBalance))}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {isPositiveBalance ? "You're ahead" : "You owe"}
              </p>
            </div>
            <div className="text-right">
              {isPositiveBalance ? (
                <TrendingUp className="h-8 w-8 text-ajo-success" />
              ) : (
                <TrendingDown className="h-8 w-8 text-ajo-error" />
              )}
            </div>
          </div>
        </div>
        
        {/* Next Payout */}
        {summary.nextPayoutDate && (
          <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
            <Calendar className="h-5 w-5 text-ajo-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Next Expected Payout
              </p>
              <p className="text-sm text-muted-foreground">
                {formatDate(summary.nextPayoutDate)}
              </p>
            </div>
          </div>
        )}
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-2xl font-bold text-ajo-primary">
              {summary.totalContributions > 0 
                ? Math.round((summary.totalReceived / summary.totalContributions) * 100)
                : 0
              }%
            </p>
            <p className="text-xs text-muted-foreground">Return Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">
              {summary.pendingAmount > 0 ? '1' : '0'}
            </p>
            <p className="text-xs text-muted-foreground">Pending Payments</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}