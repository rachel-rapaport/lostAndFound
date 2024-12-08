import { Document } from "mongoose";
import { LostItem } from "../lostItem";

export interface LostItemForSchema extends Document {
  lostItem: LostItem;
}

