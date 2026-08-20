"use client";

import React from "react";
import { Card, CardDescription, CardTitle } from "@/ui/card";
import { Progress } from "@/ui/progress";
import { DepartmentRecord } from "@/modules/departments/types/department_types";

interface AnalyticsDeptBenchmarksProps {
  departments: DepartmentRecord[];
}

export function AnalyticsDeptBenchmarks({ departments }: AnalyticsDeptBenchmarksProps) {
  return (
    <Card className="border-border bg-card">
      <div className="p-4 border-b border-border">
        <CardTitle className="text-base font-semibold text-foreground">
          Department Performance & Resolution Benchmarks
        </CardTitle>
        <CardDescription className="text-sm font-normal text-muted-foreground mt-0.5">
          Operational efficiency breakdown across all municipal authorities.
        </CardDescription>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map((dept) => (
          <div key={dept.id} className="p-3.5 rounded-lg border border-border bg-card space-y-2.5 text-sm">
            <div className="flex items-center justify-between font-semibold">
              <span className="text-foreground">{dept.name}</span>
              <span className="text-primary">{dept.resolution_rate_percent}%</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-muted-foreground text-sm font-normal">
              <div>Intake SLA: <span className="text-foreground font-medium">{dept.avg_acceptance_hours}h</span></div>
              <div>Avg Resolution: <span className="text-foreground font-medium">{dept.avg_completion_days}d</span></div>
            </div>
            <Progress value={dept.resolution_rate_percent} className="h-2" />
          </div>
        ))}
      </div>
    </Card>
  );
}
