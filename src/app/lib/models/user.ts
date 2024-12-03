import { UserForSchema } from "@/app/types/schema/userForSchema";
import mongoose, { Model, Schema } from "mongoose";
import UserSchema from "../schema/userSchema";

const UserSchemaForModel: Schema<UserForSchema> = new Schema({
    user: { type: UserSchema, required: true, _id: false },
});

const UserModel: Model<UserForSchema> =
    mongoose.models.UserForSchema ||
    mongoose.model<UserForSchema>("User", UserSchemaForModel);

export default UserModel;