import { Document } from "mongoose";

export interface Notification extends Document {
    _id: string;
    massage: string;
    userId: string;
    read: boolean;
} 
