import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongo";
import TypePublicTransportModel from "@/app/lib/models/typePublicTransport";

//get publicTransportation by id
export async function GET(request: NextRequest) {
  await connect();

  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  try {
    if (id) {
      const publicTransportation = await TypePublicTransportModel.findById(id);
      
      if (!publicTransportation) {
        return NextResponse.json(
          { error: "publicTransportation not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { message: "publicTransportation were successfully fetched", data: publicTransportation },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Id parameter is missing" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch publicTransportation" },
      { status: 500 }
    );
  }
}

//update publicTransportation by id
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
    const updatedPublicTransportation = await TypePublicTransportModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedPublicTransportation) {
      return NextResponse.json(
        { error: "public transportation not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedPublicTransportation, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update public transportation" },
      { status: 500 }
    );
  }
}

//delete publicTransportation by id
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
    const deletedPublicTransportation = await TypePublicTransportModel.deleteOne();
    if (!deletedPublicTransportation) {
      return NextResponse.json(
        { error: "Public Transportation not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(deletedPublicTransportation, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete Public Transportation" },
      { status: 500 }
    );
  }
}
