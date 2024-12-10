import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "cities.json");
    const d = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(d);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching cities: ", data: error },
      { status: 500 }
    );
  }
}
