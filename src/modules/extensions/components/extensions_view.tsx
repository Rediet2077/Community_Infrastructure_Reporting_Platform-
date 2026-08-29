"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/ui/alert";
import { Button } from "@/ui/button";
import {
  ClockIcon,
  ShieldCheckIcon,
  PlusIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react";
import { useExtensionList } from "../hooks/list/use_extension_list";
import { useNavigationStore } from "@/modules/shared/store/navigation_store";
import { useExtensionUIStore } from "../store/extension_ui_store";
import { RequestExtensionDialog } from "./dialogs/request_extension_dialog";
import { DecisionReviewDialog } from "./dialogs/decision_review_dialog";
import { ExtensionsTable } from "./extensions_table";
import { ExtensionRecord } from "../types/extension_types";

export function ExtensionsView() {
  const { selectedDepartmentFilter, currentUserRole, activeOfficerDepartmentId } = useNavigationStore();
  const effectiveDept = currentUserRole === "DEPARTMENT_ADMIN" ? activeOfficerDepartmentId : selectedDepartmentFilter;

  const { data: extensions, isLoading } = useExtensionList(effectiveDept);
  const { openRequestDialog } = useExtensionUIStore();

  const [selectedExtension, setSelectedExtension] = useState<ExtensionRecord | null>(null);
  const [decisionMode, setDecisionMode] = useState<"APPROVE" | "REJECT">("APPROVE");

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Deadline Extensions & Approval Workflow
          </h1>
          <p className="text-sm font-normal text-muted-foreground mt-1">
            Formal accountability protocol for deadline adjustments. Requires verifiable justification and authorized officer approval.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            className="h-9 text-sm font-medium gap-1.5"
            onClick={() => openRequestDialog()}
          >
            <PlusIcon weight="bold" className="size-3.5" />
            <span>New Extension Request</span>
          </Button>

          <Link href="/dashboard/deadlines">
            <Button
              size="sm"
              variant="outline"
              className="h-9 text-sm font-medium gap-1.5"
            >
              <ClockIcon weight="bold" className="size-3.5 text-primary" />
              <span>Deadlines Schedule</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Extension Accountability Rules Alert */}
      <Alert className="border-border bg-card">
        <ShieldCheckIcon weight="bold" className="size-4 text-primary" />
        <AlertTitle className="text-base font-semibold text-foreground">
          Extension Governance & SLA Integrity
        </AlertTitle>
        <AlertDescription className="text-sm font-normal text-muted-foreground mt-1 leading-relaxed">
          Departments cannot silently modify deadlines. Every adjustment requires: Original Deadline <ArrowRightIcon className="inline size-3 mx-0.5 text-primary" /> Extension Requested <ArrowRightIcon className="inline size-3 mx-0.5 text-primary" /> Reason Category <ArrowRightIcon className="inline size-3 mx-0.5 text-primary" /> Authorized Officer Review <ArrowRightIcon className="inline size-3 mx-0.5 text-primary" /> Permanent Audit Trail.
        </AlertDescription>
      </Alert>

      {/* Extensions Table */}
      <Card className="border-border bg-card">
        <CardHeader className="p-4 pb-2 border-b border-border">
          <CardTitle className="text-base font-semibold text-foreground">
            Extension Requests Log & Decisions
          </CardTitle>
          <CardDescription className="text-sm font-normal text-muted-foreground">
            Review contractor deadline extension requests with formal approval/rejection sign-off.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <ExtensionsTable
            extensions={extensions || []}
            isLoading={isLoading}
            onApprove={(ext) => {
              setSelectedExtension(ext);
              setDecisionMode("APPROVE");
            }}
            onReject={(ext) => {
              setSelectedExtension(ext);
              setDecisionMode("REJECT");
            }}
          />
        </CardContent>
      </Card>

      <DecisionReviewDialog
        extension={selectedExtension}
        decisionMode={decisionMode}
        onClose={() => setSelectedExtension(null)}
      />

      <RequestExtensionDialog />
    </div>
  );
}
