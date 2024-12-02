// /app/routes/lostItems/[id].ts

import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongo";
import LostItemModel from "@/app/lib/models/lostItem";

// GET a lost item by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await connect();
    if (id) {
      // const lostItem = await getLostItemById(id as string);
      const lostItem = await LostItemModel.findById(id);
      if (!lostItem) {
        return NextResponse.json(
          { error: "Lost item not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(lostItem);
    } else {
      return NextResponse.json(
        { error: "Id parameter is missing" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch lost item" },
      { status: 500 }
    );
  }
}

// PUT update lost item by id
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

    const updatedLostItem = await LostItemModel.updateOne({ lostItem: body });

    // const updatedLostItem = await updateLostItemById(id as string, body);
    if (!updatedLostItem) {
      return NextResponse.json(
        { error: "Lost item not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedLostItem, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update lost item" },
      { status: 500 }
    );
  }
}

// DELETE lost item by id
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
    const deletedLostItem = await LostItemModel.deleteOne();
    if (!deletedLostItem) {
      return NextResponse.json(
        { error: "Lost item not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(deletedLostItem, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete lost item" },
      { status: 500 }
    );
  }
}
