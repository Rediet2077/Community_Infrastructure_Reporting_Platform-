"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
import { useDecideExtension } from "../../hooks/update/use_decide_extension";
import { ExtensionRecord } from "../../types/extension_types";

interface DecisionReviewDialogProps {
  extension: ExtensionRecord | null;
  decisionMode: "APPROVE" | "REJECT";
  onClose: () => void;
}

export function DecisionReviewDialog({
  extension,
  decisionMode,
  onClose,
}: DecisionReviewDialogProps) {
  const decideExtensionMutation = useDecideExtension();
  const [decisionComment, setDecisionComment] = useState<string>(
    decisionMode === "APPROVE"
      ? "Approved after verifying supplier delivery delay certificate."
      : "Rejected due to lack of verifiable supplier or weather evidence."
  );
  const [decidedBy, setDecidedBy] = useState<string>("Eng. Dawit (Operations Director)");

  if (!extension) return null;

  const handleDecisionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await decideExtensionMutation.mutateAsync({
      extensionId: extension.id,
      approve: decisionMode === "APPROVE",
      decisionComment,
      decidedBy,
    });
    onClose();
  };

  return (
    <Dialog open={Boolean(extension)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[95vw] sm:max-w-md max-h-[85vh] sm:max-h-[90vh] overflow-y-auto border-border bg-card p-4 sm:p-6">
        <DialogHeader className="border-b border-border pb-4">
          <DialogTitle className="text-base font-semibold text-foreground">
            {decisionMode === "APPROVE" ? "Authorize Deadline Extension" : "Reject Extension Request"}
          </DialogTitle>
          <DialogDescription className="text-sm font-normal text-muted-foreground mt-0.5">
            Task <span className="font-medium text-primary">{extension.task_code}</span>. New target: <span className="font-medium text-foreground">{extension.requested_new_deadline}</span>.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleDecisionSubmit} className="flex flex-col gap-4 py-2">
          <div className="p-3 bg-muted/20 rounded-lg border border-border text-sm space-y-1">
            <span className="font-medium text-foreground">Contractor Justification:</span>
            <p className="text-muted-foreground font-normal">{extension.detailed_explanation}</p>
            {extension.supporting_evidence_note && (
              <p className="text-sm font-normal text-foreground pt-1">
                Evidence: {extension.supporting_evidence_note}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Deciding Officer Name</Label>
            <Input
              required
              value={decidedBy}
              onChange={(e) => setDecidedBy(e.target.value)}
              className="h-9 text-sm font-normal"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Official Review Comment / Audit Rationale</Label>
            <Textarea
              required
              value={decisionComment}
              onChange={(e) => setDecisionComment(e.target.value)}
              className="text-sm font-normal min-h-[70px]"
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2 pt-2 border-t border-border">
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
              variant={decisionMode === "APPROVE" ? "default" : "destructive"}
              disabled={decideExtensionMutation.isPending}
              className="w-full sm:w-auto h-9 text-sm font-medium"
            >
              {decisionMode === "APPROVE" ? "Confirm Approval" : "Confirm Rejection"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
