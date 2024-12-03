import { Circle } from "./circle";
import { PublicTransport } from "./publicTransport";

export interface LostItem  {
    _id: string;
    subCategory: string;
    userId:string;
    colorId: string;
    circles: Circle[];
    publicTransport: PublicTransport;
} 
