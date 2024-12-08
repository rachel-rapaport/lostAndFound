import { LostItem } from "../props/lostItem";

export interface LostItemStore {
  currentLostItem: LostItem | null;
  lostItemsList: LostItem[];

  setCurrentLostItem: (lostItem: LostItem) => void;
  
  setLostItems:(lostItemsList:LostItem[])=>void;
  createLostItem: (newItem: LostItem) => void; 
  updateLostItem: (newItem: LostItem) => void;
  deleteLostItem: (id: string) => void; 
}