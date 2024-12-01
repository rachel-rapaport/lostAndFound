import { Document } from "mongoose";
import { Circle } from "./circle";
import { PublicTransport } from "./publicTransport";

export interface LostItem extends Document {
    _id: string;
    subCategory: string;
    colorId: string;
    circles: Circle[];
    publicTransport: PublicTransport;
} 
