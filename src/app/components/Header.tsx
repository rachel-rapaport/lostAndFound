// components/Header.tsx
import React from "react";
import { Profile } from "./Profile";
import { BellAlertIcon} from "@heroicons/react/16/solid";

const Header: React.FC = () => {
  return (
    <header className="bg-secondary text-white p-8 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">מציאון</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="/home" className="hover:text-gray-300">
                Home
              </a>
            </li>
            {/* <li>
              <a href="/about" className="hover:text-gray-300">About</a>
            </li> */}
            <li>
              {" "}
              <BellAlertIcon className="w-6 h-6 mr-2 text-white" />
            </li>
            <li>
              <Profile></Profile>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
