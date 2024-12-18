import { PublicTransport } from "./publicTransport";
import { Question } from "./question";
import { Postion } from "./postion";
import { Types } from "mongoose";
import { Color } from "./color";
import { User } from "./user";

export interface FoundItem {
    _id: Types.ObjectId;
    userId: User;
    // subCategoryId: SubCategory;
    subCategoryId: { _id: Types.ObjectId, title: string };
    colorId: Color;
    postion: Postion;
    publicTransport: PublicTransport;
    image: string;
    descripition: string;
    questions: Question[]
} 
