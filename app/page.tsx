
'use client';

import { useRouter } from "next/navigation";
import { useAuth } from "@/stores/auth-context";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Hero, Features, Testimonials, ClientNavigation } from "@/components/landing";
import { AuthLoading } from "@/components/ui/loading";

// Navigation items for landing page
const navigationItems = [
  { label: "Features", href: "#features" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "About", href: "#about" },
];

export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect authenticated users to dashboard (Requirement 1.5)
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return <AuthLoading message="Loading..." />;
  }

  // Show loading while redirecting authenticated users
  if (isAuthenticated) {
    return <AuthLoading message="Redirecting to dashboard..." />;
  }

  const handleGetStarted = () => {
    router.push("/register");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleSmoothScroll = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <ClientNavigation
        navigationItems={navigationItems}
        onGetStarted={handleGetStarted}
        onLogin={handleLogin}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero onGetStarted={handleGetStarted} onLogin={handleLogin} />

        {/* Features Section */}
        <section id="features">
          <Features />
        </section>

        {/* Testimonials Section */}
        <section id="testimonials">
          <Testimonials />
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-ajo-primary text-ajo-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Ready to Start Your Savings Journey?
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Join thousands of people who are already building wealth together through traditional ajo savings. 
              Start today and take control of your financial future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handleGetStarted}
                size="lg"
                variant="secondary"
                className="bg-white text-ajo-primary hover:bg-white/90 px-8 py-3 text-lg font-semibold"
              >
                Create Your Account
              </Button>
              <Button 
                onClick={handleLogin}
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-ajo-primary px-8 py-3 text-lg font-semibold"
              >
                Sign In
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-ajo-secondary text-ajo-secondary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and description */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-ajo-primary rounded-lg flex items-center justify-center">
                  <span className="text-ajo-primary-foreground font-bold text-lg">A</span>
                </div>
                <span className="text-xl font-bold">Ajo Loop</span>
              </div>
              <p className="text-sm opacity-80">
                Building wealth together through traditional ajo savings. 
                Trusted by thousands across Africa and beyond.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#features" className="hover:opacity-100 transition-opacity">Features</a></li>
                <li><a href="#testimonials" className="hover:opacity-100 transition-opacity">Testimonials</a></li>
                <li><a href="/register" className="hover:opacity-100 transition-opacity">Get Started</a></li>
                <li><a href="/login" className="hover:opacity-100 transition-opacity">Sign In</a></li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3 className="font-semibold">Support</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#" className="hover:opacity-100 transition-opacity">Help Center</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Contact Us</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="font-semibold">Contact</h3>
              <div className="space-y-2 text-sm opacity-80">
                <p>support@ajoloop.com</p>
                <p>+234 (0) 123 456 7890</p>
                <p>Lagos, Nigeria</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-60">
            <p>&copy; 2024 Ajo Loop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
