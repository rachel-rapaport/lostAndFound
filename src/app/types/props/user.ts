import { Types } from "mongoose";
import { LostItem } from "./lostItem";
import { FoundItem } from "./foundItem";
import { Alert } from "./alert";

export interface User {
    _id: Types.ObjectId;
    fullName: string;
    email: string;
    password: string;
    phone: string;
    lostItems?: LostItem[];
    foundItems?: FoundItem[];
    blockedItems?: FoundItem[];
    alerts?: Alert[];
}