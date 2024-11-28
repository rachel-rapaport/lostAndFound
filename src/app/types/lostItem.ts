import { Document } from "mongoose";

export interface LostItem extends Document {
    category: string;
    subCategory: string;
    color: string[];
    city: string;
    // publicTransportLine: number;
} 
