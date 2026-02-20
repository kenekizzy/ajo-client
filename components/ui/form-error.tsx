"use client"

import * as React from "react"
import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string
}

const FormError = React.forwardRef<HTMLDivElement, FormErrorProps>(
  ({ className, message, ...props }, ref) => {
    if (!message) return null

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-2 text-sm text-destructive",
          className
        )}
        role="alert"
        aria-live="polite"
        {...props}
      >
        <AlertCircle className="h-4 w-4" />
        <span>{message}</span>
      </div>
    )
  }
)
FormError.displayName = "FormError"

export { FormError }