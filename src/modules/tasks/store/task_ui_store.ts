import { create } from "zustand";

interface TaskUIState {
  selectedTaskId: string | null;
  isUpdateProgressDialogOpen: boolean;
  isCompleteTaskDialogOpen: boolean;
  isVerifyRejectDialogOpen: boolean;
  isExtensionDialogOpen: boolean;
  statusFilter: string;
  searchQuery: string;

  openUpdateProgressDialog: (taskId: string) => void;
  closeUpdateProgressDialog: () => void;
  openCompleteTaskDialog: (taskId: string) => void;
  closeCompleteTaskDialog: () => void;
  openVerifyRejectDialog: (taskId: string) => void;
  closeVerifyRejectDialog: () => void;
  openExtensionDialog: (taskId: string) => void;
  closeExtensionDialog: () => void;
  setStatusFilter: (filter: string) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

export const useTaskUIStore = create<TaskUIState>((set) => ({
  selectedTaskId: null,
  isUpdateProgressDialogOpen: false,
  isCompleteTaskDialogOpen: false,
  isVerifyRejectDialogOpen: false,
  isExtensionDialogOpen: false,
  statusFilter: "all",
  searchQuery: "",

  openUpdateProgressDialog: (taskId) =>
    set({
      selectedTaskId: taskId,
      isUpdateProgressDialogOpen: true,
      isCompleteTaskDialogOpen: false,
      isVerifyRejectDialogOpen: false,
      isExtensionDialogOpen: false,
    }),
  closeUpdateProgressDialog: () =>
    set({ selectedTaskId: null, isUpdateProgressDialogOpen: false }),

  openCompleteTaskDialog: (taskId) =>
    set({
      selectedTaskId: taskId,
      isCompleteTaskDialogOpen: true,
      isUpdateProgressDialogOpen: false,
      isVerifyRejectDialogOpen: false,
      isExtensionDialogOpen: false,
    }),
  closeCompleteTaskDialog: () =>
    set({ selectedTaskId: null, isCompleteTaskDialogOpen: false }),

  openVerifyRejectDialog: (taskId) =>
    set({
      selectedTaskId: taskId,
      isVerifyRejectDialogOpen: true,
      isUpdateProgressDialogOpen: false,
      isCompleteTaskDialogOpen: false,
      isExtensionDialogOpen: false,
    }),
  closeVerifyRejectDialog: () =>
    set({ selectedTaskId: null, isVerifyRejectDialogOpen: false }),

  openExtensionDialog: (taskId) =>
    set({
      selectedTaskId: taskId,
      isExtensionDialogOpen: true,
      isUpdateProgressDialogOpen: false,
      isCompleteTaskDialogOpen: false,
      isVerifyRejectDialogOpen: false,
    }),
  closeExtensionDialog: () =>
    set({ selectedTaskId: null, isExtensionDialogOpen: false }),

  setStatusFilter: (filter) => set({ statusFilter: filter }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  resetFilters: () =>
    set({
      statusFilter: "all",
      searchQuery: "",
    }),
}));
