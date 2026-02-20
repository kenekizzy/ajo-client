"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "./label"
import { Input, type InputProps } from "./input"
import { FormError } from "./form-error"

interface FormFieldProps extends Omit<InputProps, "id" | "error"> {
  label: string
  error?: string
  description?: string
  required?: boolean
  name: string
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ 
    label, 
    error, 
    description, 
    required, 
    name, 
    className,
    ...props 
  }, ref) => {
    const fieldId = `field-${name}`
    const errorId = error ? `${fieldId}-error` : undefined
    const descriptionId = description ? `${fieldId}-description` : undefined

    return (
      <div className="space-y-2">
        <Label 
          htmlFor={fieldId}
          className={cn(
            required && "after:content-['*'] after:ml-0.5 after:text-destructive"
          )}
        >
          {label}
        </Label>
        
        {description && (
          <p 
            id={descriptionId}
            className="text-sm text-muted-foreground"
          >
            {description}
          </p>
        )}
        
        <Input
          id={fieldId}
          name={name}
          ref={ref}
          error={!!error}
          aria-describedby={cn(
            errorId,
            descriptionId
          )}
          aria-required={required}
          className={className}
          {...props}
        />
        
        <FormError message={error} id={errorId} />
      </div>
    )
  }
)
FormField.displayName = "FormField"

export { FormField }