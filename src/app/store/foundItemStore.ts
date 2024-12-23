import { create } from "zustand";
import { FoundItemStore } from "../types/store/foundItemStore";
import { FoundItem } from "../types/props/foundItem";
import { Types } from "mongoose";

export const useFoundItemStore = create<FoundItemStore>((set) => ({
  // currentFoundItem: null,

  currentFoundItem: null,

  setCurrentFoundItem: (foundItem) => {
    set({ currentFoundItem: foundItem });
  },
}));
