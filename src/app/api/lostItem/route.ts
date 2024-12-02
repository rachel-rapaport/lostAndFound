// /app/routes/lostItems.ts

import { NextRequest, NextResponse } from "next/server";
// import { getLostItems } from "@/app/services/lostItemsService";
import connect from "@/app/lib/db/mongo";
import LostItemModel from "@/app/lib/models/lostItem";

// GET all lost items
export async function GET() {
  try {
    await connect();
    // const lostItems = await getLostItems();
    const lostItems = await LostItemModel.find()

    return NextResponse.json(lostItems);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch lost items" },
      { status: 500 }
    );
  }
}

// POST new lost item
export async function POST(req: NextRequest) {
  try {
    await connect();
    const body = await req.json();
    console.log(body);
    const newLostItem = await LostItemModel.create({ lostItem: body });

    // const newLostItem = await createLostItem(body);
    return NextResponse.json(newLostItem, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create lost item" },
      { status: 500 }
    );
  }
}
