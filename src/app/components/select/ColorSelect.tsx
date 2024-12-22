import { getColors } from "@/app/services/api/colorService";
import colorStore from "@/app/store/colorStore";
import { Color } from "@/app/types/props/color";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

const ColorSelect: React.FC<{
  onSelect: (selectedColorId: string) => void;
}> = ({ onSelect }) => {
  const colorsFromStore = colorStore((state) => state.colors);
  const setColors = colorStore((state) => state.setColors);

  const {
    data: colors,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["colors"],
    queryFn: getColors,
    enabled: colorsFromStore === null,
  });

  useEffect(() => {
    if (colors && colorsFromStore === null) {
      setColors(colors);
    }
  }, [colors, colorsFromStore, setColors]);

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error instanceof Error)
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  if ((colorsFromStore ?? colors)?.length === 0)
    return <div className="text-center">No colors available</div>;

  const displayColors = colorsFromStore ?? colors;

  return (
    <div className="p-4 border-2 border-primary rounded-lg">
      {/* הוספת המסגרת עם קצוות עגולים */}
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {displayColors.map((color: Color) => {
          const isSpecialColor = String(color._id) === "00000000a165f3133be41d3b";
          return (
            <div
              key={String(color._id)}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => onSelect(String(color._id))}
            >
              {isSpecialColor ? (
                <img
                  src={
                    "https://e7.pngegg.com/pngimages/539/970/png-clipart-color-wheel-complementary-colors-primary-color-magenta-colours-miscellaneous-purple.png"
                  }
                  alt={color.name}
                  className="w-12 h-12 rounded-full border-black border object-cover "
                />
              ) : (
                <div
                  style={{ backgroundColor: color.hexadecimal }}
                  className="w-12 h-12 rounded-full border-black border"
                />
              )}
              <span className="mt-2 text-center text-sm">{color.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelect;
