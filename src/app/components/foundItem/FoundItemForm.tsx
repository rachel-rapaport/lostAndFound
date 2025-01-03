'use client';
import React, { useState } from "react";
import CategoriesSelect from "../form/select/CategoriesSelect";
import SubCategoriesSelect from "../form/select/SubCategoriesSelect";
import ColorSelect from "../form/select/ColorSelect";
import PublicTransportation from "../form/PublicTransportation";
import UploadImage from "../form/UploadImage";
import QuestionsCreator from "../lostItem/QuestionsCreator";
import { Postion } from "@/app/types/props/postion";
import Location from "../form/Location";
import { Types } from "mongoose";
import userStore from "@/app/store/userStore";
import { createFoundItem } from "@/app/services/api/foundItemsService";
import useFoundItemStore from "@/app/store/foundItemStore";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { foundItemSchema, maxNumOfDescriptionChars } from "@/app/schemas/formItemSchema";
import { countCharacters } from "@/app/utils/countCharacters";
import { Question } from "@/app/types/props/question";
import { PublicTransportRequest } from "@/app/types/request/PublicTransportRequest";

const FoundItemForm = () => {
  const [selectedLocation, setSelectedLocation] = useState<"map" | "transport" | null>(null);
  const [numOfChars, setNumOfChars] = useState(0);

  const [location, setLocation] = useState<Postion>({
    latitude: 0,
    longitude: 0,
  });

  const setCurrentFoundItem = useFoundItemStore((state) => state.setCurrentFoundItem)
  const currentUser = userStore((state) => state.user);
  const router = useRouter();

  const [formData, setFormData] = useState<z.infer<typeof foundItemSchema>>({
    subCategoryId: "",
    colorId: "",
    userId: "",
    postion: { latitude: 0, longitude: 0 },
    publicTransport: null,
    descripition: "",
    image: "",
    questions: [{ question: "", answers: [""] }],
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (name: string, value: string | Question[] | PublicTransportRequest) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      foundItemSchema.parse(formData);
      setErrors({});

      const foundItem = {
        _id: new Types.ObjectId(),
        subCategoryId: formData.subCategoryId,
        colorId: formData.colorId,
        userId: String(currentUser?._id),
        postion: selectedLocation === "map" ? location : null,
        publicTransport:
          selectedLocation === "transport"
            ? {
              typePublicTransportId: formData.publicTransport?.typePublicTransportId || '',
              line: formData.publicTransport?.line || '',
              city: formData.publicTransport?.city || '',
            }
            : null,
        descripition: formData.descripition,
        image: formData.image,
        questions: formData.questions,
      };
      console.log("formData before validation:", formData);

      const newFoundItem = await createFoundItem(foundItem);
      setCurrentFoundItem(newFoundItem);
      router.push("/found-item-after");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((error) => {
          const path = error.path[0]?.toString();
          if (path) {
            fieldErrors[path] = error.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        console.log("Error in submitting form:", error.message);
      }
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
                <CategoriesSelect />
              </div>
              <div>
                <h3 className="section-title">תת-קטגוריה</h3>
                <SubCategoriesSelect formData={formData} handleChange={handleChange} />
              </div>
              {errors.subCategoryId && <p className="error-message">{errors.subCategoryId} </p>}
              <div>
                <h3 className="section-title">צבע</h3>
                <ColorSelect handleChange={handleChange} />
              </div>
              {errors.colorId && <p className="error-message">{errors.colorId} </p>}
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
                    {errors.publicTransport && <p className="error-message">{errors.publicTransport} </p>}
                    <button
                      type="button"
                      onClick={() => setSelectedLocation("map")}
                      className="primary-btn w-full lg:w-auto"
                    >
                      מיקום
                    </button>
                  </div>
                </div>
              )}

              {selectedLocation === "transport" && (
                <>
                  <PublicTransportation
                    formData={formData}
                    handleChange={handleChange}
                  />
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
                  name="descripition"
                  value={formData.descripition}
                  className="w-full h-9 form-input"
                  maxLength={maxNumOfDescriptionChars}
                  onChange={(e) => { setNumOfChars(countCharacters(e.target.value)); handleChange(e.target.name, e.target.value) }}
                />
              </div>
              <div className='flex flex-row w-full justify-between' dir='ltr'>
                <p>{numOfChars}/{maxNumOfDescriptionChars}</p>
                {errors.descripition && <p className="error-message">{errors.descripition} </p>}
              </div>
              <div className="pt-6">
                <h3 className="section-title">תמונה</h3>
                <UploadImage handleChange={handleChange} />
              </div>
              {errors.image && <p className="error-message">{errors.image} </p>}
              <div className="pt-6">
                <h3 className="section-title">סימנים</h3>
                <QuestionsCreator
                  formData={formData}
                  handleChange={handleChange}
                />
              </div>
              {errors.questions && <p className="error-message">{errors.questions} </p>}
              <div className="flex flex-col pt-[80px] justify-self-end">
                <button type="submit" className="secondary-btn w-[5vw]">
                  שלח
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoundItemForm;

