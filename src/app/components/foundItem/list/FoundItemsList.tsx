"use client";
import React, { useEffect } from "react";
import lostItemStore from "@/app/store/lostItemStore";
import { matchLostFound } from "@/app/services/api/matchService";
import Card from "./Card";
import { FoundItem } from "@/app/types/props/foundItem";
import useFoundItemStore from "@/app/store/foundItemStore";
import CardBlocked from "./CardBlocked";
import userStore from "@/app/store/userStore";
import { getSubCategoryById } from "@/app/services/api/subcategoryService";

const FoundItemsList = () => {
  const currentLostItem = lostItemStore((state) => state.currentLostItem);
  const filteredFoundItems = useFoundItemStore(
    (state) => state.filteredFoundItems
  );
  const setFilteredFoundItems = useFoundItemStore(
    (state) => state.setFilteredFoundItems
  );
  const currentUser = userStore((state) => state.user);
  const fetchFoundItems = async () => {
    if (currentLostItem) {
      try {
        console.log("sending to match from found match list", currentLostItem);
        const result = await getSubCategoryById(String(currentLostItem.subCategoryId._id));
        const subCategory = result.data.data;
        
        
        if (subCategory?.categoryId && subCategory.categoryId._id) {
          const categoryId = String(subCategory.categoryId._id); // Make sure we're accessing _id correctly
          console.log(categoryId, "category id to send to match");
          const found = await matchLostFound(currentLostItem,categoryId);
          setFilteredFoundItems(found);
        } else {
          console.error("Category ID is missing or not properly populated.");
        }
        
        
     
        // setFilteredFoundItems(found);
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
      {filteredFoundItems &&
        filteredFoundItems.map((item: FoundItem, index: number) => {
          const isBlocked =
            currentUser?.blockedItems?.some(
              (blocked) => String(blocked._id) === String(item._id)
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
