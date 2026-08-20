"use client";

import React from "react";
import { TableRow, TableCell } from "@/ui/table";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { ArrowSquareOutIcon } from "@phosphor-icons/react";
import { AssetRecord } from "../../types/asset_types";
import {
  getConditionBadge,
  getStatusBadge,
} from "./asset_table_badges";

interface AssetTableRowProps {
  asset: AssetRecord;
  onOpenDetails: (id: string) => void;
}

export function AssetTableRow({ asset, onOpenDetails }: AssetTableRowProps) {
  return (
    <TableRow className="border-border hover:bg-muted/30 transition-colors">
      <TableCell className="font-medium text-sm text-foreground">
        {asset.asset_code}
      </TableCell>
      <TableCell className="text-sm font-normal text-muted-foreground">
        {asset.asset_type_label}
      </TableCell>
      <TableCell className="text-sm font-medium text-foreground">
        {asset.name}
      </TableCell>
      <TableCell className="text-sm font-normal text-muted-foreground">
        {asset.department_name}
      </TableCell>
      <TableCell className="text-sm">
        {getStatusBadge(asset.status)}
      </TableCell>
      <TableCell className="text-sm">
        {getConditionBadge(asset.condition)}
      </TableCell>
      <TableCell className="text-sm font-normal text-muted-foreground">
        <span className="truncate max-w-[220px] block">{asset.address}</span>
      </TableCell>
      <TableCell className="text-center text-sm">
        {asset.active_reports_count > 0 ? (
          <Badge variant="destructive" className="font-medium text-sm h-6 px-2">
            {asset.active_reports_count}
          </Badge>
        ) : (
          <span className="text-muted-foreground text-sm font-normal">0</span>
        )}
      </TableCell>
      <TableCell className="text-right text-sm">
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-sm gap-1.5 font-medium"
          onClick={() => onOpenDetails(asset.id)}
        >
          <span>Specs</span>
          <ArrowSquareOutIcon className="w-3.5 h-3.5 text-muted-foreground" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
