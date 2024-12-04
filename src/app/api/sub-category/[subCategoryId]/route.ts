import connect from "@/app/lib/db/mongo";
import subCategoryModel from "@/app/lib/models/subCategory";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();
        await connect();
        const data = await subCategoryModel.findById(id);
        if (!data) {
            return NextResponse.json({ message: "Sub category is not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Sub category was successfully fetched", data: data }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({
            message: "Error fetching sub category",
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
        // Allows updating only the sub category title
        const { title } = await request.json();
        const subCategoryToUpdate = await subCategoryModel.findByIdAndUpdate(id,
            { "subCategory.title": title },
            { new: true, runValidators: true });
        if (!subCategoryToUpdate) {
            return NextResponse.json({ message: "Sub category is not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Sub category was updated successfully", data: subCategoryToUpdate }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({
            message: "Error updating sub category",
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
        const subCategoryToDelete = await subCategoryModel.findByIdAndDelete(id);
        if (!subCategoryToDelete) {
            return NextResponse.json({ message: "Sub category is not found" }, { status: 404 });
        }
        // Removes sub category ID from the category's subcategory list
        await mongoose.models.Category.findByIdAndUpdate(
            subCategoryToDelete.subCategory.categoryId,
            { $pull: { "category.subCategories": id } },
            { new: true }
        );
        // Deletes found and lost items of the sub category being deleted
        await mongoose.models.FoundItem.deleteMany({ categoryId: subCategoryToDelete._id });
        await mongoose.models.LostItem.deleteMany({ categoryId: subCategoryToDelete._id });

        return NextResponse.json({ message: "Sub category was successfully deleted", data: subCategoryToDelete }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({
            message: "Error deleting sub category",
            error: error
        }, { status: 500 });
    }
}