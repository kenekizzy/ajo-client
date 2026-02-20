"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("min-h-screen bg-background", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Layout.displayName = "Layout"

interface MainProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

const Main = React.forwardRef<HTMLElement, MainProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <main
        ref={ref}
        className={cn("flex-1", className)}
        role="main"
        {...props}
      >
        {children}
      </main>
    )
  }
)
Main.displayName = "Main"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl" | "full"
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, size = "lg", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto px-4 sm:px-6 lg:px-8",
          {
            "max-w-sm": size === "sm",
            "max-w-md": size === "md", 
            "max-w-4xl": size === "lg",
            "max-w-7xl": size === "xl",
            "max-w-none": size === "full",
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Container.displayName = "Container"

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn("w-full", className)}
        role="banner"
        {...props}
      >
        {children}
      </header>
    )
  }
)
Header.displayName = "Header"

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className={cn(
          "w-full border-t border-border bg-background",
          className
        )}
        role="contentinfo"
        {...props}
      >
        {children}
      </footer>
    )
  }
)
Footer.displayName = "Footer"

export { Layout, Main, Container, Header, Footer }