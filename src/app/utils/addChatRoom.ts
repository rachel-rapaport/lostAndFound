import { updateUserById } from "../services/api/userService";
import userStore from "../store/userStore";
import { User } from "../types/props/user";

export const addChatRoom = async (roomId: string) => {

    const { user, setUser } = userStore.getState();

    if (!user) {
        throw new Error("User not found in store");
    }

    const updatedUser: User = {
        ...user,
        chatRooms: [...user?.chatRooms || [], roomId]
    }

    const response = await updateUserById(String(user._id), updatedUser)
    if (response) {
        setUser(updatedUser)
        return response;
    } else {
        throw new Error("Failed to update user");
    }



}