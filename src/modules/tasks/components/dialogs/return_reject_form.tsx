"use client";

import React, { useState } from "react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
import { useReturnRejectTask } from "../../hooks/update/use_return_reject_task";

interface ReturnRejectFormProps {
  taskId: string;
  onClose: () => void;
}

export function ReturnRejectForm({ taskId, onClose }: ReturnRejectFormProps) {
  const returnRejectMutation = useReturnRejectTask();

  const [rejectOfficerName, setRejectOfficerName] = useState<string>("Eng. Mussie (Quality Inspector)");
  const [rejectReason, setRejectReason] = useState<string>(
    "Replacement lamp wattage insufficient. Electrical wiring junction not sealed against water ingress."
  );
  const [requiredCorrection, setRequiredCorrection] = useState<string>(
    "Re-fit 150W IP66 rated LED luminaire and seal conduit junction box with weatherproof gasket."
  );
  const [newExpectedDate, setNewExpectedDate] = useState<string>("2026-08-22");

  const handleReject = async (e: React.FormEvent) => {
    e.preventDefault();
    await returnRejectMutation.mutateAsync({
      taskId,
      officerName: rejectOfficerName,
      reason: rejectReason,
      requiredCorrection,
      newExpectedDate,
    });
    onClose();
  };

  return (
    <form onSubmit={handleReject} className="flex flex-col gap-4 py-3">
      <div className="space-y-1.5">
        <Label className="text-xs font-semibold">Auditing Inspector Name</Label>
        <Input
          required
          value={rejectOfficerName}
          onChange={(e) => setRejectOfficerName(e.target.value)}
          className="h-9 text-xs"
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-semibold">Failure / Rejection Reason</Label>
        <Textarea
          required
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          className="text-xs min-h-[60px]"
          placeholder="State non-compliance, test failure, or incomplete item..."
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-semibold">Mandatory Correction Required</Label>
        <Textarea
          required
          value={requiredCorrection}
          onChange={(e) => setRequiredCorrection(e.target.value)}
          className="text-xs min-h-[60px]"
          placeholder="Specify exact corrections technician must execute..."
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-semibold">New Mandatory Due Date</Label>
        <Input
          required
          type="date"
          value={newExpectedDate}
          onChange={(e) => setNewExpectedDate(e.target.value)}
          className="h-9 text-xs"
        />
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2 pt-2 border-t border-border">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onClose}
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="destructive"
          size="sm"
          disabled={returnRejectMutation.isPending}
          className="w-full sm:w-auto"
        >
          {returnRejectMutation.isPending ? "Returning..." : "Return Task for Rework"}
        </Button>
      </div>
    </form>
  );
}
