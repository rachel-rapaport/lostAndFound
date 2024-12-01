import { NotificationForSchema } from "@/app/types/schema/notificationForSchema";
import mongoose, { Model, Schema } from "mongoose";
import NotificationSchema from "../schema/notificationSchema";

const NotificationSchemaForModel: Schema<NotificationForSchema> = new Schema({
    notification: { type: NotificationSchema, required: true },
});

const NotificationModel: Model<NotificationForSchema> =
    mongoose.models.NotificationForSchema ||
    mongoose.model<NotificationForSchema>("Notification", NotificationSchemaForModel);

export default NotificationModel;