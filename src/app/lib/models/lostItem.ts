import { LostItem } from "@/app/types/lostItem";
import mongoose, { Model, Schema } from "mongoose";

const LostItemSchema: Schema<LostItem> = new Schema({
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    color: { type: String, required: true },
    city1: { type: String, required: true },
    city2: { type: String },
});

const LostItemModel: Model<LostItem> =
    mongoose.models.LostItem ||
    mongoose.model<LostItem>("LostItem", LostItemSchema);

export default LostItemModel;