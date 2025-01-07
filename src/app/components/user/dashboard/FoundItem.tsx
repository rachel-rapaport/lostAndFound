import React, { useState } from "react";
import { FoundItem } from "@/app/types/props/foundItem";
import { deleteFoundItemById } from "@/app/services/api/foundItemsService";
import UpdateUserFoundItem from "./UpdateUserFoundItemModal";

interface FoundItemsProps {
  foundItems: FoundItem[];
  setFoundItems: React.Dispatch<React.SetStateAction<FoundItem[]>>;
}

const FoundItemsSection: React.FC<FoundItemsProps> = ({
  foundItems,
  setFoundItems,
}) => {
  const [editingItem, setEditingItem] = useState<FoundItem | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await deleteFoundItemById(id);
      setFoundItems((prev) =>
        prev.filter((item) => item._id.toString() !== id)
      );
    } catch (error) {
      console.error("Failed to delete found item:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold">פריטים שנמצאו</h2>
      {loading ? (
        <p className="text-gray-500">טוען פריטים...</p>
      ) : foundItems.length > 0 ? (
        <div className="space-y-4 mt-4">
          {foundItems.map((item) => (
            <div
              key={String(item._id)}
              className="border border-gray-200 p-4 rounded-md flex flex-col space-y-4"
            >
              <div>
                <h3 className="font-semibold">{item.subCategoryId?.title}</h3>
                <p className="text-gray-500">צבע: {item.colorId?.name}</p>
                <p className="text-gray-500">תיאור: {item.descripition}</p>
                {item.publicTransport && (
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
          <div className="relative bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-lg sm:max-w-xl md:max-w-3xl lg:max-w-4xl">
            {/* Close Button */}
            <button
              onClick={() => setEditingItem(null)} // Close modal when clicked
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>

            {/* FoundForm */}
            <div className="h-auto max-h-[90vh] w-full overflow-y-auto">
              <UpdateUserFoundItem foundItemToEdit={editingItem} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoundItemsSection;
