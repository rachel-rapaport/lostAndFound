import { NextRequest } from "next/server";

export const getVercelUrl = (request:NextRequest) => {

    const protocol = request.headers.get("x-forwarded-proto") || "http"; // שימוש ב get לקבלת ערך מהכותרת
    const host = request.headers.get("host"); // גם כאן נשתמש ב get
    const vercelUrl = `${protocol}://${host}`;
    return vercelUrl;
}