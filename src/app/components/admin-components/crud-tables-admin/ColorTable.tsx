import {
  deleteColorById,
  getColors,
  updateColorById,
  createColor,
} from "@/app/services/api/colorService";
import { Color } from "@/app/types/props/color";
import { Types } from "mongoose";
import React, { useEffect, useState } from "react";

export const ColorTable = () => {
  const [colors, setColors] = useState<Color[]>([]);
  const [newColor, setNewColor] = useState<Color>({
    _id: new Types.ObjectId(0),
    name: "",
    groupId: 0,
    hexadecimal: "",
  });
  const [editColor, setEditColor] = useState<Color | null>(null);
  const [isEditing, setIsEditing] = useState<string | null>(null);

  useEffect(() => {
    const fetchColors = async () => {
      const response = await getColors();
      setColors(response);
    };
    fetchColors();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteColorById(id);
      if (response.data) {
        setColors((prevColors) =>
          prevColors.filter((item) => item._id.toString() !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting color:", error);
    }
  };

  const handleEdit = (color: Color) => {
    setIsEditing(color._id.toString());
    setEditColor(color);
  };

  const handleSaveEdit = async () => {
    console.log("is updating");
    console.log(editColor);

    if (editColor) {
      try {
        const response = await updateColorById(
          editColor._id.toString(),
          editColor
        );
        if (response.data) {
          setColors(
            colors.map((color) =>
              color._id === editColor._id ? editColor : color
            )
          );
          setIsEditing(null);
          setEditColor(null);
          console.log("Update successful");
        } else {
          console.error("Update failed:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error during update:", error);
      }
    }
  };

  const handleAdd = async () => {
    if (newColor.name && newColor.groupId) {
      const response = await createColor(newColor);
      if (response.ok) {
        setColors([...colors, response.data]);
        setNewColor({
          _id: new Types.ObjectId(0),
          name: "",
          groupId: 0,
          hexadecimal: "",
        });
      }
    }
  };

  return (
    <div className="p-6">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="table-cell">צבע</th>
            <th className="table-cell">קבוצה</th>
            <th className="table-cell">הקסדצימלי</th>
            <th className="table-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {colors?.map((color) => (
            <tr
              key={color._id.toString()}
              className="hover:bg-gray-100 even:bg-gray-50"
            >
              {isEditing === color._id.toString() ? (
                <>
                  <td className="table-cell">
                    <input
                      type="text"
                      value={editColor?.name || ""}
                      onChange={(e) =>
                        setEditColor((prev) =>
                          prev ? { ...prev, name: e.target.value } : null
                        )
                      }
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="table-cell">
                    <input
                      type="number"
                      value={editColor?.groupId || ""}
                      onChange={(e) =>
                        setEditColor((prev) =>
                          prev
                            ? { ...prev, groupId: parseInt(e.target.value, 10) }
                            : null
                        )
                      }
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="table-cell">
                    <input
                      type="text"
                      value={editColor?.hexadecimal || ""}
                      onChange={(e) =>
                        setEditColor((prev) =>
                          prev ? { ...prev, hexadecimal: e.target.value } : null
                        )
                      }
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="table-cell text-center">
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                      onClick={handleSaveEdit}
                    >
                      Save
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                      onClick={() => setIsEditing(null)}
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="table-cell">{color.name}</td>
                  <td className="table-cell">{color.groupId}</td>
                  <td className="table-cell">{color.hexadecimal}</td>
                  <td className="table-cell text-center justify-between">
                    <button
                      className="px-3 py-2 bg-primary text-white rounded hover:bg-[#FFE35A]"
                      onClick={() => handleEdit(color)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-2 bg-[#CF5151] text-white rounded hover:bg-[#D26F6F]"
                      onClick={() => handleDelete(color._id.toString())}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
          <tr>
            <td className="table-cell">
              <input
                type="text"
                value={newColor.name}
                onChange={(e) =>
                  setNewColor({ ...newColor, name: e.target.value })
                }
                placeholder="New Color Name"
                className="w-full px-2 py-1 border rounded"
              />
            </td>
            <td className="table-cell">
              <input
                type="number"
                value={newColor.groupId || ""}
                onChange={(e) =>
                  setNewColor({
                    ...newColor,
                    groupId: parseInt(e.target.value, 10) || 0,
                  })
                }
                placeholder="New Group ID"
                className="w-full px-2 py-1 border rounded"
              />
            </td>
            <td className="table-cell">
              <input
                type="text"
                value={newColor.hexadecimal}
                onChange={(e) =>
                  setNewColor({ ...newColor, hexadecimal: e.target.value })
                }
                placeholder="New hexedecimal"
                className="w-full px-2 py-1 border rounded"
              />
            </td>
            <td className="table-cell text-center">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={handleAdd}
              >
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ColorTable;
