"use client";

import React from "react";
import { TableRow, TableCell } from "@/ui/table";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Progress } from "@/ui/progress";
import { getPriorityBadge } from "@/modules/shared/components/triage_badges";
import { TaskRecord } from "../../types/task_types";

interface TaskTableRowProps {
  task: TaskRecord;
  onOpenUpdate: (id: string) => void;
  onOpenComplete: (id: string) => void;
  onOpenVerify: (id: string) => void;
}

function getTaskStatusBadge(status: string) {
  switch (status) {
    case "ASSIGNED":
      return <Badge variant="outline" className="text-sm font-normal py-0.5">ASSIGNED</Badge>;
    case "IN_PROGRESS":
      return <Badge variant="secondary" className="text-sm font-normal py-0.5">IN PROGRESS</Badge>;
    case "COMPLETED_PENDING_VERIFICATION":
      return <Badge variant="outline" className="border-border bg-muted text-sm font-normal py-0.5">VERIFY PENDING</Badge>;
    case "RESOLVED":
      return <Badge variant="outline" className="border-border text-foreground bg-secondary text-sm font-normal py-0.5">RESOLVED</Badge>;
    case "RETURNED":
      return <Badge variant="destructive" className="text-sm font-normal py-0.5">REWORK</Badge>;
    default:
      return <Badge variant="secondary" className="text-sm font-normal py-0.5">{status}</Badge>;
  }
}

export function TaskTableRow({
  task,
  onOpenUpdate,
  onOpenComplete,
  onOpenVerify,
}: TaskTableRowProps) {
  return (
    <TableRow className="border-border hover:bg-muted/30 transition-colors">
      <TableCell className="text-sm font-medium text-foreground">
        {task.task_code}
      </TableCell>
      <TableCell className="text-sm font-normal text-muted-foreground">
        {task.report_code}
      </TableCell>
      <TableCell className="text-sm font-normal text-muted-foreground">
        {task.asset_code}
      </TableCell>
      <TableCell className="text-sm font-medium text-foreground">
        {task.department_name}
      </TableCell>
      <TableCell className="text-sm font-normal text-foreground">
        {task.assigned_worker_name}
      </TableCell>
      <TableCell className="text-sm">
        {getPriorityBadge(task.priority)}
      </TableCell>
      <TableCell className="text-sm w-36">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-sm font-normal">
            <span>{task.progress_percentage}%</span>
          </div>
          <Progress value={task.progress_percentage} className="h-1.5" />
        </div>
      </TableCell>
      <TableCell className="text-sm">
        {getTaskStatusBadge(task.status)}
      </TableCell>
      <TableCell className="text-sm font-normal">
        <span className={task.is_overdue ? "text-destructive font-medium" : "text-foreground"}>
          {task.deadline_date}
        </span>
      </TableCell>
      <TableCell className="text-right text-sm">
        <div className="flex items-center justify-end gap-1">
          {task.status !== "RESOLVED" && task.status !== "COMPLETED_PENDING_VERIFICATION" && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-sm font-normal"
              onClick={() => onOpenUpdate(task.id)}
            >
              Update
            </Button>
          )}
          {task.status === "IN_PROGRESS" && (
            <Button
              size="sm"
              className="h-8 text-sm font-medium"
              onClick={() => onOpenComplete(task.id)}
            >
              Complete
            </Button>
          )}
          {task.status === "COMPLETED_PENDING_VERIFICATION" && (
            <Button
              size="sm"
              className="h-8 text-sm font-medium"
              onClick={() => onOpenVerify(task.id)}
            >
              Verify
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
