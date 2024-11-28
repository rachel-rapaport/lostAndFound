import { Document } from "mongoose";

export interface Notification extends Document {
    content: string;
    wasRead: boolean;
} 
