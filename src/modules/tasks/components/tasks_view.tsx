"use client";

import React from "react";
import { Card, CardContent } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Input } from "@/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { useTaskList } from "../hooks/list/use_task_list";
import { useTaskUIStore } from "../store/task_ui_store";
import { useNavigationStore } from "@/modules/shared/store/navigation_store";
import { TaskTableRow } from "./subcomponents/task_table_row";
import { UpdateTaskDialog } from "./dialogs/update_task_dialog";
import { CompleteTaskDialog } from "./dialogs/complete_task_dialog";
import { VerifyRejectTaskDialog } from "./dialogs/verify_reject_task_dialog";

export function TasksView() {
  const { selectedDepartmentFilter, currentUserRole, activeOfficerDepartmentId } = useNavigationStore();
  const effectiveDept = currentUserRole === "DEPARTMENT_ADMIN" ? activeOfficerDepartmentId : selectedDepartmentFilter;

  const { data: tasks, isLoading } = useTaskList(effectiveDept);
  const {
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    openUpdateProgressDialog,
    openCompleteTaskDialog,
    openVerifyRejectDialog,
  } = useTaskUIStore();

  const taskList = tasks || [];

  const tasksToDisplay = taskList.filter((task) => {
    const matchStatus = statusFilter === "all" || task.status === statusFilter;
    const matchSearch =
      searchQuery === "" ||
      task.task_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.asset_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assigned_worker_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.work_description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchStatus && matchSearch;
  });

  const pendingVerificationCount = taskList.filter(
    (t) => t.status === "COMPLETED_PENDING_VERIFICATION"
  ).length;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Maintenance Tasks & Work Orders
          </h1>
          <p className="text-sm font-normal text-muted-foreground mt-1">
            Execution pipeline of active work orders dispatched to municipal technicians and certified contractor firms.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm font-normal py-1 px-2.5 text-muted-foreground">
            {pendingVerificationCount} Pending Quality Sign-Off
          </Badge>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="border-border bg-card py-0 gap-0">
        <div className="p-4 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex-1 max-w-sm">
            <Input
              placeholder="Search task code, worker, asset..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 text-sm font-normal bg-background"
            />
          </div>

          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || "all")}>
              <SelectTrigger className="h-9 text-sm font-normal w-48">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-sm font-normal">All Statuses</SelectItem>
                <SelectItem value="ASSIGNED" className="text-sm font-normal">Assigned</SelectItem>
                <SelectItem value="IN_PROGRESS" className="text-sm font-normal">In Progress</SelectItem>
                <SelectItem value="COMPLETED_PENDING_VERIFICATION" className="text-sm font-normal">Verify Pending</SelectItem>
                <SelectItem value="RESOLVED" className="text-sm font-normal">Resolved</SelectItem>
                <SelectItem value="RETURNED" className="text-sm font-normal">Returned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Data Table */}
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-sm font-normal text-muted-foreground">Loading maintenance tasks...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Task Code</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Report Code</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Asset Code</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Department</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Assigned To</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Priority</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Progress</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Status</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Deadline</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-right text-muted-foreground">Workflow Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasksToDisplay.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8 text-sm font-normal text-muted-foreground">
                      No operational tasks match the criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  tasksToDisplay.map((task) => (
                    <TaskTableRow
                      key={task.id}
                      task={task}
                      onOpenUpdate={openUpdateProgressDialog}
                      onOpenComplete={openCompleteTaskDialog}
                      onOpenVerify={openVerifyRejectDialog}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <UpdateTaskDialog />
      <CompleteTaskDialog />
      <VerifyRejectTaskDialog />
    </div>
  );
}
