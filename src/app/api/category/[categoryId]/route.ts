import connect from "@/app/lib/db/mongo";
import CategoryModel from "@/app/lib/models/category";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();
        await connect();
        const data = await CategoryModel.findById(id);
        if (!data) {
            return NextResponse.json({ message: "Category is not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Category was successfully fetched", data: data }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({
            message: "Error fetching category",
            error: error
        }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();
        if (!id) {
            return NextResponse.json({ message: "ID is missing" }, { status: 400 });
        }
        // Allows updating only the category title
        const { title } = await request.json();
        await connect();
        const categoryToUpdate = await CategoryModel.findByIdAndUpdate(
            id,
            { "category.title": title },
            { new: true, runValidators: true }
        );
        return NextResponse.json({ message: "Category was updated successfully", data: categoryToUpdate }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({
            message: "Error updating category",
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
        const categoryToDelete = await CategoryModel.findByIdAndDelete(id);
        if (!categoryToDelete) {
            return NextResponse.json({ message: "Category is not found" }, { status: 404 });
        }
        // Deletes subcategories of the category being deleted
        await mongoose.models.SubCategory.deleteMany({ categoryId: categoryToDelete._id });
        return NextResponse.json({ message: "Category was successfully deleted", data: categoryToDelete }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({
            message: "Error deleting category",
            error: error
        }, { status: 500 });
    }
}