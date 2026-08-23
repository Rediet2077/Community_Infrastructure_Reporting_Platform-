"use client";

import React from "react";
import { Card } from "@/ui/card";
import { AnalyticsMetrics } from "../../types/analytics_types";

interface AnalyticsKpiCardsProps {
  metrics?: AnalyticsMetrics;
}

export function AnalyticsKpiCards({ metrics }: AnalyticsKpiCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border-border bg-card p-4">
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider block">
          Avg Time to Intake
        </span>
        <div className="mt-2 text-2xl font-semibold text-foreground tracking-tight">
          {metrics?.avgIntakeHours || 2.3} hrs
        </div>
        <div className="text-sm font-normal text-muted-foreground mt-1">
          &darr; 35% faster with Asset ID routing
        </div>
      </Card>

      <Card className="border-border bg-card p-4">
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider block">
          Avg Resolution Time
        </span>
        <div className="mt-2 text-2xl font-semibold text-foreground tracking-tight">
          {metrics?.avgResolutionDays || 3.4} days
        </div>
        <div className="text-sm font-normal text-muted-foreground mt-1">Across all municipal domains</div>
      </Card>

      <Card className="border-border bg-card p-4">
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider block">
          SLA Compliance
        </span>
        <div className="mt-2 text-2xl font-semibold text-primary tracking-tight">
          {metrics?.slaCompliancePercent || 89.4}%
        </div>
        <div className="text-sm font-normal text-muted-foreground mt-1">Completed within target deadline</div>
      </Card>

      <Card className="border-border bg-card p-4">
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider block">
          AI Duplicate Savings
        </span>
        <div className="mt-2 text-2xl font-semibold text-foreground tracking-tight">
          {metrics?.aiDuplicateMerges || 142} Merges
        </div>
        <div className="text-sm font-normal text-muted-foreground mt-1">Triaged redundant crew dispatches</div>
      </Card>
    </div>
  );
}
