import connect from "@/app/lib/db/mongo";
import CategoryModel from "@/app/lib/models/category";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        connect();
        const data = await CategoryModel.find() || [];
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
        const body = await request.json();
        const newCategory = await CategoryModel.create({ category: body });
        return NextResponse.json({ message: "Category was created successfully", data: newCategory }, { status: 201 });
    }
    catch (error) {
        return NextResponse.json({
            message: "Error creating category",
            error: error
        }, { status: 500 });
    }
}