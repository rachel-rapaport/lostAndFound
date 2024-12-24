import { create } from "zustand";
import { FoundItemStore } from "../types/store/foundItemStore";
import { FoundItem } from "../types/props/foundItem";

 const useFoundItemStore = create<FoundItemStore>((set,get) => ({
    currentFoundItem: null,
    setCurrentFoundItem: (foundItem: FoundItem | null) => {
      set({ currentFoundItem: foundItem });
    },
    filteredFoundItems: null,
    setFilteredFoundItems: (foundItems: FoundItem[]) => {
      set({ filteredFoundItems: foundItems });
    },
    getFilteredFoundItemById: (id: string) => {
      const foundItem = get().filteredFoundItems?.find(
        (item) => item._id.toString() === id
      );
      return foundItem || null; // Return found item or null
    },
}))

export default useFoundItemStore;
