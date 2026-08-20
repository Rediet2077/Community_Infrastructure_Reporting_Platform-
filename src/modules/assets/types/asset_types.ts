import { z } from "zod";
import {
  AssetRecordSchema,
  AssetRecord,
  AssetTypeDefinitionSchema,
  AssetSpecificData,
} from "@/modules/shared/types/cirp_schema";
import { AssetTypeKey, AssetStatus, AssetCondition } from "@/modules/shared/types/enums";

export { AssetRecordSchema };

export type {
  AssetRecord,
  AssetSpecificData,
  AssetTypeKey,
  AssetStatus,
  AssetCondition,
};

export const AssetListResponseSchema = z.array(AssetRecordSchema);
export type AssetListResponse = z.infer<typeof AssetListResponseSchema>;

export const AssetTypeListResponseSchema = z.array(AssetTypeDefinitionSchema);
export type AssetTypeListResponse = z.infer<typeof AssetTypeListResponseSchema>;

const RegisterAssetInputSchema = AssetRecordSchema.omit({
  id: true,
  registered_at: true,
  updated_at: true,
  active_reports_count: true,
});
export type RegisterAssetInput = z.infer<typeof RegisterAssetInputSchema>;
