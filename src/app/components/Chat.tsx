//deletetee
// components/Chat.tsx
import React, { useState, useEffect } from 'react';
import { database, ref, onValue, push, set } from '../lib/firebase/firebaseConfig'; // ייבוא של פונקציות Firebase

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
    <div>
      <h2>חדר צאט עם חדר {roomId}</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg.text}</p> // הצגת כל הודעה
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)} // עדכון תוכן ההודעה
        placeholder="הקלד הודעה"
      />
      <button onClick={sendMessage}>שלח</button> {/* כפתור לשליחת הודעה */}
    </div>
  );
};

export default Chat;
