import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongo";
import LostItemModel from "@/app/lib/models/lostItem";
import SubCategoryModel from "@/app/lib/models/subCategory";
import TypePublicTransportModel from "@/app/lib/models/typePublicTransport";
import UserModel from "@/app/lib/models/user";

//get all lost items
export async function GET() {
  try {
    await connect();

    //populate data from nested objects
    const data = await LostItemModel.aggregate([

      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userId'
        }
      },
      {
        $unwind: { path: '$userId', preserveNullAndEmptyArrays: true }
      },
      {
        $lookup: {
          from: 'subcategories',
          localField: 'subCategoryId',
          foreignField: '_id',
          as: 'subCategoryId'
        }
      },
      {
        $unwind: { path: '$subCategoryId', preserveNullAndEmptyArrays: true }
      },
      {
        $lookup: {
          from: 'colors',
          localField: 'colorId',
          foreignField: '_id',
          as: 'colorId'
        }
      },
      {
        $unwind: { path: '$colorId', preserveNullAndEmptyArrays: true }
      },
      {
        $lookup:
        {
          from: 'typepublictransports',
          localField: 'publicTransport.typePublicTransportId',
          foreignField: '_id',
          as: 'publicTransportType'
        }
      },
      {
        $unwind: { path: '$publicTransportType', preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: '$typePublicTransportId', preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          _id: 1,
          'subCategoryId.title': 1,
          'colorId.name': 1,
          'userId._id': 1,
          'userId.fullName': 1,
          'userId.email': 1,
          'userId.password': 1,
          circles: 1,
          image: 1,
          publicTransport: {
            _id: '$publicTransport._id',
            city: '$publicTransport.city',
            typePublicTransportId: {
              _id: '$publicTransportType._id',
              title: '$publicTransportType.title'
            },
            line: '$publicTransport.line'
          }
        }
      }
    ])

    return NextResponse.json(
      { message: "lostItems were successfully fetched", data: data },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch lost items" },
      { status: 500 }
    );
  }
}

//create new lost item
export async function POST(req: NextRequest) {
  try {
    await connect();

    const body = await req.json();
    // Validate that the sub-category exists in the database
    if (!await SubCategoryModel.exists({ _id: body.subCategoryId })) {
      return NextResponse.json({ message: "Invalid subCategoryId: sub category does not exist" }, { status: 400 });
    }
    // Validate that the user exists in the database
    if (!await UserModel.exists({ _id: body.userId })) {
      return NextResponse.json({ message: "Invalid userId: user does not exist" }, { status: 400 });
    }
    // Validate that the public transport type exists in the database
    if (!await TypePublicTransportModel.exists({ _id: body.publicTransport.typePublicTransportId })) {
      return NextResponse.json({ message: "Invalid userId: user does not exist" }, { status: 400 });
    }
    const newLostItem = await LostItemModel.create(body);
    // Update the sub-category to associate it with the new lost item
    await SubCategoryModel.findByIdAndUpdate(
      body.subCategoryId,
      { $push: { "lostItems": newLostItem._id } },
      { new: true }
    );
    // Update the user to associate it with the new lost item
    await UserModel.findByIdAndUpdate(
      body.userId,
      { $push: { "lostItems": newLostItem._id } },
      { new: true }
    );
    return NextResponse.json({ message: "Lost item was created successfully", data: newLostItem }, { status: 201 });
  }
  catch (error) {
    return NextResponse.json({
      message: "Error creating lost item",
      error: error
    }, { status: 500 });
  }
}
