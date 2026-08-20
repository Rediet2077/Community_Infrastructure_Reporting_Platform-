"use client";

import Link from "next/link";
import { Card } from "@/ui/card";

interface DashboardKpiCardsProps {
  totalAssetsCount: number;
  newReportsCount: number;
  activeTasksCount: number;
  overdueTasksCount: number;
  resolvedReportsCount: number;
  dueSoonTasksCount: number;
}

export function DashboardKpiCards({
  totalAssetsCount,
  newReportsCount,
  activeTasksCount,
  overdueTasksCount,
  resolvedReportsCount,
  dueSoonTasksCount,
}: DashboardKpiCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {/* Card 1: Registered Assets */}
      <Link href="/dashboard/all-assets" className="block">
        <Card className="border-border bg-card p-3.5 flex flex-col justify-between hover:border-foreground/20 transition-colors cursor-pointer h-full">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-sm font-medium uppercase tracking-wider">Total Assets</span>
          </div>
          <div className="mt-2 text-2xl font-semibold text-foreground tracking-tight">
            {totalAssetsCount.toLocaleString()}
          </div>
          <div className="flex items-center justify-between text-sm font-normal text-muted-foreground mt-1">
            <span>In GIS database</span>
          </div>
        </Card>
      </Link>

      {/* Card 2: New Reports */}
      <Link href="/dashboard/reports" className="block">
        <Card className="border-border bg-card p-3.5 flex flex-col justify-between hover:border-foreground/20 transition-colors cursor-pointer h-full">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-sm font-medium uppercase tracking-wider">New Reports</span>
          </div>
          <div className="mt-2 text-2xl font-semibold text-foreground tracking-tight">
            {newReportsCount}
          </div>
          <div className="flex items-center justify-between text-sm font-normal text-muted-foreground mt-1">
            <span>Awaiting dispatch</span>
          </div>
        </Card>
      </Link>

      {/* Card 3: Active Tasks */}
      <Link href="/dashboard/tasks" className="block">
        <Card className="border-border bg-card p-3.5 flex flex-col justify-between hover:border-foreground/20 transition-colors cursor-pointer h-full">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-sm font-medium uppercase tracking-wider">Active Tasks</span>
          </div>
          <div className="mt-2 text-2xl font-semibold text-foreground tracking-tight">
            {activeTasksCount}
          </div>
          <div className="flex items-center justify-between text-sm font-normal text-muted-foreground mt-1">
            <span>Dispatched in field</span>
          </div>
        </Card>
      </Link>

      {/* Card 4: Overdue Tasks */}
      <Link href="/dashboard/deadlines" className="block">
        <Card className="border-border bg-card p-3.5 flex flex-col justify-between hover:border-foreground/20 transition-colors cursor-pointer h-full">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-sm font-medium uppercase tracking-wider">Overdue SLA</span>
          </div>
          <div className="mt-2 text-2xl font-semibold text-foreground tracking-tight">
            {overdueTasksCount}
          </div>
          <div className="flex items-center justify-between text-sm font-normal text-muted-foreground mt-1">
            <span>Escalation active</span>
          </div>
        </Card>
      </Link>

      {/* Card 5: Resolved Reports */}
      <Link href="/dashboard/reports" className="block">
        <Card className="border-border bg-card p-3.5 flex flex-col justify-between hover:border-foreground/20 transition-colors cursor-pointer h-full">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-sm font-medium uppercase tracking-wider">Resolved</span>
          </div>
          <div className="mt-2 text-2xl font-semibold text-foreground tracking-tight">
            {resolvedReportsCount}
          </div>
          <div className="flex items-center justify-between text-sm font-normal text-muted-foreground mt-1">
            <span>Verified closed</span>
          </div>
        </Card>
      </Link>

      {/* Card 6: On-Time Tasks */}
      <Link href="/dashboard/deadlines" className="block">
        <Card className="border-border bg-card p-3.5 flex flex-col justify-between hover:border-foreground/20 transition-colors cursor-pointer h-full">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-sm font-medium uppercase tracking-wider">Due Soon</span>
          </div>
          <div className="mt-2 text-2xl font-semibold text-foreground tracking-tight">
            {dueSoonTasksCount}
          </div>
          <div className="flex items-center justify-between text-sm font-normal text-muted-foreground mt-1">
            <span>Within deadline SLA</span>
          </div>
        </Card>
      </Link>
    </div>
  );
}
