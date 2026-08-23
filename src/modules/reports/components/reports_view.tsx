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
import { useReportList } from "../hooks/list/use_report_list";
import { useReportUIStore } from "../store/report_ui_store";
import { useNavigationStore } from "@/modules/shared/store/navigation_store";
import { ReportTableRow } from "./subcomponents/report_table_row";
import { ReportDetailsDialog } from "./dialogs/report_details_dialog";
import { AcceptReportDialog } from "./dialogs/accept_report_dialog";

export function ReportsView() {
  const { selectedDepartmentFilter, currentUserRole, activeOfficerDepartmentId } = useNavigationStore();
  const effectiveDept = currentUserRole === "DEPARTMENT_ADMIN" ? activeOfficerDepartmentId : selectedDepartmentFilter;

  const { data: reports, isLoading } = useReportList(effectiveDept);
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    openDetailsDialog,
    openAcceptDialog,
  } = useReportUIStore();

  const reportList = reports || [];

  const filteredReports = reportList.filter((report) => {
    const matchesSearch =
      report.report_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (report.asset_code && report.asset_code.toLowerCase().includes(searchQuery.toLowerCase())) ||
      report.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || report.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Citizen Incident Reports & Triage
          </h1>
          <p className="text-sm font-normal text-muted-foreground mt-1">
            Incoming public infrastructure malfunction reports with AI category categorization, duplicate suppression, and SLA intake.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="border-border bg-card py-0 gap-0">
        <div className="p-4 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex-1 max-w-sm">
            <Input
              placeholder="Search report #, title, asset..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 text-sm font-normal bg-background"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || "all")}>
              <SelectTrigger className="h-9 text-sm font-normal w-40">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-sm font-normal">All Statuses</SelectItem>
                <SelectItem value="NEW" className="text-sm font-normal">New (Pending)</SelectItem>
                <SelectItem value="ACCEPTED" className="text-sm font-normal">Accepted</SelectItem>
                <SelectItem value="IN_PROGRESS" className="text-sm font-normal">In Progress</SelectItem>
                <SelectItem value="COMPLETED_PENDING_VERIFICATION" className="text-sm font-normal">Pending Verification</SelectItem>
                <SelectItem value="RESOLVED" className="text-sm font-normal">Resolved</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={(val) => setPriorityFilter(val || "all")}>
              <SelectTrigger className="h-9 text-sm font-normal w-40">
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-sm font-normal">All Priorities</SelectItem>
                <SelectItem value="CRITICAL" className="text-sm font-normal">Critical</SelectItem>
                <SelectItem value="HIGH" className="text-sm font-normal">High</SelectItem>
                <SelectItem value="MEDIUM" className="text-sm font-normal">Medium</SelectItem>
                <SelectItem value="LOW" className="text-sm font-normal">Low</SelectItem>
              </SelectContent>
            </Select>

            <Badge variant="outline" className="text-sm font-normal h-9 px-2.5 flex items-center text-muted-foreground">
              {filteredReports.length} of {reportList.length} Reports
            </Badge>
          </div>
        </div>

        {/* Reports Table */}
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-sm font-normal text-muted-foreground">Loading reports triage list...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Report Code</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Title</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Category</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Linked Asset</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Department</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Priority</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Status</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Submitted</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-right text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-sm font-normal text-muted-foreground">
                      No citizen reports match the active search or filter criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReports.map((report) => (
                    <ReportTableRow
                      key={report.id}
                      report={report}
                      onOpenAccept={openAcceptDialog}
                      onOpenDetails={openDetailsDialog}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <ReportDetailsDialog />
      <AcceptReportDialog />
    </div>
  );
}
