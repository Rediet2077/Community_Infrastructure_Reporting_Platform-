"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";

import { useReportDetails } from "../../hooks/items/use_report_details";
import { useReportUIStore } from "../../store/report_ui_store";
import { useContractorList } from "@/modules/contractors/hooks/list/use_contractor_list";
import { AcceptReportForm } from "./accept_report_form";

export function AcceptReportDialog() {
  const { selectedReportId, isAcceptDialogOpen, closeAcceptDialog } = useReportUIStore();
  const { data: report } = useReportDetails(selectedReportId);
  const { data: staffContractors } = useContractorList(report?.department_id);

  if (!selectedReportId || !report) return null;

  return (
    <Dialog open={isAcceptDialogOpen} onOpenChange={(open) => !open && closeAcceptDialog()}>
      <DialogContent className="w-[95vw] sm:max-w-xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto border-border bg-card p-4 sm:p-6">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div>
              <DialogTitle className="text-base font-semibold text-foreground">
                Accept Citizen Report & Dispatch Work Order
              </DialogTitle>
              <DialogDescription className="text-sm font-normal text-muted-foreground mt-0.5">
                Formal municipal intake of report <span className="font-medium text-primary">{report.report_code}</span>. Spawns an operational task with completion deadline.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <AcceptReportForm
          key={report.id}
          report={report}
          staffContractors={staffContractors || []}
          onClose={closeAcceptDialog}
        />
      </DialogContent>
    </Dialog>
  );
}
