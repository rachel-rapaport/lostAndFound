import { ColorForSchema } from "@/app/types/schema/colorForSchema";
import mongoose, { Model, Schema } from "mongoose";
import ColorSchema from "../schema/colorSchema";

const ColorSchemaForModel: Schema<ColorForSchema> = new Schema({
    color: { type: ColorSchema, required: true },
});

const ColorModel: Model<ColorForSchema> =
    mongoose.models.ColorForSchema ||
    mongoose.model<ColorForSchema>("Color", ColorSchemaForModel);

export default ColorModel;