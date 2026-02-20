"use client";

import { AdminNavigation } from "@/components/admin/admin-navigation";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export default function AdminPage() {
  return (
    <AdminNavigation>
      <div className="p-6">
        <AdminDashboard />
      </div>
    </AdminNavigation>
  );
}