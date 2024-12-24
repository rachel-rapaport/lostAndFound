import {
  deleteLostItemById,
  getLostItems,
} from "@/app/services/api/lostItemService";
import { LostItem } from "@/app/types/props/lostItem";

import { useState, useEffect } from "react";

const LostItemsTable = () => {
  const [lostItems, setLostItems] = useState<LostItem[]>([]);
  const fetchLostItems = async () => {
    const response = await getLostItems();
    setLostItems(response.data);
  };
  useEffect(() => {
  
    fetchLostItems();
  }, [lostItems]);

  const handleDelete = async (id: string) => {
    console.log(id);
    
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
            <th className="table-cell">תת קטגוריה</th>
            <th className="table-cell">שם משתמש</th>
            <th className="table-cell">אימייל משתמש</th>
            <th className="table-cell">צבע</th>
            <th className="table-cell">מרכז המעגל</th>
            <th className="table-cell">רדיוס המעגל</th>
            <th className="table-cell">
              סוג תחבורה ציבורית{" "}
            </th>
            <th className="table-cell">עיר</th>
            <th className="table-cell">קו</th>
            <th className="table-cell">פעולות</th>
          </tr>
        </thead>
        <tbody>
          {lostItems.map((item) => (
            <tr
              key={item._id.toString()}
              className="hover:bg-gray-100 even:bg-gray-50"
            >
              <>
                <td className="table-cell">
                  {item.subCategoryId.title}
                </td>
                <td className="table-cell">
                  {item.userId.fullName}
                </td>
                <td className="table-cell">
                  {item.userId.email}
                </td>
                <td className="table-cell">
                  {item.colorId?.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {`${item.circles&&item.circles[0].center.lat} , ${item.circles&&item.circles[0].center.lng}`}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.circles&&item.circles[0].radius}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.publicTransport&&item.publicTransport.typePublicTransportId.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.publicTransport&&item.publicTransport.city}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.publicTransport&&item.publicTransport.line}
                </td>

                <td className="table-cell text-center">
                  <button
                    className="px-3 py-2 bg-[#CF5151] text-white rounded hover:bg-[#D26F6F]"
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
