"use client";

import React from "react";
import { TableRow, TableCell } from "@/ui/table";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { ArrowSquareOutIcon, CheckIcon } from "@phosphor-icons/react";
import { getPriorityBadge, getReportStatusBadge } from "@/modules/shared/components/triage_badges";
import { ReportRecord as CitizenReportItem } from "../../types/report_types";

interface ReportTableRowProps {
  report: CitizenReportItem;
  onOpenAccept: (id: string) => void;
  onOpenDetails: (id: string) => void;
}

export function ReportTableRow({ report, onOpenAccept, onOpenDetails }: ReportTableRowProps) {
  return (
    <TableRow className="border-border hover:bg-muted/30 transition-colors">
      <TableCell className="font-medium text-sm">
        {report.report_code}
      </TableCell>
      <TableCell className="text-sm font-medium text-foreground">
        {report.title}
      </TableCell>
      <TableCell className="text-sm font-normal text-muted-foreground">
        {report.category_name}
      </TableCell>
      <TableCell className="text-sm">
        {report.asset_code ? (
          <span className="font-medium text-foreground">{report.asset_code}</span>
        ) : (
          <Badge variant="outline" className="text-sm font-normal text-muted-foreground border-dashed">
            Unlinked
          </Badge>
        )}
      </TableCell>
      <TableCell className="text-sm font-normal text-foreground">
        {report.department_name}
      </TableCell>
      <TableCell className="text-sm">
        {getPriorityBadge(report.priority)}
      </TableCell>
      <TableCell className="text-sm">
        {getReportStatusBadge(report.status)}
      </TableCell>
      <TableCell className="text-sm font-normal text-muted-foreground">
        {report.submitted_at.split(" ")[0]}
      </TableCell>
      <TableCell className="text-right text-sm">
        <div className="flex items-center justify-end gap-1">
          {report.status === "NEW" && (
            <Button
              size="sm"
              className="h-8 text-sm font-medium gap-1"
              onClick={() => onOpenAccept(report.id)}
            >
              <CheckIcon className="w-3.5 h-3.5" />
              Accept
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-sm text-primary font-normal gap-1"
            onClick={() => onOpenDetails(report.id)}
          >
            <span>Details</span>
            <ArrowSquareOutIcon className="w-3.5 h-3.5" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
