import { Notification } from "@/app/types/notification";
import mongoose, { Model, Schema } from "mongoose";

const NotificationSchema: Schema<Notification> = new Schema({
    massage: { type: String, required: true },
    userId: { type: String, required: true },
    read: { type: Boolean, required: true },
});

const NotificationModel: Model<Notification> =
    mongoose.models.Notification ||
    mongoose.model<Notification>("Notification", NotificationSchema);

export default NotificationModel;