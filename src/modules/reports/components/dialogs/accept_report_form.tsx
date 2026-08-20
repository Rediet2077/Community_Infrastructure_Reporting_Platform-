"use client";

import React, { useState } from "react";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { ReportPriority } from "@/modules/shared/types/enums";
import { useAcceptReport } from "../../hooks/update/use_accept_report";
import { ReportRecord } from "../../types/report_types";
import { StaffContractorRecord } from "@/modules/contractors/types/contractor_types";

interface AcceptReportFormProps {
  report: ReportRecord;
  staffContractors: StaffContractorRecord[];
  onClose: () => void;
}

export function AcceptReportForm({ report, staffContractors, onClose }: AcceptReportFormProps) {
  const acceptReportMutation = useAcceptReport();

  const [priority, setPriority] = useState<ReportPriority>(report.priority || "HIGH");
  const [assignedWorkerId, setAssignedWorkerId] = useState<string>(
    staffContractors[0]?.id || ""
  );
  const [deadlineDate, setDeadlineDate] = useState<string>("2026-08-20");
  const [workDescription, setWorkDescription] = useState<string>(
    "Inspect infrastructure damage, isolate fault, deploy replacement parts and perform functional verification."
  );
  const [internalNote, setInternalNote] = useState<string>(
    "Replacement parts requested from central depot. Verify contractor crew adherence to municipal safety protocols."
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await acceptReportMutation.mutateAsync({
      reportId: report.id,
      priority,
      assignedWorkerId: assignedWorkerId || (staffContractors[0]?.id || "worker-el-01"),
      deadlineDate,
      workDescription,
      internalNote,
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-2">
      {/* Target Asset Reference */}
      <div className="p-3 bg-muted/30 rounded-lg border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
        <div>
          <span className="text-sm text-muted-foreground block font-normal">Target Infrastructure Asset</span>
          <span className="font-medium text-foreground">
            {report.asset_code || "Unlinked Infrastructure"}
          </span>
          <span className="text-sm text-muted-foreground block font-normal">{report.department_name}</span>
        </div>
        <Badge variant="outline" className="text-sm font-normal py-0.5 self-start sm:self-auto">
          {report.category_name}
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Priority Assignment */}
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Assigned Priority SLA</Label>
          <Select
            value={priority}
            onValueChange={(val) => {
              if (val) setPriority(val as ReportPriority);
            }}
          >
            <SelectTrigger className="h-9 text-sm font-normal">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LOW" label="LOW (7-Day SLA)" className="text-sm font-normal">LOW (7-Day SLA)</SelectItem>
              <SelectItem value="MEDIUM" label="MEDIUM (3-Day SLA)" className="text-sm font-normal">MEDIUM (3-Day SLA)</SelectItem>
              <SelectItem value="HIGH" label="HIGH (48-Hour SLA)" className="text-sm font-normal">HIGH (48-Hour SLA)</SelectItem>
              <SelectItem value="CRITICAL" label="CRITICAL (12-Hour SLA)" className="text-sm font-normal">CRITICAL (12-Hour SLA)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Assign Field Technician / Contractor</Label>
          <Select
            value={assignedWorkerId}
            onValueChange={(val) => {
              if (val) setAssignedWorkerId(val);
            }}
          >
            <SelectTrigger className="h-9 text-sm font-normal">
              <SelectValue placeholder="Select Assignee" />
            </SelectTrigger>
            <SelectContent>
              {staffContractors.map((worker) => (
                <SelectItem key={worker.id} value={worker.id} label={`${worker.name} (${worker.is_contractor ? "Contractor" : "Staff"})`} className="text-sm font-normal">
                  {worker.name} ({worker.is_contractor ? "Contractor" : "Staff"})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Deadline */}
      <div className="space-y-1.5">
        <Label className="text-sm font-medium">Expected Completion Deadline Date</Label>
        <Input
          type="date"
          value={deadlineDate}
          onChange={(e) => setDeadlineDate(e.target.value)}
          className="h-9 text-sm font-normal"
          required
        />
      </div>

      {/* Work Description */}
      <div className="space-y-1.5">
        <Label className="text-sm font-medium">Field Work Order Instructions</Label>
        <Textarea
          value={workDescription}
          onChange={(e) => setWorkDescription(e.target.value)}
          className="text-sm font-normal min-h-[70px]"
          required
        />
      </div>

      {/* Internal Notes */}
      <div className="space-y-1.5">
        <Label className="text-sm font-medium">Internal Operations Note</Label>
        <Input
          value={internalNote}
          onChange={(e) => setInternalNote(e.target.value)}
          className="h-9 text-sm font-normal"
        />
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2 pt-3 border-t border-border">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onClose}
          className="w-full sm:w-auto h-9 text-sm font-normal"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          size="sm"
          disabled={acceptReportMutation.isPending}
          className="w-full sm:w-auto h-9 text-sm font-medium"
        >
          {acceptReportMutation.isPending ? "Accepting..." : "Confirm Intake & Dispatch Task"}
        </Button>
      </div>
    </form>
  );
}
