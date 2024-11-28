import { TypePublicTransport } from "@/app/types/typePublicTransport";
import mongoose, { Model, Schema } from "mongoose";

const TypePublicTransportSchema: Schema<TypePublicTransport> = new Schema({
    title: { type: String, required: true },
});

const TypePublicTransportModel: Model<TypePublicTransport> =
    mongoose.models.TypePublicTransport ||
    mongoose.model<TypePublicTransport>("TypePublicTransport", TypePublicTransportSchema);

export default TypePublicTransportModel;