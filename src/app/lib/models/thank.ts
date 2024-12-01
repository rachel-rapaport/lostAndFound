import { ThankForSchema } from "@/app/types/schema/thankForSchema";
import mongoose, { Model, Schema } from "mongoose";
import ThankSchema from "../schema/thankSchema";

const ThankSchemaForModel: Schema<ThankForSchema> = new Schema({
    thank: { type: ThankSchema, required: true },
});

const ThankModel: Model<ThankForSchema> =
    mongoose.models.ThankForSchema ||
    mongoose.model<ThankForSchema>("Thank", ThankSchemaForModel);

export default ThankModel;