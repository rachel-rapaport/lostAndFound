import { FoundItem } from "@/app/types/foundItem";
import mongoose, { Model, Schema } from "mongoose"

const FoundItemSchema: Schema<FoundItem> = new Schema({
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    color: { type: String, required: true },
    city1: { type: String, required: true },
    city2: { type: String },
    image: { type: String, required: true },
    description: { type: String, required: true },
});

const FoundItemModel: Model<FoundItem> =
    mongoose.models.FoundItem ||
    mongoose.model<FoundItem>("FoundItem", FoundItemSchema);

export default FoundItemModel;