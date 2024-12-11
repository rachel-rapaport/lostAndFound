"use client";
import { Types } from "mongoose";
import { User } from "../types/props/user";
import { afterFilter } from "../utils/sendToUser";
import { initiateChat } from "../utils/chat";
import { sendEmailToAdmin } from "../services/api/sendEmailService";
import { getUserById } from "../services/api/userService";

const Homepage = () => {
  // דוגמת אובייקטים של משתמשים

  const handleStartChat = async () => {
    try {
      const my = await getUserById(String("6759e531b82b1951ee236b61"));
      console.log(my.data[0].email);
      const  roomId= await initiateChat(my.data[0]);
      alert("חדר צ'אט נוצר, נשלחה הזמנה במייל!");
      // אפשר להפנות את המשתמש לדף הצ'אט
      
      const chatRoomLink = `${process.env.NEXT_PUBLIC_BASE_URL}/chat/${roomId}`;
      afterFilter(my.data[0], "chat", chatRoomLink);
      // window.location.href = `/chat/${roomId}`;
    } catch (error) {
      console.error("שגיאה ביצירת צ'אט:", error);
    }
  };

  const handleClick = async () => {
    const res = await sendEmailToAdmin(
      "shira0504113387@gmail.com",
      "היי",
      "בדיקה"
    );
    return res;
  };

  return (
    <>
      <h1 className="text-center text-[5vh] font-semibold mb-[5vh]">
        אתר מציאון
      </h1>
      <button onClick={handleClick}>send email</button>

      <button className="btn" onClick={handleStartChat}>
        התחל צאט
      </button>
    </>
  );
};

export default Homepage;
