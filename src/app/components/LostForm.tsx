"use client";
import React, { useState } from "react";
import PublicTransportation from "./PublicTransportation";
import CategoriesSelect from "./select/CategoriesSelect";
import SubCategoriesSelect from "./select/SubCategoriesSelect";
import ColorSelect from "./select/ColorSelect";
import MapModal from "./MapModal";
import { Circle } from "../types/props/circle";

const LostForm = () => {
  const [, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<
    "map" | "transport" | null
  >(null);
  const [circles, setCircles] = useState<Circle[]>([]);

  const [transportData, setTransportData] = useState<{
    typePublicTransportId: string;
    line: string;
    city: string;
  }>({
    typePublicTransportId: "",
    line: "",
    city: "",
  });

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleSubCategorySelect = (subCategoryId: string) => {
    setSelectedSubCategory(subCategoryId);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleLocationSelect = (location: "map" | "transport") => {
    setSelectedLocation(location);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const lostItem = {
      subCategoryId: selectedSubCategory,
      colorId: selectedColor,
      userId: null,
      circles: circles,
      publicTransport:
        selectedLocation === "transport"
          ? {
              typePublicTransportId: transportData.typePublicTransportId,
              line: transportData.line,
              city: transportData.city,
            }
          : null,
    };
    console.log("lost item", lostItem);
  };

  return (
    <div className="m-4">
      <h2 className="text-3xl font-bold text-center mb-4">פריט אבוד</h2>
      <form className="space-y-6 text-right" onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row-reverse gap-8">
          {/* צד ימין */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div>
              <h3 className="section-title">קטגוריה</h3>
              <CategoriesSelect onSelect={handleCategorySelect} />
            </div>
            <div>
              <h3 className="fsection-title">תת-קטגוריה</h3>
              <SubCategoriesSelect onSelect={handleSubCategorySelect} />
            </div>
            <div>
              <h3 className="section-title">צבע</h3>
              <ColorSelect onSelect={handleColorSelect} />
            </div>
          </div>
          {/* צד שמאל */}
          <div className=" lg:w-2/3 ">
            {selectedLocation === null && (
              <div>
                <h3 className="section-title">מיקום</h3>
                <div className="flex justify-center  gap-16">
                  <button
                    type="button"
                    onClick={() => handleLocationSelect("transport")}
                    className="primary-btn w-full lg:w-auto"
                  >
                    תחבורה ציבורית
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLocationSelect("map")}
                    className="primary-btn w-full lg:w-auto"
                  >
                    מפה
                  </button>
                </div>
              </div>
            )}

            {selectedLocation === "transport" && (
              <PublicTransportation
                transportData={transportData}
                setTransportData={setTransportData}
              />
            )}
            {selectedLocation === "map" && (
              <MapModal circles={circles} setCircles={setCircles} />
            )}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <button type="submit" className="secondary-btn ">
            שלח
          </button>
        </div>
      </form>
    </div>
  );
};

export default LostForm;
