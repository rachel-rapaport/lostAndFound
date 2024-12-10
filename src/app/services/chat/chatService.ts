import { User } from '@/app/types/props/user';
import { createChatRoom } from './chatFirebase';
import axios from 'axios';

const baseUrl = process.env.BASE_URL || "http://localhost:3000"

//initiateChat and send email
export const initiateChat = async (currentUser: User, otherUser: User) => {

  const roomId = await createChatRoom(String(currentUser._id), String(otherUser._id));

  const chatRoomLink = `${baseUrl}/chat/${roomId}`;

  
  //SEND EMAIL
  const res = await axios.post("/api/send-email",{
    to: "shirabiton387@gmail.com",
    subject: "Test email sending",
    text: `linl to chat ${chatRoomLink}`
})
  if(res)
    console.log("send");
    

  return roomId;
};
