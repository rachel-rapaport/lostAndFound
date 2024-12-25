import { create } from "zustand";
import { LostItemStore } from "../types/store/lostItemStore";

const lostItemStore = create<LostItemStore>((set) => ({
    currentLostItem: null,
    setCurrentLostItem: (lostItem) => set(() => ({ currentLostItem: lostItem }))
}))

export default lostItemStore