import { z } from "zod";

export const maxNumOfDescriptionChars = 100;

export const foundItemSchema = z.union([
    z.object({
        subCategoryId: z.string().nonempty('שדה חובה'),
        colorId: z.string().nonempty('שדה חובה'),
        userId: z.string(),
        postion: z.object({ latitude: z.number(), longitude: z.number() }).refine((data) => data !== null, { message: 'שדה חובה' }),
        publicTransport: z.literal(null), // option 1: publicTransport is null
        descripition: z.string().min(20, 'קצר מידי. נדרשים לפחות 20 תווים').max(maxNumOfDescriptionChars, `ארוך מידי. ניתן עד ${maxNumOfDescriptionChars} תווים`).nonempty('שדה חובה'),
        image: z.string().nonempty('שדה חובה'),
        questions: z.array(
            z.object({      
                answers: z.array(z.string().min(2, 'קצר מידי. נדרשים לפחות 2 תווים בתשובה').max(50, 'ארוך מידי. ניתן עד 50 תווים בתשובה').nonempty('יש למלא תשובה')).min(2, 'נדרשות לפחות 2 תשובות עבור כל שאלה'),
                question: z.string().min(10, 'קצר מידי. נדרשים לפחות 10 תווים בשאלה').max(80, 'ארוך מידי. ניתן עד 80 תווים בשאלה').nonempty('יש למלא שאלה'),
            })).min(1, 'נדרשת לפחות שאלה אחת'),
    }), z.object({
        subCategoryId: z.string().nonempty('שדה חובה'),
        colorId: z.string().nonempty('שדה חובה'),
        userId: z.string(),
        postion: z.literal(null), // option 2: position is null
        publicTransport: z.object({
            typePublicTransportId: z.string(),
            line: z.string(),
            city: z.string(),
        }).refine((data) => data !== null, { message: 'שדה חובה' }),
        descripition: z.string().min(20, 'קצר מידי. נדרשים לפחות 20 תווים').max(maxNumOfDescriptionChars, `ארוך מידי. ניתן עד ${maxNumOfDescriptionChars} תווים`).nonempty('שדה חובה'),
        image: z.string().nonempty('שדה חובה'),
        questions: z.array(
            z.object({
                answers: z.array(z.string().min(2, 'קצר מידי. נדרשים לפחות 2 תווים בתשובה').max(50, 'ארוך מידי. ניתן עד 50 תווים בתשובה').nonempty('יש למלא תשובה')).min(2, 'נדרשות לפחות 2 תשובות עבור כל שאלה'),
                question: z.string().min(10, 'קצר מידי. נדרשים לפחות 10 תווים בשאלה').max(80, 'ארוך מידי. ניתן עד 80 תווים בשאלה').nonempty('יש למלא שאלה'),
            })).min(1, 'נדרשת לפחות שאלה אחת'),
    }),
]);
