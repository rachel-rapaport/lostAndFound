// /app/routes/lostItems/[id].ts

import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongo";
import TypePublicTransportModel from "@/app/lib/models/typePublicTransport";


// GET a publicTransportation by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await connect();
    if (id) {
      // const foundItem = await getFoundItemById(id as string);
      const publicTransportation = await TypePublicTransportModel.findById(id);
      if (!publicTransportation) {
        return NextResponse.json(
          { error: "publicTransportation not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(publicTransportation);
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

// PUT update publicTransportation by id
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

    const updatedPublicTransportation = await TypePublicTransportModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    // const updatedLostItem = await updateLostItemById(id as string, body);
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

// DELETE publicTransportation by id
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
