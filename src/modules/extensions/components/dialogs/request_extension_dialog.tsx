"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";

import { useTaskDetails } from "@/modules/tasks/hooks/items/use_task_details";
import { useTaskList } from "@/modules/tasks/hooks/list/use_task_list";
import { useExtensionUIStore } from "../../store/extension_ui_store";
import { RequestExtensionForm } from "./request_extension_form";

export function RequestExtensionDialog() {
  const { isRequestDialogOpen, selectedTaskId, closeRequestDialog, openRequestDialog } = useExtensionUIStore();
  const { data: selectedTask } = useTaskDetails(selectedTaskId);
  const { data: taskList } = useTaskList();

  const effectiveTask = selectedTask || (taskList && taskList[0]);

  return (
    <Dialog open={isRequestDialogOpen} onOpenChange={(open) => !open && closeRequestDialog()}>
      <DialogContent className="w-[95vw] sm:max-w-lg max-h-[85vh] sm:max-h-[90vh] overflow-y-auto border-border bg-card p-4 sm:p-6">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div>
              <DialogTitle className="text-base font-semibold text-foreground">
                Request Deadline Extension
              </DialogTitle>
              <DialogDescription className="text-sm font-normal text-muted-foreground mt-0.5">
                Formal extension request with justification and evidence note. Requires department officer review.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {effectiveTask ? (
          <RequestExtensionForm
            key={effectiveTask.id}
            task={effectiveTask}
            onClose={closeRequestDialog}
            allowTaskSwitching={!selectedTaskId}
            allTasks={taskList || []}
            onSelectTaskId={(id) => openRequestDialog(id)}
          />
        ) : (
          <div className="p-4 text-center text-sm font-normal text-muted-foreground">
            No work order found to request extension for.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
