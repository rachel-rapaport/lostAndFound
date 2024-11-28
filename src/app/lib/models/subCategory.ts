import { SubCategory } from "@/app/types/subCategory";
import mongoose, { Model, Schema } from "mongoose"

const SubCategorySchema: Schema<SubCategory> = new Schema({
    title: { type: String, required: true },
    categoryId: { type: String, required: true },
});

const SubCategoryModel: Model<SubCategory> =
    mongoose.models.SubCategory ||
    mongoose.model<SubCategory>("SubCategory", SubCategorySchema);

export default SubCategoryModel;