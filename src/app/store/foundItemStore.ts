import { create } from "zustand";
import { FoundItemStore } from "../types/store/foundItemStore";
import { FoundItem } from "../types/props/foundItem";
import { createJSONStorage, persist } from "zustand/middleware";

const useFoundItemStore = create<FoundItemStore>()(
  persist((set, get) => ({
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
      return foundItem || null;
    },
  }),
    {
      name: "found-item-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);


export default useFoundItemStore;