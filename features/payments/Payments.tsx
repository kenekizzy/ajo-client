"use client"

import * as React from "react"
import { Container } from "@/components/ui/layout"
import { AuthenticatedNavigation } from "@/components/ui/authenticated-navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Plus, 
  CreditCard, 
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Filter,
  Download,
  Search
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Payment {
  id: string
  groupId: string
  groupName: string
  amount: number
  type: 'contribution' | 'payout' | 'penalty'
  status: 'completed' | 'pending' | 'failed' | 'scheduled'
  date: Date
  dueDate?: Date
  method: 'bank_transfer' | 'card' | 'mobile_money' | 'cash'
  reference: string
  description?: string
}

interface PaymentSummary {
  totalContributions: number
  totalPayouts: number
  pendingPayments: number
  nextPaymentDue: Date | null
  nextPayoutExpected: Date | null
}

interface PaymentsProps {
  className?: string
}

// Mock data
const mockPayments: Payment[] = [
  {
    id: "1",
    groupId: "1",
    groupName: "Family Savings Circle",
    amount: 50000,
    type: 'contribution',
    status: 'completed',
    date: new Date("2024-12-15"),
    method: 'bank_transfer',
    reference: "TXN001234567",
    description: "Monthly contribution for December"
  },
  {
    id: "2",
    groupId: "2",
    groupName: "Office Colleagues Ajo",
    amount: 300000,
    type: 'payout',
    status: 'completed',
    date: new Date("2024-12-10"),
    method: 'bank_transfer',
    reference: "TXN001234568",
    description: "December payout - My turn"
  },
  {
    id: "3",
    groupId: "1",
    groupName: "Family Savings Circle",
    amount: 50000,
    type: 'contribution',
    status: 'pending',
    date: new Date("2025-01-15"),
    dueDate: new Date("2025-01-15"),
    method: 'bank_transfer',
    reference: "TXN001234569",
    description: "Monthly contribution for January"
  },
  {
    id: "4",
    groupId: "3",
    groupName: "Young Entrepreneurs Hub",
    amount: 100000,
    type: 'contribution',
    status: 'scheduled',
    date: new Date("2025-02-01"),
    dueDate: new Date("2025-02-01"),
    method: 'bank_transfer',
    reference: "TXN001234570",
    description: "Monthly contribution for February"
  },
  {
    id: "5",
    groupId: "2",
    groupName: "Office Colleagues Ajo",
    amount: 25000,
    type: 'contribution',
    status: 'failed',
    date: new Date("2024-11-20"),
    dueDate: new Date("2024-11-20"),
    method: 'card',
    reference: "TXN001234571",
    description: "Weekly contribution - Payment failed"
  }
]

const mockSummary: PaymentSummary = {
  totalContributions: 875000,
  totalPayouts: 300000,
  pendingPayments: 150000,
  nextPaymentDue: new Date("2025-01-15"),
  nextPayoutExpected: new Date("2025-02-15")
}

interface PaymentCardProps {
  payment: Payment
  onRetry?: (paymentId: string) => void
  onView?: (paymentId: string) => void
}

function PaymentCard({ payment, onRetry, onView }: PaymentCardProps) {
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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          icon: CheckCircle,
          className: 'bg-ajo-success/10 text-ajo-success border-ajo-success/20',
          label: 'Completed'
        }
      case 'pending':
        return {
          icon: Clock,
          className: 'bg-ajo-warning/10 text-ajo-warning border-ajo-warning/20',
          label: 'Pending'
        }
      case 'failed':
        return {
          icon: XCircle,
          className: 'bg-ajo-error/10 text-ajo-error border-ajo-error/20',
          label: 'Failed'
        }
      case 'scheduled':
        return {
          icon: Calendar,
          className: 'bg-ajo-primary/10 text-ajo-primary border-ajo-primary/20',
          label: 'Scheduled'
        }
      default:
        return {
          icon: AlertCircle,
          className: 'bg-muted/50 text-muted-foreground border-muted',
          label: 'Unknown'
        }
    }
  }

  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'contribution':
        return {
          icon: ArrowUpRight,
          className: 'text-ajo-error',
          label: 'Contribution',
          sign: '-'
        }
      case 'payout':
        return {
          icon: ArrowDownLeft,
          className: 'text-ajo-success',
          label: 'Payout',
          sign: '+'
        }
      case 'penalty':
        return {
          icon: AlertCircle,
          className: 'text-ajo-warning',
          label: 'Penalty',
          sign: '-'
        }
      default:
        return {
          icon: DollarSign,
          className: 'text-muted-foreground',
          label: 'Payment',
          sign: ''
        }
    }
  }

  const statusConfig = getStatusConfig(payment.status)
  const typeConfig = getTypeConfig(payment.type)
  const StatusIcon = statusConfig.icon
  const TypeIcon = typeConfig.icon

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={cn("p-2 rounded-full bg-muted/30", typeConfig.className)}>
              <TypeIcon className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                {typeConfig.label}
              </h3>
              <p className="text-sm text-muted-foreground">
                {payment.groupName}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className={cn("font-bold text-lg", typeConfig.className)}>
              {typeConfig.sign}{formatCurrency(payment.amount)}
            </p>
            <div className={cn(
              "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border",
              statusConfig.className
            )}>
              <StatusIcon className="h-3 w-3" />
              {statusConfig.label}
            </div>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date:</span>
            <span className="font-medium">{formatDate(payment.date)}</span>
          </div>
          {payment.dueDate && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Due Date:</span>
              <span className="font-medium">{formatDate(payment.dueDate)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Method:</span>
            <span className="font-medium capitalize">{payment.method.replace('_', ' ')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Reference:</span>
            <span className="font-mono text-xs">{payment.reference}</span>
          </div>
          {payment.description && (
            <div className="pt-2 border-t border-border">
              <p className="text-muted-foreground">{payment.description}</p>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView?.(payment.id)}
            className="flex-1"
          >
            View Details
          </Button>
          {payment.status === 'failed' && (
            <Button
              size="sm"
              onClick={() => onRetry?.(payment.id)}
              className="flex-1 bg-ajo-primary hover:bg-ajo-primary/90 text-ajo-primary-foreground"
            >
              Retry Payment
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function PaymentSummaryCard({ summary }: { summary: PaymentSummary }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }
  
  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A'
    return new Intl.DateTimeFormat('en-NG', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">
          Payment Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-ajo-success/5 border border-ajo-success/20">
            <div className="flex items-center gap-2 mb-2">
              <ArrowDownLeft className="h-4 w-4 text-ajo-success" />
              <span className="text-sm font-medium text-muted-foreground">Total Received</span>
            </div>
            <p className="text-2xl font-bold text-ajo-success">
              {formatCurrency(summary.totalPayouts)}
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-ajo-primary/5 border border-ajo-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUpRight className="h-4 w-4 text-ajo-primary" />
              <span className="text-sm font-medium text-muted-foreground">Total Contributed</span>
            </div>
            <p className="text-2xl font-bold text-ajo-primary">
              {formatCurrency(summary.totalContributions)}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-ajo-warning/5 border border-ajo-warning/20">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-ajo-warning" />
            <span className="text-sm font-medium text-muted-foreground">Pending Payments</span>
          </div>
          <p className="text-2xl font-bold text-ajo-warning">
            {formatCurrency(summary.pendingPayments)}
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Next Payment Due:</span>
            <span className="font-medium text-foreground">
              {formatDate(summary.nextPaymentDue)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Next Payout Expected:</span>
            <span className="font-medium text-foreground">
              {formatDate(summary.nextPayoutExpected)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function Payments({ className }: PaymentsProps) {
  const [activeTab, setActiveTab] = React.useState<'all' | 'contributions' | 'payouts'>('all')
  const [searchQuery, setSearchQuery] = React.useState('')

  const handleMakePayment = () => {
    console.log('Make new payment')
    // In a real app, this would navigate to payment form
  }

  const handleRetryPayment = (paymentId: string) => {
    console.log('Retry payment:', paymentId)
    // In a real app, this would retry the failed payment
  }

  const handleViewPayment = (paymentId: string) => {
    console.log('View payment:', paymentId)
    // In a real app, this would show payment details
  }

  const handleExportPayments = () => {
    console.log('Export payments')
    // In a real app, this would export payment history
  }

  const filteredPayments = mockPayments.filter(payment => {
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'contributions' && payment.type === 'contribution') ||
      (activeTab === 'payouts' && payment.type === 'payout')
    
    const matchesSearch = payment.groupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesTab && matchesSearch
  })

  return (
    <main className={cn("min-h-screen bg-background", className)} role="main">
      <AuthenticatedNavigation />
      <Container size="xl" className="py-6 sm:py-8">
        <div className="space-y-6 lg:space-y-8">
          {/* Header */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Payments
              </h1>
              <p className="text-muted-foreground">
                Track your contributions, payouts, and payment history.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleExportPayments}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button
                onClick={handleMakePayment}
                className="bg-ajo-primary hover:bg-ajo-primary/90 text-ajo-primary-foreground"
              >
                <Plus className="h-4 w-4 mr-2" />
                Make Payment
              </Button>
            </div>
          </header>

          {/* Summary and Search */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search payments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ajo-primary focus:border-transparent"
                />
              </div>

              {/* Tabs */}
              <div className="border-b border-border mb-6">
                <nav className="flex space-x-8" aria-label="Payment tabs">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={cn(
                      "py-2 px-1 border-b-2 font-medium text-sm transition-colors",
                      activeTab === 'all'
                        ? "border-ajo-primary text-ajo-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                    )}
                  >
                    All Payments ({mockPayments.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('contributions')}
                    className={cn(
                      "py-2 px-1 border-b-2 font-medium text-sm transition-colors",
                      activeTab === 'contributions'
                        ? "border-ajo-primary text-ajo-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                    )}
                  >
                    Contributions ({mockPayments.filter(p => p.type === 'contribution').length})
                  </button>
                  <button
                    onClick={() => setActiveTab('payouts')}
                    className={cn(
                      "py-2 px-1 border-b-2 font-medium text-sm transition-colors",
                      activeTab === 'payouts'
                        ? "border-ajo-primary text-ajo-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                    )}
                  >
                    Payouts ({mockPayments.filter(p => p.type === 'payout').length})
                  </button>
                </nav>
              </div>

              {/* Payment List */}
              <div className="space-y-4">
                {filteredPayments.length > 0 ? (
                  filteredPayments.map((payment) => (
                    <PaymentCard
                      key={payment.id}
                      payment={payment}
                      onRetry={handleRetryPayment}
                      onView={handleViewPayment}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      No Payments Found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {searchQuery ? 'No payments match your search criteria.' : 'You haven\'t made any payments yet.'}
                    </p>
                    {!searchQuery && (
                      <Button
                        onClick={handleMakePayment}
                        className="bg-ajo-primary hover:bg-ajo-primary/90 text-ajo-primary-foreground"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Make Your First Payment
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Summary Sidebar */}
            <div>
              <PaymentSummaryCard summary={mockSummary} />
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}

export default Payments