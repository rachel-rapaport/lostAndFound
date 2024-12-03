import connect from "@/app/lib/db/mongo";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import foundItemModel from "@/app/lib/models/foundItem";

export async function GET() {
  try {
    connect();
    const data = await foundItemModel.find() || [];
    return NextResponse.json({ message: "Found items were successfully fetched", data: data }, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({
      message: "Error fetching found items",
      error: error
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connect();
    const body = await request.json();
    if (!await mongoose.models.SubCategory.exists({ _id: body.subCategory })) {
      return NextResponse.json({ message: "Invalid subCategoryId: sub category does not exist" }, { status: 400 });
    }
    const newFoundItem = await foundItemModel.create({ subCategory: body });
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