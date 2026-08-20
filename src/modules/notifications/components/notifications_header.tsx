"use client";

import React from "react";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { CheckCircleIcon } from "@phosphor-icons/react";

interface NotificationsHeaderProps {
  unreadCount: number;
  totalCount: number;
  onMarkAllRead?: () => void;
}

export function NotificationsHeader({
  unreadCount,
  totalCount,
  onMarkAllRead,
}: NotificationsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            System & Dispatch Notifications
          </h1>
        </div>
        <p className="text-sm font-normal text-muted-foreground mt-1">
          Real-time incident dispatches, deadline SLA escalations, contractor requests, and automated verification alerts.
        </p>
      </div>

      <div className="flex items-center gap-3">
        {unreadCount > 0 ? (
          <Badge variant="destructive" className="text-sm font-normal py-0.5 px-2.5">
            {unreadCount} Unread Alerts
          </Badge>
        ) : (
          <Badge variant="outline" className="text-sm font-normal py-0.5 px-2.5 text-muted-foreground">
            All Caught Up ({totalCount})
          </Badge>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={onMarkAllRead}
          className="h-9 text-sm font-medium gap-1.5"
        >
          <CheckCircleIcon weight="bold" className="size-3.5" />
          <span>Mark All Read</span>
        </Button>
      </div>
    </div>
  );
}
