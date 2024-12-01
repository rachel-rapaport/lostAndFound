import { create } from "zustand";
import { UserStore } from "../types/store/usetStore";
import { User } from "../types/user";

const useUserStore=create<UserStore>((set)=>({
    curentUser:null,
    addUser:(user: User)=>
        set((state) => ({ ...state, currentUser: user }))
  
}))

export default useUserStore;