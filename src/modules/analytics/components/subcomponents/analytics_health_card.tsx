"use client";

import React from "react";
import { Card, CardTitle } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Progress } from "@/ui/progress";

interface ConditionCounts {
  EXCELLENT: number;
  GOOD: number;
  FAIR: number;
  POOR: number;
  CRITICAL: number;
}

interface AnalyticsHealthCardProps {
  totalAssets: number;
  conditionCounts: ConditionCounts;
}

export function AnalyticsHealthCard({ totalAssets, conditionCounts }: AnalyticsHealthCardProps) {
  const safeTotal = totalAssets || 1;

  return (
    <Card className="border-border bg-card p-5">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <CardTitle className="text-base font-semibold text-foreground">
          Infrastructure Physical Condition Health
        </CardTitle>
        <Badge variant="outline" className="text-sm font-normal">
          {totalAssets} Total Units
        </Badge>
      </div>

      <div className="space-y-4 pt-4">
        <div className="space-y-1.5">
          <div className="flex justify-between text-sm font-normal">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-primary inline-block" /> Excellent Condition
            </span>
            <span className="font-semibold text-foreground">{conditionCounts.EXCELLENT}</span>
          </div>
          <Progress value={(conditionCounts.EXCELLENT / safeTotal) * 100} className="h-2" />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-sm font-normal">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-primary/70 inline-block" /> Good (Normal Wear)
            </span>
            <span className="font-semibold text-foreground">{conditionCounts.GOOD}</span>
          </div>
          <Progress value={(conditionCounts.GOOD / safeTotal) * 100} className="h-2" />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-sm font-normal">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-secondary inline-block" /> Fair (Inspection Recommended)
            </span>
            <span className="font-semibold text-foreground">{conditionCounts.FAIR}</span>
          </div>
          <Progress value={(conditionCounts.FAIR / safeTotal) * 100} className="h-2" />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-sm font-normal">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-destructive/60 inline-block" /> Poor (Service Degradation)
            </span>
            <span className="font-semibold text-foreground">{conditionCounts.POOR}</span>
          </div>
          <Progress value={(conditionCounts.POOR / safeTotal) * 100} className="h-2" />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-sm font-normal">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-destructive inline-block" /> Critical (Structural Failure)
            </span>
            <span className="font-semibold text-destructive">{conditionCounts.CRITICAL}</span>
          </div>
          <Progress value={(conditionCounts.CRITICAL / safeTotal) * 100} className="h-2" />
        </div>
      </div>
    </Card>
  );
}
