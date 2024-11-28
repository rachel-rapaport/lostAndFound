import { Document } from "mongoose";

export interface Thank extends Document{
    _id: string;
    userName: string;
    contect: string;
}