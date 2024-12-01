import { ThankForSchema } from "@/app/types/schema/thankForSchema";
import mongoose, { Model, Schema } from "mongoose";
import ThankSchema from "../schema/thankSchema";

const ThankSchemaForModel: Schema<ThankForSchema> = new Schema({
    thank: { type: ThankSchema, required: true, _id: false },
});

const ThankModel: Model<ThankForSchema> =
    mongoose.models.Thank ||
    mongoose.model<ThankForSchema>("Thank", ThankSchemaForModel);

export default ThankModel;