"use client"

import * as React from "react"
import { Container } from "@/components/ui/layout"
import { AuthenticatedNavigation } from "@/components/ui/authenticated-navigation"
import {
    AjoGroupCard,
    FinancialSummary,
    QuickActions,
    EmptyState
} from "./components"
import { cn } from "@/lib/utils"

// Mock data types (in a real app, these would come from API/database)
interface AjoGroup {
    id: string
    name: string
    totalMembers: number
    contributionAmount: number
    nextPaymentDate: Date
    userStatus: 'current' | 'pending' | 'completed'
}

interface FinancialSummaryData {
    totalContributions: number
    totalReceived: number
    pendingAmount: number
    nextPayoutDate?: Date
}

interface DashboardProps {
    className?: string
}

// Mock data - in a real app, this would come from props or API calls
const mockGroups: AjoGroup[] = [
    {
        id: "1",
        name: "Family Savings Circle",
        totalMembers: 8,
        contributionAmount: 50000,
        nextPaymentDate: new Date("2025-01-15"),
        userStatus: "current"
    },
    {
        id: "2",
        name: "Office Colleagues Ajo",
        totalMembers: 12,
        contributionAmount: 25000,
        nextPaymentDate: new Date("2025-01-20"),
        userStatus: "pending"
    },
    {
        id: "3",
        name: "Friends Investment Group",
        totalMembers: 6,
        contributionAmount: 100000,
        nextPaymentDate: new Date("2025-02-01"),
        userStatus: "completed"
    }
]

const mockFinancialSummary: FinancialSummaryData = {
    totalContributions: 875000,
    totalReceived: 600000,
    pendingAmount: 50000,
    nextPayoutDate: new Date("2025-02-15")
}

interface DashboardContentProps {
    groups: AjoGroup[]
    financialSummary: FinancialSummaryData
    isLoading?: boolean
}

function DashboardContent({ groups, financialSummary, isLoading }: DashboardContentProps) {
    if (isLoading) {
        return (
            <div className="space-y-8" role="status" aria-live="polite" aria-label="Loading dashboard content">
                {/* Loading skeleton */}
                <div className="animate-pulse">
                    <div className="h-8 bg-muted rounded w-1/3 mb-6" aria-hidden="true"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-48 bg-muted rounded-lg" aria-hidden="true"></div>
                            ))}
                        </div>
                        <div className="space-y-4">
                            <div className="h-96 bg-muted rounded-lg" aria-hidden="true"></div>
                            <div className="h-48 bg-muted rounded-lg" aria-hidden="true"></div>
                        </div>
                    </div>
                </div>
                <span className="sr-only">Loading your dashboard information...</span>
            </div>
        )
    }

    if (groups.length === 0) {
        return (
            <div className="space-y-8">
                <header>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        Welcome to Your Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                        Start your ajo journey by joining or creating a group.
                    </p>
                </header>

                <EmptyState />
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <header>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                    Dashboard
                </h1>
                <p className="text-muted-foreground">
                    Welcome back! Here's an overview of your ajo groups and financial progress.
                </p>
            </header>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                {/* Left Column - Groups and Quick Actions */}
                <div className="xl:col-span-2 space-y-6 lg:space-y-8">
                    {/* Ajo Groups */}
                    <section aria-labelledby="groups-heading">
                        <h2 id="groups-heading" className="text-xl lg:text-2xl font-semibold text-foreground mb-4 lg:mb-6">
                            Your Ajo Groups ({groups.length})
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6" role="list" aria-label="Your ajo groups">
                            {groups.map((group) => (
                                <div key={group.id} role="listitem">
                                    <AjoGroupCard group={group} />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Quick Actions */}
                    <QuickActions />
                </div>

                {/* Right Column - Financial Summary */}
                <aside className="space-y-6" aria-label="Financial information and tips">
                    <FinancialSummary summary={financialSummary} />

                    {/* Additional Info Card */}
                    <div className="p-4 sm:p-6 rounded-lg bg-gradient-to-br from-ajo-primary/5 to-ajo-accent/5 border border-ajo-primary/10" role="complementary" aria-labelledby="tip-heading">
                        <h3 id="tip-heading" className="font-semibold text-foreground mb-2">
                            💡 Tip of the Day
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Set up automatic payments to never miss a contribution deadline.
                            This helps maintain trust within your ajo group.
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export function Dashboard({ className }: DashboardProps) {
    // In a real app, you would fetch this data from an API
    const [isLoading, setIsLoading] = React.useState(true)
    const [groups, setGroups] = React.useState<AjoGroup[]>([])
    const [financialSummary, setFinancialSummary] = React.useState<FinancialSummaryData | null>(null)

    React.useEffect(() => {
        // Simulate API call
        const fetchData = async () => {
            setIsLoading(true)

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Set mock data
            setGroups(mockGroups)
            setFinancialSummary(mockFinancialSummary)
            setIsLoading(false)
        }

        fetchData()
    }, [])

    return (
        <div className={cn("min-h-screen bg-background", className)}>
            <AuthenticatedNavigation />
            <Container size="xl" className="py-8">
                <DashboardContent
                    groups={groups}
                    financialSummary={financialSummary || {
                        totalContributions: 0,
                        totalReceived: 0,
                        pendingAmount: 0
                    }}
                    isLoading={isLoading}
                />
            </Container>
        </div>
    )
}

export default Dashboard