"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/app/services/api/categoryService";
import { Category } from "@/app/types/props/category";
import categoryStore from "@/app/store/categoryStore";
import Select from "react-select";
import { SelectProps } from "@/app/types/selectProps";

const CategoriesSelect: React.FC<{
  onSelect: (selectedCategoryId: string) => void;
}> = ({ onSelect }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const categoriesFromStore = categoryStore((state) => state.categories);
  const setCategories = categoryStore((state) => state.setCategories);
  const setCurrentCategory = categoryStore((state) => state.setCurrentCategory);

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    enabled: categoriesFromStore === null,
  });

  useEffect(() => {
    if (categories && categoriesFromStore === null) {
      setCategories(categories);
    }
  }, [categories, categoriesFromStore, setCategories]);

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;
  if ((categoriesFromStore ?? categories)?.length === 0)
    return <div>No categories available</div>;

  const handleChange = (selectedOption: SelectProps) => {
    const selectedCategoryId = selectedOption?.value;
    setSelectedValue(selectedCategoryId);
    onSelect(selectedCategoryId);

    const selectedCategory =
      (categoriesFromStore ?? categories)?.find(
        (category: Category) => String(category._id) === selectedCategoryId
      ) || null;

    setCurrentCategory(selectedCategory);
  };

  const displayCategories = categoriesFromStore ?? categories;

  // המרת הערכים לפורמט המתאים עבור react-select
  const categoryOptions = displayCategories.map((category: Category) => ({
    value: String(category._id),
    label: category.title,
  }));

  return (
    <div>
      <Select
        options={categoryOptions}
        value={categoryOptions.find(
          (category:Category) => String(category._id) === selectedValue
        )}
        onChange={handleChange}
        placeholder="בחר קטגוריה"
        isSearchable={false} 
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default CategoriesSelect;
