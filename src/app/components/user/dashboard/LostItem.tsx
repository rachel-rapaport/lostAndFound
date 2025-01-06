import React, { useState } from "react";
import { LostItem } from "@/app/types/props/lostItem";
import { deleteLostItemById } from "@/app/services/api/lostItemService";

import UpdateUserLostItemModal from "./UpdateUserLostItemModal";
interface LostItemsProps {
  lostItems: LostItem[];
  setLostItems: React.Dispatch<React.SetStateAction<LostItem[]>>;
}

const LostItemsSection: React.FC<LostItemsProps> = ({
  lostItems,
  setLostItems,
}) => {
  const [editingItem, setEditingItem] = useState<LostItem | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await deleteLostItemById(id);
      setLostItems((prev) => prev.filter((item) => item._id.toString() !== id));
    } catch (error) {
      console.error("Failed to delete lost item:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold">פריטים שאבדו</h2>
      {loading ? (
        <p className="text-gray-500">טוען פריטים...</p>
      ) : lostItems.length > 0 ? (
        <div className="space-y-4 mt-4">
          {lostItems.map((item) => (
            <div
              key={String(item._id)}
              className="border border-gray-200 p-4 rounded-md flex flex-col space-y-4"
            >
              <div>
                <h3 className="font-semibold">{item.subCategoryId?.title}</h3>
                <p className="text-gray-500">צבע: {item.colorId?.name}</p>
                {item?.circles?.[0]?.center?.lat && (
                  <p className="text-gray-500">מיקום גאוגרפי</p>
                )}

                {item.publicTransport?.typePublicTransportId.title && (
                  <p className="text-gray-500">
                    תחבורה ציבורית:{" "}
                    {item.publicTransport.typePublicTransportId.title}
                  </p>
                )}
              </div>
              <div className="flex space-x-4">
                <button
                  className="primary-btn"
                  onClick={() => setEditingItem(item)}
                >
                  עדכון
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item._id.toString())}
                >
                  מחיקה
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">לא נמצאו פריטים.</p>
      )}

      {editingItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
            {/* Close Button */}
            <button
              onClick={() => setEditingItem(null)} // Close modal when clicked
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>

            {/* LostForm */}
            <div className="h-[600px] max-h-[90vh] w-[800px] no-scrollbar">
              <UpdateUserLostItemModal lostItemToEdit={editingItem} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LostItemsSection;
