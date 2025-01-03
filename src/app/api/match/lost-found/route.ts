import connect from "@/app/lib/db/mongo";
import { Circle } from "@/app/types/props/circle";
// import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { checkIfPointInsideCircle } from "@/app/utils/geolocationUtils";
import { FoundItem } from "@/app/types/props/foundItem";
// import { getVercelUrl } from "@/app/utils/vercelUrl";
import FoundItemModel from "@/app/lib/models/foundItem";

export async function POST(request: NextRequest) {
  // const vercelUrl = getVercelUrl(request);
  // const baseUrl = vercelUrl

  try {
    await connect();

    const lostItem = await request.json();

    const foundItems = await FoundItemModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      {
        $unwind: { path: "$userId", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "subcategories",
          localField: "subCategoryId",
          foreignField: "_id",
          as: "subCategoryId",
        },
      },
      {
        $unwind: { path: "$subCategoryId", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "colors",
          localField: "colorId",
          foreignField: "_id",
          as: "colorId",
        },
      },
      {
        $unwind: { path: "$colorId", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "typepublictransports",
          localField: "publicTransport.typePublicTransportId",
          foreignField: "_id",
          as: "publicTransportType",
        },
      },
      {
        $unwind: {
          path: "$publicTransportType",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$typePublicTransportId",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          subCategoryId: {
            _id: "$subCategoryId._id",
            title: "$subCategoryId.title",
          },
          colorId: 1,
          "userId._id": 1,
          "userId.fullName": 1,
          "userId.email": 1,
          "userId.password": 1,
          "userId.phone": 1,
          postion: 1,
          image: 1,
          descripition: 1,
          questions: 1,
          publicTransport: {
            _id: "$publicTransport._id",
            city: "$publicTransport.city",
            typePublicTransportId: {
              _id: "$publicTransportType._id",
              title: "$publicTransportType.title",
            },
            line: "$publicTransport.line",
          },
        },
      },
    ]);

    // const foundItemResponse = await axios.get(`${baseUrl}/api/foundItem`);
    // const foundItems = foundItemResponse.data.data

    // Filter the found items based on the lost item properties and geographic matching
    const filteredFoundItems = foundItems.filter((foundItem: FoundItem) => {
      //filter by category and color Always check if the colorId.groupId matches
      const colorMatches =
        String(lostItem.colorId.groupId) === String(foundItem.colorId.groupId);
      let matchesQuery = false;

      // Check if the category is others
      if (
        String(lostItem.subCategoryId.categoryId) === "6756e2418b5ba2d221f44afb"
      ) {
        // If category ID is others, check for matching words in subcategory titles
        const lostSubCategoryTitles = lostItem.subCategoryId.title
          .split(",")
          .map((title: string) => title.trim());
        const foundSubCategoryTitles = foundItem.subCategoryId.title
          .split(",")
          .map((title: string) => title.trim());
        console.log("lost from match api", lostSubCategoryTitles);
        console.log("found from match api", foundSubCategoryTitles);

        // Return true if color matches and at least one word matches between subcategory titles
        matchesQuery =
          colorMatches &&
          lostSubCategoryTitles.some((lostWord: string) =>
            foundSubCategoryTitles.some((foundWord) => foundWord === lostWord)
          );
      } else {
        // If category ID is not others, use the original logic to compare subCategoryId._id
        const subCategoryMatches =
          String(lostItem.subCategoryId._id) ===
          String(foundItem.subCategoryId._id);
        matchesQuery = colorMatches && subCategoryMatches;
      }

      // Return true if color matches and subcategory matches
      if (matchesQuery) {
        if (lostItem.circles) {
          //filter by location
          if (foundItem.postion) {
            return lostItem.circles.some((circle: Circle) =>
              checkIfPointInsideCircle(circle, foundItem.postion)
            );
          }
        } else {
          //filter by public transport
          const pt = foundItem.publicTransport;
          return (
            pt &&
            String(pt.typePublicTransportId._id) ===
              lostItem.publicTransport.typePublicTransportId._id &&
            pt.city === lostItem.publicTransport.city &&
            pt.line === lostItem.publicTransport.line
          );
        }
      }
    });

    return NextResponse.json(
      { message: "the filter was successfully", data: filteredFoundItems },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { message: "Error filtering lost items", error: error.message },
      { status: 500 }
    );
  }
}
