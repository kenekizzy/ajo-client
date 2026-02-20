import { RegisterForm } from "@/components/auth/register-form";
import Link from "next/link";
import { ArrowLeft, Users, Shield, TrendingUp, Star } from "lucide-react";

export default function RegisterPage() {
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
        {/* Left side - Feature showcase (hidden on mobile) */}
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:px-8">
          <div className="max-w-md space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                Start Your Savings Journey
              </h2>
              <p className="text-muted-foreground">
                Join thousands of people building wealth together through traditional ajo savings.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-ajo-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-ajo-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Trusted Community</h3>
                  <p className="text-sm text-muted-foreground">
                    Join verified members in secure savings groups
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-ajo-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-ajo-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Safe & Secure</h3>
                  <p className="text-sm text-muted-foreground">
                    Your money and data are protected with bank-level security
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-ajo-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-ajo-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Proven Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Time-tested savings method with guaranteed returns
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-ajo-primary/5 rounded-lg p-6">
              <div className="flex items-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-ajo-primary text-ajo-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                "AjoConnect helped me save ₦500,000 in just 6 months. The community support is amazing!"
              </p>
              <div className="text-xs text-muted-foreground">
                <span className="font-medium">Sarah O.</span> • Lagos, Nigeria
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-background/50 rounded-lg p-4">
                <div className="text-xl font-bold text-ajo-primary mb-1">10K+</div>
                <div className="text-xs text-muted-foreground">Happy Members</div>
              </div>
              <div className="bg-background/50 rounded-lg p-4">
                <div className="text-xl font-bold text-ajo-primary mb-1">₦50M+</div>
                <div className="text-xs text-muted-foreground">Total Saved</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}