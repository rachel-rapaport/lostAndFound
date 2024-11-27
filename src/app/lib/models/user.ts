import {User} from "@/app/types/user";
import mongoose, { Model, Schema } from "mongoose";

const UserSchema: Schema<User> = new Schema({
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    lostItems: { type: [String], required: true },
    foundItems: { type: [String], required: true },
    blockedItems: { type: [String], required: true },
    notifications: { type: [String], required: true }
});

const UserModel: Model<User> =
    mongoose.models.User ||
    mongoose.model<User>("User", UserSchema);

export default UserModel;