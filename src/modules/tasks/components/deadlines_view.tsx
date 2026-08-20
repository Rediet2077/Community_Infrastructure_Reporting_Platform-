"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/ui/alert";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { useTaskList } from "../hooks/list/use_task_list";
import { useNavigationStore } from "@/modules/shared/store/navigation_store";
import { TaskRecord } from "../types/task_types";

export function DeadlinesView() {
  const { selectedDepartmentFilter, currentUserRole, activeOfficerDepartmentId } = useNavigationStore();
  const effectiveDept = currentUserRole === "DEPARTMENT_ADMIN" ? activeOfficerDepartmentId : selectedDepartmentFilter;

  const { data: tasks, isLoading } = useTaskList(effectiveDept);

  const taskList = tasks || [];
  const overdueTasks = taskList.filter((t) => t.is_overdue && t.status !== "RESOLVED");

  const getDeadlineStatusBadge = (task: TaskRecord) => {
    if (task.status === "RESOLVED") {
      return <Badge variant="outline" className="border-border text-foreground bg-secondary text-sm font-normal py-0.5">COMPLETED</Badge>;
    }
    if (task.is_overdue) {
      return <Badge variant="destructive" className="font-medium text-sm py-0.5 animate-pulse">OVERDUE</Badge>;
    }
    if (task.extensions.some((e) => e.status === "APPROVED")) {
      return <Badge variant="secondary" className="font-normal text-sm py-0.5">EXTENDED</Badge>;
    }
    return <Badge variant="outline" className="border-border text-muted-foreground bg-muted text-sm font-normal py-0.5">DUE SOON</Badge>;
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Deadlines & Escalation Warnings
          </h1>
          <p className="text-sm font-normal text-muted-foreground mt-1">
            CIRP automated SLA monitoring engine tracks completion deadlines, overtime triggers, and citizen public delay alerts.
          </p>
        </div>

        <Link href="/dashboard/extensions">
          <Button
            size="sm"
            className="h-9 text-sm bg-primary text-primary-foreground font-medium"
          >
            Extension Requests Console
          </Button>
        </Link>
      </div>

      {/* Automatic Warning Banner */}
      {overdueTasks.length > 0 ? (
        <Alert variant="destructive" className="p-4">
          <AlertTitle className="text-base font-semibold">
            Automatic Warning Engine: {overdueTasks.length} Work Order(s) Overdue
          </AlertTitle>
          <AlertDescription className="text-sm font-normal mt-0.5">
            Current timestamp exceeds expected completion date. Overdue alerts are recorded in municipal audit logs.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert variant="default" className="p-4 border-border bg-secondary">
          <AlertTitle className="text-base font-semibold text-foreground">
            SLA Compliance Active
          </AlertTitle>
          <AlertDescription className="text-sm font-normal text-muted-foreground mt-0.5">
            All active municipal work orders are currently progressing within approved completion deadlines.
          </AlertDescription>
        </Alert>
      )}

      {/* Deadlines Table */}
      <Card className="border-border bg-card">
        <CardHeader className="p-4 pb-2 border-b border-border">
          <CardTitle className="text-base font-semibold text-foreground">
            Active Work Orders SLA Schedule
          </CardTitle>
          <CardDescription className="text-sm font-normal text-muted-foreground">
            Comparison between initial estimated target date and active legally binding SLA date.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-sm font-normal text-muted-foreground">Loading deadlines...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Task Code</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Asset Code</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Department</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Assigned To</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Original SLA</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Current Deadline</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Status</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-right text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {taskList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-sm font-normal text-muted-foreground">
                      No active tasks in database.
                    </TableCell>
                  </TableRow>
                ) : (
                  taskList.map((task) => (
                    <TableRow key={task.id} className="border-border hover:bg-muted/30 transition-colors">
                      <TableCell className="text-sm font-medium text-foreground">
                        {task.task_code}
                      </TableCell>
                      <TableCell className="text-sm font-normal text-muted-foreground">
                        {task.asset_code}
                      </TableCell>
                      <TableCell className="text-sm font-medium text-foreground">
                        {task.department_name}
                      </TableCell>
                      <TableCell className="text-sm font-normal text-muted-foreground">
                        {task.assigned_worker_name}
                      </TableCell>
                      <TableCell className="text-sm font-normal text-muted-foreground">
                        {task.original_deadline_date}
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        <span className={task.is_overdue ? "text-destructive" : "text-foreground"}>
                          {task.deadline_date}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm">
                        {getDeadlineStatusBadge(task)}
                      </TableCell>
                      <TableCell className="text-right text-sm">
                        {task.status !== "RESOLVED" && (
                          <Link href="/dashboard/extensions">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 text-sm font-normal"
                            >
                              Request Extension
                            </Button>
                          </Link>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
