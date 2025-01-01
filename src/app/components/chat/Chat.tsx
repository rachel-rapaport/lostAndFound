"use client";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import {
  database,
  ref,
  onValue,
  push,
  set,
  update,
} from "../../lib/firebase/firebaseConfig";
import userStore from "@/app/store/userStore";
import { Message } from "@/app/types/massageChat";
import { useRouter } from "next/navigation";
import { blockItemForUser } from "@/app/utils/blockItemForUser";
import { remove } from "firebase/database";

const Chat: React.FC<{ roomId: string }> = ({ roomId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [, setIsChatClosed] = useState(false);
  const currentUser = userStore((state) => state.user);

  const router = useRouter();

  useEffect(() => {
    const messagesRef = ref(database, `chats/${roomId}`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      setMessages(data ? Object.values(data) : []);
    });

    const chatStatusRef = ref(database, `chatStatus/${roomId}`);
    onValue(chatStatusRef, (snapshot) => {
      const data = snapshot.val();
      if (data?.status === "closed") {
        setIsChatClosed(true);
        console.log("df1",data?.closedBy&&currentUser?._id&&data?.closedBy);
        console.log("df2",data?.closedBy&&currentUser?._id&&currentUser?._id);
        console.log("onn",data?.closedBy&&currentUser?._id&&data?.closedBy !== data?.closedBy&&currentUser?._id&&currentUser?._id);
        
        if (data?.closedBy != currentUser?._id) {
          // אם זה המשתמש השני, הצ'אט נסגר
          setShowModal(true);
          // setIsModalOpen(true);
        } else {
          // אם זה המשתמש שסגר את הצ'אט, שאל אם האבדה הושבה
          setIsModalOpen(true);
          // setShowModal(true);
        }

      }
    });
  }, [roomId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const messagesRef = ref(database, `chats/${roomId}`);
    const newMessageRef = push(messagesRef);
    const timestamp = new Date().getTime();

    set(newMessageRef, {
      text: newMessage,
      timestamp,
      senderId: currentUser?._id,
    });

    setNewMessage("");
  };

  const handleCloseChat = async () => {
    const chatStatusRef = ref(database, `chatStatus/${roomId}`);
    await update(chatStatusRef, { status: "closed", closedBy: currentUser?._id });
  };

  const handleConfirmYes = async () => {
    const chatRef = ref(database, `chats/${roomId}`);
    await remove(chatRef); // מסיר את הצ'אט מה-DB
    router.push("/foundItems-list"); // מעבר לדף אחר (למשל דף תודה)
  };

  const handleConfirmNo = () => {
    blockItemForUser();
    setIsModalOpen(false);
    router.push("/foundItems-list");
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
              className={`p-3 rounded-lg ${
                message.senderId === String(currentUser?._id)
                  ? "bg-primary text-left"
                  : "bg-gray-300 text-right"
              }`}
            >
              <span className="text-sm text-gray-600 mb-1">
                {new Date(message.timestamp).toLocaleTimeString("he-IL", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-x-4 mt-6">
        <button onClick={handleCloseChat} className="secondary-btn">
          סיים צ&apos;אט
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="הקלד הודעה..."
          className="flex-grow p-3 border rounded-lg focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="flex rounded-full h-[50px] min-w-[50px] self-end justify-center items-center bg-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#FFFF"
            className="size-6 transform scale-x-[-1]"
          >
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </div>

      {/* Modal for the user who closed the chat (asking if the lost item was returned) */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="flex flex-col items-center justify-center bg-white p-12 rounded shadow-lg max-w-sm mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-lg font-bold mb-8">האם האבדה הושבה?</h2>
        <div className="flex gap-4">
          <button onClick={handleConfirmYes} className="primary-btn">
            כן
          </button>
          <button onClick={handleConfirmNo} className="secondary-btn">
            לא
          </button>
        </div>
      </Modal>

      {/* Modal for the other user who is notified that the chat was closed */}
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-xl max-w-md mx-auto border-8 border-primary"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold mb-4 text-center">אופס! הצ&apos;אט נסגר</h2>
      </Modal>
    </div>
  );
};

export default Chat;