'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight, Users, DollarSign, Shield, Sparkles, Star, CheckCircle } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export function Hero({ onGetStarted, onLogin }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-ajo-primary/5 overflow-hidden">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-ajo-primary/20 to-ajo-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-ajo-accent/20 to-ajo-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-ajo-primary/5 rounded-full blur-2xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-10">
          {/* Enhanced main heading */}
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-2 bg-ajo-primary/10 rounded-full px-4 py-2 border border-ajo-primary/20">
                <Sparkles className="w-4 h-4 text-ajo-primary" />
                <span className="text-sm font-medium text-ajo-primary">Trusted by 10,000+ savers</span>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
              <span className="text-foreground">Build Wealth Together</span>
              <br />
              <span className="bg-gradient-to-r from-ajo-primary via-ajo-primary to-ajo-primary/80 bg-clip-text text-transparent">
                with Ajo Savings
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Join trusted savings groups where members pool money together and take turns receiving payouts. 
              A time-tested way to save, invest, and support your community.
            </p>
          </div>

          {/* Enhanced key benefits */}
          <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
            <div className="flex items-center gap-3 bg-background/50 backdrop-blur-sm rounded-full px-4 py-2 border border-border/50">
              <div className="w-8 h-8 bg-ajo-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-ajo-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">Community-Driven</span>
            </div>
            <div className="flex items-center gap-3 bg-background/50 backdrop-blur-sm rounded-full px-4 py-2 border border-border/50">
              <div className="w-8 h-8 bg-ajo-primary/10 rounded-full flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-ajo-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">Guaranteed Returns</span>
            </div>
            <div className="flex items-center gap-3 bg-background/50 backdrop-blur-sm rounded-full px-4 py-2 border border-border/50">
              <div className="w-8 h-8 bg-ajo-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-ajo-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">Bank-Level Security</span>
            </div>
          </div>

          {/* Enhanced call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-ajo-primary to-ajo-primary/90 hover:from-ajo-primary/90 hover:to-ajo-primary text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group border-0"
            >
              Start Saving Today
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              onClick={onLogin}
              variant="outline"
              size="lg"
              className="border-2 border-ajo-primary/30 text-ajo-primary hover:bg-ajo-primary hover:text-white px-8 py-4 text-lg font-semibold backdrop-blur-sm bg-background/50 transition-all duration-300"
            >
              Sign In
            </Button>
          </div>

          {/* Social proof */}
          <div className="pt-8">
            <div className="flex items-center justify-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">4.9/5 from 2,000+ reviews</span>
            </div>
          </div>

          {/* Enhanced trust indicators */}
          <div className="pt-12 space-y-6">
            <p className="text-sm text-muted-foreground font-medium">Trusted by thousands of savers across Africa</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-ajo-primary to-ajo-primary/80 bg-clip-text text-transparent">
                  10K+
                </div>
                <div className="text-sm text-muted-foreground font-medium">Active Members</div>
              </div>
              
              <div className="text-center space-y-2">
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-ajo-primary to-ajo-primary/80 bg-clip-text text-transparent">
                  ₦50M+
                </div>
                <div className="text-sm text-muted-foreground font-medium">Total Saved</div>
              </div>
              
              <div className="text-center space-y-2">
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-ajo-primary to-ajo-primary/80 bg-clip-text text-transparent">
                  500+
                </div>
                <div className="text-sm text-muted-foreground font-medium">Active Groups</div>
              </div>
            </div>

            {/* Quick benefits list */}
            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-ajo-success" />
                <span>No hidden fees</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-ajo-success" />
                <span>Start with as little as ₦5,000</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-ajo-success" />
                <span>24/7 customer support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}