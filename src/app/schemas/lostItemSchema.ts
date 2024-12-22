import { z } from "zod";

 export const LostItemSchema = z.object({
  subCategoryId: z.string().nonempty("תת-קטגוריה היא שדה חובה"),
  colorId: z.string().nonempty("צבע הוא שדה חובה"),
  selectedLocation: z
  .enum(["map", "transport"])
  .optional()
  .refine((value) => value !== null && value !== undefined, {
    message: "יש לבחור מיקום (מפה או תחבורה ציבורית)",
  }),
  circles: z
    .array(
      z.object({
        x: z.number(),
        y: z.number(),
      })
    )
    .min(1, "יש לבחור לפחות עיגול אחד במפה")
    .optional(),
  publicTransport: z
    .object({
      typePublicTransportId: z.string().nonempty("סוג תחבורה ציבורית הוא שדה חובה"),
      line: z.string().nonempty("מספר קו הוא שדה חובה"),
      city: z.string().nonempty("עיר היא שדה חובה"),
    })
    .optional(),
});

