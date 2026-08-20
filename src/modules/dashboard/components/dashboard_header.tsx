"use client";

import Link from "next/link";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";

interface DashboardHeaderProps {
  currentUserRole: string;
  departmentName?: string;
}

export function DashboardHeader({
  currentUserRole,
  departmentName,
}: DashboardHeaderProps) {
  const roleLabel =
    currentUserRole === "SYSTEM_ADMIN"
      ? "City-Wide Administrator"
      : `${departmentName || "Department"} View`;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Municipal Operations Command
          </h1>
          <Badge variant="outline" className="text-sm font-normal py-0.5 px-2.5 text-muted-foreground">
            {roleLabel}
          </Badge>
        </div>
        <p className="text-sm font-normal text-muted-foreground mt-1 flex items-center gap-1.5">
          <span>Civil Infrastructure & Reporting Platform</span>
          <span>•</span>
          <span>Citizen triage, dispatch pipeline, and SLA compliance.</span>
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Link href="/dashboard/register-asset">
          <Button variant="outline" size="sm" className="text-sm font-medium h-9">
            Register Asset
          </Button>
        </Link>
        <Link href="/dashboard/map">
          <Button variant="outline" size="sm" className="text-sm font-medium h-9">
            GIS Map
          </Button>
        </Link>
      </div>
    </div>
  );
}
