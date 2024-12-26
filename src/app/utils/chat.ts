import { User } from "../types/props/user";
import { createChatRoom } from "../services/chat/chatFirebase";
import userStore from "../store/userStore";

export const initiateChat = async (otherUser: User) => {
    const { user } = userStore.getState();
    const roomId = await createChatRoom(String(user && user._id), String(otherUser._id));
    return roomId;
}