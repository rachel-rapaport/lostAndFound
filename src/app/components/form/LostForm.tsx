"use client";
import React, { useState } from "react";
import { Types } from "mongoose";
import { useRouter } from "next/navigation";
import { z } from "zod";
import PublicTransportation from "../PublicTransportation";
import CategoriesSelect from "../select/CategoriesSelect";
import SubCategoriesSelect from "../select/SubCategoriesSelect";
import ColorSelect from "../select/ColorSelect";
import { Circle } from "../../types/props/circle";
import userStore from "../../store/userStore";
import { createLostItem } from "../../services/api/lostItemService";
import lostItemStore from "../../store/lostItemStore";
import Map from "../Map";
import { PublicTransport } from "@/app/types/props/publicTransport";
import { LostItemSchema } from "@/app/schemas/lostItemSchema";
const LostForm = () => {
  const [, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<
    "map" | "transport" | null
  >(null);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [transportData, setTransportData] = useState<PublicTransport>({
    typePublicTransportId: "",
    line: "",
    city: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const currentUser = userStore((state) => state.user);
  const setCurrentLostItem = lostItemStore((state) => state.setCurrentLostItem);
  const router = useRouter();

  const validateLostItem = () => {
    try {
      LostItemSchema.parse({
        subCategoryId: selectedSubCategory,
        colorId: selectedColor,
        selectedLocation,
        circles: selectedLocation === "map" ? circles : undefined,
        publicTransport: selectedLocation === "transport" ? transportData : undefined,
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((e) => {
          if (e.path.length) {
            fieldErrors[e.path[0]] = e.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLostItem()) return;

    const lostItem = {
      _id: new Types.ObjectId(),
      subCategoryId: selectedSubCategory,
      colorId: selectedColor,
      userId: String(currentUser?._id),
      circles: selectedLocation === "map" ? circles : null,
      publicTransport:
        selectedLocation === "transport"
          ? {
              typePublicTransportId: transportData.typePublicTransportId,
              line: transportData.line,
              city: transportData.city,
            }
          : null,
    };

    try {
      await createLostItem(lostItem);
      setCurrentLostItem(lostItem);
      router.push("/home");
    } catch (error) {
      console.error("Error submitting lost item:", error);
    }
  };

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      <div className="m-4 h-full overflow-y-auto no-scrollbar">
        <h2 className="text-3xl font-bold text-center mb-4">פריט אבוד</h2>
        <form className="space-y-6 text-right" onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/3 space-y-6">
              <div>
                <h3 className="section-title">קטגוריה</h3>
                <CategoriesSelect onSelect={setSelectedCategory} />
              </div>
              <div>
                <h3 className="section-title">תת-קטגוריה</h3>
                <SubCategoriesSelect onSelect={setSelectedSubCategory} />
                {errors.subCategoryId && (
                  <p className="error-message">{errors.subCategoryId}</p>
                )}
              </div>
              <div>
                <h3 className="section-title">צבע</h3>
                <ColorSelect onSelect={setSelectedColor} />
                {errors.colorId && <p className="error-message">{errors.colorId}</p>}
              </div>
            </div>
            <div className="lg:w-2/3">
              {selectedLocation === null && (
                <div>
                  <h3 className="section-title">מיקום</h3>
                  <div className="flex justify-center gap-16">
                    <button
                      type="button"
                      onClick={() => setSelectedLocation("transport")}
                      className="primary-btn w-full lg:w-auto"
                    >
                      תחבורה ציבורית
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedLocation("map")}
                      className="primary-btn w-full lg:w-auto"
                    >
                      מיקום גאוגרפי
                    </button>
                  </div>
                  {errors.selectedLocation && (
                    <p className="error-message">{errors.selectedLocation}</p>
                  )}
                </div>
              )}

              {selectedLocation === "transport" && (
                <>
                  <PublicTransportation
                    transportData={transportData}
                    setTransportData={setTransportData}
                  />
                  {errors.publicTransport && (
                    <p className="error-message">{errors.publicTransport}</p>
                  )}
                </>
              )}
              {selectedLocation === "map" && (
                <Map circles={circles} setCircles={setCircles} />
              )}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <button type="submit" className="secondary-btn">
              שלח
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LostForm;
