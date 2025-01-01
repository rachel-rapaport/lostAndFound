'use client'
import { PublicTransportRequest } from "@/app/types/request/PublicTransportRequest";
import React, { useRef, useState } from "react";
import CategoriesSelect from "../form/select/CategoriesSelect";
import SubCategoriesSelect from "../form/select/SubCategoriesSelect";
import ColorSelect from "../form/select/ColorSelect";
import PublicTransportation from "../form/PublicTransportation";
import InsertFinderDetails from "../lostItem/InsertFinderDetails";
import { Question } from "@/app/types/props/question";
import UploadImage from "../form/UploadImage";
import QuestionsCreator from "../lostItem/QuestionsCreator";
import { Postion } from "@/app/types/props/postion";
import Location from "../form/Location";
import { Types } from "mongoose";
import userStore from "@/app/store/userStore";
import { createFoundItem } from "@/app/services/api/foundItemsService";
import useFoundItemStore from "@/app/store/foundItemStore";
import { useRouter } from "next/navigation";

const FoundItemForm = () => {
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

  const setCurrentFoundItem = useFoundItemStore((state)=>state.setCurrentFoundItem)
  const currentUser = userStore((state) => state.user);
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const foundItem = {
      _id: new Types.ObjectId(),
      subCategoryId: selectedSubCategory,
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
    };

    console.log("in", foundItem);

    try {
      const newFoundItem = await createFoundItem(foundItem);
      setCurrentFoundItem(newFoundItem)
      router.push("/found-item-after")
    } catch (error) {
      console.error("Error submitting lost item:", error);
    }
  };

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      <div className="m-4 h-full overflow-y-auto no-scrollbar">
        <h2 className="text-3xl font-bold text-center mb-4">פריט נמצא</h2>
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
                {/* {errors.subCategoryId && (
                  <p className="error-message">{errors.subCategoryId}</p>
                )} */}
              </div>
              <div>
                <h3 className="section-title">צבע</h3>
                <ColorSelect onSelect={setSelectedColor} />
                {/* {errors.colorId && (
                  <p className="error-message">{errors.colorId}</p>
                )} */}
              </div>
            </div>
            <div className="w-full lg:w-2/3 ">
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
                      מיקום
                    </button>
                  </div>
                  {/* {errors.selectedLocation && (
                    <p className="error-message">{errors.selectedLocation}</p>
                  )} */}
                </div>
              )}

              {selectedLocation === "transport" && (
                <>
                  <PublicTransportation
                    transportData={transportData}
                    setTransportData={setTransportData}
                  />
                  {/* {errors.publicTransport && (
                    <p className="error-message">{errors.publicTransport}</p>
                  )} */}
                </>
              )}
              {selectedLocation === "map" && (
                <>
                  <Location setLocation={setLocation} />
                </>
              )}
              <div className="pt-4">
                <h3 className="section-title">תאור</h3>
                <input
                  type="text"
                  placeholder="כתוב תיאור קצר על הפריט שמצאת"
                  value={description}
                  className="w-full h-9 form-input "
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="pt-6">
                <h3 className="section-title">תמונה</h3>
                <UploadImage setImage={setImage} />
              </div>
              <div className="pt-6">
                <h3 className="section-title">סימנים</h3>
                {/* <button
              type="button"
              className="primary-btn"
              onClick={handleScrollToQuestions} // פותח את המודל בלחיצה
            >
              הוסף סימנים
            </button> */}

                <QuestionsCreator
                  questions={questions}
                  setQuestions={setQuestions}
                />
              </div>
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

export default FoundItemForm;
