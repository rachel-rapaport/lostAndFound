import { create } from "zustand";
import { User } from "../types/user";
import { UserStore } from "../types/store/usetStore";

const useUserStore=create<UserStore>((set)=>({
    curentUser:null,
    addUser:(user: User)=>
        set((state) => ({ ...state, currentUser: user }))
  
}))

export default useUserStore;