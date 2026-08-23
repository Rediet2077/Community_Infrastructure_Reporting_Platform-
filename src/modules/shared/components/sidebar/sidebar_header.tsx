"use client";

import React from "react";
import Link from "next/link";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/ui/sidebar";
import { ShieldCheckIcon } from "@phosphor-icons/react";
import { useNavigationStore } from "../../store/navigation_store";
import { useDepartmentList } from "@/modules/departments/hooks/list/use_department_list";

export function SidebarHeaderSection() {
  const {
    currentUserRole,
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

  return (
    <SidebarHeader className="border-b border-sidebar-border p-3">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            render={<Link href="/dashboard" />}
            size="lg"
            className="gap-3 px-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer w-full"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <ShieldCheckIcon weight="bold" className="size-4" />
            </div>
            <div className="flex flex-col text-left leading-none">
              <span className="font-semibold tracking-tight text-lg text-sidebar-foreground">CIRP</span>
              <span className="text-sm font-normal text-muted-foreground mt-1">
                {currentUserRole === "SYSTEM_ADMIN"
                  ? "Central Operations"
                  : currentDeptObj?.code || "Department Lead"}
              </span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
