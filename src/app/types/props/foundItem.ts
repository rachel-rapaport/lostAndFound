import { PublicTransport } from "./publicTransport";
import { Question } from "./question";
import { Postion } from "./postion";
import { Types } from "mongoose";
<<<<<<< HEAD
=======
import { SubCategory } from "./subCategory";
>>>>>>> f57b359384ab81bff56610eaf86407bb6d19f8a6
import { Color } from "./color";
import { User } from "./user";

export interface FoundItem {
    _id: Types.ObjectId;
    userId: User;
<<<<<<< HEAD
    subCategoryId: { _id: Types.ObjectId, title: string };
=======
    subCategoryId: SubCategory;
>>>>>>> f57b359384ab81bff56610eaf86407bb6d19f8a6
    colorId: Color;
    postion: Postion;
    publicTransport: PublicTransport;
    image: string;
    descripition: string;
    questions: Question[]
} 
