"use client";
import React, { useState, useEffect } from "react";
import userStore from "../../../store/userStore";
import UpdateUserModal from "./UpdateUserInfoModal";
import { updateUserById } from "../../../services/api/userService";
import { Types } from "mongoose";
import { getLostItemById } from "@/app/services/api/lostItemService";
import { getFoundItemById } from "@/app/services/api/foundItemsService";
import { FoundItem } from "@/app/types/props/foundItem";
import { LostItem } from "@/app/types/props/lostItem";
import LostItemsSection from "./LostItem";
import FoundItemsSection from "./FoundItem";

const UserDashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lostItems, setLostItems] = useState<LostItem[]>([]);
  const [foundItems, setFoundItems] = useState<FoundItem[]>([]);
  const [, setLoading] = useState(true);
  const currentUser = userStore((state) => state.user);
  const setUser = userStore((state) => state.setUser);

  // fetching user data
  useEffect(() => {
    const fetchItems = async () => {
      if (currentUser) {
        try {
          const [lostDetails, foundDetails] = await Promise.all([
            currentUser.lostItems?.length
              ? Promise.all(
                  currentUser.lostItems.map(async (itemId) => {
                    try {
                      const item = await getLostItemById(String(itemId));

                      return item.data[0]; // Return the item if fetch succeeds
                    } catch (error) {
                      console.warn(
                        `Failed to fetch lost item with ID ${itemId}`,
                        error
                      );
                      return null; // Skip the item by returning null
                    }
                  })
                ).then((items) => items.filter((item) => item)) // Filter out null values
              : [],
            currentUser.foundItems?.length
              ? Promise.all(
                  currentUser.foundItems.map(async (itemId) => {
                    try {
                      const item = await getFoundItemById(String(itemId));
                      return item.data[0]; // Return the item if fetch succeeds
                    } catch (error) {
                      console.warn(
                        `Failed to fetch found item with ID ${itemId}`,
                        error
                      );
                      return null; // Skip the item by returning null
                    }
                  })
                ).then((items) => items.filter((item) => item)) // Filter out null values
              : [],
          ]);

          setLostItems(lostDetails);
          setFoundItems(foundDetails);
        } catch (error) {
          console.error("Failed to fetch lost or found items details", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchItems();
  }, [currentUser]);

  const handleSave = (updatedData: {
    _id: Types.ObjectId;
    fullName: string;
    email: string;
    password: string;
    phone: string;
  }) => {
    if (currentUser && currentUser._id) {
      updateUserById(currentUser._id.toString(), updatedData);
      setUser(updatedData);
      setIsModalOpen(false);
    } else {
      console.error("Current user or user ID is undefined.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex flex-col-reverse lg:grid grid-cols-3 gap-6">
        {/* User Info Section */}
        <div className="col-span-1 bg-white p-6 rounded-lg shadow-md order-last lg:order-first">
          <h2 className="text-2xl font-semibold">פרטים אישיים:</h2>
          <div className="space-y-4 mt-4">
            <p>
              <strong>שם מלא:</strong> {currentUser?.fullName}
            </p>
            <p>
              <strong>כתובת דואר אלקטרוני:</strong> {currentUser?.email}
            </p>
            <p>
              <strong>טלפון:</strong> {currentUser?.phone}
            </p>
            <p>
              <strong>סיסמה:</strong> {currentUser?.password}
            </p>
            <button
              className="primary-btn px-8 py-2 font-semibold text-black rounded-md hover:primary"
              onClick={() => {
                setIsModalOpen(!isModalOpen);
              }}
            >
              עריכת הפרטים האישיים
            </button>
          </div>
        </div>

        <div className="col-span-2 space-y-6">
          <LostItemsSection lostItems={lostItems} setLostItems={setLostItems} />

          <FoundItemsSection
            foundItems={foundItems}
            setFoundItems={setFoundItems}
          />
        </div>
      </div>
      <UpdateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialUserData={
          currentUser
            ? currentUser
            : {
                _id: new Types.ObjectId(),
                fullName: "",
                email: "",
                password: "",
                phone: "",
              }
        }
      />
    </div>
  );
};

export default UserDashboard;