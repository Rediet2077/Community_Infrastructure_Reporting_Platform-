"use client";

import React from "react";
import { TableBody, TableRow, TableCell } from "@/ui/table";
import { StaffContractorRecord } from "../../types/contractor_types";
import { ContractorsTableRow } from "./contractors_table_row";

interface ContractorsTableBodyProps {
  isLoading: boolean;
  contractors: StaffContractorRecord[];
}

export function ContractorsTableBody({
  isLoading,
  contractors,
}: ContractorsTableBodyProps) {
  if (isLoading) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={10} className="text-center py-12 text-sm font-normal text-muted-foreground">
            Loading contractors and technical personnel...
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (contractors.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={10} className="text-center py-12 text-sm font-normal text-muted-foreground">
            No technicians or contractors match the search filters.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {contractors.map((staff) => (
        <ContractorsTableRow key={staff.id} staff={staff} />
      ))}
    </TableBody>
  );
}
