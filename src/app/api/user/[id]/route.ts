import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongo";
import UserModel from "@/app/lib/models/user";
import FoundItemModel from "@/app/lib/models/foundItem";
import LostItemModel from "@/app/lib/models/lostItem";
import AlertModel from "@/app/lib/models/notification";
import mongoose from "mongoose";

//get user by id
export async function GET(request: NextRequest) {
  await connect();

  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  try {
    if (id) {
      //populate data from nested objects
      const data = await UserModel.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) }
        },
        {
          $lookup: {
            from: 'lostitems',
            localField: 'lostItems',
            foreignField: '_id',
            as: 'lostItemsDetails'
          }
        },
        {
          $lookup: {
            from: 'founditems',
            localField: 'foundItems',
            foreignField: '_id',
            as: 'foundItemsDetails'
          }
        },
        {
          $lookup: {
            from: 'blockeditems',
            localField: 'blockedItems',
            foreignField: '_id',
            as: 'blockedItemsDetails'
          }
        },
        {
          $lookup: {
            from: 'alerts',
            localField: 'alerts',
            foreignField: '_id',
            as: 'alertsDetails'
          }
        },
        {
          $project: {
            _id: 1,
            fullName: 1,
            email: 1,
            password: 1,
            phone: 1,
            lostItemsDetails: 1,
            foundItemsDetails: 1,
            blockedItemsDetails: 1,
            alertsDetails: 1
          }
        }
      ]);
      if (!data) {
        return NextResponse.json({ error: "user not found" }, { status: 404 });
      }
      return NextResponse.json(
        { message: "user were successfully fetched", data: data },
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
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

//update user by id
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
    const updatedUser = await UserModel.findByIdAndUpdate(id, body, {
      new: true,
    });

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

//delete user by id
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

    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }
    // Deletes found items of the user being deleted
    if (deletedUser.foundItems.length > 0) {
      for (const foundItem of deletedUser.foundItems) {
        await FoundItemModel.findByIdAndDelete(foundItem._id);
      }
    }

    // Deletes lost items of the user being deleted
    if (deletedUser.lostItems.length > 0) {
      for (const lostItem of deletedUser.lostItems) {
        await LostItemModel.findByIdAndDelete(lostItem._id);
      }
    }

    // Deletes alerts of the user being deleted
    if (deletedUser.alerts.length > 0) {
      for (const alert of deletedUser.alerts) {
        await AlertModel.findByIdAndDelete(alert._id);
      }
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