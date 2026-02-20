import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";
import { ArrowLeft, Users, Shield, TrendingUp } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-ajo-primary/5">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-ajo-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-ajo-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Link>
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left side - Form */}
        <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>

        {/* Right side - Feature showcase (hidden on mobile) */}
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:px-8">
          <div className="max-w-md space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                Join the Ajo Community
              </h2>
              <p className="text-muted-foreground">
                Thousands of people are already building wealth together through traditional ajo savings.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-ajo-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-ajo-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Community Driven</h3>
                  <p className="text-sm text-muted-foreground">
                    Save together with trusted members in your community
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-ajo-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-ajo-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Secure & Trusted</h3>
                  <p className="text-sm text-muted-foreground">
                    Your money is safe with our secure platform and trusted system
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-ajo-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-ajo-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Guaranteed Returns</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive your payout when it's your turn in the rotation
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-ajo-primary/5 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-ajo-primary mb-2">₦50M+</div>
              <div className="text-sm text-muted-foreground">Total amount saved by our community</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}