import { create } from 'zustand';
import { Category } from '../types/category';
import { SubCategory } from '../types/subCategory';
import { CategoryStore } from '../types/store/categoryStore';


const useCategoryStore = create<CategoryStore>((set) => ({
    categories: [],
    subCategories: [],

    setCategories: (categories: Category[]) => set({ categories }),
    createCategory: (category: Category) => set((state) => ({ categories: [...state.categories, category] })),
    updateCategory: (category: Category) => set((state) => ({ categories: state.categories.map((c) => (category._id === c._id ? category : c)) })),
    deleteCategory: (id: string) => set((state) => ({ categories: state.categories.filter((c) => (id !== c._id)) })),

    setSubCategories: (subCategories: SubCategory[]) => set({ subCategories }),
    createSubCategory: (subCategory: SubCategory) => set((state) => ({ subCategories: [...state.subCategories, subCategory] })),
    updateSubCategory: (subCategory: SubCategory) => set((state) => ({ subCategories: state.subCategories.map((sc) => (subCategory._id === sc._id ? subCategory : sc)) })),
    deleteSubCategory: (id: string) => set((state) => ({ subCategories: state.subCategories.filter((sc) => (id !== sc._id)) })),
})
)

export default useCategoryStore;