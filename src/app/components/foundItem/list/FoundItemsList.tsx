'use client';
import React, { useEffect, useState } from 'react';
import lostItemStore from '@/app/store/lostItemStore';
import { matchLostFound } from '@/app/services/api/matchService';
import Card from './Card';
import { FoundItem } from '@/app/types/props/foundItem';
import useFoundItemStore from '@/app/store/foundItemStore';
import CardBlocked from './CardBlocked';

const FoundItemsList = () => {
  const currentLostItem = lostItemStore((state) => state.currentLostItem);
  const setFilteredFoundItems = useFoundItemStore((state) => state.setFilteredFoundItems)
  const [foundItemsList, setFoundItemsList] = useState<FoundItem[]>([]);

  useEffect(() => {
    const fetchFoundItems = async () => {
      if (currentLostItem) {
        try {
          const found = await matchLostFound(currentLostItem);
          console.log("found", found);

          setFoundItemsList(found);
          setFilteredFoundItems(found)
        } catch (error) {
          console.error("Error fetching found items:", error);
        }
      }
    };

    fetchFoundItems();
  }, [currentLostItem, setFilteredFoundItems]);

  return (
    <div className="flex flex-wrap gap-4 justify-start">
      {foundItemsList && foundItemsList.map((item: FoundItem, index: number) => (
       
        <>
 <Card
          key={String(item._id)}
          counter={index+1}
          id={String(item._id)}
        />

        <CardBlocked/>
        </>
      ))}
    </div>
  );
};

export default FoundItemsList;
