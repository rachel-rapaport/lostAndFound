import { create } from "zustand";
import { LostItem } from "../types/lostItem";
import { LostItemStore } from "../types/store/lostItemStore"; 

export const useLostItemStore = create<LostItemStore>((set) => ({
  currentLostItem: {
    _id: "",
    subCategory: "",
    colorId: "",
    circles: [
      {
        center: {
          lat: 0,
          lng: 0,
        },
        radius: 0,
      },
    ],
    publicTransport: {
      typePublicTransportId: "",
      city: "",
      line: "",
    },
  },

  lostItemsList: [], 

  setCurrentLostItem: (lostItem: LostItem) => {
    set({ currentLostItem: lostItem });
  },

  setLostItems: (lostItemsList: LostItem[]) => {
    set({ lostItemsList });
  },

  createLostItem: (newItem: LostItem) =>
    set((state) => ({
      lostItemsList: [...state.lostItemsList, newItem],
    })),

  updateLostItem: (newItem: LostItem) =>
    set((state) => ({
      lostItemsList: state.lostItemsList.map((item) =>
        item._id === newItem._id ? newItem : item 
      ),
    })),

  deleteLostItem: (id: string) =>
    set((state) => ({
      lostItemsList: state.lostItemsList.filter((item) => item._id !== id),
    })),
}));
