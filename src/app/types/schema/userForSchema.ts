import { Document } from "mongoose";
import { User } from "../user";

export interface UserForSchema extends Document{
    user : User
} 
