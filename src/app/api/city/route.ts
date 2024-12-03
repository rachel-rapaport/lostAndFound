import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "cities.json");
    const d = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(d);

    // after deployment, change to those line and enter the right vercel url
    // const response = await fetch('https://your-app-name.vercel.app/cities.json');
    // const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching cities: ", data: error },
      { status: 500 }
    );
  }
}
