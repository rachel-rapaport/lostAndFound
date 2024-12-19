import {
  deleteFoundItemById,
  getFoundItems,
} from "@/app/services/api/foundItemsService";
import { FoundItem } from "@/app/types/props/foundItem";

import { useState, useEffect } from "react";

const FoundItemsTable = () => {
  const [foundItems, setFoundItems] = useState<FoundItem[]>([]);

  useEffect(() => {
    const fetchFoundItems = async () => {
      const response = await getFoundItems();
      setFoundItems(response.data);
    };
    fetchFoundItems();
  }, []);

  const handleDelete = async (id: string) => {
    const response = await deleteFoundItemById(id);
    if (response.ok) {
      setFoundItems(foundItems.filter((item) => item._id.toString() !== id));
    }
  };

  return (
    <div className="p-6">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2">תת קטגוריה</th>
            <th className="border border-gray-300 px-4 py-2">שם משתמש</th>
            <th className="border border-gray-300 px-4 py-2">אימייל משתמש</th>
            <th className="border border-gray-300 px-4 py-2">צבע</th>
            <th className="border border-gray-300 px-4 py-2">מיקום</th>
            <th className="border border-gray-300 px-4 py-2">
              סוג תחבורה ציבורית{" "}
            </th>
            <th className="border border-gray-300 px-4 py-2">עיר</th>
            <th className="border border-gray-300 px-4 py-2">קו</th>
            <th className="border border-gray-300 px-4 py-2">תיאור</th>
            <th className="border border-gray-300 px-4 py-2">תמונה</th>
            <th className="border border-gray-300 px-4 py-2">פעולות</th>
          </tr>
        </thead>
        <tbody>
          {foundItems.map((item) => (
            <tr
              key={item._id.toString()}
              className="hover:bg-gray-100 even:bg-gray-50"
            >
              <>
                <td className="border border-gray-300 px-4 py-2">
                  {item.subCategoryId.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.userId.fullName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.userId.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.colorId.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {`${item.postion.latitude},${item.postion.longitude}`}
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  {item.publicTransport.typePublicTransportId.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.publicTransport.city}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.publicTransport.line}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.descripition}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.image || "No image"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDelete(item._id.toString())}
                  >
                    Delete
                  </button>
                </td>
              </>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoundItemsTable;
