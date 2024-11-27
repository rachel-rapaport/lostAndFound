export interface Category {
    id: number,
    name: string,
    subcategories: { id: number, name: string }[]
}