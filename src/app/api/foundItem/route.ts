// /app/routes/lostItems.ts

import { NextRequest, NextResponse } from "next/server";
// import { getLostItems } from "@/app/services/lostItemsService";
import connect from "@/app/lib/db/mongo";
import FoundItemModel from "@/app/lib/models/foundItem";

// GET all found items
export async function GET() {
  try {
    await connect();
    // const lostItems = await getLostItems();
    const foundItems = await FoundItemModel.find()

    return NextResponse.json(foundItems);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch found items" },
      { status: 500 }
    );
  }
}

// POST new found item
export async function POST(req: NextRequest) {
  try {
    await connect();
    const body = await req.json();
    console.log(body);
    const newFoundItem = await FoundItemModel.create({ foundItem: body });

    // const newLostItem = await createLostItem(body);
    return NextResponse.json(newFoundItem, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create found item" },
      { status: 500 }
    );
  }
}
