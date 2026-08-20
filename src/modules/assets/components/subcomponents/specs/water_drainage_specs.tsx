"use client";

import React from "react";
import { Input } from "@/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import { Field, FieldLabel, FieldError } from "@/ui/field";
import { useFormContext, Controller } from "react-hook-form";
import { AssetFormData } from "../../../types/asset_schemas";

export function WaterPointSpecsFields() {
  const { register, control, formState: { errors } } = useFormContext<AssetFormData>();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-6 gap-3">
      <Field className="sm:col-span-3" data-invalid={!!errors.wp_pipe_type}>
        <FieldLabel className="text-xs font-semibold">Infrastructure Type</FieldLabel>
        <Controller
          name="wp_pipe_type"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Distribution Main" className="text-xs">Distribution Main</SelectItem>
                <SelectItem value="Service Pipe" className="text-xs">Service Pipe</SelectItem>
                <SelectItem value="Public Kiosk" className="text-xs">Public Kiosk / Fountain</SelectItem>
                <SelectItem value="Fire Hydrant" className="text-xs">Fire Hydrant</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.wp_pipe_type]} />
      </Field>

      <Field className="sm:col-span-3" data-invalid={!!errors.wp_pipe_material}>
        <FieldLabel className="text-xs font-semibold">Primary Material</FieldLabel>
        <Controller
          name="wp_pipe_material"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="HDPE" className="text-xs">HDPE</SelectItem>
                <SelectItem value="Ductile Iron" className="text-xs">Ductile Iron</SelectItem>
                <SelectItem value="PVC" className="text-xs">PVC</SelectItem>
                <SelectItem value="Cast Iron" className="text-xs">Cast Iron</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.wp_pipe_material]} />
      </Field>

      <Field className="sm:col-span-2" data-invalid={!!errors.wp_pipe_diameter}>
        <FieldLabel className="text-xs font-semibold">Diameter (mm)</FieldLabel>
        <Input className="h-9 text-xs" {...register("wp_pipe_diameter")} />
        <FieldError errors={[errors.wp_pipe_diameter]} />
      </Field>

      <Field className="sm:col-span-2" data-invalid={!!errors.wp_flow_capacity}>
        <FieldLabel className="text-xs font-semibold">Flow Capacity (L/s)</FieldLabel>
        <Input className="h-9 text-xs" {...register("wp_flow_capacity")} />
        <FieldError errors={[errors.wp_flow_capacity]} />
      </Field>

      <Field className="sm:col-span-2" data-invalid={!!errors.wp_supply_source}>
        <FieldLabel className="text-xs font-semibold">Supply Source</FieldLabel>
        <Controller
          name="wp_supply_source"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Municipal Reservoir" className="text-xs">Municipal Reservoir</SelectItem>
                <SelectItem value="Deep Well" className="text-xs">Deep Well (Borehole)</SelectItem>
                <SelectItem value="Treatment Plant" className="text-xs">Direct Treatment Plant</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.wp_supply_source]} />
      </Field>
    </div>
  );
}

export function DrainageSpecsFields() {
  const { register, control, formState: { errors } } = useFormContext<AssetFormData>();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-6 gap-3">
      <Field className="sm:col-span-3" data-invalid={!!errors.dr_drain_type}>
        <FieldLabel className="text-xs font-semibold">Drainage System Type</FieldLabel>
        <Controller
          name="dr_drain_type"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Open Concrete Canal" className="text-xs">Open Concrete Canal</SelectItem>
                <SelectItem value="Underground Culvert" className="text-xs">Underground Culvert</SelectItem>
                <SelectItem value="Storm Sewer" className="text-xs">Closed Storm Sewer</SelectItem>
                <SelectItem value="Side Gutter" className="text-xs">Roadside Gutter</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.dr_drain_type]} />
      </Field>

      <Field className="sm:col-span-3" data-invalid={!!errors.dr_flow_direction}>
        <FieldLabel className="text-xs font-semibold">Outflow Direction</FieldLabel>
        <Controller
          name="dr_flow_direction"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="North-South" className="text-xs">North-South Gradient</SelectItem>
                <SelectItem value="East-West" className="text-xs">East-West Gradient</SelectItem>
                <SelectItem value="Towards River Basin" className="text-xs">Towards Main River Basin</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.dr_flow_direction]} />
      </Field>

      <Field className="sm:col-span-3" data-invalid={!!errors.dr_drain_width}>
        <FieldLabel className="text-xs font-semibold">Channel Width (m)</FieldLabel>
        <Input className="h-9 text-xs" {...register("dr_drain_width")} />
        <FieldError errors={[errors.dr_drain_width]} />
      </Field>

      <Field className="sm:col-span-3" data-invalid={!!errors.dr_drain_depth}>
        <FieldLabel className="text-xs font-semibold">Channel Depth (m)</FieldLabel>
        <Input className="h-9 text-xs" {...register("dr_drain_depth")} />
        <FieldError errors={[errors.dr_drain_depth]} />
      </Field>
    </div>
  );
}
