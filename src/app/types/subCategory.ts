import { Document } from "mongoose";

export interface SubCategory extends Document{
    _id: string;
    title: string;
    categoryId: string;
}