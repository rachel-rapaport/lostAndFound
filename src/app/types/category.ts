
import { Document } from "mongoose";

export interface Category extends Document{
    _id: string;
    title: string;
    subCategories: string[];
}
