import connect from "@/app/lib/db/mongo";
import { Circle } from "@/app/types/props/circle";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { checkIfPointInsideCircle } from "@/app/utils/geolocationUtils";
import { LostItem } from "@/app/types/props/lostItem";
import { getVercelUrl } from "@/app/utils/vercelUrl";

export async function POST(request: NextRequest) {

    const vercelUrl = getVercelUrl(request);
    const baseUrl = vercelUrl || process.env.NEXT_PUBLIC_BASE_URL

    try {
        await connect();

        const foundItem = await request.json();

        const lostItemsResponse = await axios.get(`${baseUrl}/api/lostItem`);
        const lostItems = lostItemsResponse.data.data

        // Filter the lost items based on the found item properties and geographic matching
        const filteredLostItems = lostItems.filter((lostItem: LostItem) => {
            //filter by category and color.
            const matchesQuery =
                String(lostItem.colorId.groupId) === String(foundItem.colorId.groupId) &&
                String(lostItem.subCategoryId._id) === String(foundItem.subCategoryId._id);

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
                        pt.typePublicTransportId._id === foundItem.publicTransport.typePublicTransportId._id &&
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
            { message: "Error filtering lost items", error: error },
            { status: 500 }
        );
    }
}

