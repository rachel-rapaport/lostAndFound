import { Category } from "@/app/types/category";
import mongoose, { Model, Schema } from "mongoose"

const CategorySchema: Schema<Category> = new Schema({
    title: { type: String, required: true },
    subCategories: { type: [String], required: true },
});

const CategoryModel: Model<Category> =
    mongoose.models.Category ||
    mongoose.model<Category>("Category", CategorySchema);

export default CategoryModel;