import { AuthRoute } from "@/components/auth/route-guard";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthRoute>
      <div className="min-h-screen bg-background">
        {children}
      </div>
    </AuthRoute>
  );
}