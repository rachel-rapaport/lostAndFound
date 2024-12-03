// /app/routes/lostItems/[id].ts

import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongo";
import FoundItemModel from "@/app/lib/models/foundItem";

// GET a found item by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await connect();
    if (id) {
      // const foundItem = await getFoundItemById(id as string);
      const foundItem = await FoundItemModel.findById(id);
      if (!foundItem) {
        return NextResponse.json(
          { error: "found item not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(foundItem);
    } else {
      return NextResponse.json(
        { error: "Id parameter is missing" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch found item" },
      { status: 500 }
    );
  }
}

// PUT update found item by id
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

    const updatedFoundItem = await FoundItemModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    // const updatedLostItem = await updateLostItemById(id as string, body);
    if (!updatedFoundItem) {
      return NextResponse.json(
        { error: "found item not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedFoundItem, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update found item" },
      { status: 500 }
    );
  }
}

// DELETE found item by id
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
    const deletedFoundItem = await FoundItemModel.deleteOne();
    if (!deletedFoundItem) {
      return NextResponse.json(
        { error: "found item not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(deletedFoundItem, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete found item" },
      { status: 500 }
    );
  }
}
