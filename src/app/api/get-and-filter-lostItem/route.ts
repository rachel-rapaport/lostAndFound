// import connect from "@/app/lib/db/mongo";
// import LostItemModel from "@/app/lib/models/lostItem";
// import { log } from "console";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//   try {
//     await connect();
//     const foundItem = await request.json();

//     // const { subCategory, colorId, circles, publicTransport } = foundItem;

//     // console.log("foundItem",foundItem.subCategoryId);
    
//     // יצירת שאילתה לסינון
//     let query: any = {
//         "lostItem.subCategory": "תיק גב",
//         "lostItem.colorId": "blue",
//       };
      
//     console.log("query",query);
    

//     // if (circles && circles.length > 0) {
//     //   // סינון לפי עיגולים
//     //   query["lostItems.lostItem.circles"] = {
//     //     $elemMatch: {
//     //       $or: circles.map((circle: any) => ({
//     //         lat: { $gte: circle.lat - 0.01, $lte: circle.lat + 0.01 },
//     //         lng: { $gte: circle.lng - 0.01, $lte: circle.lng + 0.01 },
//     //       })),
//     //     },
//     //   };
//     // } else if (publicTransport) {
//     //   // סינון לפי תחבורה ציבורית
//     //   query["lostItems.lostItem.publicTransport.typePublicTransportId"] = publicTransport.typePublicTransportId;
//     //   query["lostItems.lostItem.publicTransport.city"] = publicTransport.city;
//     //   query["lostItems.lostItem.publicTransport.line"] = publicTransport.line;
//     // }

//     // מציאת פריטים שנאבדו
//     const lostItemsBefor = await LostItemModel.find();
//     console.log("lostitembefor",lostItemsBefor);
//     if(lostItemsBefor[0].lostItem.subCategory==foundItem.subCategoryId&&lostItemsBefor[0].lostItem.colorId==foundItem.colorId)
//         console.log(true);
//     else
//         console.log("cheak",lostItemsBefor[0].lostItem.subCategory);

//     const lostItems = await LostItemModel.find(query);

//     // הדפסת הפלט לבדיקה
//     console.log("Filtered lost items:", lostItems);

//     // החזרת התוצאות
//     return NextResponse.json({ lostItems });
//   } catch (error) {
//     console.error("Error filtering lost items:", error);
//     return NextResponse.json({ error: "Error filtering lost items" }, { status: 500 });
//   }
// }
