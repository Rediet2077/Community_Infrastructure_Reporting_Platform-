"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import {
  WarningIcon,
  PlusCircleIcon,
  ClockIcon,
  CheckCircleIcon,
  InfoIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react";
import { NotificationRecord, NotificationCategory } from "../types/notification_types";

interface NotificationsListProps {
  notifications: NotificationRecord[];
  onToggleRead?: (id: string) => void;
}

export function NotificationsList({
  notifications,
  onToggleRead,
}: NotificationsListProps) {
  const [filter, setFilter] = useState<string>("ALL");

  const filtered = notifications.filter((n) => {
    if (filter === "UNREAD") return !n.is_read;
    if (filter === "ESCALATIONS") return n.category === "ESCALATION" || n.priority === "CRITICAL";
    if (filter === "REPORTS") return n.category === "NEW_REPORT";
    return true;
  });

  const getCategoryIcon = (cat: NotificationCategory) => {
    switch (cat) {
      case "ESCALATION":
        return <WarningIcon weight="bold" className="size-4 text-destructive" />;
      case "NEW_REPORT":
        return <PlusCircleIcon weight="bold" className="size-4 text-blue-500" />;
      case "EXTENSION_REQUEST":
        return <ClockIcon weight="bold" className="size-4 text-amber-500" />;
      case "TASK_COMPLETED":
        return <CheckCircleIcon weight="bold" className="size-4 text-emerald-500" />;
      default:
        return <InfoIcon weight="bold" className="size-4 text-muted-foreground" />;
    }
  };

  return (
    <Card className="border-border bg-card overflow-hidden">
      {/* Filter Tabs Header */}
      <div className="p-3 border-b border-border flex items-center justify-between gap-2 bg-muted/20">
        <div className="flex items-center gap-1.5 flex-wrap">
          {[
            { key: "ALL", label: "All Notifications" },
            { key: "UNREAD", label: "Unread" },
            { key: "ESCALATIONS", label: "Escalations & Urgent" },
            { key: "REPORTS", label: "Citizen Reports" },
          ].map((tab) => (
            <Button
              key={tab.key}
              variant={filter === tab.key ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(tab.key)}
              className="h-8 text-sm font-normal px-3"
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* List items */}
      <div className="divide-y divide-border">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-sm font-normal text-muted-foreground">
            No notifications in this category.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-muted/30 ${
                !item.is_read ? "bg-primary/5" : ""
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="mt-0.5 p-2 rounded-md bg-muted/60 shrink-0 border border-border">
                  {getCategoryIcon(item.category)}
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-foreground">
                      {item.title}
                    </span>
                    {!item.is_read && (
                      <Badge variant="default" className="text-xs font-normal px-2 py-0.5">
                        New
                      </Badge>
                    )}
                    {item.entity_code && (
                      <span className="font-mono text-sm font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border">
                        {item.entity_code}
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-normal text-muted-foreground mt-1 leading-relaxed">
                    {item.message}
                  </p>

                  <div className="flex items-center gap-3 text-sm font-normal text-muted-foreground mt-2">
                    <span>{item.department_name || "City-Wide"}</span>
                    <span>•</span>
                    <span>{item.created_at}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                {onToggleRead && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleRead(item.id)}
                    className="h-8 text-sm font-normal"
                  >
                    {item.is_read ? "Mark unread" : "Mark read"}
                  </Button>
                )}
                {item.target_url && (
                  <Link href={item.target_url}>
                    <Button size="sm" variant="outline" className="h-8 text-sm font-medium gap-1">
                      <span>View</span>
                      <ArrowRightIcon className="size-3.5" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
