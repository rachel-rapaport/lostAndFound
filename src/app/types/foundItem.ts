import { Document } from "mongoose";
import { PublicTransport } from "./publicTransport";
import { Question } from "./question";
import { Postion } from "./postion";

export interface FoundItem extends Document {
    _id: string;
    subCategoryId: string;
    colorId: string;
    postion: Postion
    publicTransport: PublicTransport;
    image: string;
    descripition: string;
    questions: Question[]
} 
