"use client";

import React from "react";
import { useUserList } from "../hooks/list/use_user_list";
import { useNavigationStore } from "@/modules/shared/store/navigation_store";
import { UsersHeader } from "./users_header";
import { UsersCards } from "./users_cards";
import { UsersTable } from "./users_table";

export function UsersView() {
  const {
    currentUserRole,
    selectedDepartmentFilter,
    activeOfficerDepartmentId,
  } = useNavigationStore();

  const effectiveDept =
    currentUserRole === "DEPARTMENT_ADMIN"
      ? activeOfficerDepartmentId
      : selectedDepartmentFilter;

  const { data: users, isLoading } = useUserList(effectiveDept);

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 w-full">
        <div className="animate-pulse flex flex-col gap-4">
          <div className="h-10 bg-muted/30 rounded w-1/3" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-muted/20 rounded-lg border border-border" />
            ))}
          </div>
          <div className="h-64 bg-muted/20 rounded-lg border border-border" />
        </div>
      </div>
    );
  }

  const userList = users || [];

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 w-full">
      <UsersHeader totalUsers={userList.length} />
      <UsersCards users={userList} />
      <UsersTable users={userList} />
    </div>
  );
}
