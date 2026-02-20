'use client';

import { useEffect, useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";

interface ClientNavigationProps {
  navigationItems: Array<{ label: string; href: string }>;
  onGetStarted: () => void;
  onLogin: () => void;
}

export function ClientNavigation({ navigationItems, onGetStarted, onLogin }: ClientNavigationProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-ajo-primary rounded-lg flex items-center justify-center">
                <span className="text-ajo-primary-foreground font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-ajo-primary">Ajo Loop</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" className="text-muted-foreground">
                Sign In
              </Button>
              <Button className="bg-ajo-primary hover:bg-ajo-primary/90 text-ajo-primary-foreground">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Navigation
      items={navigationItems}
      logo={
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-ajo-primary rounded-lg flex items-center justify-center">
            <span className="text-ajo-primary-foreground font-bold text-lg">A</span>
          </div>
          <span className="text-xl font-bold text-ajo-primary">Ajo Loop</span>
        </div>
      }
      actions={
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            onClick={onLogin}
            className="text-muted-foreground hover:text-foreground"
          >
            Sign In
          </Button>
          <Button 
            onClick={onGetStarted}
            className="bg-ajo-primary hover:bg-ajo-primary/90 text-ajo-primary-foreground"
          >
            Get Started
          </Button>
        </div>
      }
    />
  );
}