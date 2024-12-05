// /app/routes/lostItems.ts

import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongo";
import TypePublicTransportModel from "@/app/lib/models/typePublicTransport";


// GET all public transportations
export async function GET() {
  try {
    await connect();
    // const lostItems = await getLostItems();
    const publicTransportations = await TypePublicTransportModel.find()

    return NextResponse.json(publicTransportations);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch publicTransportations" },
      { status: 500 }
    );
  }
}

// POST new Public Transportation
export async function POST(req: NextRequest) {
  try {
    await connect();
    const body = await req.json();
    console.log(body);
    const newPublicTransportation = await TypePublicTransportModel.create({ typePublicTransport: body });

    // const newLostItem = await createLostItem(body);
    return NextResponse.json(newPublicTransportation, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create public Transportation" },
      { status: 500 }
    );
  }
}
