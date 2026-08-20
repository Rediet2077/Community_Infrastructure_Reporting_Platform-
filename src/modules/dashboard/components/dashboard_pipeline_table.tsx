"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
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
import { TaskRecord } from "@/modules/tasks/types/task_types";

interface DashboardPipelineTableProps {
  tasks: TaskRecord[];
  totalTasksCount: number;
}

function getStatusLabel(status: string) {
  switch (status) {
    case "NEW":
      return "NEW";
    case "ACCEPTED":
      return "ACCEPTED";
    case "IN_PROGRESS":
      return "IN PROGRESS";
    case "COMPLETED_PENDING_VERIFICATION":
      return "VERIFY PENDING";
    case "RESOLVED":
      return "RESOLVED";
    default:
      return status;
  }
}

export function DashboardPipelineTable({
  tasks,
  totalTasksCount,
}: DashboardPipelineTableProps) {
  return (
    <Card className="border-border bg-card flex flex-col justify-between">
      <div>
        <CardHeader className="p-4 pb-3 border-b border-border flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold text-foreground">
            Active Dispatch Tasks Pipeline
          </CardTitle>
          <Link href="/dashboard/tasks">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-sm text-muted-foreground hover:text-foreground font-normal p-0 hover:bg-transparent"
            >
              View All ({totalTasksCount})
            </Button>
          </Link>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Task Code
                </TableHead>
                <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Asset Code
                </TableHead>
                <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Assigned To
                </TableHead>
                <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="text-sm font-medium uppercase tracking-wider text-right text-muted-foreground">
                  Deadline
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.slice(0, 4).map((task) => (
                <TableRow
                  key={task.id}
                  className="border-border hover:bg-muted/30"
                >
                  <TableCell className="text-sm font-medium text-foreground">
                    {task.task_code}
                  </TableCell>
                  <TableCell className="text-sm font-normal text-muted-foreground">
                    {task.asset_code}
                  </TableCell>
                  <TableCell className="text-sm font-normal text-foreground">
                    {task.assigned_worker_name}
                  </TableCell>
                  <TableCell className="text-sm">
                    <Badge variant="outline" className="text-sm font-normal py-0.5">
                      {getStatusLabel(task.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm font-normal">
                    <span className="text-foreground">
                      {task.deadline_date}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </div>
    </Card>
  );
}
