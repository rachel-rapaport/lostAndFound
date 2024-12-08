import { Category } from "../props/category";
import { SubCategory } from "../props/subCategory";

export interface CategoryStore{
    categories: Category[],
    subCategories: SubCategory[],
}