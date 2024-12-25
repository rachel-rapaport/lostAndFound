import { User } from "../types/props/user";
import { createChatRoom } from "../services/chat/chatFirebase";
import userStore from "../store/userStore";

export const initiateChat = async (otherUser: User) => {
    console.log("innn");
    
    const {user} = userStore.getState();

    console.log("user",user);
    

    const roomId = await createChatRoom(String(user&&user._id), String(otherUser._id));
    console.log("roomUd",roomId);
    
    return  roomId;
}