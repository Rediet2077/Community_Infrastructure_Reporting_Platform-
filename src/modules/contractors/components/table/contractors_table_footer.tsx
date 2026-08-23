"use client";

import React from "react";
import { TableFooter, TableRow, TableCell } from "@/ui/table";
import { StaffContractorRecord } from "../../types/contractor_types";

interface ContractorsTableFooterProps {
  contractors: StaffContractorRecord[];
  totalCount: number;
}

export function ContractorsTableFooter({
  contractors,
  totalCount,
}: ContractorsTableFooterProps) {
  const displayedCount = contractors.length;
  const availableCount = contractors.filter((s) => s.is_available).length;
  const totalActiveTasks = contractors.reduce((acc, curr) => acc + curr.active_tasks_count, 0);

  return (
    <TableFooter className="border-t border-border bg-muted/20">
      <TableRow className="border-border hover:bg-transparent">
        <TableCell colSpan={7} className="text-sm text-muted-foreground font-normal">
          Showing <span className="font-medium text-foreground">{displayedCount}</span> of{" "}
          <span className="font-medium text-foreground">{totalCount}</span> entities in roster
          ({availableCount} currently available for dispatch)
        </TableCell>
        <TableCell className="text-center text-sm font-medium text-foreground">
          {totalActiveTasks} Active Total
        </TableCell>
        <TableCell colSpan={2} className="text-right text-sm text-muted-foreground font-normal">
          Updated in real-time
        </TableCell>
      </TableRow>
    </TableFooter>
  );
}
