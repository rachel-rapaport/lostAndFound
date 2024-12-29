import userStore from '@/app/store/userStore';
import { useRouter } from 'next/navigation';
import React from 'react';

const RoomList = () => {
  const currentUser = userStore((state) => state.user);
  const rooms = currentUser?.chatRooms;
  const router = useRouter();

  return (
    <div className="flex flex-col space-y-4 bg-gray-100 p-4 rounded-lg">
      {rooms && rooms.map((room) => (
        <div
          key={room.roomId}
          className={`p-4 rounded-lg ${
            room.available ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer' : 'bg-gray-300'
          }`}
        >
          <div className="flex justify-between items-center">
            <span className="text-white font-medium">
              {room.userNameFound !== currentUser.fullName ? room.userNameFound : room.userNameLost}
            </span>
            {room.available ? (
              <button
                onClick={() => router.push(`/chat/${room.roomId}`)} // מעבר לעמוד חדר
                className="px-3 py-1 bg-white text-blue-500 font-medium rounded-lg hover:bg-gray-100"
              >
                פתח CHAT
              </button>
            ) : (
              <span className="text-gray-500">לא זמין</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomList;
