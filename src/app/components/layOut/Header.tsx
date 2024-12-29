import React, { useEffect, useRef, useState } from "react";
import { BellAlertIcon } from "@heroicons/react/16/solid";
import userStore from "@/app/store/userStore";
import { Alerts } from "./Alerts";
import { Profile } from "../user/Profile";

const Header: React.FC = () => {
  const alerts = userStore((state) => state.alerts);

  const unreadAlertsCount = alerts?.filter((alert) => !alert.read).length || 0;
  const [showAlerts, setShowAlerts] = useState(false);
  const alertsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        alertsRef.current &&
        !alertsRef.current.contains(event.target as Node)
      ) {
        setShowAlerts(false);
      }
    };

    if (showAlerts) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAlerts]);

  const handleAlertsClick = () => {
    setShowAlerts(!showAlerts); // Toggle the display of the Alerts component
  };

  return (
    <header className="bg-secondary text-white p-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">מציאון</h1>
        <nav>
          <ul className="flex space-x-reverse space-x-6 items-center justify-around">
            <li>
              <a href="/home" className="hover:text-gray-300">
                דף הבית
              </a>
            </li>
           <div ref={alertsRef}>
              <li
                className="relative cursor-pointer"
                onClick={handleAlertsClick}
              >
                <BellAlertIcon className="w-10 h-10 ml-2 text-white" />
                {unreadAlertsCount > 0 && (
                  <span className="absolute bottom-0 left-0 inline-flex items-center justify-center w-5 h-5 text-s font-semibold text-black bg-primary rounded-full">
                    {unreadAlertsCount}
                  </span>
                )}
              </li>

              {showAlerts && <Alerts />}
            </div>

            <li>
              <Profile />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;