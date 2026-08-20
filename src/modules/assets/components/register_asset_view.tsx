"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { useAssetFormState } from "../hooks/ux/use_asset_form_state";
import { AssetClassificationCard } from "./subcomponents/asset_classification_card";
import { AssetGisCard } from "./subcomponents/asset_gis_card";
import { AssetSpecsCard } from "./subcomponents/asset_specs_card";
import { FormProvider } from "react-hook-form";

export function RegisterAssetView() {
  const form = useAssetFormState();

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Register New Physical Asset</h1>
          <p className="text-sm font-normal text-muted-foreground mt-1">
            Complete multi-attribute asset intake form with class-specific engineering parameters and precise GIS anchoring.
          </p>
        </div>
        <Link href="/dashboard/all-assets">
          <Button variant="outline" size="sm" className="h-9 text-sm font-medium">Cancel & Return</Button>
        </Link>
      </div>

      {form.isSuccess ? (
        <Card className="border-border bg-card p-8 text-center flex flex-col items-center justify-center gap-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Asset Registered Successfully!</h3>
            <p className="text-sm font-normal text-muted-foreground mt-1">
              Asset has been indexed into the GIS database and assigned to the municipal department.
            </p>
          </div>
        </Card>
      ) : (
        <FormProvider {...form.methods}>
          <form onSubmit={form.onSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              <AssetClassificationCard
                assetType={form.assetType}
                onTypeChange={form.handleTypeChange}
                departments={form.departments}
                assetTypes={form.assetTypes}
              />

              <div className="flex flex-col gap-6 justify-between">
                <AssetGisCard />

                <AssetSpecsCard assetType={form.assetType} />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Link href="/dashboard/all-assets">
                <Button type="button" variant="outline" className="h-9 text-sm font-normal">Cancel</Button>
              </Link>
              <Button type="submit" disabled={form.isPending} className="h-9 text-sm font-medium">
                {form.isPending ? "Indexing Asset..." : "Confirm Asset Registration"}
              </Button>
            </div>
          </form>
        </FormProvider>
      )}
    </div>
  );
}
