import userStore from '@/app/store/userStore';
import { useRouter } from 'next/navigation';
import React from 'react';

interface RoomListProps {
  rooms: string[]; // רשימת חדרים
}

const RoomList= () => {
 const currentUser = userStore((state) => state.user);

 const rooms =currentUser?.chatRooms

  const router = useRouter();

  return (
    <div className="flex space-x-4 bg-gray-200 p-4">
      {rooms&&rooms.map((room) => (
        <button
          key={room}
          onClick={() => router.push(`/chat/${room}`)} // מעבר לעמוד חדר
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          חדר {room}
        </button>
      ))}
    </div>
  );
};

export default RoomList;
