import { create } from "zustand";
import { FoundItem } from "../types/props/foundItem";
import { FoundItemStore } from "../types/store/foundItemStore";

export const useLostItemStore = create<FoundItemStore>((set) => ({
  currentLostItem: {
    _id: "",
    userId:"",
    subCategoryId: "",
    colorId: "",
    uesrId:"",
    postion:{
        latitude:0,
        longitude:0,
    },
    publicTransport: {
      typePublicTransportId: "",
      city: "",
      line: "",
    },
    image: "",
    descripition: "",
    questions: [{
        question: "",
        answers: []
    }]
 },
  lostItemsList: [], 

  setCurrentLostItem: (lostItem: FoundItem) => {
    set({ currentLostItem: lostItem });
  },

  setLostItems: (lostItemsList: FoundItem[]) => {
    set({ lostItemsList });
  },

  createLostItem: (newItem: FoundItem) =>
    set((state) => ({
      lostItemsList: [...state.lostItemsList, newItem],
    })),

  updateLostItem: (newItem: FoundItem) =>
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
