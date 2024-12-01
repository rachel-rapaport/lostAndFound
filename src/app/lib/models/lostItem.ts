import { LostItem } from "@/app/types/lostItem";
import mongoose, { Model, Schema } from "mongoose";
import PublicTransportSchema from "../schema/publicTransportSchema";
import CircleSchema from "../schema/circleSchema";

const LostItemSchema: Schema<LostItem> = new Schema({
    subCategory: { type: String, required: true },
    colorId: { type: String, required: true },
    circles: { type: [CircleSchema] },
    publicTransport: { type: PublicTransportSchema },
});

const LostItemModel: Model<LostItem> =
    mongoose.models.LostItem ||
    mongoose.model<LostItem>("LostItem", LostItemSchema);

export default LostItemModel;