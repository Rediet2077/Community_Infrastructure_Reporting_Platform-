import { create } from "zustand";

interface ReportUIState {
  selectedReportId: string | null;
  isDetailsDialogOpen: boolean;
  isAcceptDialogOpen: boolean;
  statusFilter: string;
  priorityFilter: string;
  searchQuery: string;

  openDetailsDialog: (reportId: string) => void;
  closeDetailsDialog: () => void;
  openAcceptDialog: (reportId: string) => void;
  closeAcceptDialog: () => void;
  setStatusFilter: (filter: string) => void;
  setPriorityFilter: (filter: string) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

export const useReportUIStore = create<ReportUIState>((set) => ({
  selectedReportId: null,
  isDetailsDialogOpen: false,
  isAcceptDialogOpen: false,
  statusFilter: "all",
  priorityFilter: "all",
  searchQuery: "",

  openDetailsDialog: (reportId) =>
    set({ selectedReportId: reportId, isDetailsDialogOpen: true, isAcceptDialogOpen: false }),
  closeDetailsDialog: () =>
    set({ selectedReportId: null, isDetailsDialogOpen: false }),
  openAcceptDialog: (reportId) =>
    set({ selectedReportId: reportId, isAcceptDialogOpen: true, isDetailsDialogOpen: false }),
  closeAcceptDialog: () =>
    set({ selectedReportId: null, isAcceptDialogOpen: false }),
  setStatusFilter: (filter) => set({ statusFilter: filter }),
  setPriorityFilter: (filter) => set({ priorityFilter: filter }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  resetFilters: () =>
    set({
      statusFilter: "all",
      priorityFilter: "all",
      searchQuery: "",
    }),
}));
