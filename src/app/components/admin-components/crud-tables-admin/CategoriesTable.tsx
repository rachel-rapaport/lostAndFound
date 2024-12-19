"use client";
import { addCategory, getCategories } from "@/app/services/api/categoryService";
import { createSubCategory } from "@/app/services/api/subcategoryService";
import { Category } from "@/app/types/props/category";
import { SubCategory } from "@/app/types/props/subCategory";
import { Types } from "mongoose";
import React, { useEffect, useState } from "react";

export const CategorysTable = () => {
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<Category>({
    _id: new Types.ObjectId(),
    title: "",
    subCategories: [],
  });
  const [newSubCategory, setNewSubCategory] = useState<string>("");

  const [openedCategoryId, setOpenedCategoryId] = useState<string | null>(null);

  useEffect(() => {
   
    fetchCategorys();
  }, []);
  const fetchCategorys = async () => {
    try {
      const categorysData = await getCategories();
      if (categorysData) {
        setCategorys(categorysData);
      }
    } catch (error) {
      console.error("Failed to fetch categorys:", error);
    }
  };


  const handleAddCategory = async () => {
    const response = await addCategory(newCategory);
    if (response) {
      const createdCategory = await response;
      setCategorys([...categorys, createdCategory]);
      fetchCategorys();
      setNewCategory({
        _id: new Types.ObjectId(),
        title: "",
        subCategories: [],
      });
    }
  };

  const handleAddSubCategory = (categoryId: string) => {
    const category = categorys.find((cat) => cat._id === categoryId);
    if (category && newSubCategory) {
      const newSubCategoryObj: SubCategory = {
        _id: new Types.ObjectId(),
        title: newSubCategory,
        categoryId: category,
        lostItems: [],
        foundItems: [],
      };
      createSubCategory({
        categoryId: category._id,
        title: newSubCategory,
      });

      const updatedCategory = {
        ...category,
        subCategories: [...category.subCategories, newSubCategoryObj],
      };

      const updatedCategories = categorys.map((cat) =>
        cat._id === categoryId ? updatedCategory : cat
      );

      setCategorys(updatedCategories);
      setNewSubCategory("");
    }
  };
  const handleCategoryClick = (categoryId: string) => {
    setOpenedCategoryId((prevId) =>
      prevId === categoryId ? null : categoryId
    );
  };

  return (
    <div className="p-6">
    <div className="overflow-x-auto">
      <table className="table-auto w-full max-w-4xl mx-auto border-collapse border border-gray-300 hidden md:table">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-3 text-center">Title</th>
            <th className="border border-gray-300 px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categorys.map((category) => (
            <React.Fragment key={category._id}>
              <tr
                className="hover:bg-gray-100 even:bg-gray-50 cursor-pointer text-md"
                onClick={() => handleCategoryClick(category._id)}
              >
                <td className="border border-gray-300 px-4 py-3">{category.title}</td>
                <td className="border border-gray-300 px-4 py-3 text-center"></td>
              </tr>
  
              {openedCategoryId === category._id && (
                <tr>
                  <td colSpan={2} className="bg-gray-50 px-4 py-4">
                    <ul className="list-inside list-disc text-sm">
                      {category.subCategories.map((subCategory) => (
                        <li key={subCategory._id}>{subCategory.title}</li>
                      ))}
                    </ul>
                    <div className="mt-4 flex space-x-2">
                      <input
                        type="text"
                        value={newSubCategory}
                        onChange={(e) => setNewSubCategory(e.target.value)}
                        placeholder="New Subcategory"
                        className="p-2 border rounded text-sm w-full"
                      />
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded text-sm"
                        onClick={() => handleAddSubCategory(category._id)}
                      >
                        Add
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
  
          <tr className="bg-gray-50">
            <td className="border border-gray-300 px-4 py-3">
              <input
                type="text"
                placeholder="New Category"
                value={newCategory.title || ""}
                className="w-full p-2 border rounded text-sm"
                onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
              />
            </td>
            <td className="border border-gray-300 px-4 py-3 text-center">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={handleAddCategory}
              >
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  
      {/* Mobile view */}
      <div className="block md:hidden">
        {categorys.map((category) => (
          <div
            key={category._id}
            className="bg-white shadow-md rounded-lg p-4 mb-4"
          >
            <div
              className="cursor-pointer text-sm"
              onClick={() => handleCategoryClick(category._id)}
            >
              <p>
                <strong>{category.title}</strong>
              </p>
            </div>
  
            {openedCategoryId === category._id && (
              <div className="mt-4">
                <ul className="list-inside list-disc text-sm">
                  {category.subCategories.map((subCategory) => (
                    <li key={subCategory._id}>{subCategory.title}</li>
                  ))}
                </ul>
                <div className="mt-4 flex space-x-2">
                  <input
                    type="text"
                    value={newSubCategory}
                    onChange={(e) => setNewSubCategory(e.target.value)}
                    placeholder={`New Subcategory for ${category?.title || ""}`}
                    className="p-2 border rounded text-sm w-full"
                  />
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded text-sm"
                    onClick={() => handleAddSubCategory(category._id
                    )}
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
          <input
            type="text"
            placeholder="New Category"
            value={newCategory.title || ""}
            className="w-full p-2 border rounded text-sm mb-2"
            onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded w-full text-sm"
            onClick={handleAddCategory}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
  
  
  );
};

export default CategorysTable;
