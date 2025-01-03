"use client"
import React from 'react';
import { useParams } from 'next/navigation';
import Chat from '@/app/components/Chat';

const ChatPage = () => {
  const { roomId } = useParams(); 

  if (!roomId) {
    return <p>טוען...</p>;
  }

  return <Chat roomId={roomId as string} />;
};

export default ChatPage;
