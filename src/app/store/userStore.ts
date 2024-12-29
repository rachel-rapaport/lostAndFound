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
        set({ user });
      },

      clearUser: () => set({ user: null }),
    }),
    {
      name: "userData",
    }
  )
);

export const getUserStore = () => userStore.getState();

export default userStore;
