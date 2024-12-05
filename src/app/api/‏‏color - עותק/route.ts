// /app/routes/lostItems.ts

import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongo";
import ColorModel from "@/app/lib/models/color";


// GET all color
export async function GET() {
  try {
    await connect();
    // const lostItems = await getLostItems();
    const colors = await ColorModel.find()

    return NextResponse.json(colors);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch colors" },
      { status: 500 }
    );
  }
}

// POST new color
export async function POST(req: NextRequest) {
  try {
    await connect();
    const body = await req.json();
    console.log(body);
    const newColor = await ColorModel.create({ color: body });

    // const newLostItem = await createLostItem(body);
    return NextResponse.json(newColor, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create color" },
      { status: 500 }
    );
  }
}
