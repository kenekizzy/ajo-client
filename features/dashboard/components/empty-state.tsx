"use client"

import * as React from "react"
import { Users, Plus, ArrowRight, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  className?: string
  onJoinGroup?: () => void
  onCreateGroup?: () => void
}

export function EmptyState({ className, onJoinGroup, onCreateGroup }: EmptyStateProps) {
  const handleJoinGroup = () => {
    if (onJoinGroup) {
      onJoinGroup()
    } else {
      // In a real app, this would use Next.js router
      console.log("Navigate to: /groups/join")
    }
  }
  
  const handleCreateGroup = () => {
    if (onCreateGroup) {
      onCreateGroup()
    } else {
      // In a real app, this would use Next.js router
      console.log("Navigate to: /groups/create")
    }
  }
  
  return (
    <Card className={cn("border-dashed border-2 border-muted-foreground/20", className)}>
      <CardContent className="flex flex-col items-center justify-center py-12 sm:py-16 px-4 sm:px-8 text-center">
        {/* Illustration */}
        <div className="relative mb-6 sm:mb-8">
          <div className="p-4 sm:p-6 rounded-full bg-gradient-to-br from-ajo-primary/10 to-ajo-accent/10 border border-ajo-primary/20">
            <Users className="h-12 w-12 sm:h-16 sm:w-16 text-ajo-primary" />
          </div>
          <div className="absolute -top-2 -right-2 p-1 rounded-full bg-ajo-accent/20">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-ajo-accent" />
          </div>
        </div>
        
        {/* Content */}
        <div className="space-y-3 sm:space-y-4 max-w-md">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground">
            Welcome to Your Ajo Journey!
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            You haven&apos;t joined any ajo groups yet. Start building your financial future by joining an existing group or creating your own.
          </p>
        </div>
        
        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 sm:my-8 w-full max-w-2xl">
          <div className="text-center p-3 sm:p-4 rounded-lg bg-muted/30">
            <div className="p-2 rounded-full bg-ajo-primary/10 w-fit mx-auto mb-2">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-ajo-primary" />
            </div>
            <h4 className="font-semibold text-xs sm:text-sm text-foreground mb-1">
              Community Savings
            </h4>
            <p className="text-xs text-muted-foreground">
              Save together with trusted friends and family
            </p>
          </div>
          
          <div className="text-center p-3 sm:p-4 rounded-lg bg-muted/30">
            <div className="p-2 rounded-full bg-ajo-accent/10 w-fit mx-auto mb-2">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-ajo-accent" />
            </div>
            <h4 className="font-semibold text-xs sm:text-sm text-foreground mb-1">
              Regular Payouts
            </h4>
            <p className="text-xs text-muted-foreground">
              Receive lump sum payments on your turn
            </p>
          </div>
          
          <div className="text-center p-3 sm:p-4 rounded-lg bg-muted/30 sm:col-span-3 lg:col-span-1">
            <div className="p-2 rounded-full bg-ajo-success/10 w-fit mx-auto mb-2">
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-ajo-success" />
            </div>
            <h4 className="font-semibold text-xs sm:text-sm text-foreground mb-1">
              Financial Goals
            </h4>
            <p className="text-xs text-muted-foreground">
              Achieve your savings targets faster
            </p>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-sm">
          <Button
            onClick={handleJoinGroup}
            className="flex-1 bg-ajo-primary hover:bg-ajo-primary/90 text-ajo-primary-foreground min-h-[44px]"
          >
            <Users className="h-4 w-4 mr-2" />
            Join a Group
          </Button>
          
          <Button
            variant="outline"
            onClick={handleCreateGroup}
            className="flex-1 border-ajo-primary/20 hover:bg-ajo-primary/5 hover:border-ajo-primary/40 min-h-[44px]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Group
          </Button>
        </div>
        
        {/* Help Text */}
        <div className="mt-6 sm:mt-8 p-3 sm:p-4 rounded-lg bg-ajo-primary/5 border border-ajo-primary/10 max-w-md">
          <p className="text-sm text-ajo-primary font-medium mb-1">
            New to Ajo?
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Ajo is a traditional rotating savings system where members contribute regularly and take turns receiving the total collection.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}