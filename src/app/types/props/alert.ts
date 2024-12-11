import { Types } from "mongoose";

export interface Alert {
    _id: string;
    message: string;
    userId: Types.ObjectId;
    read: boolean;
}
