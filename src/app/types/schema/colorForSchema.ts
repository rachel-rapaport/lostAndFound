import { Document } from "mongoose";
import { Color } from "../color";

export interface ColorForSchema extends Document{
    color : Color
}