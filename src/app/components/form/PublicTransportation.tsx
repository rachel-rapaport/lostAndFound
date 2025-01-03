import React, { useEffect } from "react";
import Select from "react-select";
import TypePublicTransportSelect from "./select/TypePublicTransportSelect";
import CitySelect from "./select/CitySelect";
import { foundItemSchema } from "@/app/schemas/formItemSchema";
import { z } from "zod";
import { PublicTransportRequest } from "@/app/types/request/PublicTransportRequest";

const PublicTransportation: React.FC<{
  formData: z.infer<typeof foundItemSchema>,
  handleChange: (name: string, value: string | PublicTransportRequest) => void
}> = ({ formData, handleChange }) => {

  handleChange("g", "g");
  const jerusalemCheckpoints = ["הר הרצל", "חיל האוויר"];
  const dencalCheckpoints = ["R1", "R2", "R3"];
  const dencalCities = [
    { value: "פתח תקווה", label: "פתח תקווה" },
    { value: "בת ים", label: "בת ים" },
  ];

  // useEffect to set transport data based on selected public transport type
  useEffect(() => {
    if (formData.publicTransport?.typePublicTransportId === "675597230f7ad3122ddce705") {
      //Haifa Cable Car
      setTransportData((prev) => ({
        ...transportData,
        line: "רכבלית",
        city: "חיפה",
      }));
    } else if (
      formData.publicTransport?.typePublicTransportId === "675597190f7ad3122ddce703" //Jerusalem Light Rail
    ) {
      setTransportData((prev) => ({
        ...prev,
        city: "ירושלים",
      }));
    }
  }, [formData.publicTransport?.typePublicTransportId, setTransportData]);

  // Handler for changing checkpoint (line) selection
  const handleCheckpointChange = (
    selectedOption: string,
    isChecked: boolean
  ) => {
    setTransportData((prev) => ({
      ...prev,
      line: isChecked ? selectedOption : "",
    }));
  };

  return (
    <div className="space-y-2 text-right" dir="rtl">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg ">סוג תחבורה ציבורית</h3>
      </div>
      <TypePublicTransportSelect onSelect={handleTypeSelect} />

      {formData.publicTransport?.typePublicTransportId === "675596d90f7ad3122ddce6fb" ? ( // Urban Bus
        <div className="space-y-2 text-right pt-4">
          <h3 className="font-semibold text-lg ">עיר</h3>
          <CitySelect
            onSelect={(city) => setTransportData((prev) => ({ ...prev, city }))}
          />
        </div>
      ) : formData.publicTransport?.typePublicTransportId === "675596f50f7ad3122ddce6fd" || // Intercity Bus
        formData.publicTransport?.typePublicTransportId === "675597040f7ad3122ddce6ff" ? ( // or Israel Railways
        <div className="space-y-2 pt-4">
          <h3 className="font-semibold text-lg ">עיר יעד</h3>
          <CitySelect
            onSelect={(city) => setTransportData((prev) => ({ ...prev, city }))}
          />
        </div>
      ) : formData.publicTransport?.typePublicTransportId === "675597130f7ad3122ddce701" ? ( // DanKal Light Rail
        <div className="space-y-2 pt-4">
          <h3 className="font-semibold text-lg">עיר</h3>
          <Select
            options={dencalCities}
            onChange={(selectedOption) =>
              setTransportData((prev) => ({
                ...prev,
                city: selectedOption ? selectedOption.value : "",
              }))
            }
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="בחר עיר"
          />
        </div>
      ) : null}

      {formData.publicTransport?.typePublicTransportId === "675597190f7ad3122ddce703" ? ( // Jerusalem Light Rail
        <div className="space-y-2 pt-4">
          <h3 className="font-semibold text-lg">יעד</h3>
          <div className="space-y-2">
            {jerusalemCheckpoints.map((checkpoint) => (
              <label key={checkpoint} className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  checked={formData.publicTransport?.line === checkpoint}
                  onChange={(e) =>
                    handleCheckpointChange(checkpoint, e.target.checked)
                  }
                  className="custom-checkbox"
                />
                <span>{checkpoint}</span>
              </label>
            ))}
          </div>
        </div>
      ) : formData.publicTransport?.typePublicTransportId === "675597130f7ad3122ddce701" ? ( // DanKal Light Rail
        <div className="space-y-2 pt-4">
          <h3 className="font-semibold text-lg">קו</h3>
          <div className="space-y-2">
            {dencalCheckpoints.map((checkpoint) => (
              <label key={checkpoint} className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  checked={formData.publicTransport?.line === checkpoint}
                  onChange={(e) =>
                    handleCheckpointChange(checkpoint, e.target.checked)
                  }
                  className="custom-checkbox"
                />
                <span>{checkpoint}</span>
              </label>
            ))}
          </div>
        </div>
      ) : null}

      {formData.publicTransport?.typePublicTransportId === "675596f50f7ad3122ddce6fd" || // Intercity Bus
        formData.publicTransport?.typePublicTransportId === "675596d90f7ad3122ddce6fb" || // Urban Bus
        formData.publicTransport?.typePublicTransportId === "675597040f7ad3122ddce6ff" ? ( // or Israel Railways
        <div className="space-y-2 pt-4">
          <h3 className="font-semibold text-lg">קו</h3>
          <input
            type="text"
            value={formData.publicTransport?.line}
            onChange={(e) =>
              setTransportData((prev) => ({ ...prev, line: e.target.value }))
            }
            placeholder="הכנס את מספר הקו"
          // className="form-input text-right border-2 border-primary rounded-md"
          />
        </div>
      ) : null}
    </div>
  );
};

export default PublicTransportation;
