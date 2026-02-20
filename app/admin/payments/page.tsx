"use client";

import { AdminNavigation } from "@/components/admin/admin-navigation";
import { PaymentsTracking } from "@/components/admin/payments-tracking";

export default function AdminPaymentsPage() {
  return (
    <AdminNavigation>
      <div className="p-6">
        <PaymentsTracking />
      </div>
    </AdminNavigation>
  );
}