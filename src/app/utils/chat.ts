import { Types } from "mongoose";
import { User } from "../types/props/user";
import { createChatRoom } from "../services/chat/chatFirebase";

export const initiateChat = async (otherUser: User) => {
    console.log("in initiateChat");
    
    const user1: User = {
        _id: new Types.ObjectId(),
        fullName: 'יוסי כהן',
        email: 'yossi@example.com',
        password: 'password123',
        phone: '0501234567',
        lostItems: [],
        foundItems: [],
        blockedItems: [],
        alerts: []
    };

    const roomId = await createChatRoom(String(user1._id), String(otherUser._id));
    console.log("roomUd",roomId);
    

    return  roomId;
}