import { NextRequest, NextResponse } from "next/server";
import {
  getLostItems,
  getLostItemById,
  createLostItem,
  updateLostItemById,
  deleteLostItemById,
} from "@/app/services/lostItemsService";

// GET lost item(s)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const lostItem = await getLostItemById(id as string);
      if (!lostItem) {
        return NextResponse.json({ error: "Lost item not found" }, { status: 404 });
      }
      return NextResponse.json(lostItem);
    } else {
      const lostItems = await getLostItems();
      return NextResponse.json(lostItems);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch lost items" }, { status: 500 });
  }
}

// POST new lost item
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newLostItem = await createLostItem(body);
    return NextResponse.json(newLostItem, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create lost item" }, { status: 500 });
  }
}

// PUT update lost item
export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    const body = await req.json();
    const updatedLostItem = await updateLostItemById(id as string, body);
    if (!updatedLostItem) {
      return NextResponse.json({ error: "Lost item not found" }, { status: 404 });
    }
    return NextResponse.json(updatedLostItem, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update lost item" }, { status: 500 });
  }
}

// DELETE lost item
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    const deletedLostItem = await deleteLostItemById(id as string);
    if (!deletedLostItem) {
      return NextResponse.json({ error: "Lost item not found" }, { status: 404 });
    }
    return NextResponse.json(deletedLostItem, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete lost item" }, { status: 500 });
  }
}
