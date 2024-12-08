import connect from "@/app/lib/db/mongo";
import { Circle } from "@/app/types/props/circle";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { checkIfPointInsideCircle} from "@/app/utils/geolocationUtils";
import { FoundItem } from "@/app/types/props/foundItem";

const baseUrl = process.env.BASE_URL || "http://localhost:3000"

export async function POST(request: NextRequest) {
    try {
        await connect();

        const lostItem = await request.json();

        const foundItemResponse = await axios.get(`${baseUrl}/api/lostItem`);
        const foundItems = foundItemResponse.data.data

        // Filter the found items based on the lost item properties and geographic matching
        const filteredFoundItems = foundItems.filter((foundItem: FoundItem) => {
            //filter by category and color.
            const matchesQuery =
                String(lostItem.colorId.groupId) === String(foundItem.colorId.groupId) &&
                String(lostItem.subCategoryId._id) === String(foundItem.subCategoryId._id);
            if (matchesQuery) {

                if (lostItem.circles) {
                    //filter by location
                    if (foundItem.postion) {
                        return lostItem.circles.some((circle: Circle) =>
                            checkIfPointInsideCircle(circle, foundItem.postion)
                        )
                    }
                } else {
                    //filter by public transport
                    const pt = foundItem.publicTransport;
                    return (
                        pt &&
                        pt.typePublicTransportId._id === lostItem.publicTransport.typePublicTransportId._id &&
                        pt.city === lostItem.publicTransport.city &&
                        pt.line === lostItem.publicTransport.line
                    );
                }
            }
        })

        return NextResponse.json({ foundItems: filteredFoundItems });
    } catch (error) {
        console.error("Error filtering lost items:", error);
        return NextResponse.json({ error: "Error filtering lost items" }, { status: 500 });
    }
}

