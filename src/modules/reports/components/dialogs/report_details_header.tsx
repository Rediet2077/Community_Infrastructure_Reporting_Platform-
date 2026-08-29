"use client";

import React from "react";
import { DialogDescription, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import {
  CheckCircleIcon,
  DotIcon,
} from "@phosphor-icons/react";
import { getPriorityBadge, getReportStatusBadge } from "@/modules/shared/components/triage_badges";
import { ReportRecord } from "../../types/report_types";

interface ReportDetailsHeaderProps {
  report: ReportRecord;
  onAccept: () => void;
}

export function ReportDetailsHeader({ report, onAccept }: ReportDetailsHeaderProps) {
  return (
    <DialogHeader className="border-b border-border pb-4">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3">

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <DialogTitle className="text-base sm:text-lg font-semibold text-foreground">
                {report.report_code}
              </DialogTitle>
              {getReportStatusBadge(report.status)}
              {getPriorityBadge(report.priority)}
            </div>
            <DialogDescription className="text-sm font-normal text-muted-foreground flex flex-wrap items-center gap-1">
              <span>Category: {report.category_name}</span>
              <DotIcon weight="bold" className="size-4 text-muted-foreground" />
              <span>Submitted: {report.submitted_at}</span>
            </DialogDescription>
          </div>
        </div>

        {report.status === "NEW" && (
          <Button
            size="sm"
            className="h-9 text-sm gap-1.5 font-medium w-full sm:w-auto mt-2 sm:mt-0"
            onClick={onAccept}
          >
            <CheckCircleIcon weight="bold" className="size-4" />
            <span>Accept & Dispatch Task</span>
          </Button>
        )}
      </div>
    </DialogHeader>
  );
}
