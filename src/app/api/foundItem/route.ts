// /app/routes/lostItems.ts

import { NextRequest, NextResponse } from "next/server";
// import { getLostItems } from "@/app/services/lostItemsService";
import connect from "@/app/lib/db/mongo";
import FoundItemModel from "@/app/lib/models/foundItem";
import mongoose from "mongoose";

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
    if (!await mongoose.models.SubCategory.exists({ _id: body.subCategory })) {
      return NextResponse.json({ message: "Invalid subCategoryId: sub category does not exist" }, { status: 400 });
    }
    const newFoundItem = await FoundItemModel.create({ subCategory: body });
    await mongoose.models.subCategory.findByIdAndUpdate(
      body.subCategory,
      { $push: { "subCategory.foundItems": newFoundItem._id } },
      { new: true }
    );
    return NextResponse.json({ message: "Found item was created successfully", data: newFoundItem }, { status: 201 });
  }
  catch (error) {
    return NextResponse.json({
      message: "Error creating found item",
      error: error
    }, { status: 500 });
  }
}
