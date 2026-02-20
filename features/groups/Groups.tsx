"use client"

import * as React from "react"
import { Container } from "@/components/ui/layout"
import { AuthenticatedNavigation } from "@/components/ui/authenticated-navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Plus, 
  Users, 
  Search, 
  Filter,
  Calendar,
  DollarSign,
  MapPin,
  Clock,
  Star,
  UserCheck,
  AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AjoGroup {
  id: string
  name: string
  description: string
  totalMembers: number
  maxMembers: number
  contributionAmount: number
  frequency: 'weekly' | 'monthly'
  nextMeeting: Date
  location: string
  isPublic: boolean
  rating: number
  status: 'active' | 'recruiting' | 'full' | 'completed'
  userRole?: 'member' | 'admin' | 'pending'
}

interface GroupsProps {
  className?: string
}

// Mock data
const mockGroups: AjoGroup[] = [
  {
    id: "1",
    name: "Family Savings Circle",
    description: "A trusted family group focused on building wealth together through consistent monthly contributions.",
    totalMembers: 8,
    maxMembers: 10,
    contributionAmount: 50000,
    frequency: 'monthly',
    nextMeeting: new Date("2025-01-15"),
    location: "Lagos, Nigeria",
    isPublic: false,
    rating: 4.8,
    status: 'active',
    userRole: 'member'
  },
  {
    id: "2", 
    name: "Office Colleagues Ajo",
    description: "Professional colleagues saving together for various financial goals and emergency funds.",
    totalMembers: 12,
    maxMembers: 15,
    contributionAmount: 25000,
    frequency: 'weekly',
    nextMeeting: new Date("2025-01-20"),
    location: "Abuja, Nigeria",
    isPublic: true,
    rating: 4.5,
    status: 'active',
    userRole: 'admin'
  },
  {
    id: "3",
    name: "Young Entrepreneurs Hub",
    description: "A group of young entrepreneurs pooling resources to fund business ventures and personal development.",
    totalMembers: 6,
    maxMembers: 8,
    contributionAmount: 100000,
    frequency: 'monthly',
    nextMeeting: new Date("2025-02-01"),
    location: "Port Harcourt, Nigeria",
    isPublic: true,
    rating: 4.9,
    status: 'recruiting',
    userRole: 'pending'
  },
  {
    id: "4",
    name: "Community Development Fund",
    description: "Supporting local community projects and individual member financial goals through collective savings.",
    totalMembers: 20,
    maxMembers: 20,
    contributionAmount: 15000,
    frequency: 'weekly',
    nextMeeting: new Date("2025-01-25"),
    location: "Kano, Nigeria",
    isPublic: true,
    rating: 4.3,
    status: 'full'
  }
]

const availableGroups: AjoGroup[] = [
  {
    id: "5",
    name: "Tech Professionals Ajo",
    description: "Technology professionals saving for equipment upgrades, certifications, and career development.",
    totalMembers: 8,
    maxMembers: 12,
    contributionAmount: 75000,
    frequency: 'monthly',
    nextMeeting: new Date("2025-02-10"),
    location: "Lagos, Nigeria",
    isPublic: true,
    rating: 4.7,
    status: 'recruiting'
  },
  {
    id: "6",
    name: "Women Empowerment Circle",
    description: "Empowering women through financial literacy and collective savings for business and personal growth.",
    totalMembers: 15,
    maxMembers: 20,
    contributionAmount: 30000,
    frequency: 'weekly',
    nextMeeting: new Date("2025-01-30"),
    location: "Ibadan, Nigeria",
    isPublic: true,
    rating: 4.6,
    status: 'recruiting'
  }
]

interface GroupCardProps {
  group: AjoGroup
  showJoinButton?: boolean
  onJoin?: (groupId: string) => void
  onView?: (groupId: string) => void
}

function GroupCard({ group, showJoinButton = false, onJoin, onView }: GroupCardProps) {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-ajo-success/10 text-ajo-success border-ajo-success/20'
      case 'recruiting':
        return 'bg-ajo-primary/10 text-ajo-primary border-ajo-primary/20'
      case 'full':
        return 'bg-ajo-warning/10 text-ajo-warning border-ajo-warning/20'
      case 'completed':
        return 'bg-muted/50 text-muted-foreground border-muted'
      default:
        return 'bg-muted/50 text-muted-foreground border-muted'
    }
  }

  const getRoleColor = (role?: string) => {
    switch (role) {
      case 'admin':
        return 'bg-ajo-accent/10 text-ajo-accent border-ajo-accent/20'
      case 'member':
        return 'bg-ajo-success/10 text-ajo-success border-ajo-success/20'
      case 'pending':
        return 'bg-ajo-warning/10 text-ajo-warning border-ajo-warning/20'
      default:
        return ''
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow duration-200 focus-within:ring-2 focus-within:ring-ajo-primary focus-within:ring-offset-2">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold text-foreground">
              {group.name}
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
                getStatusColor(group.status)
              )}>
                {group.status === 'active' && <UserCheck className="h-3 w-3" />}
                {group.status === 'recruiting' && <Users className="h-3 w-3" />}
                {group.status === 'full' && <AlertCircle className="h-3 w-3" />}
                {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
              </div>
              {group.userRole && (
                <div className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
                  getRoleColor(group.userRole)
                )}>
                  {group.userRole.charAt(0).toUpperCase() + group.userRole.slice(1)}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-ajo-warning fill-current" />
            <span className="text-sm font-medium">{group.rating}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {group.description}
        </p>
        
        {/* Group Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Members:</span>
            <span className="font-medium text-foreground">
              {group.totalMembers}/{group.maxMembers}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Amount:</span>
            <span className="font-medium text-foreground">
              {formatCurrency(group.contributionAmount)}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Frequency:</span>
            <span className="font-medium text-foreground capitalize">
              {group.frequency}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Location:</span>
            <span className="font-medium text-foreground">
              {group.location}
            </span>
          </div>
        </div>
        
        {/* Next Meeting */}
        <div className="flex items-center gap-2 text-sm p-3 bg-muted/30 rounded-lg">
          <Calendar className="h-4 w-4 text-ajo-primary" />
          <span className="text-muted-foreground">Next Meeting:</span>
          <span className="font-medium text-foreground">
            {formatDate(group.nextMeeting)}
          </span>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView?.(group.id)}
            className="flex-1"
          >
            View Details
          </Button>
          {showJoinButton && group.status === 'recruiting' && (
            <Button
              size="sm"
              onClick={() => onJoin?.(group.id)}
              className="flex-1 bg-ajo-primary hover:bg-ajo-primary/90 text-ajo-primary-foreground"
            >
              Join Group
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function Groups({ className }: GroupsProps) {
  const [activeTab, setActiveTab] = React.useState<'my-groups' | 'available'>('my-groups')
  const [searchQuery, setSearchQuery] = React.useState('')

  const handleJoinGroup = (groupId: string) => {
    console.log('Join group:', groupId)
    // In a real app, this would make an API call
  }

  const handleViewGroup = (groupId: string) => {
    console.log('View group:', groupId)
    // In a real app, this would navigate to group details
  }

  const handleCreateGroup = () => {
    console.log('Create new group')
    // In a real app, this would navigate to group creation form
  }

  return (
    <main className={cn("min-h-screen bg-background", className)} role="main">
      <AuthenticatedNavigation />
      <Container size="xl" className="py-6 sm:py-8">
        <div className="space-y-6 lg:space-y-8">
          {/* Header */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Ajo Groups
              </h1>
              <p className="text-muted-foreground">
                Manage your groups and discover new savings opportunities.
              </p>
            </div>
            <Button
              onClick={handleCreateGroup}
              className="bg-ajo-primary hover:bg-ajo-primary/90 text-ajo-primary-foreground"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Group
            </Button>
          </header>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ajo-primary focus:border-transparent"
              />
            </div>
            <Button variant="outline" size="default">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Tabs */}
          <div className="border-b border-border">
            <nav className="flex space-x-8" aria-label="Group tabs">
              <button
                onClick={() => setActiveTab('my-groups')}
                className={cn(
                  "py-2 px-1 border-b-2 font-medium text-sm transition-colors",
                  activeTab === 'my-groups'
                    ? "border-ajo-primary text-ajo-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                )}
                aria-current={activeTab === 'my-groups' ? 'page' : undefined}
              >
                My Groups ({mockGroups.length})
              </button>
              <button
                onClick={() => setActiveTab('available')}
                className={cn(
                  "py-2 px-1 border-b-2 font-medium text-sm transition-colors",
                  activeTab === 'available'
                    ? "border-ajo-primary text-ajo-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                )}
                aria-current={activeTab === 'available' ? 'page' : undefined}
              >
                Available Groups ({availableGroups.length})
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {activeTab === 'my-groups' && (
              <section aria-labelledby="my-groups-heading">
                <h2 id="my-groups-heading" className="sr-only">My Groups</h2>
                {mockGroups.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {mockGroups.map((group) => (
                      <GroupCard
                        key={group.id}
                        group={group}
                        onView={handleViewGroup}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      No Groups Yet
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      You haven't joined any ajo groups yet. Start by creating or joining a group.
                    </p>
                    <Button
                      onClick={handleCreateGroup}
                      className="bg-ajo-primary hover:bg-ajo-primary/90 text-ajo-primary-foreground"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Group
                    </Button>
                  </div>
                )}
              </section>
            )}

            {activeTab === 'available' && (
              <section aria-labelledby="available-groups-heading">
                <h2 id="available-groups-heading" className="sr-only">Available Groups</h2>
                {availableGroups.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {availableGroups.map((group) => (
                      <GroupCard
                        key={group.id}
                        group={group}
                        showJoinButton={true}
                        onJoin={handleJoinGroup}
                        onView={handleViewGroup}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      No Available Groups
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      There are no available groups matching your criteria at the moment.
                    </p>
                    <Button
                      onClick={handleCreateGroup}
                      className="bg-ajo-primary hover:bg-ajo-primary/90 text-ajo-primary-foreground"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Group
                    </Button>
                  </div>
                )}
              </section>
            )}
          </div>
        </div>
      </Container>
    </main>
  )
}

export default Groups