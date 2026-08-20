"use client";

import React from "react";
import { Card, CardContent } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Input } from "@/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { useAuditLogList } from "../hooks/list/use_audit_log_list";
import { useAuditLogUIStore } from "../store/audit_log_ui_store";

export function AuditLogsView() {
  const { data: auditLogs, isLoading } = useAuditLogList();
  const { searchQuery, setSearchQuery, actionFilter, setActionFilter } = useAuditLogUIStore();

  const logs = auditLogs || [];

  const logsToDisplay = logs.filter((log) => {
    const matchAction = actionFilter === "all" || log.action_type === actionFilter;
    const matchSearch =
      searchQuery === "" ||
      log.officer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.target_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());

    return matchAction && matchSearch;
  });

  const getActionBadge = (actionType: string) => {
    switch (actionType) {
      case "REPORT_ACCEPTED":
        return <Badge variant="success" className="text-sm font-normal py-0.5">REPORT ACCEPTED</Badge>;
      case "TASK_COMPLETION_SUBMITTED":
        return <Badge variant="info" className="text-sm font-normal py-0.5">COMPLETION SUBMITTED</Badge>;
      case "TASK_VERIFIED_RESOLVED":
        return <Badge variant="success" className="text-sm font-normal py-0.5">VERIFIED RESOLVED</Badge>;
      case "TASK_RETURNED_REJECTED":
        return <Badge variant="destructive" className="text-sm font-normal py-0.5">TASK RETURNED</Badge>;
      case "EXTENSION_REQUESTED":
        return <Badge variant="warning" className="text-sm font-normal py-0.5">EXTENSION REQUESTED</Badge>;
      case "EXTENSION_APPROVED":
        return <Badge variant="success" className="text-sm font-normal py-0.5">EXTENSION APPROVED</Badge>;
      case "EXTENSION_REJECTED":
        return <Badge variant="destructive" className="text-sm font-normal py-0.5">EXTENSION REJECTED</Badge>;
      case "ASSET_REGISTERED":
        return <Badge variant="default" className="text-sm font-normal py-0.5">ASSET REGISTERED</Badge>;
      default:
        return <Badge variant="secondary" className="text-sm font-normal py-0.5">{actionType}</Badge>;
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Municipal Operations Audit Log
          </h1>
          <p className="text-sm font-normal text-muted-foreground mt-1">
            Immutable, traceable log of all intake decisions, contractor dispatches, deadline extensions, and quality verifications.
          </p>
        </div>

        <Badge variant="outline" className="text-sm font-normal py-0.5 px-2.5 text-muted-foreground">
          {logs.length} Recorded Audit Events
        </Badge>
      </div>

      {/* Filter Bar */}
      <Card className="border-border bg-card p-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search officer name, report #, task code..."
              className="h-9 text-sm font-normal bg-background"
            />
          </div>

          <Select value={actionFilter} onValueChange={(val) => setActionFilter(val || "all")}>
            <SelectTrigger className="h-9 text-sm font-normal">
              <SelectValue placeholder="All Action Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-sm font-normal">All Actions</SelectItem>
              <SelectItem value="REPORT_ACCEPTED" className="text-sm font-normal">Report Accepted</SelectItem>
              <SelectItem value="TASK_CREATED" className="text-sm font-normal">Task Created</SelectItem>
              <SelectItem value="TASK_PROGRESS_UPDATED" className="text-sm font-normal">Task Progress Updated</SelectItem>
              <SelectItem value="TASK_COMPLETION_SUBMITTED" className="text-sm font-normal">Task Completion Submitted</SelectItem>
              <SelectItem value="TASK_VERIFIED_RESOLVED" className="text-sm font-normal">Task Verified Resolved</SelectItem>
              <SelectItem value="TASK_RETURNED_REJECTED" className="text-sm font-normal">Task Returned / Rejected</SelectItem>
              <SelectItem value="EXTENSION_REQUESTED" className="text-sm font-normal">Extension Requested</SelectItem>
              <SelectItem value="EXTENSION_APPROVED" className="text-sm font-normal">Extension Approved</SelectItem>
              <SelectItem value="ASSET_REGISTERED" className="text-sm font-normal">Asset Registered</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Audit Log Table */}
      <Card className="border-border bg-card">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-sm font-normal text-muted-foreground">Loading audit log stream...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Timestamp</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Action Type</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Target Entity</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Actor</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Role</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Department</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Event Summary</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logsToDisplay.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-sm font-normal text-muted-foreground">
                      No audit events found matching filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  logsToDisplay.map((log) => (
                    <TableRow key={log.id} className="border-border hover:bg-muted/30 transition-colors">
                      <TableCell className="text-sm font-normal text-muted-foreground whitespace-nowrap">
                        {log.timestamp}
                      </TableCell>
                      <TableCell className="text-sm">
                        {getActionBadge(log.action_type)}
                      </TableCell>
                      <TableCell className="text-sm font-medium text-foreground">
                        {log.target_code}
                      </TableCell>
                      <TableCell className="text-sm font-medium text-foreground">
                        {log.officer_name}
                      </TableCell>
                      <TableCell className="text-sm font-normal text-muted-foreground">
                        {log.officer_role}
                      </TableCell>
                      <TableCell className="text-sm font-normal text-muted-foreground">
                        {log.department_name}
                      </TableCell>
                      <TableCell className="text-sm font-normal text-foreground">
                        {log.summary}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
