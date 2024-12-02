import { Document } from "mongoose";
import { TypePublicTransport } from "../typePublicTransport";

export interface TypePublicTransportForSchema extends Document{
    typePublicTransport : TypePublicTransport
}