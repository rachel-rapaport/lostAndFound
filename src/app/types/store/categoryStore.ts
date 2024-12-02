import { Category } from "../category";
import { SubCategory } from "../subCategory";

export interface CategoryStore{
    categories: Category[],
    subCategories: SubCategory[],
}
