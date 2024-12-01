import { Document } from "mongoose";
import { SubCategory } from "../subCategory";

export interface SubCategoryForSchema extends Document{
    subCategory : SubCategory
}