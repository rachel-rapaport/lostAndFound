import React from "react";
import { Profile } from "./Profile";
import { BellAlertIcon } from "@heroicons/react/16/solid";
import userStore from "../store/userStore";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const alerts = userStore((state) => state.alerts);
  const router = useRouter();

  const unreadAlertsCount = alerts?.filter((alert) => !alert.read).length || 0;

  return (
    <header className="bg-secondary text-white p-8 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">מציאון</h1>
        <nav>
          <ul className="flex space-x-reverse space-x-6 items-center justify-around">
            <li>
              <a href="/home" className="hover:text-gray-300">
                דף הבית
              </a>
            </li>
            <li
              className="relative cursor-pointer"
              onClick={() => router.push("/alerts")}
            >
              <BellAlertIcon className="w-10 h-10 ml-2 text-white" />
              {unreadAlertsCount > 0 && (
                <span className="absolute bottom-0 left-0 inline-flex items-center justify-center w-5 h-5 text-s font-semibold text-black bg-primary rounded-full">
                  {unreadAlertsCount}
                </span>
              )}
            </li>

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
