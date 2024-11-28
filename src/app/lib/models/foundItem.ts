import { FoundItem } from "@/app/types/foundItem";
import mongoose, { Model, Schema } from "mongoose"
import PublicTransportSchema from "../schema/publicTransportSchema";
import PostionSchema from "../schema/postion";
import QuestionSchema from "../schema/question";

const FoundItemSchema: Schema<FoundItem> = new Schema({
    subCategoryId: { type: String, required: true },
    colorId: { type: String, required: true },
    postion: {type: PostionSchema, required: true },
    publicTransport: { type: PublicTransportSchema },
    image: { type: String},
    descripition: { type: String},
    questions: {type: [QuestionSchema], required: true },
});

const FoundItemModel: Model<FoundItem> =
    mongoose.models.FoundItem ||
    mongoose.model<FoundItem>("FoundItem", FoundItemSchema);

export default FoundItemModel;