import connect from "@/app/lib/db/mongo";
import CategoryModel from "@/app/lib/models/category";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();
        await connect();
        let data;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            data = await CategoryModel.find() || [];
        } else {
            console.log("why am i here?");

            data = await CategoryModel.findById(id);
            if (!data) {
                return NextResponse.json({ message: "Category is not found" }, { status: 404 });
            }
        }
        return NextResponse.json({ message: "Categories were successfully fetched", data: data }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({
            message: "Error fetching categories",
            error: error
        }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await connect();
        const { title } = await request.json();
        const newCategory = await CategoryModel.create({ title });
        return NextResponse.json({ message: "Category was created successfully", data: newCategory }, { status: 201 });
    }
    catch (error) {
        return NextResponse.json({
            message: "Error creating category",
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
        const { title } = await request.json();
        const categoryToUpdate = await CategoryModel.findByIdAndUpdate(id, { title }, { new: true, runValidators: true });
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