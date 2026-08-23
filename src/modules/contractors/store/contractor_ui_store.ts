import { create } from "zustand";

interface ContractorUIState {
  searchQuery: string;
  typeFilter: string; // "all" | "contractor" | "staff"
  isAddDialogOpen: boolean;
  setSearchQuery: (query: string) => void;
  setTypeFilter: (filter: string) => void;
  setIsAddDialogOpen: (isOpen: boolean) => void;
}

export const useContractorUIStore = create<ContractorUIState>((set) => ({
  searchQuery: "",
  typeFilter: "all",
  isAddDialogOpen: false,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setTypeFilter: (filter) => set({ typeFilter: filter }),
  setIsAddDialogOpen: (isOpen) => set({ isAddDialogOpen: isOpen }),
}));
