'use client';
import React, { useEffect, useState } from 'react';
import lostItemStore from '@/app/store/lostItemStore';
import { matchLostFound } from '@/app/services/api/matchService';
// import Card from './Card';
import { FoundItem } from '@/app/types/props/foundItem';

const FoundItemsList = () => {
  const currentLostItem = lostItemStore((state) => state.currentLostItem);
  const [foundItemsList, setFoundItemsList] = useState<FoundItem[]>([]);

  useEffect(() => {
    const fetchFoundItems = async () => {
      if (currentLostItem) {
        try {
          const found = await matchLostFound(currentLostItem);
          console.log("data found",found);
          
          setFoundItemsList(found);
        } catch (error) {
          console.error("Error fetching found items:", error);
        }
      }
    };

    fetchFoundItems();
  }, [currentLostItem]);

  return (
    <div className="flex flex-col gap-4">
      {/* {foundItemsList && foundItemsList.map((item: FoundItem, index: number) => (
        <Card
          key={String(item._id)}
          counter={index}
          id={String(item._id)}
        />
      ))} */}
    </div>
  );
};

export default FoundItemsList;
