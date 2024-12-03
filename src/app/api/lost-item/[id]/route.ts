import connect from "@/app/lib/db/mongo";
import LostItemModel from "@/app/lib/models/lostItem";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    await connect();
    const data = await LostItemModel.findById(id);
    if (!data) {
      return NextResponse.json({ message: "Lost item is not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Lost item was successfully fetched", data: data }, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({
      message: "Error fetching lost item",
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
    const lostItemToUpdate = await LostItemModel.findByIdAndUpdate(id, { lostItem: body }, { new: true, runValidators: true });
    if (!await mongoose.models.SubCategory.exists({ _id: body.subCategory })) {
      return NextResponse.json({ message: "Invalid subCategoryId: sub category does not exist" }, { status: 400 });
    }
    if (!lostItemToUpdate) {
      return NextResponse.json({ message: "Lost item is not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Lost item was updated successfully", data: lostItemToUpdate }, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({
      message: "Error updating lost item",
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
    const lostItemToDelete = await LostItemModel.findByIdAndDelete(id);
    if (!lostItemToDelete) {
      return NextResponse.json({ message: "Lost item is not found" }, { status: 404 });
    }
    // Removes lost item ID from the sub category's lost item list
    await mongoose.models.SubCategory.findByIdAndUpdate(
      lostItemToDelete.lostItem.subCategory,
      { $pull: { "subCategory.lostItems": id } },
      { new: true }
    );
    return NextResponse.json({ message: "Lost item was successfully deleted", data: lostItemToDelete }, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({
      message: "Error deleting lost item",
      error: error
    }, { status: 500 });
  }
}