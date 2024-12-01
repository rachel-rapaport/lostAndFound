import { create } from "zustand";
import { LostItem } from "../types/lostItem";

export interface lossItemStore {
  currentLostItem: LostItem;
  getCurrentLostItem: () => LostItem | null;
  setCurrentLostItem: (lostItem: LostItem) => void;
}

const useLostItemStore = create<lossItemStore>((set, get) => ({
  currentLostItem: {
    _id: "",
    subCategory: "",
    colorId: "",
    circles: [
      {
        center: {
          lat: 0,
          lng: 0
        },
        radius: 0
      }
    ],
    publicTransport: {
      typePublicTransportId: "",
      city: "",
      line: "",
    },
  } as LostItem,

  getCurrentLostItem: () => {
    const lostItem = get().currentLostItem;
    if (lostItem.subCategory === "") {
      return null;
    }
    return lostItem;
  },

  setCurrentLostItem: (lostItem) =>
    set(() => ({
      currentLostItem: lostItem,
    })),
}));

export default useLostItemStore;
