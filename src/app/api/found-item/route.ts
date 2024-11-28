import connect from "@/app/lib/db/mongo";
import FoundItemModel from "@/app/lib/models/foundItem";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connect();
        const { category, subCategory, color, city, image, description } = await request.json();
        const newFoundItem = new FoundItemModel({ category, subCategory, color, city, image, description });
        await newFoundItem.save();
        return NextResponse.json({ message: "Found item was created successfully", data: newFoundItem }, { status: 201 });
    }
    catch (error) {
        throw new Error("Error creating found item" + error);
    }
}