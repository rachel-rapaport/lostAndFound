"use client";
import React, { useEffect, useState } from "react";
import LossFormData from "../types/lossFormType";
import axios from "axios";
import { Category } from "../types/Category";
import City from "../types/city";
import Color from "../types/color";

const LossForm = () => {
  const [formData, setFormData] = useState<LossFormData>({
    category: "",
    subCategory: "",
    color: null,
    city1: "",
    city2: "",
  });
  const [isBus, setIsBus] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [subCategories, setSubCategories] = useState<Record<string, string[]>>(
    {}
  );
  const [hebrewColors, setHebrewColors] = useState<Color[]>([]);

  // get categories and sub categories
  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await axios.get<Color[]>("/hebrewColors.json"); // Axios GET request
        setHebrewColors(response.data); // Set the retrieved data
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };
    fetchColors();

    axios
      .get("/api/category")
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
        // console.log("Categories:", categoryNames);
        // console.log("Subcategories:", subCategoryMap);
      })
      .catch((error) => console.error("Error loading categories:", error));

    // get cities
    axios
      .get("https://api.israelcitiesapi.com/cities")
      .then((response) => {
        setCities(response.data.cities);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target ;

    if (name === "colors" && type === "radio") {
      const selectedColor  = hebrewColors.find((color) => color.color === value);

      if (!selectedColor ) return;

      setFormData((prevData) => ({
        ...prevData,
        colors: selectedColor , // Directly set the selected color object
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value, // Handle other input types (e.g., text, select)
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsBus(e.target.checked);
  };

  return (
    <div>
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
          {formData.category !== "שונות" ? (
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
                  subCategories[formData.category].map(
                    (subCategory: string) => (
                      <option key={subCategory} value={subCategory}>
                        {subCategory}
                      </option>
                    )
                  )}
              </select>
            </div>
          ) : (
            <div>
              <label
                htmlFor="textInput"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                תיאור
              </label>
              <input
                type="text"
                id="textInput"
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="הכנס תיאור מתומצת של הפריט"
              />
            </div>
          )}

          {/* Colors */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              בחר לפחות צבע אחד:{" "}
            </label>
            <div className="mt-2 grid grid-cols-2 gap-4">
              {hebrewColors.map((color) => (
                <div key={color.color} className="flex items-center">
                  <input
                    type="radio"
                    id={color.color}
                    name="color" // Keep the name consistent to group the radio buttons
                    required
                    value={color.color}
                    checked={formData.color?.color === color.color} // Adjust to reflect single selection
                    onChange={handleChange} // Ensure handleChange updates formData with the selected color
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={color.color}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {color.color}
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
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          {/* City2 (Optional) */}
          {isBus ? <div></div> : <></>}

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
