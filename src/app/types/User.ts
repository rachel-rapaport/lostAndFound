import { Document } from "mongoose";

export interface User extends Document{
    _id: string;
    fullName: string;
    password: string;
    phone: string;
    lostItems: string[];
    foundItems: string[];
    blockedItems: string[];
    notifications: string[];
} 