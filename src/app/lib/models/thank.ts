import { Thank } from "@/app/types/thank";
import mongoose, { Model, Schema } from "mongoose";

const ThankSchema: Schema<Thank> = new Schema({
    userName: { type: String, required: true },
    contect: { type: String, required: true },
});

const ThankModel: Model<Thank> =
    mongoose.models.Thank ||
    mongoose.model<Thank>("Thank", ThankSchema);

export default ThankModel;