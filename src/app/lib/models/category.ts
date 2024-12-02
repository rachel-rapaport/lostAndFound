import { CategoryForSchema } from "@/app/types/schema/categoryForSchema";
import mongoose, { Model, Schema } from "mongoose"
import CategorySchema from "../schema/categorySchema";

const CategorySchemaForModel: Schema<CategoryForSchema> = new Schema({
    category: { type: CategorySchema, required: true, _id: false },
});

const CategoryModel: Model<CategoryForSchema> =
    mongoose.models.Category ||
    mongoose.model<CategoryForSchema>("Category", CategorySchemaForModel);

export default CategoryModel;