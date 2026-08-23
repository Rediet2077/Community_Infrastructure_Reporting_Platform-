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
import { useTaskDetails } from "../../hooks/items/use_task_details";
import { useSubmitTaskCompletion } from "../../hooks/update/use_submit_task_completion";
import { useTaskUIStore } from "../../store/task_ui_store";
import { TaskRecord } from "../../types/task_types";

interface CompleteTaskFormProps {
  task: TaskRecord;
  onClose: () => void;
}

function CompleteTaskForm({ task, onClose }: CompleteTaskFormProps) {
  const submitCompletionMutation = useSubmitTaskCompletion();

  const [completionNotes, setCompletionNotes] = useState<string>(
    "All scheduled physical repairs completed in compliance with municipal quality standards. Cleaned work site and performed operational testing."
  );
  const [completionDate, setCompletionDate] = useState<string>("2026-08-18");
  const [submittedBy, setSubmittedBy] = useState<string>(
    task.assigned_worker_name || "Lead Contractor / Technician"
  );
  const [beforePhotoUrl, setBeforePhotoUrl] = useState<string>(
    "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80"
  );
  const [afterPhotoUrl, setAfterPhotoUrl] = useState<string>(
    "https://images.unsplash.com/photo-1590402494587-44b71d7772f6?w=600&auto=format&fit=crop&q=80"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitCompletionMutation.mutateAsync({
      taskId: task.id,
      completionNotes,
      completionDate,
      submittedBy,
      beforePhotos: beforePhotoUrl ? [beforePhotoUrl] : [],
      afterPhotos: afterPhotoUrl ? [afterPhotoUrl] : [],
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-2">
      <div className="p-3 bg-secondary rounded-lg border border-border text-sm font-normal text-foreground">
        Contractor / field staff submission initiates municipal quality audit. Resolution takes effect once verified by a Department Officer.
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Field Completion Sign-Off Date</Label>
          <Input
            type="date"
            value={completionDate}
            onChange={(e) => setCompletionDate(e.target.value)}
            className="h-9 text-sm font-normal"
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Submitting Lead / Technician</Label>
          <Input
            value={submittedBy}
            onChange={(e) => setSubmittedBy(e.target.value)}
            className="h-9 text-sm font-normal"
            required
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-sm font-medium">Work Completion Report & Actions Undertaken</Label>
        <Textarea
          value={completionNotes}
          onChange={(e) => setCompletionNotes(e.target.value)}
          className="text-sm font-normal min-h-[80px]"
          required
        />
      </div>

      {/* Proof of Work Photo URLs */}
      <div className="space-y-3 pt-2 border-t border-border">
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider block">
          Photo Evidence of Physical Repair (Before / After)
        </span>

        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Initial Condition (Before Repair)</Label>
          <Input
            value={beforePhotoUrl}
            onChange={(e) => setBeforePhotoUrl(e.target.value)}
            className="h-9 text-sm font-normal"
            placeholder="https://..."
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Final Completed Condition (After Repair)</Label>
          <Input
            value={afterPhotoUrl}
            onChange={(e) => setAfterPhotoUrl(e.target.value)}
            className="h-9 text-sm font-normal"
            placeholder="https://..."
          />
        </div>
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
          disabled={submitCompletionMutation.isPending}
          className="w-full sm:w-auto h-9 text-sm font-medium"
        >
          {submitCompletionMutation.isPending ? "Submitting..." : "Submit Completion & Await Sign-Off"}
        </Button>
      </div>
    </form>
  );
}

export function CompleteTaskDialog() {
  const { selectedTaskId, isCompleteTaskDialogOpen, closeCompleteTaskDialog } = useTaskUIStore();
  const { data: task } = useTaskDetails(selectedTaskId);

  if (!selectedTaskId || !task) return null;

  return (
    <Dialog open={isCompleteTaskDialogOpen} onOpenChange={(open) => !open && closeCompleteTaskDialog()}>
      <DialogContent className="w-[95vw] sm:max-w-xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto border-border bg-card p-4 sm:p-6">
        <DialogHeader className="border-b border-border pb-4">
          <div>
            <DialogTitle className="text-base font-semibold text-foreground">
              Submit Task Completion Evidence
            </DialogTitle>
            <DialogDescription className="text-sm font-normal text-muted-foreground mt-0.5">
              Submits completion record for <span className="font-medium text-primary">{task.task_code}</span>. Task moves to <span className="font-medium text-foreground">COMPLETED_PENDING_VERIFICATION</span> awaiting officer inspection.
            </DialogDescription>
          </div>
        </DialogHeader>

        <CompleteTaskForm
          key={task.id}
          task={task}
          onClose={closeCompleteTaskDialog}
        />
      </DialogContent>
    </Dialog>
  );
}
