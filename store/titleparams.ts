import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface TitleState {
  title: string;
  setTitle: (titleParams: string) => void;
}

export const useTitleStore = create<TitleState>((set) => ({
  title: "",
  setTitle: (titleParams) => set(() => ({ title: titleParams })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("title-store", useTitleStore);
}
