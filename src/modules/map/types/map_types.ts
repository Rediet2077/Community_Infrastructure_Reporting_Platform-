import { AssetRecord } from "@/modules/shared/types/cirp_schema";

export type { AssetRecord };

interface MapPinData {
  id: string;
  code: string;
  name: string;
  type: string;
  status: string;
  condition: string;
  latitude: number;
  longitude: number;
  address: string;
}
