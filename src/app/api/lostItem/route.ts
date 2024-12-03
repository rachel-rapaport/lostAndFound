// /app/routes/lostItems.ts

import { NextRequest, NextResponse } from "next/server";
// import { getLostItems } from "@/app/services/lostItemsService";
import connect from "@/app/lib/db/mongo";
import LostItemModel from "@/app/lib/models/lostItem";
import mongoose from "mongoose";

// GET all lost items
export async function GET() {
  try {
    await connect();
    // const lostItems = await getLostItems();
    const lostItems = await LostItemModel.find()||[];

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
    if (!await mongoose.models.SubCategory.exists({ _id: body.subCategory })) {
        return NextResponse.json({ message: "Invalid subCategoryId: sub category does not exist" }, { status: 400 });
    }
    const newLostItem = await LostItemModel.create({ subCategory: body });
    await mongoose.models.subCategory.findByIdAndUpdate(
        body.subCategory,
        { $push: { "subCategory.lostItems": newLostItem._id } },
        { new: true }
    );
    return NextResponse.json({ message: "Lost item was created successfully", data: newLostItem }, { status: 201 });
}
catch (error) {
    return NextResponse.json({
        message: "Error creating lost item",
        error: error
    }, { status: 500 });
}
}
