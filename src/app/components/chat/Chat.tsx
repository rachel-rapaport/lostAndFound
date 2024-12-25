"use client"
import React, { useState, useEffect } from 'react';
import { database, ref, onValue, push, set } from '../../lib/firebase/firebaseConfig'; // ייבוא של פונקציות Firebase

interface ChatProps {
  roomId: string; // פרופס של roomId שיתקבל מהדף
}
interface Message {
    text: string;
    timestamp: number;
  }

const Chat: React.FC<ChatProps> = ({ roomId }) => {
  const [messages, setMessages] = useState<Message[]>([]); // שומר את ההודעות במצב
  const [newMessage, setNewMessage] = useState(''); // שומר את ההודעה החדשה

  // פוקנציה שמטפלת בהתחברות ל-Firebase ומביאה את ההודעות
  useEffect(() => {
    const messagesRef = ref(database, `chats/${roomId}`); // חיבור למסד הנתונים של Firebase לפי roomId
    onValue(messagesRef, (snapshot) => {
        const data = snapshot.val(); // קריאת הנתונים ממסד הנתונים
        setMessages(data ? Object.values(data) : []); // עדכון מצב ההודעות
      });
  }, [roomId]); // תתעדכן כל פעם שה-roomId משתנה

  // פוקנציה לשליחת הודעה חדשה
  const sendMessage = () => {
    if (newMessage.trim()) { // אם יש הודעה להוסיף
      const messagesRef = ref(database, `chats/${roomId}`); // חיבור למסד הנתונים
      const newMessageRef = push(messagesRef); // יצירת מפתח חדש להודעה
      set(newMessageRef, {
        text: newMessage, // תוכן ההודעה
        timestamp: Date.now(), // חותמת זמן של ההודעה
      });
      setNewMessage(''); // ניקוי השדה אחרי שליחת ההודעה
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
    <div className="flex items-center justify-center bg-blue-600 text-white p-4 shadow-lg">
      <h2 className="text-xl font-bold">חדר צ&apos;אט - חדר {roomId}</h2>
    </div>
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="p-3 bg-white rounded-lg shadow-md max-w-sm"
          >
            {msg.text}
          </div>
        ))}
      </div>
    </div>
    <div className="flex items-center p-4 bg-gray-200 border-t">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="הקלד הודעה"
        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
      />
      <button
        onClick={sendMessage}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        שלח
      </button>
    </div>
    </div>
  );
};

export default Chat;
