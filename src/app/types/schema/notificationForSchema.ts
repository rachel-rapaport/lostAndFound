import { Document } from "mongoose";
import { Notification } from "../alert";

export interface NotificationForSchema extends Document {
    notification : Notification
} 

