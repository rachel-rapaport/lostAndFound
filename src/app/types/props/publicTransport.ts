import { Types } from "mongoose";
import { TypePublicTransport } from "./typePublicTransport";

export interface PublicTransport {
    typePublicTransportId: TypePublicTransport;
    city: string;
    line: string;
}