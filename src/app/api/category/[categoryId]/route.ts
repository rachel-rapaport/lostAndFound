import connect from "@/app/lib/db/mongo";
import CategoryModel from "@/app/lib/models/category";
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

        await connect();
        const { title, subCategories } = await request.json();

        const categoryToUpdate = await CategoryModel.findByIdAndUpdate(
            id,
            { category: { title, subCategories } },
            { new: true, runValidators: true }
        );

        if (!categoryToUpdate) {
            return NextResponse.json({ message: "Category is not found" }, { status: 404 });
        }

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
        return NextResponse.json({ message: "Category was successfully delete", data: categoryToDelete }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({
            message: "Error deleting category",
            error: error
        }, { status: 500 });
    }
}