"use client"

import * as React from "react"
import { Calendar, Users, DollarSign, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AjoGroup {
  id: string
  name: string
  totalMembers: number
  contributionAmount: number
  nextPaymentDate: Date
  userStatus: 'current' | 'pending' | 'completed'
}

interface AjoGroupCardProps {
  group: AjoGroup
  className?: string
}

const statusConfig = {
  current: {
    label: "Current Turn",
    className: "bg-ajo-success/10 text-ajo-success border-ajo-success/20",
    icon: DollarSign
  },
  pending: {
    label: "Pending Payment",
    className: "bg-ajo-warning/10 text-ajo-warning border-ajo-warning/20",
    icon: Clock
  },
  completed: {
    label: "Completed",
    className: "bg-muted/50 text-muted-foreground border-muted",
    icon: Calendar
  }
}

export function AjoGroupCard({ group, className }: AjoGroupCardProps) {
  const status = statusConfig[group.userStatus]
  const StatusIcon = status.icon
  
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
  
  const cardId = `ajo-group-${group.id}`
  const statusId = `status-${group.id}`
  const progressId = `progress-${group.id}`
  
  return (
    <Card 
      className={cn("hover:shadow-md transition-shadow duration-200 focus-within:ring-2 focus-within:ring-ajo-primary focus-within:ring-offset-2", className)}
      role="article"
      aria-labelledby={cardId}
      aria-describedby={statusId}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle id={cardId} className="text-lg font-semibold text-foreground">
            {group.name}
          </CardTitle>
          <div 
            id={statusId}
            className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
              status.className
            )}
            role="status"
            aria-label={`Group status: ${status.label}`}
          >
            <StatusIcon className="h-3 w-3" aria-hidden="true" />
            {status.label}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Group Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <span className="text-muted-foreground">Members:</span>
            <span className="font-medium text-foreground" aria-label={`${group.totalMembers} members`}>
              {group.totalMembers}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <span className="text-muted-foreground">Amount:</span>
            <span className="font-medium text-foreground" aria-label={`Contribution amount: ${formatCurrency(group.contributionAmount)}`}>
              {formatCurrency(group.contributionAmount)}
            </span>
          </div>
        </div>
        
        {/* Next Payment */}
        <div className="flex items-center gap-2 text-sm p-3 bg-muted/30 rounded-lg" role="region" aria-label="Next payment information">
          <Calendar className="h-4 w-4 text-ajo-primary" aria-hidden="true" />
          <span className="text-muted-foreground">Next Payment:</span>
          <time 
            className="font-medium text-foreground"
            dateTime={group.nextPaymentDate.toISOString()}
            aria-label={`Next payment due on ${formatDate(group.nextPaymentDate)}`}
          >
            {formatDate(group.nextPaymentDate)}
          </time>
        </div>
        
        {/* Progress indicator for current status */}
        {group.userStatus === 'current' && (
          <div className="space-y-2" role="region" aria-labelledby={progressId}>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span id={progressId}>Collection Progress</span>
              <span>Active</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} aria-label="Collection progress: 75% complete">
              <div 
                className="bg-ajo-primary h-2 rounded-full transition-all duration-300"
                style={{ width: '75%' }}
                aria-hidden="true"
              />
            </div>
            <span className="sr-only">Collection is 75% complete</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}