import { User } from "@/app/types/props/user";
import mongoose, { Model, Schema } from "mongoose";

const UserSchema: Schema<User> = new Schema({
    fullName: { type: String, required: true },
    email: { type: String,unique:true, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    lostItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "LostItem" }],
    foundItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "FoundItem" }],
    blockedItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "FoundItem" }],
    alerts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Alert" }]
});

const UserModel: Model<User> =
    mongoose.models.User ||
    mongoose.model<User>("User", UserSchema);

export default UserModel;