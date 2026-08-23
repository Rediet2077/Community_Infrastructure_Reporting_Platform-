"use client";

import React, { useState } from "react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
import { useVerifyResolveTask } from "../../hooks/update/use_verify_resolve_task";

interface VerifyResolveFormProps {
  taskId: string;
  onClose: () => void;
}

export function VerifyResolveForm({ taskId, onClose }: VerifyResolveFormProps) {
  const verifyResolveMutation = useVerifyResolveTask();

  const [officerName, setOfficerName] = useState<string>("Sara Hailu (Department Director)");
  const [resolutionNotes, setResolutionNotes] = useState<string>(
    "On-site inspection completed. Work verified against municipal infrastructure standard. Restored to active operational service."
  );

  const handleApprove = async (e: React.FormEvent) => {
    e.preventDefault();
    await verifyResolveMutation.mutateAsync({
      taskId,
      officerName,
      resolutionNotes,
    });
    onClose();
  };

  return (
    <form onSubmit={handleApprove} className="flex flex-col gap-4 py-3">
      <div className="space-y-1.5">
        <Label className="text-xs font-semibold">Inspecting Officer Name</Label>
        <Input
          required
          value={officerName}
          onChange={(e) => setOfficerName(e.target.value)}
          className="h-9 text-xs"
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-semibold">Verification & Resolution Notes</Label>
        <Textarea
          required
          value={resolutionNotes}
          onChange={(e) => setResolutionNotes(e.target.value)}
          className="text-xs min-h-[80px]"
          placeholder="Record on-site findings, test results, and authorization to close report..."
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
          size="sm"
          disabled={verifyResolveMutation.isPending}
          className="w-full sm:w-auto"
        >
          {verifyResolveMutation.isPending ? "Resolving..." : "Approve & Resolve Incident"}
        </Button>
      </div>
    </form>
  );
}
