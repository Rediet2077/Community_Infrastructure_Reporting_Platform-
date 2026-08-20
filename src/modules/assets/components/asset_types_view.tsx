import React from "react";
import Link from "next/link";
import { Card } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { useAssetTypeList } from "../hooks/list/use_asset_type_list";

export function AssetTypesView() {
  const { data: assetTypes, isLoading } = useAssetTypeList();

  const types = assetTypes || [];

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Municipal Asset Types Catalog
          </h1>
          <p className="text-sm font-normal text-muted-foreground mt-1">
            Standardized categories of physical infrastructure registered in CIRP with department routing rules.
          </p>
        </div>

        <Link href="/dashboard/register-asset">
          <Button
            size="sm"
            className="h-9 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Register Asset In Category
          </Button>
        </Link>
      </div>

      {/* Catalog Cards Grid */}
      {isLoading ? (
        <div className="p-8 text-center text-sm font-normal text-muted-foreground">Loading asset catalog...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {types.map((type) => (
            <Card key={type.id} className="border-border bg-card p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-foreground">{type.name}</h3>
                  <Badge variant="outline" className="border-border text-foreground bg-secondary text-sm font-normal py-0.5">
                    Active Type
                  </Badge>
                </div>
                <p className="text-sm font-normal text-muted-foreground mt-2 leading-relaxed">
                  {type.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border flex flex-col gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-normal">Responsible Dept:</span>
                  <span className="font-medium text-foreground">{type.responsible_department_name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-normal">GIS Coordinates:</span>
                  <span className="font-normal text-foreground">
                    {type.requires_location ? "Mandatory GPS Point" : "Optional"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-normal">Total In Database:</span>
                  <span className="font-semibold text-primary">{type.total_assets_count.toLocaleString()} Units</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
