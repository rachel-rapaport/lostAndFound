import connect from "@/app/lib/db/mongo";
import { Circle } from "@/app/types/props/circle";
import { NextRequest, NextResponse } from "next/server";
import { checkIfPointInsideCircle } from "@/app/utils/geolocationUtils";
import { FoundItem } from "@/app/types/props/foundItem";
import FoundItemModel from "@/app/lib/models/foundItem";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const lostItemCheckMatch = await request.json();
    console.log("Lost item:", lostItemCheckMatch);

    const foundItems = await FoundItemModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      { $unwind: { path: "$userId", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "subcategories",
          localField: "subCategoryId",
          foreignField: "_id",
          as: "subCategoryId",
        },
      },
      { $unwind: { path: "$subCategoryId", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "categories",
          localField: "subCategoryId.categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "colors",
          localField: "colorId",
          foreignField: "_id",
          as: "colorId",
        },
      },
      { $unwind: { path: "$colorId", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "typepublictransports",
          localField: "publicTransport.typePublicTransportId",
          foreignField: "_id",
          as: "publicTransportType",
        },
      },
      { $unwind: { path: "$publicTransportType", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          subCategoryId: {
            _id: "$subCategoryId._id",
            title: "$subCategoryId.title",
            categoryId: {
              _id: "$category._id",
              title: "$category.title",
            },
          },
          colorId: { _id: "$colorId._id", groupId: "$colorId.groupId" },
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

    const lostItem = lostItemCheckMatch.lostItem;

    const normalizeId = (id: any) => (id ? String(id).trim() : null);

    const filteredFoundItems = foundItems.filter((foundItem: FoundItem) => {
      console.log("Processing found item:", foundItem);

      // Color Matching
      const colorMatches =
        normalizeId(lostItem.colorId?.groupId) ===
        normalizeId(foundItem.colorId?.groupId);
      console.log("Color match:", colorMatches);

      let matchesQuery = false;

      // Subcategory Logic
      const normalizedCategoryId = normalizeId(lostItem.categoryId);
      if (normalizedCategoryId === "6756e2418b5ba2d221f44afb") {
        const lostSubCategoryTitles = lostItem.subCategoryId?.title
          ? lostItem.subCategoryId.title
              .split(",")
              .map((title: string) => title.trim().toLowerCase())
          : [];
        const foundSubCategoryTitles = foundItem.subCategoryId?.title
          ? foundItem.subCategoryId.title
              .split(",")
              .map((title) => title.trim().toLowerCase())
          : [];
        console.log("Lost subcategory titles:", lostSubCategoryTitles);
        console.log("Found subcategory titles:", foundSubCategoryTitles);

        matchesQuery =
          colorMatches &&
          lostSubCategoryTitles.some((lostWord: string) =>
            foundSubCategoryTitles.includes(lostWord)
          );
      } else {
        const subCategoryMatches =
          normalizeId(lostItem.subCategoryId?._id) ===
          normalizeId(foundItem.subCategoryId?._id);
        matchesQuery = colorMatches && subCategoryMatches;
      }
      console.log("Matches query after subcategory checks:", matchesQuery);

      // Location/Public Transport Filtering
      if (matchesQuery) {
        if (lostItem.circles && Array.isArray(lostItem.circles)) {
          console.log("Lost item circles:", lostItem.circles);
          console.log("Found item position:", foundItem.postion);
          return (
            foundItem.postion &&
            lostItem.circles.some((circle: Circle) =>
              checkIfPointInsideCircle(circle, foundItem.postion)
            )
          );
        } else if (lostItem.publicTransport && foundItem.publicTransport) {
          const pt = foundItem.publicTransport;
          console.log("Lost item public transport:", lostItem.publicTransport);
          console.log("Found item public transport:", pt);
          return (
            normalizeId(pt.typePublicTransportId?._id) ===
              normalizeId(lostItem.publicTransport.typePublicTransportId?._id) &&
            pt.city === lostItem.publicTransport.city &&
            pt.line === lostItem.publicTransport.line
          );
        }
      }

      return matchesQuery;
    });

    return NextResponse.json(
      { message: "The filter was successfully applied", data: filteredFoundItems },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json(
      { message: "Error filtering lost items", error: error.message },
      { status: 500 }
    );
  }
}
