"use client";

import { AdminNavigation } from "@/components/admin/admin-navigation";
import { GroupsOverview } from "@/components/admin/groups-overview";

export default function AdminGroupsPage() {
  return (
    <AdminNavigation>
      <div className="p-6">
        <GroupsOverview />
      </div>
    </AdminNavigation>
  );
}