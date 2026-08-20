"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
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
import { useAssetList } from "../hooks/list/use_asset_list";
import { useAssetTypeList } from "../hooks/list/use_asset_type_list";
import { useAssetUIStore } from "../store/asset_ui_store";
import { useNavigationStore } from "@/modules/shared/store/navigation_store";
import { AssetTableRow } from "./subcomponents/asset_table_row";
import { AssetDetailsDialog } from "./dialogs/asset_details_dialog";

export function AssetsView() {
  const { selectedDepartmentFilter, currentUserRole, activeOfficerDepartmentId } = useNavigationStore();
  const effectiveDept = currentUserRole === "DEPARTMENT_ADMIN" ? activeOfficerDepartmentId : selectedDepartmentFilter;

  const { data: assets, isLoading } = useAssetList(effectiveDept);
  const { data: assetTypes } = useAssetTypeList();
  const { openDetailsDialog } = useAssetUIStore();

  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedType, setSelectedType] = React.useState<string>("all");
  const [selectedStatus, setSelectedStatus] = React.useState<string>("all");

  const assetList = assets || [];
  const typeList = assetTypes || [];

  const filteredAssets = assetList.filter((asset) => {
    const matchesSearch =
      asset.asset_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === "all" || asset.asset_type_id === selectedType;
    const matchesStatus = selectedStatus === "all" || asset.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Municipal Asset Registry
          </h1>
          <p className="text-sm font-normal text-muted-foreground mt-1">
            Standardized GIS-tracked physical municipal infrastructure with class-specific specifications and condition logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/dashboard/register-asset">
            <Button
              size="sm"
              className="text-sm font-medium h-9"
            >
              Register New Asset
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="border-border bg-card py-0 gap-0">
        <div className="p-4 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex-1 max-w-sm">
            <Input
              placeholder="Search code, name, street..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 text-sm font-normal bg-background"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Select
              value={selectedType}
              onValueChange={(val) => {
                if (val) setSelectedType(val);
              }}
            >
              <SelectTrigger className="h-9 text-sm font-normal w-40 bg-background">
                <SelectValue placeholder="All Asset Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-sm font-normal">All Types</SelectItem>
                {typeList.map((t) => (
                  <SelectItem key={t.id} value={t.id} className="text-sm font-normal">
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedStatus}
              onValueChange={(val) => {
                if (val) setSelectedStatus(val);
              }}
            >
              <SelectTrigger className="h-9 text-sm font-normal w-36 bg-background">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-sm font-normal">All Statuses</SelectItem>
                <SelectItem value="ACTIVE" className="text-sm font-normal">Active</SelectItem>
                <SelectItem value="UNDER_MAINTENANCE" className="text-sm font-normal">Maintenance</SelectItem>
                <SelectItem value="DAMAGED" className="text-sm font-normal">Damaged</SelectItem>
                <SelectItem value="INACTIVE" className="text-sm font-normal">Inactive</SelectItem>
                <SelectItem value="DECOMMISSIONED" className="text-sm font-normal">Decommissioned</SelectItem>
              </SelectContent>
            </Select>

            <Badge variant="outline" className="text-sm font-normal h-9 px-2.5 flex items-center text-muted-foreground">
              {filteredAssets.length} of {assetList.length} Units
            </Badge>
          </div>
        </div>

        {/* Data Table */}
        <div className="p-0 overflow-x-auto">
          {isLoading ? (
            <div className="p-8 text-center text-sm font-normal text-muted-foreground">Loading asset register...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Asset Code</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Asset Type</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Name</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Department</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Status</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Condition</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-muted-foreground">GIS Location</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-center text-muted-foreground">Incidents</TableHead>
                  <TableHead className="text-sm font-medium uppercase tracking-wider text-right text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-sm font-normal text-muted-foreground">
                      No assets match the active search or filter criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAssets.map((asset) => (
                    <AssetTableRow
                      key={asset.id}
                      asset={asset}
                      onOpenDetails={openDetailsDialog}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </Card>

      <AssetDetailsDialog />
    </div>
  );
}
