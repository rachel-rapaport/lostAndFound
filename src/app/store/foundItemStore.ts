import { create } from "zustand";
import { FoundItemStore } from "../types/store/foundItemStore";
import { Types } from "mongoose";

const useFoundItemStore = create<FoundItemStore>((set, get) => ({
    currentFoundItem: null,

    setCurrentFoundItem: (foundItem) =>
        set({ currentFoundItem: foundItem }),

    // filteredFoundItems: null,
    // After connecting, replace the static value of filteredFoundItems with the value returned from api/match/lost-found post request
    filteredFoundItems:
        [
            {
                "_id": new Types.ObjectId("67569d8e8e3789e32a84ad16"),
                "subCategoryId": {
                    "_id": new Types.ObjectId("6756e20d8b5ba2d221f449a8"),
                    "title": "כלי מיתר"
                },
                "userId": {
                    "_id": new Types.ObjectId("6759e531b82b1951ee236b61"),
                    "fullName": "rachel rapaport",
                    "email": "rachelport283@gmail.com",
                    "password": "Rr123456789",
                    "phone": "0501111111"
                },
                "colorId": {
                    "_id": new Types.ObjectId("67645ec520e497da892204bc"),
                    "name": "ורוד",
                    "groupId": 1,
                    "hexadecimal": "#FFC0CB"
                },
                "postion": {
                    "latitude": 31.7683,
                    "longitude": 35.2137
                },
                "publicTransport": {
                    "typePublicTransportId": {
                        "_id": new Types.ObjectId("675597130f7ad3122ddce701"),
                        "title": "רכבת קלה גוש דן - דנקל"
                    },
                    "city": "בת ים",
                    "line": "R1"
                },
                "image": "https://res.cloudinary.com/dcsowksj2/image/upload/v1734956844/found_item_images/beautiful-girl-summer-park-with-violin_s2x9bl.jpg",
                "questions": [
                    {
                        "question": "מאיזה חומר עשוי החלק הפנימי של האוזניות?",
                        "answers": [
                            "סיליקון",
                            "ריפוד",
                            "פלסטיק"
                        ]
                    },
                    {
                        "question": "איזו דוגמה מודפסת על האוזניות?",
                        "answers": [
                            "לבבות",
                            "כוכבים",
                            "פרחים"
                        ]
                    },
                    {
                        "question": "האם האוזניות הן גם אוזניות בלוטוס?",
                        "answers": [
                            "כן",
                            "לא"
                        ]
                    }
                ],
                "descripition": "כינור 4/4 וקשת נמצאו בפארק בת ים, על ספסל."
            }
        ],

    setFilteredFoundItems: (foundItems) => {
        set({ filteredFoundItems: foundItems })
    },
    getFilteredFoundItemById: (id) => {
        const foundItem = get().filteredFoundItems?.find((item) => item._id.toString() === id);
        if (foundItem)
            return foundItem;
        else
            return null;
    }
}))

export default useFoundItemStore;
