'use client';

import { 
  Users, 
  DollarSign, 
  Shield, 
  Calendar, 
  TrendingUp, 
  Heart,
  Clock,
  CheckCircle,
  Smartphone
} from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const features: Feature[] = [
  {
    title: "Community-Driven Savings",
    description: "Join trusted groups of friends, family, or colleagues who save together and support each other's financial goals.",
    icon: Users,
  },
  {
    title: "Guaranteed Payouts",
    description: "Every member gets their turn to receive the full pool amount. No banks, no interest rates, just guaranteed returns.",
    icon: DollarSign,
  },
  {
    title: "Secure & Transparent",
    description: "Track all contributions, payments, and group activities in real-time. Complete transparency for peace of mind.",
    icon: Shield,
  },
  {
    title: "Flexible Scheduling",
    description: "Choose weekly or monthly contribution cycles that work for your group. Set your own amounts and payment dates.",
    icon: Calendar,
  },
  {
    title: "Build Credit History",
    description: "Consistent participation in ajo groups helps establish your financial reliability and creditworthiness.",
    icon: TrendingUp,
  },
  {
    title: "Strengthen Relationships",
    description: "Ajo brings people together, building trust and stronger bonds within your community through shared financial goals.",
    icon: Heart,
  },
  {
    title: "No Waiting Periods",
    description: "Start saving immediately. Join existing groups or create new ones and begin your wealth-building journey today.",
    icon: Clock,
  },
  {
    title: "Proven Success",
    description: "Ajo has helped millions of people save money and achieve their financial goals for generations across cultures.",
    icon: CheckCircle,
  },
  {
    title: "Mobile-First Design",
    description: "Manage your savings on the go with our intuitive mobile app. Make payments, track progress, and stay connected.",
    icon: Smartphone,
  },
];

export function Features() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Why Choose Ajo Savings?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Experience the power of collective savings with features designed to make your financial journey 
            secure, transparent, and rewarding.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-6 bg-card border border-border rounded-xl hover:shadow-lg hover:shadow-ajo-primary/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Icon */}
                <div className="w-12 h-12 bg-ajo-primary/10 rounded-lg flex items-center justify-center group-hover:bg-ajo-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-ajo-primary" />
                </div>
                
                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-ajo-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-ajo-primary/10 rounded-full">
            <CheckCircle className="w-5 h-5 text-ajo-primary" />
            <span className="text-ajo-primary font-medium">
              Join thousands who are already building wealth together
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}