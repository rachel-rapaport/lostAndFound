import { User } from "../types/props/user";
import { createChatRoom } from "../services/chat/chatFirebase";
import userStore from "../store/userStore";
import { updateUserById } from "../services/api/userService";
import { Chat } from "../types/props/chat";

export const initiateChat = async (otherUser: User) => {
    const { user } = userStore.getState();
    const roomId = await createChatRoom(String(user && user._id), String(otherUser._id));
    return roomId;
}

export const addChatRoom = async (chatRoom: Chat) => {
    const { user, setUser } = userStore.getState();
    if (!user) {
        throw new Error("User not found in store");
    }
    const updatedUser: User = {
        ...user,
        chatRooms: [...user?.chatRooms || [], chatRoom]
    }
    const response = await updateUserById(String(user._id), updatedUser)
    if (response) {
        setUser(updatedUser)
        return response;
    } else {
        throw new Error("Failed to update user");
    }
}

// export const closeChat = (roomId: string)=>{
//     const { user, setUser } = userStore.getState();
// }

