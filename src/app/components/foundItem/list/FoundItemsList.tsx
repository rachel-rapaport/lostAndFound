"use client";
import React, { useEffect } from "react";
import lostItemStore from "@/app/store/lostItemStore";
import { matchLostFound } from "@/app/services/api/matchService";
import Card from "./Card";
import { FoundItem } from "@/app/types/props/foundItem";
import useFoundItemStore from "@/app/store/foundItemStore";
import CardBlocked from "./CardBlocked";
import userStore from "@/app/store/userStore";
import { useRouter } from "next/navigation";

const FoundItemsList = () => {
  const currentLostItem = lostItemStore((state) => state.currentLostItem);
  const filteredFoundItems = useFoundItemStore(
    (state) => state.filteredFoundItems
  );
  const setFilteredFoundItems = useFoundItemStore(
    (state) => state.setFilteredFoundItems
  );
  const currentUser = userStore((state) => state.user);
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  const fetchFoundItems = async () => {
    if (currentLostItem) {
      try {
        const found = await matchLostFound(currentLostItem);
        setFilteredFoundItems(found);
        setFilteredFoundItems(found);
      } catch (error) {
        console.error("Error fetching found items:", error);
      }
    }
  };

  useEffect(() => {
    fetchFoundItems();
  }, []);

  useEffect(() => {
    fetchFoundItems();
  }, [currentLostItem, setFilteredFoundItems]);

  return (
    <div className="flex flex-wrap gap-4 justify-start">
   {filteredFoundItems && filteredFoundItems.length > 0 ? (
    filteredFoundItems.map((item: FoundItem, index: number) => {
      const isBlocked =
        currentUser?.blockedItems?.some((blocked) => {
          return String(item._id) === String(blocked);
        }) || false;

      return isBlocked ? (
        <CardBlocked key={String(item._id)} />
      ) : (
        <Card
          key={String(item._id)}
          counter={index + 1}
          id={String(item._id)}
        />
      );
    })
  ) : (
    // תוכן חלופי במקרה שאין פריטים במערך
    <div className="flex items-center justify-center mt-16">
    <div className="text-center space-y-4 p-6">
      <h1 className="text-2xl font-bold"> 
           אופס!

      </h1>
      <p className="text-lg">
אין פריטים שנמצאו תואמים לאבידתך.....

        <br />
       עקוב במייל או בהתראות באתר - יכול להיות שנמצא את האבידה שלך!
        המערכת מסננת ברגעים אלו פריטים אבודים תואמים.
      </p>
      <button
        onClick={goHome}
        className="primary-btn"
      >
        חזרה לדף הבית
      </button>
    </div>
  </div>
  )}
    </div>
  );
};

export default FoundItemsList;
