"use client"

import * as React from "react"
import { Container } from "@/components/ui/layout"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HomeProps {
  className?: string
}

export function Home({ className }: HomeProps) {
  return (
    <main className={cn("min-h-screen bg-background", className)} role="main">
      <Container size="xl" className="py-6 sm:py-8 lg:py-12">
        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
          {/* Hero Section */}
          <section className="text-center space-y-6 sm:space-y-8" aria-labelledby="hero-heading">
            <h1 
              id="hero-heading"
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight"
            >
              Welcome to Ajo Pool
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-2xl lg:max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
              Join the traditional rotating savings system that helps you save money with your community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 sm:px-0" role="group" aria-label="Main actions">
              <Button 
                size="lg"
                className="w-full sm:w-auto bg-ajo-primary hover:bg-ajo-primary/90 text-ajo-primary-foreground min-h-[44px] px-8 focus:ring-2 focus:ring-ajo-primary focus:ring-offset-2"
                aria-describedby="get-started-description"
              >
                Get Started
              </Button>
              <span id="get-started-description" className="sr-only">
                Begin your ajo savings journey by creating an account
              </span>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto border-ajo-primary/20 hover:bg-ajo-primary/5 min-h-[44px] px-8 focus:ring-2 focus:ring-ajo-primary focus:ring-offset-2"
                aria-describedby="learn-more-description"
              >
                Learn More
              </Button>
              <span id="learn-more-description" className="sr-only">
                Discover more about how ajo savings groups work
              </span>
            </div>
          </section>

          {/* Features Section */}
          <section aria-labelledby="features-heading">
            <h2 id="features-heading" className="sr-only">
              Key Features of Ajo Pool
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 px-4 sm:px-0">
              <article className="text-center space-y-4 p-6 rounded-lg hover:bg-muted/30 transition-colors focus-within:ring-2 focus-within:ring-ajo-primary focus-within:ring-offset-2">
                <div className="p-4 rounded-full bg-ajo-primary/10 w-fit mx-auto" aria-hidden="true">
                  <div className="w-8 h-8 bg-ajo-primary rounded" role="img" aria-label="Community savings icon"></div>
                </div>
                <h3 className="text-xl lg:text-2xl font-semibold text-foreground">
                  Community Savings
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Save together with trusted friends, family, and colleagues in rotating groups.
                </p>
              </article>

              <article className="text-center space-y-4 p-6 rounded-lg hover:bg-muted/30 transition-colors focus-within:ring-2 focus-within:ring-ajo-primary focus-within:ring-offset-2">
                <div className="p-4 rounded-full bg-ajo-accent/10 w-fit mx-auto" aria-hidden="true">
                  <div className="w-8 h-8 bg-ajo-accent rounded" role="img" aria-label="Regular payouts icon"></div>
                </div>
                <h3 className="text-xl lg:text-2xl font-semibold text-foreground">
                  Regular Payouts
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Receive lump sum payments when it's your turn to collect from the group.
                </p>
              </article>

              <article className="text-center space-y-4 p-6 rounded-lg hover:bg-muted/30 transition-colors focus-within:ring-2 focus-within:ring-ajo-primary focus-within:ring-offset-2 sm:col-span-2 lg:col-span-1">
                <div className="p-4 rounded-full bg-ajo-success/10 w-fit mx-auto" aria-hidden="true">
                  <div className="w-8 h-8 bg-ajo-success rounded" role="img" aria-label="Financial goals icon"></div>
                </div>
                <h3 className="text-xl lg:text-2xl font-semibold text-foreground">
                  Financial Goals
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Achieve your savings targets faster with the discipline of group commitment.
                </p>
              </article>
            </div>
          </section>
        </div>
      </Container>
    </main>
  )
}

export default Home