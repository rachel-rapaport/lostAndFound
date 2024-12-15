import { Types } from "mongoose";

export interface Alert{
    _id: Types.ObjectId;
    message: string;
    userId: Types.ObjectId;
    read: boolean;
}
