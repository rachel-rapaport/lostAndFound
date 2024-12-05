// /app/routes/lostItems/[id].ts

import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongo";
import ColorModel from "@/app/lib/models/color";


// GET a color by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await connect();
    if (id) {
      // const foundItem = await getFoundItemById(id as string);
      const color = await ColorModel.findById(id);
      if (!color) {
        return NextResponse.json(
          { error: "color not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(color);
    } else {
      return NextResponse.json(
        { error: "Id parameter is missing" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch color" },
      { status: 500 }
    );
  }
}

// PUT update color by id
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await connect();
    const body = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "Id parameter is missing" },
        { status: 400 }
      );
    }

    const updatedColor = await ColorModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    // const updatedLostItem = await updateLostItemById(id as string, body);
    if (!updatedColor) {
      return NextResponse.json(
        { error: "color not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedColor, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update color" },
      { status: 500 }
    );
  }
}

// DELETE color by id
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await connect();
    if (!id) {
      return NextResponse.json(
        { error: "Id parameter is missing" },
        { status: 400 }
      );
    }
    // const deletedLostItem = await deleteLostItemById(id as string);
    const deletedColor = await ColorModel.deleteOne();
    if (!deletedColor) {
      return NextResponse.json(
        { error: "color not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(deletedColor, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete color" },
      { status: 500 }
    );
  }
}
