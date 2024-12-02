import { TypePublicTransportForSchema } from "@/app/types/schema/typePublicTransportForSchema";
import mongoose, { Model, Schema } from "mongoose";
import TypePublicTransportSchema from "../schema/typePublictransportSchema";

const TypePublicTransportSchemaForModel: Schema<TypePublicTransportForSchema> = new Schema({
    typePublicTransport: { type: TypePublicTransportSchema, required: true },
});

const TypePublicTransportModel: Model<TypePublicTransportForSchema> =
    mongoose.models.TypePublicTransport ||
    mongoose.model<TypePublicTransportForSchema>("TypePublicTransport", TypePublicTransportSchemaForModel);

export default TypePublicTransportModel;