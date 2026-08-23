"use client";

import React from "react";
import { TableRow, TableCell } from "@/ui/table";
import { Badge } from "@/ui/badge";
import { StaffContractorRecord } from "../../types/contractor_types";

interface ContractorsTableRowProps {
  staff: StaffContractorRecord;
}

export function ContractorsTableRow({ staff }: ContractorsTableRowProps) {
  return (
    <TableRow className="border-border hover:bg-muted/30 transition-colors">
      <TableCell className="text-sm font-medium text-foreground">
        {staff.name}
      </TableCell>
      <TableCell className="text-sm font-normal text-muted-foreground whitespace-nowrap">
        {staff.phone_number}
      </TableCell>
      <TableCell className="text-sm font-normal text-muted-foreground">
        {staff.email}
      </TableCell>
      <TableCell className="text-sm">
        <Badge variant={staff.is_contractor ? "outline" : "secondary"} className="text-sm font-normal py-0.5">
          {staff.is_contractor ? "Contractor" : "Municipal Staff"}
        </Badge>
      </TableCell>
      <TableCell className="text-sm font-normal text-foreground">
        {staff.contractor_company_name || "—"}
      </TableCell>
      <TableCell className="text-sm font-medium text-foreground">
        {staff.department_name}
      </TableCell>
      <TableCell className="text-sm font-normal text-foreground">
        {staff.specialization}
      </TableCell>
      <TableCell className="text-center text-sm font-medium text-foreground">
        {staff.active_tasks_count}
      </TableCell>
      <TableCell className="text-center text-sm font-semibold text-foreground">
        <span>{staff.performance_score}%</span>
      </TableCell>
      <TableCell className="text-right text-sm">
        {staff.is_available ? (
          <Badge variant="outline" className="border-border text-foreground bg-secondary text-sm font-normal py-0.5">
            Available
          </Badge>
        ) : (
          <Badge variant="destructive" className="text-sm font-normal py-0.5">
            At Capacity
          </Badge>
        )}
      </TableCell>
    </TableRow>
  );
}
