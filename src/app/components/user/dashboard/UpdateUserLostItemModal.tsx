"use client";
import React, { useEffect, useState } from "react";
import { Types } from "mongoose";
import { useRouter } from "next/navigation";
import { z } from "zod";
import PublicTransportation from "../../form/PublicTransportation";
import CategoriesSelect from "../../form/select/CategoriesSelect";
import SubCategoriesSelect from "../../form/select/SubCategoriesSelect";
import ColorSelect from "../../form/select/ColorSelect";
import userStore from "@/app/store/userStore";
import lostItemStore from "@/app/store/lostItemStore";
import Map from "../../form/Map";
import { LostItemSchema } from "@/app/schemas/lostItemSchema";
import { PublicTransportRequest } from "@/app/types/request/PublicTransportRequest";
import categoryStore from "@/app/store/categoryStore";
import axios from "axios";
import Token from "@/app/types/NER-model/token";
import { LostItem } from "@/app/types/props/lostItem";
import { Circle } from "@/app/types/props/circle";
import {
  createLostItem,
  updateLostItemById,
} from "@/app/services/api/lostItemService";

const UpdateUserLostItemModal = ({
  lostItemToEdit,
}: {
  lostItemToEdit?: LostItem;
}) => {
  const [, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<
    "map" | "transport" | null
  >(null);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [transportData, setTransportData] = useState<PublicTransportRequest>({
    typePublicTransportId: "",
    line: "",
    city: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const currentCategory = categoryStore((state) => state.currentCategory);
  const currentUser = userStore((state) => state.user);
  const setCurrentLostItem = lostItemStore((state) => state.setCurrentLostItem);
  const router = useRouter();

  const isEditMode = Boolean(lostItemToEdit);

  // Populate form for edit mode
  useEffect(() => {
    if (isEditMode && lostItemToEdit) {
      setSelectedCategory(lostItemToEdit?.subCategoryId?.categoryId?.title);
      setSelectedSubCategory(lostItemToEdit.subCategoryId.title);
      setSelectedColor(lostItemToEdit.colorId.name);
      setCircles(lostItemToEdit.circles || []);
      setTransportData(
        (lostItemToEdit.publicTransport || {
          typePublicTransportId: "",
          line: "",
          city: "",
        }) as PublicTransportRequest
      );
    }
  }, [isEditMode, lostItemToEdit]);

  // Validation function
  const validateLostItem = (): boolean => {
    try {
      LostItemSchema.parse({
        subCategoryId: selectedSubCategory,
        colorId: selectedColor,
        selectedLocation,
        circles: selectedLocation === "map" ? circles : undefined,
        publicTransport:
          selectedLocation === "transport" ? transportData : undefined,
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

  // Analyze text for category "שונות"
  const analyzeTextWithModel = async (
    sentence: string
  ): Promise<string | null> => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_RAILWAY_URL}/analyze`,
        {
          text: sentence,
        },
        { timeout: 40000 }
      );

      const nouns: string = response.data.embeddings[0].tokens
        .filter((token: Token) => token.morph.pos === "NOUN")
        .map((token: Token) => token.lex)
        .join(",");
      return nouns;
    } catch (error) {
      console.error("Error from analyze sending:", error.message);
      return null;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateLostItem()) return;

    const analyzedSubCategory =
      currentCategory?.title === "שונות"
        ? await analyzeTextWithModel(selectedSubCategory)
        : selectedSubCategory;

    const lostItem = {
      _id: isEditMode
        ? lostItemToEdit?._id ?? new Types.ObjectId() 
        : new Types.ObjectId(),
      subCategoryId: analyzedSubCategory || "",
      colorId: selectedColor,
      userId: String(currentUser?._id),
      circles: selectedLocation === "map" ? circles : null,
      publicTransport: selectedLocation === "transport" ? transportData : null,
    };

    try {
      if (isEditMode) {
        await updateLostItemById(String(lostItem._id), lostItem);
      } else {
        if (!currentCategory) return;
        const newListItem = await createLostItem(lostItem, currentCategory);
        setCurrentLostItem(newListItem);
        router.push("/foundItems-list");
      }
    } catch (error) {
      console.error("Error submitting lost item:", error);
    }
  };

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      <div className="m-4 h-full overflow-y-auto no-scrollbar">
        <h2 className="text-3xl font-bold text-center mb-4">
          {isEditMode ? "עדכון פריט אבוד" : "פריט אבוד"}
        </h2>
        <form className="space-y-6 text-right" onSubmit={handleSubmit}>
          {/* Category selection */}
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/3 space-y-6">
              <div>
                <h3 className="section-title">קטגוריה</h3>
                <CategoriesSelect onSelect={setSelectedCategory} />
              </div>
              <div>
                {currentCategory?.title !== "שונות" ? (
                  <>
                    <h3 className="section-title">תת-קטגוריה</h3>
                    <SubCategoriesSelect onSelect={setSelectedSubCategory} />
                    {errors.subCategoryId && (
                      <p className="error-message">{errors.subCategoryId}</p>
                    )}
                  </>
                ) : (
                  <>
                    <h3 className="section-title">
                      הכנס תיאור ענייני של הפריט האבוד:
                    </h3>
                    <input
                      type="text"
                      placeholder="הכנס תיאור"
                      className="block w-full px-3 py-2 border border-primary rounded-md shadow-sm focus:ring-primary sm:text-sm"
                      onChange={(e) => setSelectedSubCategory(e.target.value)}
                      value={selectedSubCategory}
                    />
                    {errors.subCategoryId && (
                      <p className="error-message">{errors.subCategoryId}</p>
                    )}
                  </>
                )}
              </div>

              <div>
                <h3 className="section-title">צבע</h3>
                <ColorSelect onSelect={setSelectedColor} />
                {errors.colorId && (
                  <p className="error-message">{errors.colorId}</p>
                )}
              </div>
            </div>

            <div className="lg:w-2/3">
              {/* Location selection */}
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

              {/* Transport fields */}
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

              {/* Map fields */}
              {selectedLocation === "map" && (
                <>
                  <Map circles={circles} setCircles={setCircles} />
                  {errors.circles && (
                    <p className="error-message">{errors.circles}</p>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <button type="submit" className="secondary-btn">
              {isEditMode ? "עדכן" : "שלח"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserLostItemModal;
