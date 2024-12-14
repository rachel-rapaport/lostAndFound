"use client";
// import { afterFilter } from "../utils/sendToUser";
// import { initiateChat } from "../utils/chat";
import { sendEmailToAdmin } from "../services/api/sendEmailService";
// import { getUserById } from "../services/api/userService";
// import { getVercelUrlWithoutRequest } from "../utils/vercelUrl";

// import { useEffect } from 'react';
// import { useAppStore } from "../store/store";

const Homepage = () => {


  // const setVercelUrl = useAppStore((state) => state.setVercelUrl);
  // const isVercelUrlSet = useAppStore((state) => state.isVercelUrlSet);

  // useEffect(() => {
  //   if (!isVercelUrlSet) {
  //     // Only run this on the first load when `vercelUrl` isn't set
  //     const protocol = window.location.protocol || "http"; // Fallback to http if protocol isn't available
  //     const host = window.location.host; // Use current host (for client-side)
  //     const vercelUrl = `${protocol}//${host}`;

  //     // Set the vercelUrl in Zustand store and persist it
  //     setVercelUrl(vercelUrl);
  //   }
  // }, [isVercelUrlSet, setVercelUrl]);



  

  // דוגמת אובייקטים של משתמשים

  // const handleStartChat = async () => {
  //   try {
  //     const my = await getUserById(String("6759e531b82b1951ee236b61"));
  //     console.log(my.data[0].email);
  //     const  roomId= await initiateChat(my.data[0]);
  //     console.log("rommId",roomId);
      
  //     alert("חדר צ'אט נוצר, נשלחה הזמנה במייל!");
  //     // אפשר להפנות את המשתמש לדף הצ'אט
      
  //     const chatRoomLink = `${getVercelUrlWithoutRequest()}/chat/${roomId}`;
  //     afterFilter(my.data[0], "chat", chatRoomLink);
  //     // window.location.href = `/chat/${roomId}`;
  //   } catch (error) {
  //     console.error("שגיאה ביצירת צ'אט:", error);
  //   }
  // };

  const handleClick = async () => {
    const res = await sendEmailToAdmin(
      "shira0504113387@gmail.com",
      "היי",
      "בדיקה"
    );
    return res;
  };

  return (
    <>
      <h1 className="text-center text-[5vh] font-semibold mb-[5vh]">
        אתר מציאון
      </h1>
      <button onClick={handleClick}>send email</button>

      {/* <button className="btn" onClick={handleStartChat}>
        התחל צאט
      </button> */}
    </>
  );
};

export default Homepage;
