"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { ThemeToggle } from "./theme-toggle"

interface NavigationItem {
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

interface NavigationProps {
  items: NavigationItem[]
  logo?: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

const Navigation = React.forwardRef<HTMLElement, NavigationProps>(
  ({ items, logo, actions, className }, ref) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
    const pathname = usePathname()

    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const closeMobileMenu = () => {
      setIsMobileMenuOpen(false)
    }

    return (
      <nav
        ref={ref}
        className={cn(
          "sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          className
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              {logo && (
                <Link 
                  href="/" 
                  className="flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
                  onClick={closeMobileMenu}
                >
                  {logo}
                </Link>
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              {items.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              <ThemeToggle />
              {actions}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 md:hidden">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggleMobileMenu()
                  }
                }}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div
              id="mobile-menu"
              className="md:hidden border-t border-border bg-background"
              role="menu"
              aria-label="Mobile navigation menu"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {items.map((item, index) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      )}
                      onClick={closeMobileMenu}
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                          closeMobileMenu()
                        }
                      }}
                      aria-current={isActive ? "page" : undefined}
                      role="menuitem"
                      tabIndex={0}
                    >
                      {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </div>

              {/* Mobile Actions */}
              {actions && (
                <div className="px-2 pt-2 pb-3 border-t border-border" role="group" aria-label="User actions">
                  <div className="space-y-2">
                    {actions}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    )
  }
)
Navigation.displayName = "Navigation"

export { Navigation, type NavigationItem }