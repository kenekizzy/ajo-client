"use client";

import { useAuth } from "@/stores/auth-context";
import { AuthLoading } from "@/components/ui/loading";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export function RouteGuard({ 
  children, 
  requireAuth = true, 
  redirectTo 
}: RouteGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isLoading) return; // Wait for auth check to complete

    if (requireAuth && !isAuthenticated) {
      // User needs to be authenticated but isn't
      const callbackUrl = window.location.pathname + window.location.search;
      const encodedCallbackUrl = encodeURIComponent(callbackUrl);
      router.push(`/login?callbackUrl=${encodedCallbackUrl}`);
      return;
    }

    if (!requireAuth && isAuthenticated && redirectTo) {
      // User is authenticated but shouldn't be on this page
      const callbackUrl = searchParams.get('callbackUrl');
      const destination = callbackUrl ? decodeURIComponent(callbackUrl) : redirectTo;
      router.push(destination);
      return;
    }
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, router, searchParams]);

  // Show loading while checking authentication
  if (isLoading) {
    return <AuthLoading />;
  }

  // Show loading while redirecting
  if (requireAuth && !isAuthenticated) {
    return <AuthLoading message="Redirecting to login..." />;
  }

  if (!requireAuth && isAuthenticated && redirectTo) {
    return <AuthLoading message="Redirecting..." />;
  }

  return <>{children}</>;
}

// Convenience wrapper for protected routes
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard requireAuth={true}>
      {children}
    </RouteGuard>
  );
}

// Convenience wrapper for auth routes (login, register)
export function AuthRoute({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard requireAuth={false} redirectTo="/dashboard">
      {children}
    </RouteGuard>
  );
}