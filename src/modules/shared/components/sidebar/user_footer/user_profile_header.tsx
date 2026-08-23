"use client";

import React from "react";
import { UserRole } from "@/modules/shared/types/enums";

interface UserProfileHeaderProps {
  currentUserRole: UserRole;
  userName: string;
  userEmail: string;
  userTitle: string;
}

export function UserProfileHeader({
  currentUserRole,
  userName,
  userEmail,
  userTitle,
}: UserProfileHeaderProps) {
  return (
    <div className="flex items-center gap-3 p-2">
      <div className="flex aspect-square size-10 items-center justify-center rounded-full bg-secondary font-medium text-foreground text-sm border border-border">
        {currentUserRole === "SYSTEM_ADMIN" ? "SA" : "DO"}
      </div>
      <div className="flex flex-col leading-tight min-w-0">
        <span className="font-semibold text-foreground text-sm truncate">
          {userName}
        </span>
        <span className="text-muted-foreground text-sm font-normal truncate mt-0.5">
          {userEmail}
        </span>
        <span className="text-muted-foreground text-sm font-normal truncate capitalize">
          {userTitle}
        </span>
      </div>
    </div>
  );
}
