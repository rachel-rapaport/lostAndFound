import connect from "@/app/lib/db/mongo";
import foundItemModel from "@/app/lib/models/foundItem";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    await connect();
    const data = await foundItemModel.findById(id);
    if (!data) {
      return NextResponse.json({ message: "Found item is not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Found item was successfully fetched", data: data }, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({
      message: "Error fetching found item",
      error: error
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    if (!id) {
      return NextResponse.json({ message: "ID is missing" }, { status: 400 })
    }
    await connect();
    const body = await request.json();
    const foundItemToUpdate = await foundItemModel.findByIdAndUpdate(id, { foundItem: body }, { new: true, runValidators: true });
    if (!await mongoose.models.SubCategory.exists({ _id: body.subCategory })) {
      return NextResponse.json({ message: "Invalid subCategoryId: sub category does not exist" }, { status: 400 });
    }
    if (!foundItemToUpdate) {
      return NextResponse.json({ message: "Found item is not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Found item was updated successfully", data: foundItemToUpdate }, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({
      message: "Error updating found item",
      error: error
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    if (!id) {
      return NextResponse.json({ message: "ID is missing" }, { status: 400 })
    }
    await connect();
    const foundItemToDelete = await foundItemModel.findByIdAndDelete(id);
    if (!foundItemToDelete) {
      return NextResponse.json({ message: "Found item is not found" }, { status: 404 });
    }
    // Removes found item ID from the sub category's found item list
    await mongoose.models.SubCategory.findByIdAndUpdate(
      foundItemToDelete.foundItem.subCategoryId,
      { $pull: { "subCategory.foundItems": id } },
      { new: true }
    );
    return NextResponse.json({ message: "Found item was successfully deleted", data: foundItemToDelete }, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({
      message: "Error deleting found item",
      error: error
    }, { status: 500 });
  }
}