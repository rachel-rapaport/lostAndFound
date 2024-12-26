"use client";
import React, { useEffect, useState } from "react";
import lostItemStore from "@/app/store/lostItemStore";
import { matchLostFound } from "@/app/services/api/matchService";
import Card from "./Card";
import { FoundItem } from "@/app/types/props/foundItem";
import useFoundItemStore from "@/app/store/foundItemStore";
import CardBlocked from "./CardBlocked";
import userStore from "@/app/store/userStore";

const FoundItemsList = () => {
  const currentLostItem = lostItemStore((state) => state.currentLostItem);
  const setFilteredFoundItems = useFoundItemStore(
    (state) => state.setFilteredFoundItems
  );
  const currentUser = userStore((state) => state.user);

  const [foundItemsList, setFoundItemsList] = useState<FoundItem[]>([]);

  useEffect(() => {
    const fetchFoundItems = async () => {
      if (currentLostItem) {
        try {
          const found = await matchLostFound(currentLostItem);
          console.log("found", found);

          setFoundItemsList(found);
          setFilteredFoundItems(found);
        } catch (error) {
          console.error("Error fetching found items:", error);
        }
      }
    };

    fetchFoundItems();
  }, [currentLostItem, setFilteredFoundItems]);

  return (
    <div className="flex flex-wrap gap-4 justify-start">
      {foundItemsList &&
        foundItemsList.map((item: FoundItem, index: number) => {
          const isBlocked =
            currentUser?.blockedItems?.some(
              (blockedId) => String(blockedId) === String(item._id)
            ) || false;

          return isBlocked ? (
            <CardBlocked key={String(item._id)} />
          ) : (
            <Card
              key={String(item._id)}
              counter={index + 1}
              id={String(item._id)}
            />
          );
        })}
    </div>
  );
};

export default FoundItemsList;
