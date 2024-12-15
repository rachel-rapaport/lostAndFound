import { database, ref, set, get } from '@/app/lib/firebase/firebaseConfig';

//Generate a room ID based on user IDs
export const generateChatRoomId = (user1Id: string, user2Id: string): string =>

{console.log("in func");
  return user1Id < user2Id ? `${user1Id}_${user2Id}` : `${user2Id}_${user1Id}`;
};

//Create a chat room if it doesn't exist
export const createChatRoom = async (user1Id: string, user2Id: string): Promise<string> => {
  console.log("innnnn");
  
  const roomId = generateChatRoomId(user1Id, user2Id);
  
  
  const chatRef = ref(database, `chats/${roomId}`);


  const chatSnapshot = await get(chatRef); 
   console.log("after");
  if (!chatSnapshot.exists()) {
    await set(chatRef, {
      users: [user1Id, user2Id],
      createdAt: Date.now(),
    });
  }

 console.log(chatRef);
 

  return roomId;
};
