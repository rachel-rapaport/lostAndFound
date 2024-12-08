import { PublicTransport } from "./publicTransport";
import { Question } from "./question";
import { Postion } from "./postion";
import { Types } from "mongoose";
import { User } from "./user";
import { SubCategory } from "./subCategory";
import { Color } from "./color";

export interface FoundItem{
    _id: Types.ObjectId;
    userId: User;
    subCategoryId: SubCategory;
    colorId: Color;
    postion: Postion;
    publicTransport: PublicTransport;
    image: string;
    descripition: string;
    questions: Question[]
} 
