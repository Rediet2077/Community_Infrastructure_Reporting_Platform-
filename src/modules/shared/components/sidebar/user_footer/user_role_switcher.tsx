"use client";

import React from "react";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/ui/dropdown-menu";
import { ShieldCheckIcon, UserIcon, CheckIcon } from "@phosphor-icons/react";
import { UserRole } from "@/modules/shared/types/enums";

interface UserRoleSwitcherProps {
  currentUserRole: UserRole;
  setCurrentUserRole: (role: UserRole) => void;
}

export function UserRoleSwitcher({
  currentUserRole,
  setCurrentUserRole,
}: UserRoleSwitcherProps) {
  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel className="text-sm uppercase font-medium tracking-wider text-muted-foreground px-2 py-1">
        Account Role
      </DropdownMenuLabel>
      <DropdownMenuItem
        onClick={() => setCurrentUserRole("SYSTEM_ADMIN")}
        className="flex items-center justify-between text-sm font-normal cursor-pointer rounded-md px-2 py-1.5"
      >
        <div className="flex items-center gap-2">
          <ShieldCheckIcon className="size-4 text-foreground" />
          <span>City Administrator</span>
        </div>
        {currentUserRole === "SYSTEM_ADMIN" && (
          <CheckIcon className="size-3.5 text-foreground" />
        )}
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => setCurrentUserRole("DEPARTMENT_ADMIN")}
        className="flex items-center justify-between text-sm font-normal cursor-pointer rounded-md px-2 py-1.5"
      >
        <div className="flex items-center gap-2">
          <UserIcon className="size-4 text-foreground" />
          <span>Department Admin</span>
        </div>
        {currentUserRole === "DEPARTMENT_ADMIN" && (
          <CheckIcon className="size-3.5 text-foreground" />
        )}
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
}
