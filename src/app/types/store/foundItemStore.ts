import { FoundItem } from "../props/foundItem";

export interface FoundItemStore {
  currentFoundItem: FoundItem | null;
  setCurrentFoundItem: (foundItem: FoundItem) => void;
}