// /app/routes/lostItems.ts

import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongo";
import UserModel from "@/app/lib/models/user";


// GET all users
export async function GET() {
  try {
    await connect();
    // const lostItems = await getLostItems();
    const users = await UserModel.find()

    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// POST new user
export async function POST(req: NextRequest) {
  try {
    await connect();
    const body = await req.json();
    console.log(body);
    const newUser = await UserModel.create({ user: body });

    // const newLostItem = await createLostItem(body);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
