import { create } from "zustand";
import { AssetRecord } from "../types/map_types";

interface MapUIState {
  layerFilter: string;
  selectedPinAsset: AssetRecord | null;
  setLayerFilter: (layer: string) => void;
  setSelectedPinAsset: (asset: AssetRecord | null) => void;
}

export const useMapUIStore = create<MapUIState>((set) => ({
  layerFilter: "all",
  selectedPinAsset: null,
  setLayerFilter: (layer) => set({ layerFilter: layer }),
  setSelectedPinAsset: (asset) => set({ selectedPinAsset: asset }),
}));
