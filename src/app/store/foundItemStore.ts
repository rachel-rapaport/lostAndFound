import { create } from "zustand";
import { FoundItemStore } from "../types/store/foundItemStore";


export const useFoundItemStore = create<FoundItemStore>((set) => ({
  // currentFoundItem: null,

  currentFoundItem: null,

  setCurrentFoundItem: (foundItem) => {
    set({ currentFoundItem: foundItem });
  },
}));
