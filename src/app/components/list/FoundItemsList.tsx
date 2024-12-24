'use client';
import React, { useEffect, useState } from 'react';
import lostItemStore from '@/app/store/lostItemStore';
import { useQuery } from '@tanstack/react-query';
import { matchLostFound } from '@/app/services/api/matchService';
import Card from './Card';
import { FoundItem } from '@/app/types/props/foundItem';

const FoundItemsList = () => {
  const currentLostItem = lostItemStore((state) => state.currentLostItem);
  const [hasItem, setHasItem] = useState(false);

  useEffect(() => {
    // אם יש פריט בסטור, נקבע את הסטטוס ל-true כדי לאפשר קריאה לפונקציה
    if (currentLostItem) {
      setHasItem(true);
    }
  }, [currentLostItem]);

  const { data: foundItemsList, isLoading, error } = useQuery({
    queryKey: ['matchLostFound', currentLostItem],
    queryFn: () => {
      if (!currentLostItem) throw new Error('No current lost item provided');
      return matchLostFound(currentLostItem);
    },
    enabled: hasItem,  // תאפשר את הקריאה רק אם יש פריט בסטור
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred while matching items.</p>;

  console.log('inn', foundItemsList);

  return (
    <div className="flex flex-col gap-4">
      {foundItemsList &&
        foundItemsList.map((item: FoundItem, index: number) => (
          <Card key={String(item._id)} counter={index} id={String(item._id)} />
        ))}
    </div>
  );
};

export default FoundItemsList;
