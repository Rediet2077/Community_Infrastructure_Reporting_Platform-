import { create } from "zustand";

interface DepartmentUIState {
  selectedDepartmentId: string | null;
  isProfileDialogOpen: boolean;
  openProfileDialog: (id: string) => void;
  closeProfileDialog: () => void;
}

export const useDepartmentUIStore = create<DepartmentUIState>((set) => ({
  selectedDepartmentId: null,
  isProfileDialogOpen: false,
  openProfileDialog: (id) => set({ selectedDepartmentId: id, isProfileDialogOpen: true }),
  closeProfileDialog: () => set({ selectedDepartmentId: null, isProfileDialogOpen: false }),
}));
