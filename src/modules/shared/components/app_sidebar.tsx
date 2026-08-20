"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarRail,
} from "@/ui/sidebar";
import { useNavigationStore } from "../store/navigation_store";
import { useReportList } from "@/modules/reports/hooks/list/use_report_list";
import { useNotificationList } from "@/modules/notifications/hooks/list/use_notification_list";
import { SidebarHeaderSection } from "./sidebar/sidebar_header";
import { SidebarNavGroup } from "./sidebar/sidebar_nav_group";
import { SidebarUserFooter } from "./sidebar/sidebar_footer";
import { getSidebarNavigationGroups } from "./sidebar/sidebar_navigation_config";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {
    currentUserRole,
    selectedDepartmentFilter,
    activeOfficerDepartmentId,
  } = useNavigationStore();

  const effectiveDept =
    currentUserRole === "DEPARTMENT_ADMIN"
      ? activeOfficerDepartmentId
      : selectedDepartmentFilter;

  const { data: reports } = useReportList(effectiveDept);
  const { data: notifications } = useNotificationList(effectiveDept);

  const reportList = reports || [];
  const notificationList = notifications || [];

  const counts = {
    newReportsCount: reportList.filter((r) => r.status === "NEW").length,
    unreadNotificationsCount: notificationList.filter((n) => !n.is_read).length,
  };

  const navGroups = getSidebarNavigationGroups(counts);

  return (
    <Sidebar className="border-r border-border bg-sidebar" {...props}>
      <SidebarHeaderSection />

      <SidebarContent>
        {navGroups.map((group) => (
          <SidebarNavGroup key={group.label} group={group} />
        ))}
      </SidebarContent>

      <SidebarUserFooter />
      <SidebarRail />
    </Sidebar>
  );
}
