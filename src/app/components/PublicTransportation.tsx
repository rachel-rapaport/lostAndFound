import React, { useEffect } from "react";
import Select from "react-select";
import TypePublicTransportSelect from "./select/TypePublicTransportSelect";
import CitySelect from "./select/CitySelect";

interface TransportData {
  typePublicTransportId: string;
  line: string;
  city: string;
}

interface PublicTransportationProps {
  transportData: TransportData;
  setTransportData: React.Dispatch<React.SetStateAction<TransportData>>;
}

const PublicTransportation: React.FC<PublicTransportationProps> = ({
  transportData,
  setTransportData,
}) => {
  const handleTypeSelect = (typeId: string) => {
    setTransportData({
      typePublicTransportId: typeId,
      line: "",
      city: "",
    });
  };

  const jerusalemCheckpoints = ["הר הרצל", "חיל האוויר"];
  const dencalCheckpoints = ["R1", "R2", "R3"];
  const dencalCities = [
    { value: "פתח תקווה", label: "פתח תקווה" },
    { value: "בת ים", label: "בת ים" },
  ];

  useEffect(() => {
    if (transportData.typePublicTransportId === "675597230f7ad3122ddce705") {
      // רכבלית חיפה
      setTransportData((prev) => ({
        ...prev,
        line: "רכבלית",
        city: "חיפה",
      }));
    } else if (transportData.typePublicTransportId === "675597190f7ad3122ddce703") {
      // רכבת קלה ירושלים
      setTransportData((prev) => ({
        ...prev,
        city: "ירושלים",
      }));
    }
  }, [transportData.typePublicTransportId, setTransportData]);

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
    <div className="space-y-2 text-right mt-2" dir="rtl">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg ">סוג תחבורה ציבורית</h3>
      </div>
      <TypePublicTransportSelect onSelect={handleTypeSelect} />

      {transportData.typePublicTransportId === "675596d90f7ad3122ddce6fb" ? ( // אוטובוס עירוני
        <div className="space-y-2 text-right pt-4">
        <h3 className="font-semibold text-lg ">סוג תחבורה ציבורית</h3>
          <CitySelect
            onSelect={(city) =>
              setTransportData((prev) => ({ ...prev, city }))
            }
          />
        </div>
      ) : transportData.typePublicTransportId === "675596f50f7ad3122ddce6fd" ||
        transportData.typePublicTransportId === "675597040f7ad3122ddce6ff" ? ( // אוטובוס בין עירוני או רכבת ישראל
        <div className="space-y-2 pt-4">
          <h3 className="font-semibold text-lg ">בחר עיר יעד:</h3>
          <CitySelect
            onSelect={(city) =>
              setTransportData((prev) => ({ ...prev, city }))
            }
          />
        </div>
      ) : transportData.typePublicTransportId === "675597130f7ad3122ddce701" ? ( // רכבת קלה דנקל
        <div className="space-y-2 pt-4">
          <h3 className="font-semibold text-lg">בחר עיר:</h3>
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
            placeholder="בחר עיר..."
          />
        </div>
      ) : null}

      {transportData.typePublicTransportId === "675597190f7ad3122ddce703" ? ( // רכבת קלה ירושלים
        <div className="space-y-2 pt-4">
          <h3 className="font-semibold text-lg">בחר נקודת ציון (סוג הקו):</h3>
          <div className="space-y-2">
            {jerusalemCheckpoints.map((checkpoint) => (
              <label key={checkpoint} className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  checked={transportData.line === checkpoint}
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
      ) : transportData.typePublicTransportId === "675597130f7ad3122ddce701" ? ( // רכבת קלה דנקל
        <div className="space-y-2 pt-4">
          <h3 className="font-semibold text-lg">בחר נקודת ציון (סוג הקו):</h3>
          <div className="space-y-2">
            {dencalCheckpoints.map((checkpoint) => (
              <label key={checkpoint} className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  checked={transportData.line === checkpoint}
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

      {transportData.typePublicTransportId === "675596f50f7ad3122ddce6fd" ||
      transportData.typePublicTransportId === "675596d90f7ad3122ddce6fb" ||
      transportData.typePublicTransportId === "675597040f7ad3122ddce6ff" ? ( // תחבורה עם קו רגיל
        <div className="space-y-2 pt-4">
          <h3 className="font-semibold text-lg">מספר קו</h3>
          <input
            type="text"
            value={transportData.line}
            onChange={(e) =>
              setTransportData((prev) => ({ ...prev, line: e.target.value }))
            }
            placeholder="הכנס את מספר הקו"
            className="form-input text-right border-2 border-primary rounded-md"
            />
        </div>
      ) : null}
    </div>
  );
};

export default PublicTransportation;
