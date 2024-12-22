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
            <th className="table-cell">תת קטגוריה</th>
            <th className="table-cell">שם משתמש</th>
            <th className="table-cell">אימייל משתמש</th>
            <th className="table-cell">צבע</th>
            <th className="table-cell">מיקום</th>
            <th className="table-cell">
              סוג תחבורה ציבורית{" "}
            </th>
            <th className="table-cell">עיר</th>
            <th className="table-cell">קו</th>
            <th className="table-cell">תיאור</th>
            <th className="table-cell">תמונה</th>
            <th className="table-cell">פעולות</th>
          </tr>
        </thead>
        <tbody>
          {foundItems.map((item) => (
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
                <td className="table-cell">
                  {`${item.postion.latitude},${item.postion.longitude}`}
                </td>

                <td className="table-cell">
                  {item.publicTransport.typePublicTransportId.title}
                </td>
                <td className="table-cell">
                  {item.publicTransport.city}
                </td>
                <td className="table-cell">
                  {item.publicTransport.line}
                </td>
                <td className="table-cell">
                  {item.descripition}
                </td>
                <td className="table-cell">
                  {item.image || "No image"}
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

export default FoundItemsTable;
