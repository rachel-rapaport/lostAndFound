import { TypePublicTransport } from "./typePublicTransport";

export interface PublicTransport {
    typePublicTransportId: TypePublicTransport | string;
    city: string;
    line: string;
}