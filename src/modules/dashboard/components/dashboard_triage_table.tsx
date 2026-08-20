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
import { ReportRecord } from "@/modules/reports/types/report_types";

interface DashboardTriageTableProps {
  reports: ReportRecord[];
  totalReportsCount: number;
  onAcceptReport: (reportId: string) => void;
  onViewReport: (reportId: string) => void;
}

export function DashboardTriageTable({
  reports,
  totalReportsCount,
  onAcceptReport,
  onViewReport,
}: DashboardTriageTableProps) {
  return (
    <Card className="border-border bg-card flex flex-col justify-between">
      <div>
        <CardHeader className="p-4 pb-3 border-b border-border flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold text-foreground">
            Incoming Incident Reports (Triage)
          </CardTitle>
          <Link href="/dashboard/reports">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-sm text-muted-foreground hover:text-foreground font-normal p-0 hover:bg-transparent"
            >
              View All ({totalReportsCount})
            </Button>
          </Link>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Report Code
                </TableHead>
                <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Title
                </TableHead>
                <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Category
                </TableHead>
                <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Priority
                </TableHead>
                <TableHead className="text-sm font-medium uppercase tracking-wider text-right text-muted-foreground">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.slice(0, 4).map((report) => (
                <TableRow
                  key={report.id}
                  className="border-border hover:bg-muted/30"
                >
                  <TableCell className="font-medium text-sm text-foreground">
                    {report.report_code}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-foreground">
                    {report.title}
                  </TableCell>
                  <TableCell className="text-sm font-normal text-muted-foreground">
                    {report.category_name}
                  </TableCell>
                  <TableCell className="text-sm">
                    <Badge variant="outline" className="text-sm font-normal py-0.5">
                      {report.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    <div className="flex items-center justify-end gap-1">
                      {report.status === "NEW" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-sm font-medium"
                          onClick={() => onAcceptReport(report.id)}
                        >
                          Accept
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-sm text-muted-foreground hover:text-foreground font-normal"
                          onClick={() => onViewReport(report.id)}
                        >
                          View
                        </Button>
                      )}
                    </div>
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
