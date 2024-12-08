import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongo";
import TypePublicTransportModel from "@/app/lib/models/typePublicTransport";

//get all public transportations
export async function GET() {
  try {
    await connect();

    const publicTransportations = await TypePublicTransportModel.find()
    return NextResponse.json(
      { message: "publicTransportations were successfully fetched", data: publicTransportations },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch publicTransportations" },
      { status: 500 }
    );
  }
}

//create new Public Transportation
export async function POST(req: NextRequest) {
  try {
    await connect();

    const body = await req.json();
    const newPublicTransportation = await TypePublicTransportModel.create(body);

    return NextResponse.json(newPublicTransportation, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create public Transportation" },
      { status: 500 }
    );
  }
}
