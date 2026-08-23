"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/ui/sidebar";
import { Separator } from "@/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/ui/breadcrumb";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { BellIcon, PlusIcon } from "@phosphor-icons/react";
import { useNavigationStore } from "../store/navigation_store";
import { useNotificationList } from "@/modules/notifications/hooks/list/use_notification_list";

export function TopNavbar() {
  const pathname = usePathname();
  const {
    currentUserRole,
    selectedDepartmentFilter,
    activeOfficerDepartmentId,
  } = useNavigationStore();

  const effectiveDept =
    currentUserRole === "DEPARTMENT_ADMIN"
      ? activeOfficerDepartmentId
      : selectedDepartmentFilter;

  const { data: notifications } = useNotificationList(effectiveDept);
  const unreadCount = (notifications || []).filter((n) => !n.is_read).length;

  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Dashboard Overview";
    if (pathname.startsWith("/dashboard/reports")) return "Citizen Reports Console";
    if (pathname.startsWith("/dashboard/departments")) return "Municipal Departments";
    if (pathname.startsWith("/dashboard/contractors")) return "Contractors & Workforce";
    if (pathname.startsWith("/dashboard/users")) return "User & Access Management";
    if (pathname.startsWith("/dashboard/analytics")) return "Operational Analytics";
    if (pathname.startsWith("/dashboard/notifications")) return "System & Dispatch Notifications";
    if (pathname.startsWith("/dashboard/settings")) return "System Settings & Configuration";
    if (pathname.startsWith("/dashboard/all-assets") || pathname.startsWith("/dashboard/assets"))
      return "Asset Management / All Assets";
    if (pathname.startsWith("/dashboard/register-asset"))
      return "Asset Management / Register Asset";
    if (pathname.startsWith("/dashboard/tasks"))
      return "Tasks & Work Orders";
    if (pathname.startsWith("/dashboard/deadlines"))
      return "Deadlines & Escalations";
    if (pathname.startsWith("/dashboard/extensions"))
      return "Extension Approvals";
    if (pathname.startsWith("/dashboard/map"))
      return "GIS Infrastructure Map";
    if (pathname.startsWith("/dashboard/audit-logs"))
      return "Audit Trail Logs";
    return "Dashboard";
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-4">
      {/* Left section: Sidebar trigger & breadcrumbs */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-foreground hover:bg-muted" />
        <Separator orientation="vertical" className="h-5" />

        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/dashboard" className="font-normal text-sm text-muted-foreground hover:text-foreground">
                CIRP
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-sm text-foreground">
                {getPageTitle()}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Right section: Notifications & Quick Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications Quick Link */}
        <Link href="/dashboard/notifications" className="relative">
          <Button variant="ghost" size="icon-sm" className="h-9 w-9 relative text-foreground">
            <BellIcon className="size-4" />
            {unreadCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 size-4 p-0 flex items-center justify-center text-xs font-normal"
              >
                {unreadCount}
              </Badge>
            )}
          </Button>
        </Link>

        {/* Quick Action Button */}
        <Link href="/dashboard/register-asset" className="hidden sm:block">
          <Button size="sm" className="h-9 text-sm gap-1 font-medium">
            <PlusIcon weight="bold" className="size-3.5" />
            <span>New Asset</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
