// src/types/lostItem.ts

export interface CleanLostItem {
    _id: string;
    subCategory: string;
    colorId: string;
    circles: Circle[];
    publicTransport: PublicTransport;
    // כל שאר השדות של LostItem
}

// src/store/useLostItemStore.ts

import { create } from "zustand";
import { Circle } from "../types/circle"; // נתיב ל-Circle
import { PublicTransport } from "../types/publicTransport"; // נתיב ל-PublicTransport

interface LostItemStore {
    lostItemsList: CleanLostItem[];
    createLostItem: (newItem: CleanLostItem) => void;
    readLostItems: () => CleanLostItem[];
    updateLostItem: (id: string, updates: {
        newCircle?: Circle;
        updatedTransport?: Partial<PublicTransport>;
        otherUpdates?: Partial<CleanLostItem>;
    }) => void;
    deleteLostItem: (id: string) => void;
}

export const useLostItemStore = create<LostItemStore>((set, get) => ({
    lostItemsList: [],

    // יצירת פריט חדש
    createLostItem: (newItem: CleanLostItem) => 
        set((state) => ({
            lostItemsList: [...state.lostItemsList, newItem],
        })),

    // קריאת כל הפריטים
    readLostItems: () => get().lostItemsList,

    // עדכון פריט קיים
    updateLostItem: (id: string, updates: {
        newCircle?: Circle;
        updatedTransport?: Partial<PublicTransport>;
        otherUpdates?: Partial<CleanLostItem>;
    }) => {
        set((state) => {
            const updatedItems = state.lostItemsList.map((item) => {
                if (item._id === id) {
                    const updatedCircles = updates.newCircle
                        ? [...item.circles, updates.newCircle]
                        : item.circles;

                    const updatedPublicTransport = updates.updatedTransport
                        ? { ...item.publicTransport, ...updates.updatedTransport }
                        : item.publicTransport;

                    return {
                        ...item,
                        ...updates.otherUpdates,
                        circles: updatedCircles,
                        publicTransport: updatedPublicTransport,
                    };
                }
                return item;
            });

            return { lostItemsList: updatedItems };
        });
    },

    // מחיקת פריט
    deleteLostItem: (id: string) => 
        set((state) => ({
            lostItemsList: state.lostItemsList.filter((item) => item._id !== id),
        })),
}));
