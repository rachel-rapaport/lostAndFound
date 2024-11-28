import { Document } from "mongoose";

export interface Color extends Document{
    _id: string;
    name: string;
    groupId: number;
}