"use client";
import React, { useState } from "react";
import LossDataToSend from "../types/lossDataToSend";

const PublicTransportation: React.FC<LossDataToSend> = ({
    formData,
    setFormData,
  }) => {
  const [checkboxState, setCheckboxState] = useState({
    isBus: false,
    isCityBus: false,
    isOutBus: false,
    isRail: false,
    isJlm: false,
    isTlv: false,
    isTrain: false,
    isCablecar: false,
  });


  const cities = ["pt", "tlv", "jlm"];

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (["isBus", "isTrain", "isRail", "isCablecar"].includes(name)) {
      // Only allow one of these to be true at a time
      setCheckboxState((prevState) => ({
        ...prevState,
        isBus: name === "isBus" ? checked : false,
        isTrain: name === "isTrain" ? checked : false,
        isRail: name === "isRail" ? checked : false,
        isCablecar: name === "isCablecar" ? checked : false,
        [name]: checked,
      }));
    }
    if (["isCityBus", "isOutBus", "isJlm", "isTlv"].includes(name)) {
      // Only allow one of these to be true at a time
      setCheckboxState((prevState) => ({
        ...prevState,
        isCityBus: name === "isCityBus" ? checked : false,
        isOutBus: name === "isOutBus" ? checked : false,
        isJlm: name === "isJlm" ? checked : false,
        isTlv: name === "isTlv" ? checked : false,
        [name]: checked,
      }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="block text-sm font-medium text-gray-700">
      <p className="block text-sm text-gray-700 font-bold">
        בחר סוג תחבורה ציבורית:
      </p>
      <div className="flex justify-evenly pt-4">
        <label>
          <input
            type="checkbox"
            name="isBus"
            checked={checkboxState.isBus}
            onChange={handleCheckboxChange}
          />
          אוטובוס
        </label>
        <label>
          <input
            type="checkbox"
            name="isRail"
            checked={checkboxState.isRail}
            onChange={handleCheckboxChange}
          />
          רכבת קלה{" "}
        </label>
        <label>
          <input
            type="checkbox"
            name="isTrain"
            checked={checkboxState.isTrain}
            onChange={handleCheckboxChange}
          />
          רכבת{" "}
        </label>
        <label>
          <input
            type="checkbox"
            name="isCablecar"
            checked={checkboxState.isCablecar}
            onChange={handleCheckboxChange}
          />
          רכבלית - חיפה
        </label>
      </div>
      {checkboxState.isBus ? (
        <div className="flex justify-evenly pt-4">
          {" "}
          <label>
            <input
              type="checkbox"
              name="isCityBus"
              checked={checkboxState.isCityBus}
              onChange={handleCheckboxChange}
            />
            אוטובוס עירוני
          </label>
          <label>
            <input
              type="checkbox"
              name="isOutBus"
              checked={checkboxState.isOutBus}
              onChange={handleCheckboxChange}
            />
            אוטובוס בין עירוני
          </label>
        </div>
      ) : (
        <></>
      )}
      {checkboxState.isRail ? (
        <div className="flex justify-evenly pt-4">
          {" "}
          <label>
            <input
              type="checkbox"
              name="isJlm"
              checked={checkboxState.isJlm}
              onChange={handleCheckboxChange}
            />
            רכבת קלה - ירושלים
          </label>
          <label>
            <input
              type="checkbox"
              name="isTlv"
              checked={checkboxState.isTlv}
              onChange={handleCheckboxChange}
            />
            רכבת קלה - דנקל
          </label>
        </div>
      ) : (
        <></>
      )}
      {checkboxState.isTrain || checkboxState.isBus ? (
        <div className="pt-4">
          <label
            htmlFor="line"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {checkboxState.isBus ? "הכנס קו אוטובוס" : "הכנס מספר רכבת"}
          </label>
          <input
            type="text"
            id="line"
            name="line"
            value={formData.line}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder={checkboxState.isBus ? "קו אוטובוס" : "מספר רכבת"}
          />
        </div>
      ) : (
        <></>
      )}
      {checkboxState.isBus ? (
        <div className="pt-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            {checkboxState.isCityBus ? "בחר עיר" : "בחר עיר יעד"}{" "}
          </label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">
              {" "}
              {checkboxState.isCityBus ? "בחר עיר" : "בחר עיר יעד"}{" "}
            </option>
            {cities.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <></>
      )}

      {checkboxState.isRail && checkboxState.isTlv ? (
        <div className="pt-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            בחר יעד:{" "}
          </label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">בחר יעד</option>
            <option value="קוממיות - בת ים"></option>
            <option value="פתח תקווה">פתח תקווה</option>
          </select>
        </div>
      ) : checkboxState.isRail && checkboxState.isJlm ? (
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            בחר יעד:{" "}
          </label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">בחר יעד</option>
            <option value="חיל האוויר">חיל האוויר</option>
            <option value="הר הרצל">הר הרצל</option>
          </select>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PublicTransportation;
