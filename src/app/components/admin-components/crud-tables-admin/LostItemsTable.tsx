import {
  deleteLostItemById,
  getLostItems,
} from "@/app/services/api/lostItemService";
import { LostItem } from "@/app/types/props/lostItem";

import { useState, useEffect } from "react";

const LostItemsTable = () => {
  const [lostItems, setLostItems] = useState<LostItem[]>([]);

  useEffect(() => {
    const fetchLostItems = async () => {
      const response = await getLostItems();
      setLostItems(response.data);
    };
    fetchLostItems();
    
  }, []);

  const handleDelete = async (id: string) => {
    const response = await deleteLostItemById(id);
    if (response.ok) {
      setLostItems(lostItems.filter((item) => item._id.toString() !== id));
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
            <th className="border border-gray-300 px-4 py-2">מרכז המעגל</th>
            <th className="border border-gray-300 px-4 py-2">רדיוס המעגל</th>
            <th className="border border-gray-300 px-4 py-2">
              סוג תחבורה ציבורית{" "}
            </th>
            <th className="border border-gray-300 px-4 py-2">עיר</th>
            <th className="border border-gray-300 px-4 py-2">קו</th>
            <th className="border border-gray-300 px-4 py-2">פעולות</th>
          </tr>
        </thead>
        <tbody>
          {lostItems.map((item) => (
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
                  {item.colorId?.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {`${item.circles[0].center.lat} , ${item.circles[0].center.lng}`}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.circles[0].radius}
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

export default LostItemsTable;
