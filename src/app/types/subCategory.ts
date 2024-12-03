export interface SubCategory {
    _id: string;
    title: string;
    categoryId: string;
    lostItems: string[];
    foundItems: string[];
}