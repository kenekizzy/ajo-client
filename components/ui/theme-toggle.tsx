"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/stores/theme-context"
import { Button } from "./button"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
  variant?: "default" | "ghost" | "outline"
  size?: "default" | "sm" | "lg" | "icon"
}

export function ThemeToggle({ 
  className, 
  variant = "ghost", 
  size = "icon" 
}: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme()
  const [isToggling, setIsToggling] = React.useState(false)

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant={variant}
        size={size}
        disabled
        className={cn("relative", className)}
        aria-label="Loading theme toggle"
      >
        <div className="h-4 w-4" />
      </Button>
    )
  }

  const handleToggle = async () => {
    setIsToggling(true)
    toggleTheme()
    
    // Add a small delay for smooth transition
    setTimeout(() => {
      setIsToggling(false)
    }, 200)
  }

  const isDark = theme === "dark"
  const nextTheme = isDark ? "light" : "dark"

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggle}
      disabled={isToggling}
      className={cn(
        "relative transition-all duration-200 ease-in-out",
        "hover:scale-105 active:scale-95",
        isToggling && "animate-pulse",
        className
      )}
      aria-label={`Switch to ${nextTheme} mode`}
      aria-pressed={isDark}
      title={`Currently in ${theme} mode. Click to switch to ${nextTheme} mode.`}
    >
      <div className="relative h-4 w-4">
        <Sun 
          className={cn(
            "absolute inset-0 h-4 w-4 transition-all duration-300 ease-in-out",
            isDark 
              ? "rotate-90 scale-0 opacity-0" 
              : "rotate-0 scale-100 opacity-100"
          )}
        />
        <Moon 
          className={cn(
            "absolute inset-0 h-4 w-4 transition-all duration-300 ease-in-out",
            isDark 
              ? "rotate-0 scale-100 opacity-100" 
              : "-rotate-90 scale-0 opacity-0"
          )}
        />
      </div>
      <span className="sr-only">
        {isDark ? "Switch to light mode" : "Switch to dark mode"}
      </span>
    </Button>
  )
}