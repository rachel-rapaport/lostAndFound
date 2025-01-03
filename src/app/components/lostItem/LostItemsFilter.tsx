"use client";
import { matchFoundLost } from "@/app/services/api/matchService";
import useFoundItemStore from "@/app/store/foundItemStore";
import lostItemStore from "@/app/store/lostItemStore";
import userStore from "@/app/store/userStore";
import { LostItem } from "@/app/types/props/lostItem";
import { User } from "@/app/types/props/user";
import { afterFilter } from "@/app/utils/sendToUser";
import { getVercelUrlWithoutRequest } from "@/app/utils/vercelUrl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const LostItemsFilter = () => {
  const [send, setSend] = useState(true);
  const currentFoundItem = useFoundItemStore((state) => state.currentFoundItem);
  const filteredLostItems = lostItemStore((state) => state.filteredLostItems);
  const setFilteredLostItems = lostItemStore(
    (state) => state.setFilteredLostItems
  );
  const currentUser = userStore((state) => state.user);
  const router = useRouter();

  const fetchLostItems = async () => {
    if (currentFoundItem) {
      try {
        const lost = await matchFoundLost(currentFoundItem);
        setFilteredLostItems(lost);
      } catch (error) {
        console.error("Error fetching lost items:", error);
      }
    }
  };

  const sendUser = (user: User) => {
    const chatRoomLink = `${getVercelUrlWithoutRequest()}/questions/${
      currentFoundItem?._id
    }`;
    afterFilter(user, "foundItem", chatRoomLink);
  };

  useEffect(() => {
    fetchLostItems();
  }, [currentFoundItem, setFilteredLostItems]);

  useEffect(() => {
    if (filteredLostItems && currentUser && send) {
      console.log(11);
      setSend(false);
      filteredLostItems.map((item: LostItem) => sendUser(item.userId));
    }
  }, [filteredLostItems]);

  const goHome = () => {
    router.push("/home");
  };

  return (
    <div className="flex items-center justify-center mt-16">
    <div className="text-center space-y-4 p-6">
      <h1 className="text-2xl font-bold">
        תודה שהקדשת מזמנך לעלות את הפריט
      </h1>
      <p className="text-lg">
        המערכת מסננת ברגעים אלו פריטים אבודים תואמים.
        <br />
        עקוב במייל או בהתראות באתר על הזמנות לצ&aposאט - יכול להיות שמצאנו את בעל
        האבידה...
      </p>
      <button
        onClick={goHome}
        className="primary-btn"
      >
        חזרה לדף הבית
      </button>
    </div>
  </div>
  );
};

export default LostItemsFilter;
