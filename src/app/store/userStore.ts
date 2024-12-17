import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types/props/user";

interface CurrentUserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const userStore = create(
  persist<CurrentUserState>(
    (set) => ({
      user: null,

      setUser: (user: User) => {
        console.log("Setting Zustand user:", user);
        set({ user });
        console.log("user from store", user);
      },

      clearUser: () => set({ user: null }),
    }),
    {
      name: "userData", // this will be the name for the localStorage key
    }
  )
);

export const getUserStore = () => userStore.getState();

export default userStore;
