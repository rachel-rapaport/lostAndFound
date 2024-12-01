import { Document } from "mongoose";
import { Notification } from "../notification";

export interface NotificationForSchema extends Document {
    notification : Notification
} 
