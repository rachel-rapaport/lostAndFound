import React, { useEffect, useRef, useState } from "react";
import { BellAlertIcon } from "@heroicons/react/24/solid";
import userStore from "@/app/store/userStore";
import { Alerts } from "./Alerts";
import { Profile } from "../user/Profile";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import RoomList from "../chat/RoomList";
import Link from "next/link";

const Header: React.FC = () => {
  const alerts = userStore((state) => state.alerts);
  const unreadAlertsCount = alerts?.filter((alert) => !alert.read).length || 0;

  const [showAlerts, setShowAlerts] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const alertsRef = useRef<HTMLLIElement | null>(null);
  const chatRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        alertsRef.current &&
        !alertsRef.current.contains(event.target as Node)
      ) {
        setShowAlerts(false);
      }

      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setShowChat(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAlertsClick = () => {
    setShowAlerts((prev) => !prev);
  };

  const handleChatClick = () => {
    setShowChat((prev) => !prev);
  };

  return (
    <header className="bg-secondary p-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        {/* צד ימין עם המילה "מציאון" וניווט הבית ואודות */}
        <div className="flex gap-x-6 items-center w-full sm:w-auto justify-between">
          <nav>
            <ul className="flex gap-x-6">
              <li>
                <Link href="/home" className="text-3xl font-bold text-primary">
                  מציאון
                </Link>
              </li>
              <li>
                <Link href="/home" className="text-white font-bold text-2xl hover:text-gray-300">
                  דף הבית
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white font-bold text-2xl hover:text-gray-300">
                  אודות
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* צד שמאל עם הניתוב למציאה ואבידה */}
        <nav className="flex gap-x-6 items-center w-full sm:w-auto justify-between">
          <ul className="flex gap-x-6">
            <li>
              <Link href="/found-item" className="text-white font-bold text-3xl hover:text-gray-300">
                מציאה
              </Link>
            </li>
            <li>
              <Link href="/lost-item" className="text-white font-bold text-3xl hover:text-gray-300">
                אבידה
              </Link>
            </li>
          </ul>
        </nav>

        {/* צד שמאל עם האיקונים */}
        <div className="flex gap-x-6 items-center w-full sm:w-auto justify-between">
          {/* Chat Icon and Popup */}
          <li ref={chatRef} className="relative">
            <div className="cursor-pointer" onClick={handleChatClick}>
              <ChatBubbleOvalLeftEllipsisIcon fill="white" className="w-11 h-11 ml-2" />
            </div>
            {showChat && <RoomList setShowChat={setShowChat} />}
          </li>

          {/* Alerts Icon and Popup */}
          <li ref={alertsRef} className="relative">
            <div className="cursor-pointer" onClick={handleAlertsClick}>
              <BellAlertIcon fill="white" className="w-10 h-10 ml-2" />
              {unreadAlertsCount > 0 && (
                <span className="absolute bottom-0 left-0 inline-flex items-center justify-center w-5 h-5 text-s font-semibold text-black bg-primary rounded-full">
                  {unreadAlertsCount}
                </span>
              )}
            </div>
            {showAlerts && <Alerts />}
          </li>

          {/* Profile */}
          <li>
            <Profile />
          </li>
        </div>
      </div>
    </header>
  );
};

export default Header;
