import { Types } from "mongoose";
import { Circle } from "./circle";
import { PublicTransport } from "./publicTransport";
import { SubCategory } from "./subCategory";
import { Color } from "./color";
import { User } from "./user";

export interface LostItem {
    _id: Types.ObjectId;
    subCategoryId: SubCategory | string; 
    colorId: Color | string;  
    userId: User | string;  
    circles: Circle[] | null;
    publicTransport: PublicTransport | null;  
} 
