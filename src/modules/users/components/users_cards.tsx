"use client";

import React from "react";
import { Card } from "@/ui/card";
import { ShieldCheckIcon, UserGearIcon, HardHatIcon, RadioButtonIcon } from "@phosphor-icons/react";
import { UserRecord } from "../types/user_types";

interface UsersCardsProps {
  users: UserRecord[];
}

export function UsersCards({ users }: UsersCardsProps) {
  const adminCount = users.filter((u) => u.role === "SYSTEM_ADMIN").length;
  const officerCount = users.filter((u) => u.role === "DEPARTMENT_ADMIN").length;
  const fieldStaffCount = 0;
  const activeCount = users.filter((u) => u.status === "ACTIVE").length;

  const cards = [
    {
      title: "System Admins",
      count: adminCount,
      description: "Full municipal authority",
      icon: ShieldCheckIcon,
      accent: "text-primary",
    },
    {
      title: "Department Officers",
      count: officerCount,
      description: "Triage & SLA management",
      icon: UserGearIcon,
      accent: "text-blue-500",
    },
    {
      title: "Field & Contractors",
      count: fieldStaffCount,
      description: "Dispatchers & site supervisors",
      icon: HardHatIcon,
      accent: "text-amber-500",
    },
    {
      title: "Active Status",
      count: activeCount,
      description: "Currently authenticated",
      icon: RadioButtonIcon,
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
