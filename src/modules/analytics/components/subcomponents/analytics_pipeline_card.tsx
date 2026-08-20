"use client";

import React from "react";
import { Card, CardTitle } from "@/ui/card";
import { Badge } from "@/ui/badge";

interface AnalyticsPipelineCardProps {
  totalTasks: number;
  inProgressTasks: number;
  pendingVerifyTasks: number;
  completedTasks: number;
  overdueTasks: number;
}

export function AnalyticsPipelineCard({
  totalTasks,
  inProgressTasks,
  pendingVerifyTasks,
  completedTasks,
  overdueTasks,
}: AnalyticsPipelineCardProps) {
  return (
    <Card className="border-border bg-card p-5">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <CardTitle className="text-base font-semibold text-foreground">
          Work Orders & Maintenance Execution Pipeline
        </CardTitle>
        <Badge variant="outline" className="text-sm font-normal">
          {totalTasks} Active Tasks
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-4">
        <div className="p-3.5 bg-muted/20 rounded-lg border border-border">
          <span className="text-sm font-medium text-muted-foreground block uppercase tracking-wider">Active In Field</span>
          <div className="text-xl font-semibold text-foreground mt-1">{inProgressTasks}</div>
          <span className="text-sm font-normal text-muted-foreground mt-0.5 block">Contractors on-site</span>
        </div>

        <div className="p-3.5 bg-muted/20 rounded-lg border border-border">
          <span className="text-sm font-medium text-muted-foreground block uppercase tracking-wider">Pending Verification</span>
          <div className="text-xl font-semibold text-foreground mt-1">{pendingVerifyTasks}</div>
          <span className="text-sm font-normal text-muted-foreground mt-0.5 block">Awaiting sign-off</span>
        </div>

        <div className="p-3.5 bg-muted/20 rounded-lg border border-border">
          <span className="text-sm font-medium text-muted-foreground block uppercase tracking-wider">Resolved & Verified</span>
          <div className="text-xl font-semibold text-foreground mt-1">{completedTasks}</div>
          <span className="text-sm font-normal text-muted-foreground mt-0.5 block">Passed inspection</span>
        </div>

        <div className="p-3.5 bg-muted/20 rounded-lg border border-border">
          <span className="text-sm font-medium text-muted-foreground block uppercase tracking-wider">Overdue SLA Warning</span>
          <div className="text-xl font-semibold text-destructive mt-1">{overdueTasks}</div>
          <span className="text-sm font-normal text-muted-foreground mt-0.5 block">SLA exceeded</span>
        </div>
      </div>
    </Card>
  );
}
