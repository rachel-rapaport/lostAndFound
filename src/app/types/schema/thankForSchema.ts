import { Document } from "mongoose";
import { Thank } from "../thank";

export interface ThankForSchema extends Document{
    thank : Thank
}