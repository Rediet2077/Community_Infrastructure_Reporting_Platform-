"use client";

import React from "react";
import { Badge } from "@/ui/badge";
import { useAnalyticsMetrics } from "../hooks/list/use_analytics_metrics";
import { useAssetList } from "@/modules/assets/hooks/list/use_asset_list";
import { useTaskList } from "@/modules/tasks/hooks/list/use_task_list";
import { useDepartmentList } from "@/modules/departments/hooks/list/use_department_list";
import { useNavigationStore } from "@/modules/shared/store/navigation_store";
import { AnalyticsKpiCards } from "./subcomponents/analytics_kpi_cards";
import { AnalyticsHealthCard } from "./subcomponents/analytics_health_card";
import { AnalyticsPipelineCard } from "./subcomponents/analytics_pipeline_card";
import { AnalyticsDeptBenchmarks } from "./subcomponents/analytics_dept_benchmarks";

export function AnalyticsView() {
  const { selectedDepartmentFilter, currentUserRole, activeOfficerDepartmentId } = useNavigationStore();
  const effectiveDept = currentUserRole === "DEPARTMENT_ADMIN" ? activeOfficerDepartmentId : selectedDepartmentFilter;

  const { data: metrics } = useAnalyticsMetrics();
  const { data: assets } = useAssetList(effectiveDept);
  const { data: tasks } = useTaskList(effectiveDept);
  const { data: departments } = useDepartmentList();

  const assetList = assets || [];
  const taskList = tasks || [];
  const deptList = departments || [];

  const conditionCounts = {
    EXCELLENT: assetList.filter((a) => a.condition === "EXCELLENT").length,
    GOOD: assetList.filter((a) => a.condition === "GOOD").length,
    FAIR: assetList.filter((a) => a.condition === "FAIR").length,
    POOR: assetList.filter((a) => a.condition === "POOR").length,
    CRITICAL: assetList.filter((a) => a.condition === "CRITICAL").length,
  };

  const completedTasks = taskList.filter((t) => t.status === "RESOLVED").length;
  const pendingVerifyTasks = taskList.filter((t) => t.status === "COMPLETED_PENDING_VERIFICATION").length;
  const inProgressTasks = taskList.filter((t) => t.status === "IN_PROGRESS").length;
  const overdueTasks = taskList.filter((t) => t.is_overdue).length;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Infrastructure & Operations Analytics
          </h1>
          <p className="text-sm font-normal text-muted-foreground mt-1">
            Data insights on physical infrastructure health, citizen reporting velocity, contractor performance, and resolution compliance.
          </p>
        </div>

        <Badge variant="outline" className="text-sm font-normal py-0.5 px-2.5 text-muted-foreground">
          Real-Time Telemetry & Reports
        </Badge>
      </div>

      <AnalyticsKpiCards metrics={metrics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsHealthCard totalAssets={assetList.length} conditionCounts={conditionCounts} />
        <AnalyticsPipelineCard
          totalTasks={taskList.length}
          inProgressTasks={inProgressTasks}
          pendingVerifyTasks={pendingVerifyTasks}
          completedTasks={completedTasks}
          overdueTasks={overdueTasks}
        />
      </div>

      <AnalyticsDeptBenchmarks departments={deptList} />
    </div>
  );
}
