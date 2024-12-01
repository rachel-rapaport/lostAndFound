// src/types/store/lostItemStore.ts

import { LostItem } from "../lostItem"; // נתיב לקובץ LostItem
import { Circle } from "../circle"; // נתיב לקובץ Circle
import { PublicTransport } from "../publicTransport"; // נתיב לקובץ PublicTransport

export interface LostItemStore {
    currentLostItem: LostItem;
    getCurrentLostItem: () => LostItem | null;
    setCurrentLostItem: (lostItem: LostItem) => void;
    lostItemsList: LostItem[];
    createLostItem: (newItem: LostItem) => void;
    readLostItems: () => LostItem[];
    updateLostItem: (id: string, updates: {
        newCircle?: Circle;
        updatedTransport?: Partial<PublicTransport>;
        otherUpdates?: Partial<LostItem>;
    }) => void;
    deleteLostItem: (id: string) => void;
}
