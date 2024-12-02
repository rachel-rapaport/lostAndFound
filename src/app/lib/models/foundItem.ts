import mongoose, { Model, Schema } from "mongoose"
import { FoundItemForSchema } from "@/app/types/schema/foundItemForSchema";
import FoundItemSchema from "../schema/foundItemSchema";

const FoundItemSchemaForModel: Schema<FoundItemForSchema> = new Schema({
    foundItem: { type: FoundItemSchema, required: true, _id: false },
});

const FoundItemModel: Model<FoundItemForSchema> =
    mongoose.models.FoundItem ||
    mongoose.model<FoundItemForSchema>("FoundItem", FoundItemSchemaForModel);

export default FoundItemModel;