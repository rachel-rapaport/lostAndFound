import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongo";
import ColorModel from "@/app/lib/models/color";


//get all color
export async function GET() {
  try {
    await connect();

    const colors = await ColorModel.find()

    return NextResponse.json(
      { message: "colors were successfully fetched", data: colors },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch colors" },
      { status: 500 }
    );
  }
}

// create new color
export async function POST(req: NextRequest) {
  try {
    await connect();
    const body = await req.json();
    const newColor = await ColorModel.create(body);

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
