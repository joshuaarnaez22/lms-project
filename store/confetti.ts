import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
interface ConfettiState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useConfettiStore = create<ConfettiState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("confetti-store", useConfettiStore);
}
