"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function DevLoginPage() {
  const router = useRouter()

  const handleDevLogin = async () => {
    try {
      const result = await signIn("credentials", {
        email: "test@example.com",
        password: "password123",
        redirect: false,
      })

      if (result?.ok) {
        router.push("/dashboard")
      } else {
        console.error("Login failed:", result?.error)
      }
    } catch (error) {
      console.error("Login error:", error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Development Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Quick login for development purposes
          </p>
          <Button 
            onClick={handleDevLogin}
            className="w-full bg-ajo-primary hover:bg-ajo-primary/90"
          >
            Login as Test User
          </Button>
          <div className="text-xs text-muted-foreground text-center space-y-1">
            <p>Email: test@example.com</p>
            <p>Password: password123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}