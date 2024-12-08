import { FoundItem } from "../props/foundItem";

export interface FoundItemStore {
  currentLostItem: FoundItem | null;
  lostItemsList: FoundItem[];

  setCurrentLostItem: (lostItem: FoundItem) => void;
  
  setLostItems:(lostItemsList:FoundItem[])=>void;
  createLostItem: (newItem: FoundItem) => void; 
  updateLostItem: (newItem: FoundItem) => void;
  deleteLostItem: (id: string) => void; 
}