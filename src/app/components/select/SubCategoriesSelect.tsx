import { useState } from "react";
import Select from "react-select";
import categoryStore from "@/app/store/categoryStore";
import { SubCategory } from "@/app/types/props/subCategory";
import { SelectProps } from "@/app/types/selectProps";


const SubCategoriesSelect: React.FC<{
  onSelect: (selectedSubCategoryId: string) => void;
}> = ({ onSelect }) => {
  const [selectedValue, setSelectedValue] = useState<SelectProps | null>(null);
  const currentCategory = categoryStore((state) => state.currentCategory);
  const subCategories = currentCategory?.subCategories || [];

  const handleChange = (selectedOption: SelectProps | null) => {
    setSelectedValue(selectedOption);
    onSelect(selectedOption ? selectedOption.value : "");
  };

  const subCategoryOptions: SelectProps[] = subCategories.map(
    (subCategory: SubCategory) => ({
      value: String(subCategory._id),
      label: subCategory.title,
    })
  );

  return (
    <div>
      <Select
        options={subCategoryOptions}
        value={selectedValue}
        onChange={handleChange}
        placeholder="בחר תת-קטגוריה"
        isSearchable={false}
        isDisabled={subCategories.length === 0}
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default SubCategoriesSelect;
