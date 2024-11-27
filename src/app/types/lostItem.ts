import { Document } from "mongoose";

export interface LostItem extends Document {
    _id: string;
    category: string;
    subCategory: string;
    color: string;
    city1: string;
    city2: string;
} 
