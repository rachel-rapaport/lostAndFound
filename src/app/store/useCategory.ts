import { create } from 'zustand';
import { CategoryStore } from '../types/store/categoryStore';
import { Category } from '../types/category';
import { SubCategory } from '../types/subCategory';


const useStore = create<CategoryStore>((set) => ({
    categories: [],
    subCategories: [],

    setCategories: (categories: Category[]) => set({ categories }),
    createCategory: (category: Category) => set((state) => ({ categories: [...state.categories, category] })),
    updateCategory: (category: Category) => set((state) => ({ categories: state.categories.map((c) => (category.id === c.id ? category : c)) })),
    deleteCategory: (id: string) => set((state) => ({ categories: state.categories.filter((c) => (id !== c.id)) })),

    setSubCategories: (subCategories: SubCategory[]) => set({ subCategories }),
    createSubCategory: (subCategory: SubCategory) => set((state) => ({ subCategories: [...state.subCategories, subCategory] })),
    updateSubCategory: (subCategory: SubCategory) => set((state) => ({ subCategories: state.subCategories.map((sc) => (subCategory.id === sc.id ? subCategory : sc)) })),
    deleteSubCategory: (id: string) => set((state) => ({ subCategories: state.subCategories.filter((sc) => (id !== sc.id)) })),
})
)

export default useStore;