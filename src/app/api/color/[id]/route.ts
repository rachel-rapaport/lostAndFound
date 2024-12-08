import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongo";
import ColorModel from "@/app/lib/models/color";

//get color by id
export async function GET(request: NextRequest) {
  await connect();

  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  try {
    if (id) {
      const color = await ColorModel.findById(id);
      if (!color) {
        return NextResponse.json(
          { error: "color not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { message: "color were successfully fetched", data: color },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Id parameter is missing" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch color" },
      { status: 500 }
    );
  }
}

//update color by id
export async function PUT(request: NextRequest) {
  await connect();

  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  try {
    const body = await request.json();
    if (!id) {
      return NextResponse.json(
        { error: "Id parameter is missing" },
        { status: 400 }
      );
    }

    const updatedColor = await ColorModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedColor) {
      return NextResponse.json(
        { error: "color not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedColor, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update color" },
      { status: 500 }
    );
  }
}

// delete color by id
export async function DELETE(request: NextRequest) {
  await connect();

  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  try {
    if (!id) {
      return NextResponse.json(
        { error: "Id parameter is missing" },
        { status: 400 }
      );
    }
    const deletedColor = await ColorModel.deleteOne();
    if (!deletedColor) {
      return NextResponse.json(
        { error: "color not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(deletedColor, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete color" },
      { status: 500 }
    );
  }
}
