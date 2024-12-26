"use client";
import React, { useEffect, useState } from "react";
import { UsersTable } from "./crud-tables-admin/UsersTable";
import CategorysTable from "./crud-tables-admin/CategoriesTable";
import LostItemsTable from "./crud-tables-admin/LostItemsTable";
import FoundItemsTable from "./crud-tables-admin/FoundItemsTable";
import { ColorTable } from "./crud-tables-admin/ColorTable";
import { TypeTransportationTable } from "./crud-tables-admin/TypeTransportationTable";
import { getUsers } from "@/app/services/api/userService";

export const AdminDashboard = () => {
  const [activeTable, setActiveTable] = useState("users");
  const [userEmails, setUserEmails] = useState<string[]>([]);

  const fetchUserEmails = async () => {
    try {
      const response = await getUsers(); 
      const emails = response.data.map((user: { email: string }) => user.email);
      setUserEmails(emails);
    } catch (error) {
      console.error("Failed to fetch user emails:", error);
    }
  };

  useEffect(() => {
    fetchUserEmails();
  }, []); 

  const renderTable = () => {
    switch (activeTable) {
      case "users":
        return <UsersTable />;
      case "categories":
        return <CategorysTable  />;
      case "Lost items":
        return <LostItemsTable userEmails={userEmails}/>;
      case "Found items":
        return <FoundItemsTable  userEmails={userEmails}/>;
      case "Colors":
        return <ColorTable />;
      case "Transportation":
        return <TypeTransportationTable />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100" dir="rtl">
      {/* Left Menu */}
      <aside className="w-64 bg-[#27332D] text-white p-6">
        <nav>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => setActiveTable("users")}
                className={`block w-full text-right text-lg font-semibold p-2 rounded 
    ${activeTable === "users" ? "bg-[#515748]" : "hover:bg-[#515748]"}`}
              >
                ניהול משתמשים
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTable("categories")}
                className={`block w-full text-right text-lg font-semibold p-2 rounded 
    ${activeTable === "categories" ? "bg-[#515748]" : "hover:bg-[#515748]"}`}
              >
                ניהול קטגוריות
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTable("Lost items")}
                className={`block w-full text-right text-lg font-semibold p-2 rounded 
    ${activeTable === "Lost items" ? "bg-[#515748]" : "hover:bg-[#515748]"}`}
              >
                ניהול חפצים שאבדו{" "}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTable("Found items")}
                className={`block w-full text-right text-lg font-semibold p-2 rounded 
    ${activeTable === "Found items" ? "bg-[#515748]" : "hover:bg-[#515748]"}`}
              >
                ניהול חפצים שנמצאו{" "}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTable("Colors")}
                className={`block w-full text-right text-lg font-semibold p-2 rounded 
    ${activeTable === "Colors" ? "bg-[#515748]" : "hover:bg-[#515748]"}`}
              >
                ניהול צבעים{" "}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTable("Transportation")}
                className={`block w-full text-right text-lg font-semibold p-2 rounded 
    ${
      activeTable === "Transportation" ? "bg-[#515748]" : "hover:bg-[#515748]"
    }`}
              >
                ניהול סוגי תחבורה ציבורית
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content (Right Side) */}
      <div className="flex-1 bg-white shadow p-6">{renderTable()}</div>
    </div>
  );
};
