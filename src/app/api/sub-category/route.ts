import connect from "@/app/lib/db/mongo";
import { NextRequest, NextResponse } from "next/server";
import SubCategoryModel from "@/app/lib/models/subCategory";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();
        await connect();
        let data;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            data = await SubCategoryModel.find() || [];
        }
        else {
            data = await SubCategoryModel.findById(id);
            if (!data) {
                return NextResponse.json({ message: "Sub category is not found" }, { status: 404 });
            }
        }
        return NextResponse.json({ message: "Sub categories were successfully fetched", data: data }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({
            message: "Error fetching sub categories",
            error: error
        }, { status: 500 });
    }
}

export async function GET_BY_ID(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();
        if (!id) {
            return NextResponse.json({ message: "ID is missing" }, { status: 400 })
        }
        await connect();
        const data = await SubCategoryModel.findById(id);
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

export async function POST(request: NextRequest) {
    try {
        await connect();
        const { title, categoryId } = await request.json();
        const newSubCategory = await SubCategoryModel.create({ title, categoryId });
        return NextResponse.json({ message: "Sub category was created successfully", data: newSubCategory }, { status: 201 });
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
        const { title, categoryId } = await request.json();
        const subCategoryToUpdate = await SubCategoryModel.findByIdAndUpdate(id, { title, categoryId }, { new: true, runValidators: true });
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
        const subCategoryToDelete = await SubCategoryModel.findByIdAndDelete(id);
        if (!subCategoryToDelete) {
            return NextResponse.json({ message: "Sub category is not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Sub category was successfully delete", data: subCategoryToDelete }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({
            message: "Error deleting sub category",
            error: error
        }, { status: 500 });
    }
}