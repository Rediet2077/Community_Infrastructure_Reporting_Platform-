"use client";

import { useAssetList } from "@/modules/assets/hooks/list/use_asset_list";
import { useReportList } from "@/modules/reports/hooks/list/use_report_list";
import { useTaskList } from "@/modules/tasks/hooks/list/use_task_list";
import { useDepartmentList } from "@/modules/departments/hooks/list/use_department_list";
import { useNavigationStore } from "@/modules/shared/store/navigation_store";
import { useReportUIStore } from "@/modules/reports/store/report_ui_store";
import { ReportDetailsDialog } from "@/modules/reports/components/dialogs/report_details_dialog";
import { AcceptReportDialog } from "@/modules/reports/components/dialogs/accept_report_dialog";
import { AssetDetailsDialog } from "@/modules/assets/components/dialogs/asset_details_dialog";
import { DashboardHeader } from "./dashboard_header";
import { DashboardKpiCards } from "./dashboard_kpi_cards";
import { DashboardTriageTable } from "./dashboard_triage_table";
import { DashboardPipelineTable } from "./dashboard_pipeline_table";

export function DashboardView() {
  const {
    selectedDepartmentFilter,
    currentUserRole,
    activeOfficerDepartmentId,
  } = useNavigationStore();

  const effectiveDept =
    currentUserRole === "DEPARTMENT_ADMIN"
      ? activeOfficerDepartmentId
      : selectedDepartmentFilter;

  const { data: assets } = useAssetList(effectiveDept);
  const { data: reports } = useReportList(effectiveDept);
  const { data: tasks } = useTaskList(effectiveDept);
  const { data: departments } = useDepartmentList();

  const { openDetailsDialog: openReportDetails, openAcceptDialog } =
    useReportUIStore();

  const assetList = assets || [];
  const reportList = reports || [];
  const taskList = tasks || [];
  const deptList = departments || [];

  const totalAssetsCount = assetList.length;
  const newReports = reportList.filter((r) => r.status === "NEW");
  const activeTasks = taskList.filter((t) => t.status !== "RESOLVED");
  const overdueTasks = taskList.filter(
    (t) => t.is_overdue && t.status !== "RESOLVED"
  );
  const resolvedReports = reportList.filter((r) => r.status === "RESOLVED");
  const dueSoonTasks = taskList.filter(
    (t) => !t.is_overdue && t.status !== "RESOLVED"
  );

  const currentDept = deptList.find((d) => d.id === effectiveDept);

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 w-full">
      <DashboardHeader
        currentUserRole={currentUserRole}
        departmentName={currentDept?.name}
      />

      <DashboardKpiCards
        totalAssetsCount={totalAssetsCount}
        newReportsCount={newReports.length}
        activeTasksCount={activeTasks.length}
        overdueTasksCount={overdueTasks.length}
        resolvedReportsCount={resolvedReports.length}
        dueSoonTasksCount={dueSoonTasks.length}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardTriageTable
          reports={reportList}
          totalReportsCount={reportList.length}
          onAcceptReport={openAcceptDialog}
          onViewReport={openReportDetails}
        />
        <DashboardPipelineTable
          tasks={taskList}
          totalTasksCount={taskList.length}
        />
      </div>

      <ReportDetailsDialog />
      <AcceptReportDialog />
      <AssetDetailsDialog />
    </div>
  );
}
