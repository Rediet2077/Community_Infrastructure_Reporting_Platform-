"use client";

import React from "react";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { ExtensionRecord } from "../types/extension_types";

interface ExtensionsTableProps {
  extensions: ExtensionRecord[];
  isLoading: boolean;
  onApprove: (ext: ExtensionRecord) => void;
  onReject: (ext: ExtensionRecord) => void;
}

export function ExtensionsTable({
  extensions,
  isLoading,
  onApprove,
  onReject,
}: ExtensionsTableProps) {
  if (isLoading) {
    return <div className="p-8 text-center text-sm font-normal text-muted-foreground">Loading extension requests...</div>;
  }

  if (extensions.length === 0) {
    return (
      <div className="text-center py-8 text-sm font-normal text-muted-foreground">
        No extension requests currently logged.
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Task Code</TableHead>
            <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Report Code</TableHead>
            <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Asset Code</TableHead>
            <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Reason</TableHead>
            <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Original SLA</TableHead>
            <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Requested SLA</TableHead>
            <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Requestor</TableHead>
            <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Status</TableHead>
            <TableHead className="text-sm font-medium uppercase tracking-wider text-right text-muted-foreground">Review Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {extensions.map((ext) => (
            <TableRow key={ext.id} className="border-border hover:bg-muted/30 transition-colors">
              <TableCell className="text-sm font-medium text-foreground">
                {ext.task_code}
              </TableCell>
              <TableCell className="text-sm font-normal text-muted-foreground">
                {ext.report_code}
              </TableCell>
              <TableCell className="text-sm font-normal text-muted-foreground">
                {ext.asset_code}
              </TableCell>
              <TableCell className="text-sm font-normal text-foreground">
                {ext.reason_category}
              </TableCell>
              <TableCell className="text-sm font-normal text-muted-foreground">
                {ext.original_deadline}
              </TableCell>
              <TableCell className="text-sm font-medium text-foreground">
                {ext.requested_new_deadline}
              </TableCell>
              <TableCell className="text-sm font-normal text-muted-foreground">
                {ext.requested_by}
              </TableCell>
              <TableCell className="text-sm">
                {ext.status === "PENDING" && (
                  <Badge variant="outline" className="border-border bg-muted font-normal text-foreground text-sm py-0.5">
                    PENDING REVIEW
                  </Badge>
                )}
                {ext.status === "APPROVED" && (
                  <Badge variant="outline" className="border-border text-foreground bg-secondary text-sm font-normal py-0.5">
                    APPROVED
                  </Badge>
                )}
                {ext.status === "REJECTED" && (
                  <Badge variant="destructive" className="text-sm font-normal py-0.5">
                    REJECTED
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right text-sm">
                {ext.status === "PENDING" ? (
                  <div className="flex items-center justify-end gap-1.5">
                    <Button
                      size="sm"
                      className="h-8 text-sm font-medium"
                      onClick={() => onApprove(ext)}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-sm font-medium text-destructive hover:text-destructive"
                      onClick={() => onReject(ext)}
                    >
                      Reject
                    </Button>
                  </div>
                ) : (
                  <span className="text-sm font-normal text-muted-foreground">
                    Decided by {ext.decided_by || "Admin"}
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
