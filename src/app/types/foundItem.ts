import { PublicTransport } from "./publicTransport";
import { Question } from "./question";
import { Postion } from "./postion";

export interface FoundItem{
    _id: string;
    subCategoryId: string;
    colorId: string;
    uesrId: string;
    postion: Postion;
    publicTransport: PublicTransport;
    image: string;
    descripition: string;
    questions: Question[]
} 
