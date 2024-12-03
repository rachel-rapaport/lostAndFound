// /app/routes/lostItems/[id].ts

import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongo";
import UserModel from "@/app/lib/models/user";

// GET a user by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await connect();
    if (id) {
      // const foundItem = await getFoundItemById(id as string);
      const user = await UserModel.findById(id);
      if (!user) {
        return NextResponse.json({ error: "user not found" }, { status: 404 });
      }
      return NextResponse.json(user);
    } else {
      return NextResponse.json(
        { error: "Id parameter is missing" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// PUT update user by id
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await connect();
    const body = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "Id parameter is missing" },
        { status: 400 }
      );
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    // const updatedLostItem = await updateLostItemById(id as string, body);
    if (!updatedUser) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// DELETE user by id
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await connect();
    if (!id) {
      return NextResponse.json(
        { error: "Id parameter is missing" },
        { status: 400 }
      );
    }
    // const deletedLostItem = await deleteLostItemById(id as string);
    const deletedUser = await UserModel.deleteOne();
    if (!deletedUser) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }
    return NextResponse.json(deletedUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
