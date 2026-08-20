"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { useTaskDetails } from "../../hooks/items/use_task_details";
import { useTaskUIStore } from "../../store/task_ui_store";
import { VerifyResolveForm } from "./verify_resolve_form";
import { ReturnRejectForm } from "./return_reject_form";

export function VerifyRejectTaskDialog() {
  const { selectedTaskId, isVerifyRejectDialogOpen, closeVerifyRejectDialog } = useTaskUIStore();
  const { data: task } = useTaskDetails(selectedTaskId);

  if (!selectedTaskId || !task) return null;

  return (
    <Dialog open={isVerifyRejectDialogOpen} onOpenChange={(open) => !open && closeVerifyRejectDialog()}>
      <DialogContent className="w-[95vw] sm:max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto border-border bg-card p-4 sm:p-6">
        <DialogHeader className="border-b border-border pb-4">
          <div>
            <DialogTitle className="text-base font-semibold text-foreground">
              Officer Quality Inspection & Verification
            </DialogTitle>
            <DialogDescription className="text-sm font-normal text-muted-foreground mt-0.5">
              Task <span className="font-medium text-primary">{task.task_code}</span> submitted by {task.completion_submission?.submitted_by || task.assigned_worker_name}.
            </DialogDescription>
          </div>
        </DialogHeader>

        {/* Submitted Evidence Preview */}
        {task.completion_submission && (
          <div className="p-3.5 bg-muted/20 rounded-lg border border-border flex flex-col gap-2 text-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="font-medium text-foreground">Contractor Completion Notes</span>
              <span className="text-sm text-muted-foreground font-normal">{task.completion_submission.completion_date}</span>
            </div>
            <p className="text-sm font-normal text-muted-foreground">{task.completion_submission.completion_notes}</p>
          </div>
        )}

        {/* Action Tabs: Approve vs Return/Reject */}
        <Tabs defaultValue="approve" className="w-full pt-1">
          <TabsList className="grid w-full grid-cols-2 bg-muted/40 p-1 border border-border">
            <TabsTrigger value="approve" className="text-sm font-medium">
              Approve & Mark Resolved
            </TabsTrigger>
            <TabsTrigger value="reject" className="text-sm font-medium text-destructive">
              Reject / Return for Rework
            </TabsTrigger>
          </TabsList>

          <TabsContent value="approve">
            <VerifyResolveForm taskId={task.id} onClose={closeVerifyRejectDialog} />
          </TabsContent>

          <TabsContent value="reject">
            <ReturnRejectForm taskId={task.id} onClose={closeVerifyRejectDialog} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
