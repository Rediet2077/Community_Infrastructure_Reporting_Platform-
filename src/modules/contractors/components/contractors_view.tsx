"use client";

import React from "react";
import { useContractorList } from "../hooks/list/use_contractor_list";
import { useContractorUIStore } from "../store/contractor_ui_store";
import { useNavigationStore } from "@/modules/shared/store/navigation_store";
import { AddContractorDialog } from "./dialogs/add_contractor_dialog";
import { ContractorsHeader } from "./contractors_header";
import { ContractorsKpiCards } from "./contractors_kpi_cards";
import { ContractorsTable } from "./table/contractors_table";

export function ContractorsView() {
  const { selectedDepartmentFilter, currentUserRole, activeOfficerDepartmentId } = useNavigationStore();
  const effectiveDept = currentUserRole === "DEPARTMENT_ADMIN" ? activeOfficerDepartmentId : selectedDepartmentFilter;

  const { data: staffContractors, isLoading } = useContractorList(effectiveDept);
  const { searchQuery, typeFilter } = useContractorUIStore();

  const list = staffContractors || [];

  const staffToDisplay = list.filter((staff) => {
    const matchType =
      typeFilter === "all" ||
      (typeFilter === "contractor" && staff.is_contractor) ||
      (typeFilter === "staff" && !staff.is_contractor);

    const matchSearch =
      searchQuery === "" ||
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.department_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (staff.contractor_company_name &&
        staff.contractor_company_name.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchType && matchSearch;
  });

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 w-full">
      <ContractorsHeader />
      <ContractorsKpiCards contractors={list} />
      <ContractorsTable
        isLoading={isLoading}
        contractors={staffToDisplay}
        totalCount={list.length}
      />
      <AddContractorDialog />
    </div>
  );
}
