'use client';
import React from 'react';
import { useRouter } from 'next/navigation'; // לשימוש בניווט


const Card: React.FC<{counter:number,id: string}> = ({ counter, id }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/questions/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer border border-gray-300 rounded-lg p-4 mb-4 transition-transform transform hover:scale-105 bg-gray-50 shadow-md"
    >
      <h3 className="text-xl font-semibold text-gray-800">item :{counter}</h3>
    </div>
  );
};

export default Card;