import connect from "@/app/lib/db/mongo";
import { Circle } from "@/app/types/props/circle";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { checkIfPointInsideCircle} from "@/app/utils/geolocationUtils";
import { LostItem } from "@/app/types/props/lostItem";

const baseUrl = process.env.BASE_URL || "http://localhost:3000"

export async function POST(request: NextRequest) {
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

        return NextResponse.json({ lostItems: filteredLostItems });
    } catch (error) {
        console.error("Error filtering lost items:", error);
        return NextResponse.json({ error: "Error filtering lost items" }, { status: 500 });
    }
}

