import React, { useState } from "react";
import Select, { SingleValue } from "react-select";
import categoryStore from "@/app/store/categoryStore";
import { SubCategory } from "@/app/types/props/subCategory";
import { SelectProps } from "@/app/types/selectProps";
import { foundItemSchema } from "@/app/schemas/formItemSchema";
import { z } from 'zod';

const SubCategoriesSelect: React.FC<{
  formData: z.infer<typeof foundItemSchema>,
  handleChange: (name: string, value: string) => void
}> = ({ formData, handleChange }) => {

  const currentCategory = categoryStore((state) => state.currentCategory);
  const subCategories = currentCategory?.subCategories || [];

  // Convert the subCategories to the format required by react-select
  const subCategoryOptions: SelectProps[] = subCategories.map(
    (subCategory: SubCategory) => ({
      value: String(subCategory._id),
      label: subCategory.title,
    })
  );

  // Find the currently selected sub-category option
  const [selectedValue, setSelectedValue] = useState(subCategoryOptions.find(option => option.value === formData.subCategoryId) || null);

  // Handle the change event for the Select component
  const handleChangeSubCategory = (selectedOption: SingleValue<SelectProps>) => {
    setSelectedValue(selectedOption);
    handleChange("subCategoryId", selectedOption ? selectedOption.value : "");
  };

  return (
    <div>
      <Select
        name="subCategoryId"
        value={selectedValue}
        options={subCategoryOptions}
        onChange={handleChangeSubCategory}
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
