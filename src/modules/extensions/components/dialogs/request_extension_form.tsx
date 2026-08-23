"use client";

import React, { useEffect } from "react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Field, FieldLabel, FieldError, FieldGroup } from "@/ui/field";
import { useRequestExtension } from "../../hooks/create/use_request_extension";
import { RequestExtensionInput } from "../../types/extension_types";
import { TaskRecord } from "@/modules/tasks/types/task_types";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestExtensionSchema, RequestExtensionFormData } from "../../types/extension_schemas";

interface ExtensionFormProps {
  task: TaskRecord;
  onClose: () => void;
  allowTaskSwitching?: boolean;
  allTasks?: TaskRecord[];
  onSelectTaskId?: (id: string) => void;
}

export function RequestExtensionForm({
  task,
  onClose,
  allowTaskSwitching = false,
  allTasks = [],
  onSelectTaskId,
}: ExtensionFormProps) {
  const requestExtensionMutation = useRequestExtension();

  const methods = useForm<RequestExtensionFormData>({
    resolver: zodResolver(requestExtensionSchema),
    defaultValues: {
      taskId: task.id,
      requestedNewDeadline: "2026-08-25",
      reasonCategory: "Waiting for spare parts",
      detailedExplanation: "Replacement high-pressure hydraulic valve delivery delayed due to regional transit logistics. Expected delivery within 72 hours.",
      supportingEvidenceNote: "Supplier purchase order #ORD-88190 and depot tracking dispatch slip verified.",
      requestedBy: task.assigned_worker_name || "Lead Contractor",
    },
  });

  const { register, handleSubmit, control, setValue, formState: { errors } } = methods;

  useEffect(() => {
    setValue("taskId", task.id);
  }, [task.id, setValue]);

  const onSubmit = async (data: RequestExtensionFormData) => {
    await requestExtensionMutation.mutateAsync({
      taskId: data.taskId,
      requestedNewDeadline: data.requestedNewDeadline,
      reasonCategory: data.reasonCategory as RequestExtensionInput["reasonCategory"],
      detailedExplanation: data.detailedExplanation,
      supportingEvidenceNote: data.supportingEvidenceNote || "",
      requestedBy: data.requestedBy,
    });
    onClose();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 py-2">
        <FieldGroup className="gap-3">
          {/* Work Order Selector */}
          {allowTaskSwitching && allTasks.length > 0 && (
            <Field data-invalid={!!errors.taskId}>
              <FieldLabel className="text-sm font-medium">Select Target Work Order</FieldLabel>
              <Controller
                name="taskId"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(val) => {
                      field.onChange(val);
                      if (val && onSelectTaskId) onSelectTaskId(val);
                    }}
                  >
                    <SelectTrigger className="h-9 text-sm font-normal">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {allTasks.map((t) => (
                        <SelectItem key={t.id} value={t.id} className="text-sm font-normal">
                          {t.task_code} - {t.asset_code} ({t.assigned_worker_name})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError errors={[errors.taskId]} />
            </Field>
          )}

          {/* Target Task Summary Card */}
          <div className="p-3 bg-muted/30 rounded-lg border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
            <div>
              <span className="text-sm text-muted-foreground block font-normal">Target Work Order</span>
              <span className="font-medium text-foreground">{task.task_code}</span>
              <span className="text-sm text-muted-foreground block font-normal">{task.asset_code} &bull; {task.department_name}</span>
            </div>
            <div className="sm:text-right">
              <span className="text-sm text-muted-foreground block font-normal">Current SLA Deadline</span>
              <span className="font-medium text-foreground">{task.deadline_date}</span>
            </div>
          </div>

          {/* Requested New Deadline */}
          <Field data-invalid={!!errors.requestedNewDeadline}>
            <FieldLabel className="text-sm font-medium">Requested New Deadline Date</FieldLabel>
            <Input
              type="date"
              className="h-9 text-sm font-normal"
              {...register("requestedNewDeadline")}
            />
            <FieldError errors={[errors.requestedNewDeadline]} />
          </Field>

          {/* Reason Category */}
          <Field data-invalid={!!errors.reasonCategory}>
            <FieldLabel className="text-sm font-medium">SLA Delay Justification Category</FieldLabel>
            <Controller
              name="reasonCategory"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-9 text-sm font-normal">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Waiting for spare parts" className="text-sm font-normal">
                      Waiting for spare parts / depot logistics
                    </SelectItem>
                    <SelectItem value="Severe weather / Environmental condition" className="text-sm font-normal">
                      Severe weather / Torrential rains
                    </SelectItem>
                    <SelectItem value="Specialized equipment delivery delay" className="text-sm font-normal">
                      Specialized equipment (Crane/Milling machine)
                    </SelectItem>
                    <SelectItem value="Access / Obstruction clearance required" className="text-sm font-normal">
                      Site access / Underground utility obstruction
                    </SelectItem>
                    <SelectItem value="Additional technician crew needed" className="text-sm font-normal">
                      Additional specialist crew needed
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[errors.reasonCategory]} />
          </Field>

          {/* Detailed Explanation */}
          <Field data-invalid={!!errors.detailedExplanation}>
            <FieldLabel className="text-sm font-medium">Technical Justification</FieldLabel>
            <Textarea
              className="text-sm font-normal min-h-[70px]"
              {...register("detailedExplanation")}
            />
            <FieldError errors={[errors.detailedExplanation]} />
          </Field>

          {/* Supporting Evidence */}
          <Field data-invalid={!!errors.supportingEvidenceNote}>
            <FieldLabel className="text-sm font-medium">Supporting Reference / Evidence Note</FieldLabel>
            <Input
              className="h-9 text-sm font-normal"
              placeholder="e.g. Depot Requisition #9921, Rain alert bulletin..."
              {...register("supportingEvidenceNote")}
            />
            <FieldError errors={[errors.supportingEvidenceNote]} />
          </Field>

          {/* Requestor Name */}
          <Field data-invalid={!!errors.requestedBy}>
            <FieldLabel className="text-sm font-medium">Requesting Contractor Lead / Technician Name</FieldLabel>
            <Input
              className="h-9 text-sm font-normal"
              {...register("requestedBy")}
            />
            <FieldError errors={[errors.requestedBy]} />
          </Field>
        </FieldGroup>

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
            disabled={requestExtensionMutation.isPending}
            className="w-full sm:w-auto h-9 text-sm font-medium"
          >
            {requestExtensionMutation.isPending ? "Submitting..." : "Submit Extension Request"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
