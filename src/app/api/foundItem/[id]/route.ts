// /app/routes/lostItems/[id].ts

import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongo";
import FoundItemModel from "@/app/lib/models/foundItem";
import mongoose from "mongoose";

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
    if (!id) {
      return NextResponse.json({ message: "ID is missing" }, { status: 400 });
    }
    await connect();
    const body = await req.json();
    const foundItemToUpdate = await FoundItemModel.findByIdAndUpdate(
      id,
      { foundItem: body },
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
    if (!foundItemToUpdate) {
      return NextResponse.json(
        { message: "Found item is not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Found item was updated successfully",
        data: foundItemToUpdate,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error updating found item",
        error: error,
      },
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
    if (!id) {
      return NextResponse.json({ message: "ID is missing" }, { status: 400 });
    }
    await connect();
    const foundItemToDelete = await FoundItemModel.findByIdAndDelete(id);
    if (!foundItemToDelete) {
      return NextResponse.json(
        { message: "Found item is not found" },
        { status: 404 }
      );
    }
    // Removes found item ID from the sub category's found item list
    await mongoose.models.SubCategory.findByIdAndUpdate(
      foundItemToDelete.foundItem.subCategoryId,
      { $pull: { "subCategory.foundItems": id } },
      { new: true }
    );
    return NextResponse.json(
      {
        message: "Found item was successfully deleted",
        data: foundItemToDelete,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error deleting found item",
        error: error,
      },
      { status: 500 }
    );
  }
}
