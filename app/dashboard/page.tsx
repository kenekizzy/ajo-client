import Dashboard from "@/features/dashboard/Dashboard"
import { ProtectedRoute } from "@/components/auth/route-guard"

export default function DashboardPage() {
  return (
    // <ProtectedRoute>
    //   <Dashboard />
    // </ProtectedRoute>
    <Dashboard />
  )
}

export const metadata = {
  title: "Dashboard - Ajo Pool",
  description: "Your ajo groups dashboard - track contributions, payments, and financial progress",
}