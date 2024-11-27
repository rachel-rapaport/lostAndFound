import { Notification } from "@/app/types/notification";
import mongoose, { Model, Schema } from "mongoose";

const NotificationSchema: Schema<Notification> = new Schema({
    content: { type: String, required: true },
    wasRead: { type: Boolean, required: true },
});

const NotificationModel: Model<Notification> =
    mongoose.models.Notification ||
    mongoose.model<Notification>("Notification", NotificationSchema);

export default NotificationModel;