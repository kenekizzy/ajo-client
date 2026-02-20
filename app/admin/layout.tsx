import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - AjoConnect",
  description: "Administrative dashboard for managing AjoConnect platform",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}