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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { UpdateTaskProgressInput } from "../../types/task_types";
import { useTaskDetails } from "../../hooks/items/use_task_details";
import { useUpdateTaskProgress } from "../../hooks/update/use_update_task_progress";
import { useTaskUIStore } from "../../store/task_ui_store";
import { TaskRecord } from "../../types/task_types";

interface UpdateTaskFormProps {
  task: TaskRecord;
  onClose: () => void;
}

function UpdateTaskForm({ task, onClose }: UpdateTaskFormProps) {
  const updateProgressMutation = useUpdateTaskProgress();

  const [progressPercentage, setProgressPercentage] = useState<number>(
    task.progress_percentage || 25
  );
  const [newStatus, setNewStatus] = useState<UpdateTaskProgressInput["newStatus"]>(
    task.status === "ASSIGNED" ? "IN_PROGRESS" : task.status
  );
  const [workNotes, setWorkNotes] = useState<string>(
    "Field repair crew deployed. Diagnosing electrical circuit integrity and replacing damaged components."
  );
  const [authorName, setAuthorName] = useState<string>(
    task.assigned_worker_name || "Lead Field Technician"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProgressMutation.mutateAsync({
      taskId: task.id,
      progressPercentage,
      newStatus,
      progressNote: workNotes,
      authorName,
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-2">
      <div className="space-y-1.5">
        <Label className="text-sm font-medium">Current Progress ({progressPercentage}%)</Label>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <Input
            type="number"
            min={0}
            max={100}
            value={progressPercentage}
            onChange={(e) => setProgressPercentage(parseInt(e.target.value, 10) || 0)}
            className="h-9 text-sm font-normal w-full sm:w-24"
            required
          />
          <span className="text-sm font-normal text-muted-foreground">Percentage completion (0 - 100%)</span>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-sm font-medium">Workflow Status</Label>
        <Select
          value={newStatus}
          onValueChange={(val) => {
            if (val) setNewStatus(val as UpdateTaskProgressInput["newStatus"]);
          }}
        >
          <SelectTrigger className="h-9 text-sm font-normal">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ASSIGNED" className="text-sm font-normal">ASSIGNED</SelectItem>
            <SelectItem value="IN_PROGRESS" className="text-sm font-normal">IN PROGRESS</SelectItem>
            <SelectItem value="RETURNED" className="text-sm font-normal">RETURNED (Blockers)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-sm font-medium">Updating Technician / Lead Name</Label>
        <Input
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          className="h-9 text-sm font-normal"
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-sm font-medium">Execution Progress Log Note</Label>
        <Textarea
          value={workNotes}
          onChange={(e) => setWorkNotes(e.target.value)}
          className="text-sm font-normal min-h-[80px]"
          placeholder="Describe technical work accomplished during this shift..."
          required
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
          disabled={updateProgressMutation.isPending}
          className="w-full sm:w-auto h-9 text-sm font-medium"
        >
          {updateProgressMutation.isPending ? "Updating..." : "Save Progress"}
        </Button>
      </div>
    </form>
  );
}

export function UpdateTaskDialog() {
  const { selectedTaskId, isUpdateProgressDialogOpen, closeUpdateProgressDialog } = useTaskUIStore();
  const { data: task } = useTaskDetails(selectedTaskId);

  if (!selectedTaskId || !task) return null;

  return (
    <Dialog open={isUpdateProgressDialogOpen} onOpenChange={(open) => !open && closeUpdateProgressDialog()}>
      <DialogContent className="w-[95vw] sm:max-w-md max-h-[85vh] sm:max-h-[90vh] overflow-y-auto border-border bg-card p-4 sm:p-6">
        <DialogHeader className="border-b border-border pb-4">
          <div>
            <DialogTitle className="text-base font-semibold text-foreground">
              Update Task Work Progress
            </DialogTitle>
            <DialogDescription className="text-sm font-normal text-muted-foreground mt-0.5">
              Log live execution milestones for work order <span className="font-medium text-primary">{task.task_code}</span>.
            </DialogDescription>
          </div>
        </DialogHeader>

        <UpdateTaskForm
          key={task.id}
          task={task}
          onClose={closeUpdateProgressDialog}
        />
      </DialogContent>
    </Dialog>
  );
}
