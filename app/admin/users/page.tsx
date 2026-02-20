"use client";

import { AdminNavigation } from "@/components/admin/admin-navigation";
import { UsersManagement } from "@/components/admin/users-management";

export default function AdminUsersPage() {
  return (
    <AdminNavigation>
      <div className="p-6">
        <UsersManagement />
      </div>
    </AdminNavigation>
  );
}