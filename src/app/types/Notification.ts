import { Document } from "mongoose";

export interface Notification extends Document {
    _id: string;
    content: string;
    wasRead: boolean;
} 