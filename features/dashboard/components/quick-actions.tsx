"use client"

import * as React from "react"
import { Plus, Users, CreditCard, Settings, BarChart3, Bell } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface QuickAction {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  variant?: 'primary' | 'secondary' | 'outline'
  disabled?: boolean
}

interface QuickActionsProps {
  className?: string
}

const quickActions: QuickAction[] = [
  {
    title: "Join Group",
    description: "Find and join an ajo group",
    icon: Plus,
    href: "/groups/join",
    variant: "primary"
  },
  {
    title: "Create Group",
    description: "Start your own ajo group",
    icon: Users,
    href: "/groups/create",
    variant: "secondary"
  },
  {
    title: "Make Payment",
    description: "Pay your contribution",
    icon: CreditCard,
    href: "/payments/make",
    variant: "outline"
  },
  {
    title: "View Analytics",
    description: "Track your savings progress",
    icon: BarChart3,
    href: "/analytics",
    variant: "outline"
  },
  {
    title: "Notifications",
    description: "Check payment reminders",
    icon: Bell,
    href: "/notifications",
    variant: "outline"
  },
  {
    title: "Settings",
    description: "Manage your account",
    icon: Settings,
    href: "/settings",
    variant: "outline"
  }
]

interface ActionButtonProps {
  action: QuickAction
  onClick?: () => void
}

function ActionButton({ action, onClick }: ActionButtonProps) {
  const Icon = action.icon
  
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      // In a real app, this would use Next.js router
      console.log(`Navigate to: ${action.href}`)
    }
  }
  
  const getButtonVariant = () => {
    switch (action.variant) {
      case 'primary':
        return 'default'
      case 'secondary':
        return 'secondary'
      case 'outline':
      default:
        return 'outline'
    }
  }
  
  return (
    <Button
      variant={getButtonVariant()}
      className={cn(
        "h-auto p-3 sm:p-4 flex flex-col items-center gap-2 sm:gap-3 text-center transition-all duration-200 min-h-[80px] sm:min-h-[100px]",
        "hover:scale-105 hover:shadow-md active:scale-95",
        action.variant === 'primary' && "bg-ajo-primary hover:bg-ajo-primary/90 text-ajo-primary-foreground",
        action.disabled && "opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none"
      )}
      onClick={handleClick}
      disabled={action.disabled}
    >
      <div className={cn(
        "p-2 rounded-full transition-colors duration-200",
        action.variant === 'primary' && "bg-ajo-primary-foreground/10",
        action.variant === 'secondary' && "bg-ajo-accent/10",
        action.variant === 'outline' && "bg-ajo-primary/10"
      )}>
        <Icon className={cn(
          "h-5 w-5 sm:h-6 sm:w-6",
          action.variant === 'primary' && "text-ajo-primary-foreground",
          action.variant === 'secondary' && "text-ajo-accent",
          action.variant === 'outline' && "text-ajo-primary"
        )} />
      </div>
      
      <div className="space-y-1">
        <p className="font-semibold text-xs sm:text-sm leading-none">
          {action.title}
        </p>
        <p className="text-xs text-muted-foreground leading-tight hidden sm:block">
          {action.description}
        </p>
      </div>
    </Button>
  )
}

export function QuickActions({ className }: QuickActionsProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">
          Quick Actions
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-3 2xl:grid-cols-6 gap-3 sm:gap-4">
          {quickActions.map((action, index) => (
            <ActionButton
              key={index}
              action={action}
            />
          ))}
        </div>
        
        {/* Featured Actions */}
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-sm font-medium text-muted-foreground mb-3">
            Popular Actions
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="justify-start gap-3 h-auto p-4 hover:bg-ajo-primary/5 hover:border-ajo-primary/20 min-h-[60px]"
            >
              <div className="p-2 rounded-full bg-ajo-primary/10 flex-shrink-0">
                <Plus className="h-4 w-4 text-ajo-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium text-sm">Quick Join</p>
                <p className="text-xs text-muted-foreground">Join a group with code</p>
              </div>
            </Button>
            
            <Button
              variant="outline"
              className="justify-start gap-3 h-auto p-4 hover:bg-ajo-accent/5 hover:border-ajo-accent/20 min-h-[60px]"
            >
              <div className="p-2 rounded-full bg-ajo-accent/10 flex-shrink-0">
                <CreditCard className="h-4 w-4 text-ajo-accent" />
              </div>
              <div className="text-left">
                <p className="font-medium text-sm">Auto Pay</p>
                <p className="text-xs text-muted-foreground">Set up automatic payments</p>
              </div>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}