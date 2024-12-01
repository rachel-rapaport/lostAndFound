import { User } from "../user";

export interface UserStore{
    curentUser: User | null;
    addUser: (user: User) => void;
}