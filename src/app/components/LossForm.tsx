"use client";
import React, { useEffect, useState } from "react";
import LossFormData from "../types/lossFormType";
import axios from "axios";
import { Category } from "../types/Category";

const LossForm = () => {
  const [formData, setFormData] = useState<LossFormData>({
    category: "",
    subCategory: "",
    colors: [],
    city1: "",
    city2: "",
  });
  const [isBus, setIsBus] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [subCategories, setSubCategories] = useState<Record<string, string[]>>(
    {}
  );

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/category")
      .then((response) => {
        const fetchedData = response.data;

        const categoryNames: string[] = fetchedData.map(
          (category: Category) => category.name
        );

        const subCategoryMap: Record<string, string[]> = fetchedData.reduce(
          (acc: Record<string, string[]>, category: Category) => {
            acc[category.name] = category.subcategories.map(
              (subcategory: { name: string }) => subcategory.name // Extract the name of each subcategory
            );
            return acc;
          },
          {}
        );

        setCategories(categoryNames);
        setSubCategories(subCategoryMap);

        console.log("Categories:", categoryNames);
        console.log("Subcategories:", subCategoryMap);
      })
      .catch((error) => console.error("Error loading categories:", error));
  }, []);

  const hebrewColors: string[] = [
    "אדום",
    "כחול",
    "ירוק",
    "צהוב",
    "שחור",
    "לבן",
    "כתום",
    "סגול",
    "ורוד",
    "חום",
    "אפור",
    "טורקיז",
    "בורדו",
    "זהב",
    "כסף",
    "תכלת",
    "מנטה",
    "שמנת",
    "נחושת",
    "ריבוי צבעים",
  ];
  const cities = ["New York", "Los Angeles", "Chicago", "Miami", "Dallas"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setFormData((prevData) => {
        const newColors = checked
          ? [...prevData.colors, value]
          : prevData.colors.filter((color) => color !== value);
        return { ...prevData, colors: newColors };
      });
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsBus(e.target.checked);
  };

  return (
    <div dir="rtl">
      <form className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <p className="font-bold text-3xl p-10 flex justify-center">
          דיווח על אבידה
        </p>
        <div className="space-y-4">
            
          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              קטגוריה:
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">בחר קטגוריה</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* SubCategory */}
          <div>
            <label
              htmlFor="subCategory"
              className="block text-sm font-medium text-gray-700"
            >
              תת קטגוריה:{" "}
            </label>
            <select
              id="subCategory"
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
              disabled={!formData.category}
            >
              <option value="">בחר תת קטגוריה</option>
              {formData.category &&
                subCategories[formData.category].map((subCategory: string) => (
                  <option key={subCategory} value={subCategory}>
                    {subCategory}
                  </option>
                ))}
            </select>
          </div>

          {/* Colors */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              בחר לפחות צבע אחד:{" "}
            </label>
            <div className="mt-2 grid grid-cols-2 gap-4">
              {hebrewColors.map((color) => (
                <div key={color} className="flex items-center">
                  <input
                    type="checkbox"
                    id={color}
                    name="colors"
                    required
                    value={color}
                    checked={formData.colors.includes(color)}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label htmlFor={color} className="ml-2 text-sm text-gray-700">
                    {color}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* is bus */}
          <div className="flex items-center pt-8">
            <input
              type="checkbox"
              id="bus"
              name="bus"
              value=" האם הפריט נאבד בתחבורה ציבורית?"
              checked={isBus}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded "
            />
            <label
              htmlFor="bus"
              className="block text-sm text-gray-700 font-bold"
            >
              האם הפריט נאבד בתחבורה ציבורית?
            </label>
          </div>

          {/* City1 */}
          <div>
            <label
              htmlFor="city1"
              className="block text-sm font-medium text-gray-700"
            >
              {isBus ? "בחר  את עיר המוצא " : "בחר עיר"}
            </label>
            <select
              id="city1"
              name="city1"
              value={formData.city1}
              onChange={handleChange}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">בחר עיר</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* City2 (Optional) */}
          {isBus ? (
            <div>
              <label
                htmlFor="city2"
                className="block text-sm font-medium text-gray-700"
              >
                בחר את עיר היעד
              </label>
              <select
                id="city2"
                name="city2"
                value={formData.city2 || ""}
                onChange={handleChange}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">בחר עיר</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <></>
          )}

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              שלח
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LossForm;
