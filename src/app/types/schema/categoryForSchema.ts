import { Document } from "mongoose";
import { Category } from "../category";

export interface CategoryForSchema extends Document {
    category: Category
}