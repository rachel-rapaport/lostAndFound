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
            return NextResponse.json({ message: "subCategory is not found" }, { status: 404 });
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
        const { title, categoryId } = await request.json();
        const subCategoryToUpdate = await subCategoryModel.findByIdAndUpdate(id, { subCategory: { title, categoryId } }, { new: true, runValidators: true });
        if (!await mongoose.models.Category.exists({ _id: categoryId })) {
            return NextResponse.json({ message: "Invalid categoryId: Category does not exist" }, { status: 400 });
        }
        if (!subCategoryToUpdate) {
            return NextResponse.json({ message: "subCategory is not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "subCategory was updated successfully", data: subCategoryToUpdate }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({
            message: "Error updating subCategory",
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
            return NextResponse.json({ message: "subCategory is not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "subCategory was successfully delete", data: subCategoryToDelete }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({
            message: "Error deleting subCategory",
            error: error
        }, { status: 500 });
    }
}