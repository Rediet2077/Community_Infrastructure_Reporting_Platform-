"use client";

import React from "react";
import { Card } from "@/ui/card";
import { WarningIcon, PlusCircleIcon, ClockIcon, CheckCircleIcon } from "@phosphor-icons/react";
import { NotificationRecord } from "../types/notification_types";

interface NotificationsCardsProps {
  notifications: NotificationRecord[];
}

export function NotificationsCards({ notifications }: NotificationsCardsProps) {
  const criticalCount = notifications.filter(
    (n) => n.priority === "CRITICAL" || n.category === "ESCALATION"
  ).length;
  const newReportsCount = notifications.filter((n) => n.category === "NEW_REPORT").length;
  const extensionsCount = notifications.filter((n) => n.category === "EXTENSION_REQUEST").length;
  const completedCount = notifications.filter((n) => n.category === "TASK_COMPLETED").length;

  const cards = [
    {
      title: "SLA Escalations",
      count: criticalCount,
      description: "Critical action required",
      icon: WarningIcon,
      accent: "text-destructive",
    },
    {
      title: "New Reports",
      count: newReportsCount,
      description: "Pending initial triage",
      icon: PlusCircleIcon,
      accent: "text-blue-500",
    },
    {
      title: "Extension Requests",
      count: extensionsCount,
      description: "Awaiting officer sign-off",
      icon: ClockIcon,
      accent: "text-amber-500",
    },
    {
      title: "Resolved Audits",
      count: completedCount,
      description: "Ready for verification",
      icon: CheckCircleIcon,
      accent: "text-emerald-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <Card key={c.title} className="p-4 border-border bg-card flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {c.title}
              </span>
              <Icon weight="bold" className={`size-4 ${c.accent}`} />
            </div>
            <div className="mt-3">
              <div className="text-2xl font-semibold text-foreground tracking-tight">{c.count}</div>
              <p className="text-sm font-normal text-muted-foreground mt-1">{c.description}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
