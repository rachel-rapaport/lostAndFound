import { Document } from "mongoose";

export interface FoundItem extends Document {
    category: string;
    subCategory: string;
    color: string[];
    city: string;
    // publicTransportLine: number;
    image: string;
    description: string;
}