"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormItem, FormControl, useFormWithValidation } from "@/components/ui/form";
import { useAuth } from "@/stores/auth-context";
import { registerSchema, type RegisterFormData } from "@/lib/validations";
import { SocialAuth } from "./social-auth";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, isLoading } = useAuth();
  const router = useRouter();

  const form = useFormWithValidation<RegisterFormData>({
    schema: registerSchema,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    console.log("Registering user:", data);
    try {
      setError(null);
      await register(data);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      setError(null);
      // Redirect to backend OAuth endpoint
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      window.location.href = `${backendUrl}/auth/${provider}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Social login failed. Please try again.");
    }
  };

  // Get password strength indicator
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordValue = form.watch("password");
  const passwordStrength = getPasswordStrength(passwordValue || "");

  const getStrengthColor = (strength: number) => {
    if (strength < 2) return "bg-red-500";
    if (strength < 4) return "bg-yellow-500";
    return "bg-ajo-success";
  };

  const getStrengthText = (strength: number) => {
    if (strength < 2) return "Weak";
    if (strength < 4) return "Medium";
    return "Strong";
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Enhanced header */}
      <div className="text-center space-y-3 mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-ajo-primary to-ajo-primary/80 rounded-xl flex items-center justify-center shadow-lg">
            <User className="w-6 h-6 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-ajo-primary to-ajo-primary/80 bg-clip-text text-transparent">
          Create your account
        </h1>
        <p className="text-muted-foreground text-base">
          Join the ajo community and start building wealth together
        </p>
      </div>

      {/* Enhanced error display */}
      {error && (
        <div className="mb-6 p-4 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-lg flex items-start space-x-2">
          <div className="w-4 h-4 rounded-full bg-destructive/20 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-6">
        <Form form={form} onSubmit={onSubmit} className="space-y-5">
          <FormItem>
            <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
              First Name
            </Label>
            <FormControl name="firstName">
              {(field) => (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    {...field}
                    id="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    className="pl-10 h-12 border-2 focus:border-ajo-primary transition-colors"
                    error={!!field.error}
                    autoComplete="name"
                  />
                </div>
              )}
            </FormControl>
          </FormItem>

          <FormItem>
            <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
              Last Name
            </Label>
            <FormControl name="lastName">
              {(field) => (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    {...field}
                    id="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    className="pl-10 h-12 border-2 focus:border-ajo-primary transition-colors"
                    error={!!field.error}
                    autoComplete="name"
                  />
                </div>
              )}
            </FormControl>
          </FormItem>

          <FormItem>
            <Label htmlFor="email" className="text-sm font-medium text-foreground">
              Email Address
            </Label>
            <FormControl name="email">
              {(field) => (
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="pl-10 h-12 border-2 focus:border-ajo-primary transition-colors"
                    error={!!field.error}
                    autoComplete="email"
                  />
                </div>
              )}
            </FormControl>
          </FormItem>

          <FormItem>
            <Label htmlFor="phoneNumber" className="text-sm font-medium text-foreground">
              Phone Number
            </Label>
            <FormControl name="phoneNumber">
              {(field) => (
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    {...field}
                    id="phoneNumber"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="pl-10 h-12 border-2 focus:border-ajo-primary transition-colors"
                    error={!!field.error}
                    autoComplete="tel"
                  />
                </div>
              )}
            </FormControl>
          </FormItem>

          <FormItem>
            <Label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </Label>
            <FormControl name="password">
              {(field) => (
                <div className="space-y-3">
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      {...field}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="pl-10 pr-12 h-12 border-2 focus:border-ajo-primary transition-colors"
                      error={!!field.error}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {passwordValue && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength)}`}
                            style={{ width: `${(passwordStrength / 5) * 100}%` }}
                          />
                        </div>
                        <span className={`text-xs font-medium ${
                          passwordStrength < 2 ? "text-red-600" : 
                          passwordStrength < 4 ? "text-yellow-600" : "text-ajo-success"
                        }`}>
                          {getStrengthText(passwordStrength)}
                        </span>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground space-y-1">
                        <p className="font-medium">Password requirements:</p>
                        <ul className="space-y-1 ml-2">
                          <li className={`flex items-center space-x-2 ${passwordValue.length >= 8 ? "text-ajo-success" : ""}`}>
                            <span className={`w-1 h-1 rounded-full ${passwordValue.length >= 8 ? "bg-ajo-success" : "bg-muted-foreground"}`} />
                            <span>At least 8 characters</span>
                          </li>
                          <li className={`flex items-center space-x-2 ${/[A-Z]/.test(passwordValue) ? "text-ajo-success" : ""}`}>
                            <span className={`w-1 h-1 rounded-full ${/[A-Z]/.test(passwordValue) ? "bg-ajo-success" : "bg-muted-foreground"}`} />
                            <span>One uppercase letter</span>
                          </li>
                          <li className={`flex items-center space-x-2 ${/[a-z]/.test(passwordValue) ? "text-ajo-success" : ""}`}>
                            <span className={`w-1 h-1 rounded-full ${/[a-z]/.test(passwordValue) ? "bg-ajo-success" : "bg-muted-foreground"}`} />
                            <span>One lowercase letter</span>
                          </li>
                          <li className={`flex items-center space-x-2 ${/\d/.test(passwordValue) ? "text-ajo-success" : ""}`}>
                            <span className={`w-1 h-1 rounded-full ${/\d/.test(passwordValue) ? "bg-ajo-success" : "bg-muted-foreground"}`} />
                            <span>One number</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
              </div>
            )}
          </FormControl>
        </FormItem>

          <FormItem>
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
              Confirm Password
            </Label>
            <FormControl name="confirmPassword">
              {(field) => (
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    {...field}
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="pl-10 pr-12 h-12 border-2 focus:border-ajo-primary transition-colors"
                    error={!!field.error}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              )}
            </FormControl>
          </FormItem>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-ajo-primary to-ajo-primary/90 hover:from-ajo-primary/90 hover:to-ajo-primary text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200 group"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Creating your account...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>Create your account</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            )}
          </Button>
        </Form>

        {/* Enhanced divider */}
        {/* <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/60" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-4 text-muted-foreground font-medium">
              Or continue with
            </span>
          </div>
        </div> */}

        {/* <SocialAuth onSocialLogin={handleSocialLogin} /> */}

        {/* Enhanced footer */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-ajo-primary hover:text-ajo-primary/80 underline-offset-4 hover:underline font-semibold transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Trust indicators */}
        <div className="pt-6 border-t border-border/40">
          <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-ajo-success rounded-full" />
              <span>Secure Registration</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>Trusted Community</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}