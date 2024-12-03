import { Circle } from "./circle";
import { PublicTransport } from "./publicTransport";

export interface LostItem  {
    _id: string;
    subCategory: string;
    colorId: string;
    userId: string;
    circles: Circle[];
    publicTransport: PublicTransport;
} 
