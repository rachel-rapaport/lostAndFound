// /app/routes/lostItems/[id].ts

import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongo";
import LostItemModel from "@/app/lib/models/lostItem";
import mongoose from "mongoose";

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
    if (!id) {
      return NextResponse.json({ message: "ID is missing" }, { status: 400 });
    }
    await connect();
    const body = await req.json();
    const lostItemToUpdate = await LostItemModel.findByIdAndUpdate(
      id,
      { lostItem: body },
      { new: true, runValidators: true }
    );
    if (
      !(await mongoose.models.SubCategory.exists({ _id: body.subCategory }))
    ) {
      return NextResponse.json(
        { message: "Invalid subCategoryId: sub category does not exist" },
        { status: 400 }
      );
    }
    if (!lostItemToUpdate) {
      return NextResponse.json(
        { message: "Lost item is not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Lost item was updated successfully", data: lostItemToUpdate },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error updating lost item",
        error: error,
      },
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
    if (!id) {
      return NextResponse.json({ message: "ID is missing" }, { status: 400 });
    }
    await connect();
    const lostItemToDelete = await LostItemModel.findByIdAndDelete(id);
    if (!lostItemToDelete) {
      return NextResponse.json(
        { message: "Lost item is not found" },
        { status: 404 }
      );
    }
    // Removes lost item ID from the sub category's lost item list
    await mongoose.models.SubCategory.findByIdAndUpdate(
      lostItemToDelete.lostItem.subCategory,
      { $pull: { "subCategory.lostItems": id } },
      { new: true }
    );
    return NextResponse.json(
      { message: "Lost item was successfully deleted", data: lostItemToDelete },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error deleting lost item",
        error: error,
      },
      { status: 500 }
    );
  }
}
