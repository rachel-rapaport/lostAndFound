"use client";
import React, { useState, useEffect } from "react";
import {database, ref, onValue,push, set} from "../../lib/firebase/firebaseConfig"; // ייבוא של פונקציות Firebase
import userStore from "@/app/store/userStore";
import { Message } from "@/app/types/massageChat";

const Chat: React.FC<{ roomId: string }> = ({ roomId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const currentUser = userStore((state) => state.user);

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
    if (newMessage.trim()) {
      // אם יש הודעה להוסיף
      const messagesRef = ref(database, `chats/${roomId}`); // חיבור למסד הנתונים
      const newMessageRef = push(messagesRef); // יצירת מפתח חדש להודעה
      const timestamp = new Date();
      set(newMessageRef, {
        text: newMessage, // תוכן ההודעה
        timestamp: new Date(
          timestamp.getFullYear(),
          timestamp.getMonth(),
          timestamp.getDate(),
          timestamp.getHours(),
          timestamp.getMinutes()
        ).getTime(),
        senderId: currentUser?._id, // חותמת זמן של ההודעה
      });
      setNewMessage(""); // ניקוי השדה אחרי שליחת ההודעה
    }
  };

  return (
    <div className="w-full">
      <div className="space-y-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.senderId === String(currentUser?._id)
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`flex flex-col ${
                message.senderId === String(currentUser?._id)
                  ? "text-left"
                  : "text-right"
              }`}
            >
              {/* הצגת השעה מעל ההודעה */}
              <span className="text-sm text-gray-600 mb-1">
                {new Date(message.timestamp).toLocaleTimeString("he-IL", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <div
                className={`p-3 rounded-lg ${
                  message.senderId === String(currentUser?._id)
                    ? "bg-primary text-left"
                    : "bg-gray-300 text-right"
                }`}
              >
                <p>{message.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-x-4 mt-6">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
          placeholder="הקלד הודעה..."
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          onClick={sendMessage}
          className="flex rounded-full h-[50px] min-w-[50px] self-end justify-center items-center bg-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#FFFF"
            className="size-6 transform scale-x-[-1] "
          >
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chat;
