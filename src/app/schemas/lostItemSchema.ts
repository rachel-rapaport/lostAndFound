import { z } from "zod";

export const LostItemSchema = z.object({
  categoryId: z.string().min(1, "קטגוריה חובה"), // חובה לבחור קטגוריה
  subCategoryId: z.string().min(1, "תת-קטגוריה חובה"), // חובה לבחור תת-קטגוריה
  colorId: z.string().min(1, "צבע חובה"), // חובה לבחור צבע
  location: z.enum(["map", "transport"]).optional().refine(val => val !== undefined, "יש לבחור מיקום"), // חובה לבחור מיקום (או מפה או תחבורה)
});

export type FoundItemFormValues = z.infer<typeof LostItemSchema>;
