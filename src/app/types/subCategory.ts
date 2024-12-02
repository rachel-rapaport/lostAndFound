import { Document } from "mongoose";

export interface SubCategory extends Document{
    title: string;
    categoryId: string;
}