import React, { useState } from "react";
import { BellAlertIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import userStore from "@/app/store/userStore";
import { Alerts } from "./Alerts";
import { Profile } from "../user/Profile";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import RoomList from "../chat/RoomList";
import Link from "next/link";

const Header: React.FC = () => {
  const [showAlerts, setShowAlerts] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const alerts = userStore((state) => state.alerts);
  const unreadAlertsCount = alerts?.filter((alert) => !alert.read).length || 0;

  // Toggle the visibility of the alerts section
  const handleAlertsClick = () => {
    setShowAlerts((prev) => !prev);
  };

  // Toggle the visibility of the chat section
  const handleChatClick = () => {
    setShowChat((prev) => !prev);
  };

  // Toggle the visibility of the menu
  const handleMenuToggle = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <header className="bg-secondary p-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Hamburger Menu for small screens */}
        <div className="lg:hidden flex items-center">
          <button onClick={handleMenuToggle} className="text-white">
            {showMenu ? (
              <XMarkIcon fill="white" className="w-8 h-8 " />
            ) : (
              <Bars3Icon fill="white" className="w-8 h-8" />
            )}
          </button>
        </div>

        {/* Logo */}
        <div className="flex">
          <Link href="/" className="text-3xl font-bold text-primary">
            מציאון
          </Link>
          <div className="hidden lg:flex gap-x-6 items-center mr-6">
            <Link
              href="/"
              className="text-white font-bold text-2xl hover:text-gray-300"
            >
              דף הבית
            </Link>
            <Link
              href="/about"
              className="text-white font-bold text-2xl hover:text-gray-300"
            >
              אודות
            </Link>
          </div>
        </div>

        {/* Menu for large screens */}
        <nav className="hidden lg:flex gap-x-6 items-center">
          <Link
            href="/found-item"
            className="text-white font-bold text-4xl hover:text-gray-300 "
          >
            מציאה
          </Link>
          <Link
            href="/lost-item"
            className="text-white font-bold text-4xl hover:text-gray-300"
          >
            אבידה
          </Link>
        </nav>

        {/* Actions (chat, alerts, profile) */}
        <div className="flex gap-x-1 sm:gap-x-2 sm:items-end items-center">
          <li className="relative">
            <div className="cursor-pointer" onClick={handleChatClick}>
              <ChatBubbleOvalLeftEllipsisIcon
                fill="white"
                className="w-11 h-11 ml-2"
              />
            </div>
            {showChat && <RoomList setShowChat={setShowChat} />}
          </li>
          <li className="relative">
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
          <li>
            <Profile />
          </li>
        </div>
      </div>

      {/* Dropdown menu for small screens */}
      {showMenu && (
        <nav className="lg:hidden mt-4 bg-secondary p-4 rounded shadow-md">
          <Link
            href="/"
            className="block text-white font-bold text-2xl hover:text-gray-300"
          >
            דף הבית
          </Link>
          <Link
            href="/about"
            className="block text-white font-bold text-2xl hover:text-gray-300"
          >
            אודות
          </Link>
          <Link
            href="/found-item"
            className="block text-white font-bold text-2xl hover:text-gray-300"
          >
            מציאה
          </Link>
          <Link
            href="/lost-item"
            className="block text-white font-bold text-2xl hover:text-gray-300"
          >
            אבידה
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
