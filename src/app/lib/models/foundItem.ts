import mongoose, { Model, Schema } from "mongoose"
import { FoundItemForSchema } from "@/app/types/schema/foundItemForSchema";
import FoundItemSchema from "../schema/foundItemSchema";

const FoundItemSchemaForModel: Schema<FoundItemForSchema> = new Schema({
    foundItem: { type: FoundItemSchema, required: true },
});

const FoundItemModel: Model<FoundItemForSchema> =
    mongoose.models.FoundItemForSchema ||
    mongoose.model<FoundItemForSchema>("FoundItem", FoundItemSchemaForModel);

export default FoundItemModel;