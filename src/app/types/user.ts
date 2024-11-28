import { Document } from "mongoose";

export interface User extends Document{
    fullName: string;
    email: string;
    password: string;
    phone: string;
    lostItems: string[];
    foundItems: string[];
    blockedItems: string[];
    notifications: string[];
} 
