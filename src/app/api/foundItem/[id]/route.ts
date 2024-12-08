import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongo";
import FoundItemModel from "@/app/lib/models/foundItem";
import SubCategoryModel from "@/app/lib/models/subCategory";
import TypePublicTransportModel from "@/app/lib/models/typePublicTransport";
import UserModel from "@/app/lib/models/user";
import mongoose from "mongoose";

//get found item by id
export async function GET(request: NextRequest) {
  await connect();

  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  try {
    if (id) {
      //populate data from nested objects
      const data = await FoundItemModel.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) } // התאמה לפי ה-ID של הפריט
        },
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
            postion: 1,
            image: 1,
            descripition: 1,
            questions: 1,
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
      ]);
      if (!data) {
        return NextResponse.json(
          { error: "found item not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { message: "foundItem were successfully fetched", data: data },
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
      { error: "Failed to fetch found item" },
      { status: 500 }
    );
  }
}

//update found item by id
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connect();

  const { id } = params;
  try {
    if (!id) {
      return NextResponse.json({ message: "ID is missing" }, { status: 400 });
    }
    const body = await req.json();
    // Validate that the sub-category cat exists in the database
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

    const foundItemToUpdate = await FoundItemModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!foundItemToUpdate) {
      return NextResponse.json(
        { message: "Found item is not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Found item was updated successfully",
        data: foundItemToUpdate,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error updating found item",
        error: error,
      },
      { status: 500 }
    );
  }
}

//delete found item by id
export async function DELETE({ params }: { params: { id: string } }) {
  await connect();

  const { id } = params;
  try {
    if (!id) {
      return NextResponse.json({ message: "ID is missing" }, { status: 400 });
    }
    const foundItemToDeleteBefore = await FoundItemModel.findById(id)

    if (foundItemToDeleteBefore) {
      // Remove the found item ID from the associated sub-category's foundItems array
      await SubCategoryModel.findByIdAndUpdate(
        foundItemToDeleteBefore.subCategoryId,
        { $pull: { "foundItems": id } },
        { new: true }
      );
      // Remove the found item ID from the associated user's foundItems array
      await UserModel.findByIdAndUpdate(
        foundItemToDeleteBefore.userId,
        { $pull: { "foundItems": id } },
        { new: true }
      );
    }
    const foundItemToDelete = await FoundItemModel.findByIdAndDelete(id);
    if (!foundItemToDelete) {
      return NextResponse.json(
        { message: "Found item is not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Found item was successfully deleted",
        data: foundItemToDelete,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error deleting found item",
        error: error,
      },
      { status: 500 }
    );
  }
}
