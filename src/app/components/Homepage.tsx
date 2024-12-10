"use client";
import { useRouter } from "next/navigation";
import { initiateChat } from "../services/chat/chatService";
import { Types } from "mongoose";
import { User } from "../types/props/user";

const Homepage = () => {
  
  // דוגמת אובייקטים של משתמשים
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
  const user2: User = {
    _id: new Types.ObjectId(), 
    fullName: 'חיים לוי',
    email: 'yossi@example.com',
    password: 'password123', 
    phone: '0501234567',
    lostItems: [],
    foundItems: [],
    blockedItems: [],
    alerts: []
  };
 

  const handleStartChat = async () => {
    try {
      const roomId = await initiateChat(user1,user2);
      alert('חדר צ\'אט נוצר, נשלחה הזמנה במייל!');
      // אפשר להפנות את המשתמש לדף הצ'אט
      window.location.href = `/chat/${roomId}`;
    } catch (error) {
      console.error('שגיאה ביצירת צ\'אט:', error);
    }
  };

  const router = useRouter();

  return (
    <>
      <h1 className="text-center text-[5vh] font-semibold mb-[5vh]">
        אתר מציאון
      </h1>
      <div className="flex w-[20%] mx-auto justify-between flex-grow">
        <button className="btn" onClick={() => router.push("/report-found")}>
          מצאתי אבידה
        </button>
        <button className="btn" onClick={() => router.push("/report-found")}>
          אבד לי משהו
        </button>
      </div>
      <button className="btn" onClick={handleStartChat}>התחל צאט</button>
    </>
  );
};

export default Homepage;
