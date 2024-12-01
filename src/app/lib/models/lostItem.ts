import mongoose, { Model, Schema } from "mongoose";
import { LostItemForSchema } from "@/app/types/schema/lostItemForSchema";
import LostItemSchema from "../schema/lostItemSchema";

const LostItemSchemaForModel: Schema<LostItemForSchema> = new Schema({
    lostItem: { type: LostItemSchema, required: true },
});

const LostItemModel: Model<LostItemForSchema> =
    mongoose.models.LostItemForSchema ||
    mongoose.model<LostItemForSchema>("LostItem", LostItemSchemaForModel);

export default LostItemModel;