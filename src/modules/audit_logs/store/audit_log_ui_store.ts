import { create } from "zustand";

interface AuditLogUIState {
  searchQuery: string;
  actionFilter: string;
  setSearchQuery: (query: string) => void;
  setActionFilter: (filter: string) => void;
}

export const useAuditLogUIStore = create<AuditLogUIState>((set) => ({
  searchQuery: "",
  actionFilter: "all",
  setSearchQuery: (query) => set({ searchQuery: query }),
  setActionFilter: (filter) => set({ actionFilter: filter }),
}));
