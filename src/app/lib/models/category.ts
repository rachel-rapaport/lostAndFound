import { CategoryForSchema } from "@/app/types/schema/categoryForSchema";
import mongoose, { Model, Schema } from "mongoose"
import CategorySchema from "../schema/categorySchema";

const CategorySchemaForModel: Schema<CategoryForSchema> = new Schema({
    category: { type: CategorySchema, required: true },
});

const CategoryModel: Model<CategoryForSchema> =
    mongoose.models.CategoryForSchema ||
    mongoose.model<CategoryForSchema>("Category", CategorySchemaForModel);

export default CategoryModel;