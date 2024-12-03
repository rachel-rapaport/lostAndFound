import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try {
        // כאן תוכל להוסיף את הקוד שלך לטיפול בבקשת GET
        return NextResponse.json({ message: "GET request successful" });
    } catch (error) {
        console.error("Error processing GET request:", error);
        return NextResponse.json({ error: "Error processing GET request" }, { status: 500 });
    }
}