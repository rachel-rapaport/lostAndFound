import connect from "@/app/lib/db/mongo";
import { Circle } from "@/app/types/props/circle";
import { NextRequest, NextResponse } from "next/server";
import { checkIfPointInsideCircle } from "@/app/utils/geolocationUtils";
import { LostItem } from "@/app/types/props/lostItem";
import LostItemModel from "@/app/lib/models/lostItem";

export async function POST(request: NextRequest) {
    try {
        await connect();

        const foundItem = await request.json();

        const lostItems = await LostItemModel.aggregate([
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
                subCategoryId: {
                  _id: '$subCategoryId._id',
                  title: '$subCategoryId.title'
                },
                'colorId': 1,
                'userId._id': 1,
                'userId.fullName': 1,
                'userId.email': 1,
                'userId.password': 1,
                'userId.phone':1,
                circles: 1,
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

        // Filter the lost items based on the found item properties and geographic matching
        const filteredLostItems = lostItems.filter((lostItem: LostItem) => {
            //filter by category and color.  
            console.log("lostItem.colorId.groupId",lostItem.colorId.groupId);
            console.log("foundItem.colorId.groupId",foundItem.colorId);
            console.log("colorId",String(lostItem.colorId.groupId) === String(foundItem.colorId));
            console.log("lostItem.subCategoryId._id",lostItem.subCategoryId._id);
            console.log("foundItem.subCategoryId._id",foundItem.subCategoryId);
            console.log("subCategoryId",String(lostItem.subCategoryId._id) === String(foundItem.subCategoryId));
            
            
                      
            const matchesQuery =
                String(lostItem.colorId.groupId) === String(foundItem.colorId.groupId) &&
                String(lostItem.subCategoryId._id) === String(foundItem.subCategoryId._id);
            console.log("in match",matchesQuery);
            
            if (matchesQuery) {
                if (foundItem.postion) {
                    //filter by location
                    if (lostItem.circles) {
                        return lostItem.circles.some((circle: Circle) =>
                            checkIfPointInsideCircle(circle, foundItem.postion)
                        )
                    }
                } else {
                    //filter by public transport
                    const pt = lostItem.publicTransport;
                    return (
                        pt &&
                        String(pt.typePublicTransportId._id) === foundItem.publicTransport.typePublicTransportId._id &&
                        pt.city === foundItem.publicTransport.city &&
                        pt.line === foundItem.publicTransport.line
                    );
                }
            }
        })

        return NextResponse.json(
            {message:"the filter was successfully" ,data: filteredLostItems },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { message: "Error filtering lost items", error: error.message },
            { status: 500 }
        );
    }
}

