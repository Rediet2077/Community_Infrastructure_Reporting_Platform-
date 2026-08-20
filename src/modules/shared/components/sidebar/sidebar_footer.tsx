"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SidebarFooter } from "@/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { CaretUpDownIcon, SignOutIcon } from "@phosphor-icons/react";
import { useNavigationStore } from "../../store/navigation_store";
import { useDepartmentList } from "@/modules/departments/hooks/list/use_department_list";
import { UserProfileHeader } from "./user_footer/user_profile_header";
import { UserRoleSwitcher } from "./user_footer/user_role_switcher";
import { UserThemeMenu } from "./user_footer/user_theme_menu";

export function SidebarUserFooter() {
  const {
    currentUserRole,
    setCurrentUserRole,
    selectedDepartmentFilter,
    activeOfficerDepartmentId,
  } = useNavigationStore();

  const effectiveDept =
    currentUserRole === "DEPARTMENT_ADMIN"
      ? activeOfficerDepartmentId
      : selectedDepartmentFilter;

  const { data: departments } = useDepartmentList();
  const deptList = departments || [];
  const currentDeptObj = deptList.find((d) => d.id === effectiveDept);

  const userName =
    currentUserRole === "SYSTEM_ADMIN"
      ? "Eng. Dawit Tadesse"
      : "Department Officer";

  const userTitle =
    currentUserRole === "SYSTEM_ADMIN"
      ? "System Administrator"
      : currentDeptObj?.name || "Operations Lead";

  const userEmail =
    currentUserRole === "SYSTEM_ADMIN"
      ? "dawit.tadesse@cirp.gov.et"
      : "officer@cirp.gov.et";

  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <SidebarFooter className="border-t border-sidebar-border p-2">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex w-full items-center justify-between gap-2.5 rounded-lg p-2 text-left hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-full bg-secondary font-medium text-foreground text-sm border border-border">
              {currentUserRole === "SYSTEM_ADMIN" ? "SA" : "DO"}
            </div>
            <div className="flex flex-col leading-tight min-w-0">
              <span className="font-semibold text-sidebar-foreground text-sm truncate">
                {userName}
              </span>
              <span className="text-muted-foreground text-sm font-normal truncate mt-0.5">
                {userTitle}
              </span>
            </div>
          </div>
          <CaretUpDownIcon className="size-4 shrink-0 text-muted-foreground" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="top"
          align="start"
          sideOffset={8}
          className="w-64 p-2 shadow-lg border border-border rounded-xl"
        >
          {/* Extracted Header Details Subcomponent */}
          <UserProfileHeader
            currentUserRole={currentUserRole}
            userName={userName}
            userEmail={userEmail}
            userTitle={userTitle}
          />

          <DropdownMenuSeparator className="my-1.5" />

          {/* Extracted Account Role Switcher Subcomponent */}
          <UserRoleSwitcher
            currentUserRole={currentUserRole}
            setCurrentUserRole={setCurrentUserRole}
          />

          <DropdownMenuSeparator className="my-1.5" />

          {/* Extracted Theme Toggle Menu Subcomponent */}
          <UserThemeMenu />

          <DropdownMenuSeparator className="my-1.5" />

          {/* Log Out */}
          <DropdownMenuItem
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-normal cursor-pointer rounded-md px-2 py-1.5 hover:bg-destructive hover:text-destructive-foreground focus:bg-destructive focus:text-destructive-foreground transition-colors"
          >
            <SignOutIcon className="size-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarFooter>
  );
}
