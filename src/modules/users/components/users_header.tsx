"use client";

import React from "react";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { PlusIcon } from "@phosphor-icons/react";

interface UsersHeaderProps {
  totalUsers: number;
}

export function UsersHeader({ totalUsers }: UsersHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            User & Access Management
          </h1>
        </div>
        <p className="text-sm font-normal text-muted-foreground mt-1">
          Municipal administrative staff, department officers, field dispatchers, and contractor personnel access credentials.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Badge variant="outline" className="text-sm font-normal py-0.5 px-2.5 text-muted-foreground">
          {totalUsers} Registered Users
        </Badge>
        <Button size="sm" className="h-9 text-sm font-medium gap-1.5">
          <PlusIcon weight="bold" className="size-3.5" />
          <span>Invite User</span>
        </Button>
      </div>
    </div>
  );
}
