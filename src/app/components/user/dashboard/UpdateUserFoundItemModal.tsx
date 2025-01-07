"use client";
import { PublicTransportRequest } from "@/app/types/request/PublicTransportRequest";
import React, { useState } from "react";
import CategoriesSelect from "../../form/select/CategoriesSelect";
import SubCategoriesSelect from "../../form/select/SubCategoriesSelect";
import ColorSelect from "../../form/select/ColorSelect";
import PublicTransportation from "../../form/PublicTransportation";
import { Question } from "@/app/types/props/question";
import UploadImage from "../../form/UploadImage";
import QuestionsCreator from "../../lostItem/QuestionsCreator";
import { Postion } from "@/app/types/props/postion";
import Location from "../../form/Location";
import { Types } from "mongoose";
import userStore from "@/app/store/userStore";
import { updateFoundItemById } from "@/app/services/api/foundItemsService";
import { useRouter } from "next/navigation";
import axios from "axios";
import Token from "@/app/types/NER-model/token";
import categoryStore from "@/app/store/categoryStore";
import { FoundItem } from "@/app/types/props/foundItem";

const UpdateUserFoundItem = ({
  foundItemToEdit,
}: {
  foundItemToEdit?: FoundItem;
}) => {
  const [, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<
    "map" | "transport" | null
  >(null);
  const [transportData, setTransportData] = useState<PublicTransportRequest>({
    typePublicTransportId: "",
    line: "",
    city: "",
  });
  const [location, setLocation] = useState<Postion>({
    latitude: 0,
    longitude: 0,
  });
  const [questions, setQuestions] = useState<Question[]>([
    { question: "", answers: [""] },
  ]);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = userStore((state) => state.user);
  const currentCategory = categoryStore((state) => state.currentCategory);

  const router = useRouter();

  const isEditMode = Boolean(foundItemToEdit);

  const analyzeTextWithModel = async (sentence: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_RAILWAY_URL}/analyze`,
        { text: sentence },
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const analyzedSubCategory =
      currentCategory?.title === "שונות"
        ? await analyzeTextWithModel(selectedSubCategory)
        : selectedSubCategory;
    console.log("analyzed sub category from lost form", analyzedSubCategory);

    const foundItem = {
      _id: isEditMode
        ? foundItemToEdit?._id ?? new Types.ObjectId() // Ensure _id is defined if in edit mode
        : new Types.ObjectId(),
      subCategoryId: analyzedSubCategory ? analyzedSubCategory : "",
      colorId: selectedColor,
      userId: String(currentUser?._id),
      postion: selectedLocation === "map" ? location : null,
      publicTransport:
        selectedLocation === "transport"
          ? {
              typePublicTransportId: transportData.typePublicTransportId,
              line: transportData.line,
              city: transportData.city,
            }
          : null,
      descripition: description,
      image: image,
      questions: questions,
    } as unknown as FoundItem;

    try {
      if (isEditMode) {
        await updateFoundItemById(String(foundItem._id), foundItem); // Update only
        router.push("/foundItems-list"); // Redirect after updating
      }
    } catch (error) {
      console.error("Error submitting found item:", error);
    }
  };

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      <div className="m-4 h-full overflow-y-auto no-scrollbar">
        {" "}
        <h2 className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold text-center mb-3 sm:mb-4">
          פריט נמצא
        </h2>
        <form
          className="space-y-6 text-right overflow-y-auto h-full"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            {/* Left Section */}
            <div className="w-full sm:w-1/3 space-y-4">
              <div>
                <h3 className="text-sm sm:text-base font-medium text-gray-700">
                  קטגוריה
                </h3>
                <CategoriesSelect onSelect={setSelectedCategory} />
              </div>
              <div>
                {currentCategory?.title !== "שונות" ? (
                  <>
                    <h3 className="text-sm sm:text-base font-medium text-gray-700">
                      תת-קטגוריה
                    </h3>
                    <SubCategoriesSelect onSelect={setSelectedSubCategory} />
                  </>
                ) : (
                  <>
                    <h3 className="text-sm sm:text-base font-medium text-gray-700">
                      הכנס תיאור ענייני של הפריט האבוד:
                    </h3>
                    <input
                      type="text"
                      placeholder="הכנס תיאור"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-primary"
                      onChange={(e) => setSelectedSubCategory(e.target.value)}
                    />
                  </>
                )}
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-medium text-gray-700">
                  צבע
                </h3>
                <ColorSelect onSelect={setSelectedColor} />
              </div>
            </div>

            {/* Right Section */}
            <div className="w-full sm:w-2/3 space-y-4">
              {selectedLocation === null && (
                <div>
                  <h3 className="text-sm sm:text-base font-medium text-gray-700">
                    מיקום
                  </h3>
                  <div className="flex flex-col gap-2 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => setSelectedLocation("transport")}
                      className="bg-primary hover:bg-primary text-white py-2 px-4 rounded-md"
                    >
                      תחבורה ציבורית
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedLocation("map")}
                      className="bg-primary hover:bg-primary text-white py-2 px-4 rounded-md"
                    >
                      מיקום
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
                <Location setLocation={setLocation} />
              )}
              {/* Image Upload */}
              <div>
                <h3 className="text-sm sm:text-base font-medium text-gray-700">
                  העלאת תמונה
                </h3>
                <UploadImage setImage={setImage} />
              </div>
              {/* Questions Creator */}
              <div>
                <h3 className="text-sm sm:text-base font-medium text-gray-700">
                  הוסף שאלות
                </h3>
                <QuestionsCreator
                  questions={questions}
                  setQuestions={setQuestions}
                />
              </div>
              {/* Description */}
              <div>
                <h3 className="text-sm sm:text-base font-medium text-gray-700">
                  תיאור
                </h3>
                <textarea
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-primary"
                  placeholder="הכנס תיאור..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="secondary-btn"
            >
              {isEditMode ? "עדכן" : "שלח"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserFoundItem;
