"use client";

import React, { useState } from "react";
import { useNotificationList } from "../hooks/list/use_notification_list";
import { useNavigationStore } from "@/modules/shared/store/navigation_store";
import { NotificationsHeader } from "./notifications_header";
import { NotificationsCards } from "./notifications_cards";
import { NotificationsList } from "./notifications_list";
import { NotificationRecord } from "../types/notification_types";

export function NotificationsView() {
  const {
    currentUserRole,
    selectedDepartmentFilter,
    activeOfficerDepartmentId,
  } = useNavigationStore();

  const effectiveDept =
    currentUserRole === "DEPARTMENT_ADMIN"
      ? activeOfficerDepartmentId
      : selectedDepartmentFilter;

  const { data: notifications, isLoading } = useNotificationList(effectiveDept);
  const [localList, setLocalList] = useState<NotificationRecord[] | null>(null);

  const notificationList = localList || notifications || [];

  const handleMarkAllRead = () => {
    setLocalList(notificationList.map((n) => ({ ...n, is_read: true })));
  };

  const handleToggleRead = (id: string) => {
    setLocalList(
      notificationList.map((n) => (n.id === id ? { ...n, is_read: !n.is_read } : n))
    );
  };

  if (isLoading && !localList) {
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

  const unreadCount = notificationList.filter((n) => !n.is_read).length;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 w-full">
      <NotificationsHeader
        unreadCount={unreadCount}
        totalCount={notificationList.length}
        onMarkAllRead={handleMarkAllRead}
      />
      <NotificationsCards notifications={notificationList} />
      <NotificationsList
        notifications={notificationList}
        onToggleRead={handleToggleRead}
      />
    </div>
  );
}
