import { SubCategoryForSchema } from "@/app/types/schema/subCategoryForSchema";
import mongoose, { Model, Schema } from "mongoose"
import SubCategorySchema from "../schema/subCategorySchema";

const SubCategorySchemaForModel: Schema<SubCategoryForSchema> = new Schema({
    subCategory: { type: SubCategorySchema, required: true, _id: false },
});

const SubCategoryModel: Model<SubCategoryForSchema> =
    mongoose.models.SubCategory || mongoose.model("SubCategory", SubCategorySchemaForModel);

export default SubCategoryModel;