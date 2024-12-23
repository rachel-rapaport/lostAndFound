import { LostItemRequest } from "../request/lostItemRequest";

export interface LostItemStore {
  currentLostItem: LostItemRequest | null;
  // lostItemsList: LostItem[];

  setCurrentLostItem: (lostItem: LostItemRequest | null) => void;
  
  // setLostItems:(lostItemsList:LostItem[])=>void;
  // createLostItem: (newItem: LostItem) => void; 
  // updateLostItem: (newItem: LostItem) => void;
  // deleteLostItem: (id: string) => void; 
}