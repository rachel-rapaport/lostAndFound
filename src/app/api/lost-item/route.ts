import connect from "@/app/lib/db/mongo";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import LostItemModel from "@/app/lib/models/lostItem";

export async function GET() {
    try {
        connect();
        const data = await LostItemModel.find() || [];
        return NextResponse.json({ message: "Lost items were successfully fetched", data: data }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({
            message: "Error fetching lost items",
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