import { Document } from "mongoose";
import { FoundItem } from "../foundItem";

export interface FoundItemForSchema extends Document {
    foundItem : FoundItem
} 
