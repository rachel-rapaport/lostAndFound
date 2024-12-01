import { Document } from "mongoose";

export interface TypePublicTransport extends Document{
    _id: string;
    title: string;
}