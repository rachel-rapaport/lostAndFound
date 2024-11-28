import { Document } from "mongoose";

export interface User extends Document{
    fullName: string;
    password: string;
    phone: string;
    lostItems: string[];
    foundItems: string[];
    blockedItems: string[];
    notifications: string[];
} 
