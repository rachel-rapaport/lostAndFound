import connect from "@/app/lib/db/mongo";
import subCategoryModel from "@/app/lib/models/subCategory";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        connect();
        const data = await subCategoryModel.find() || [];
        return NextResponse.json({ message: "Sub categories were successfully fetched", data: data }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({
            message: "Error fetching sub categories",
            error: error
        }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await connect();
        const body = await request.json();
        if (!await mongoose.models.Category.exists({ _id: body.categoryId })) {
            return NextResponse.json({ message: "Invalid categoryId: Category does not exist" }, { status: 400 });
        }
        const newSubCategory = await subCategoryModel.create({ subCategory: body });
        // Adds the new subcategory to the selected category's subcategory list
        await mongoose.models.Category.findByIdAndUpdate(
            body.categoryId,
            { $push: { "category.subCategories": newSubCategory._id } },
            { new: true }
        );
        return NextResponse.json({ message: "Sub category was created successfully", data: newSubCategory }, { status: 201 });
    }
    catch (error) {
        return NextResponse.json({
            message: "Error creating sub category",
            error: error
        }, { status: 500 });
    }
}