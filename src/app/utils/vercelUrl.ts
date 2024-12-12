import { NextRequest } from "next/server";

export const getVercelUrl = (request:NextRequest) => {

    const protocol = request.headers.get("x-forwarded-proto") || "http"; 
    const host = request.headers.get("host"); 
    const vercelUrl = `${protocol}://${host}`;
    return vercelUrl;
}