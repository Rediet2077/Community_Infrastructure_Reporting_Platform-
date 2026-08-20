"use client";

import React from "react";
import { Card, CardContent } from "@/ui/card";
import { Table } from "@/ui/table";
import { StaffContractorRecord } from "../../types/contractor_types";
import { ContractorsFilterBar } from "./contractors_filter_bar";
import { ContractorsTableHeader } from "./contractors_table_header";
import { ContractorsTableBody } from "./contractors_table_body";
import { ContractorsTableFooter } from "./contractors_table_footer";

interface ContractorsTableProps {
  isLoading: boolean;
  contractors: StaffContractorRecord[];
  totalCount: number;
}

export function ContractorsTable({
  isLoading,
  contractors,
  totalCount,
}: ContractorsTableProps) {
  return (
    <Card className="border-border bg-card py-0 gap-0">
      <ContractorsFilterBar />
      <CardContent className="p-0">
        <Table>
          <ContractorsTableHeader />
          <ContractorsTableBody
            isLoading={isLoading}
            contractors={contractors}
          />
          {!isLoading && contractors.length > 0 && (
            <ContractorsTableFooter
              contractors={contractors}
              totalCount={totalCount}
            />
          )}
        </Table>
      </CardContent>
    </Card>
  );
}
