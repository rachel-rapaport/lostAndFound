import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    massage: { type: String, required: true },
    userId: { type: String, required: true },
    read: { type: Boolean, required: true },
});
  export default NotificationSchema