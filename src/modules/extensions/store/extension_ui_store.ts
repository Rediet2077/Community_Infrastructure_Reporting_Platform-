import { create } from "zustand";

interface ExtensionUIState {
  selectedTaskId: string | null;
  isRequestDialogOpen: boolean;
  statusFilter: string;

  openRequestDialog: (taskId?: string) => void;
  closeRequestDialog: () => void;
  setStatusFilter: (filter: string) => void;
}

export const useExtensionUIStore = create<ExtensionUIState>((set) => ({
  selectedTaskId: null,
  isRequestDialogOpen: false,
  statusFilter: "all",

  openRequestDialog: (taskId) => set({ selectedTaskId: taskId || null, isRequestDialogOpen: true }),
  closeRequestDialog: () => set({ selectedTaskId: null, isRequestDialogOpen: false }),
  setStatusFilter: (filter) => set({ statusFilter: filter }),
}));
