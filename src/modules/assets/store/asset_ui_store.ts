import { create } from "zustand";

interface AssetUIState {
  selectedAssetId: string | null;
  isDetailsDialogOpen: boolean;
  typeFilter: string;
  statusFilter: string;
  conditionFilter: string;
  searchCode: string;

  openDetailsDialog: (assetId: string) => void;
  closeDetailsDialog: () => void;
  setTypeFilter: (filter: string) => void;
  setStatusFilter: (filter: string) => void;
  setConditionFilter: (filter: string) => void;
  setSearchCode: (code: string) => void;
  resetFilters: () => void;
}

export const useAssetUIStore = create<AssetUIState>((set) => ({
  selectedAssetId: null,
  isDetailsDialogOpen: false,
  typeFilter: "all",
  statusFilter: "all",
  conditionFilter: "all",
  searchCode: "",

  openDetailsDialog: (assetId) => set({ selectedAssetId: assetId, isDetailsDialogOpen: true }),
  closeDetailsDialog: () => set({ selectedAssetId: null, isDetailsDialogOpen: false }),
  setTypeFilter: (filter) => set({ typeFilter: filter }),
  setStatusFilter: (filter) => set({ statusFilter: filter }),
  setConditionFilter: (filter) => set({ conditionFilter: filter }),
  setSearchCode: (code) => set({ searchCode: code }),
  resetFilters: () =>
    set({
      typeFilter: "all",
      statusFilter: "all",
      conditionFilter: "all",
      searchCode: "",
    }),
}));
