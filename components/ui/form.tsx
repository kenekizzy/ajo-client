"use client"

import * as React from "react"
import { 
  useForm, 
  FormProvider, 
  useFormContext,
  type UseFormReturn,
  type FieldPath,
  type FieldValues,
  type SubmitHandler
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type ZodSchema } from "zod"
import { cn } from "@/lib/utils"
import { FormError } from "./form-error"

// Form Provider Component
interface FormProps<T extends FieldValues> extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  form: UseFormReturn<T>
  onSubmit: SubmitHandler<T>
  children: React.ReactNode
}

function Form<T extends FieldValues>({ 
  form, 
  onSubmit, 
  children, 
  className,
  ...props 
}: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-4", className)}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  )
}

// Form Item Component
interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {}

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn("space-y-2", className)} 
        {...props} 
      />
    )
  }
)
FormItem.displayName = "FormItem"

// Form Control Component
interface FormControlProps<T extends FieldValues> {
  name: FieldPath<T>
  children: (field: {
    value: any
    onChange: (value: any) => void
    onBlur: () => void
    error?: string
    disabled?: boolean
    name: string
    ref: React.Ref<any>
  }) => React.ReactNode
}

function FormControl<T extends FieldValues>({ name, children }: FormControlProps<T>) {
  const { 
    register, 
    formState: { errors, isSubmitting },
    watch,
    setValue,
    trigger
  } = useFormContext<T>()
  
  const fieldError = errors[name]
  const errorMessage = fieldError?.message as string | undefined
  const value = watch(name)
  const registration = register(name)
  
  const field = {
    value,
    onChange: (newValue: any) => {
      setValue(name, newValue, { shouldValidate: true })
      trigger(name)
    },
    onBlur: () => trigger(name),
    error: errorMessage,
    disabled: isSubmitting,
    name: registration.name,
    ref: registration.ref
  }
  
  return <>{children(field)}</>
}

// Hook to create form with validation
function useFormWithValidation<T extends FieldValues>({ 
  schema, 
  defaultValues 
}: {
  schema: any
  defaultValues?: any
}): UseFormReturn<T> {
  return useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onBlur"
  }) as UseFormReturn<T>
}

export { 
  Form, 
  FormItem, 
  FormControl, 
  FormError,
  useFormWithValidation 
}