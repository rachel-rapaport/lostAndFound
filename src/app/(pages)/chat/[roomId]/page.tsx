"use client"
import React from 'react';
import { useParams } from 'next/navigation';
import Chat from '@/app/components/Chat';

const ChatPage = () => {
  const { roomId } = useParams();

  if (!roomId) {
    return <p>טוען...</p>;
  }
  // return <h1>צ&apos;אט עם המוצא</h1>
  return (
    <>
      {/* <p>צ&apos;אט עם המוצא</p>
      <p>נפתח חדר צ&apos;אט עם המוצא לאימות סופי ותיאום העברת הפריט.</p>
      <p>ברגע זה נשלחה התראה למוצא שהינך ממתין לו בחדר לסיום התהליך.</p> */}
      <Chat roomId={roomId as string} />
    </>
  )
};



export default ChatPage;