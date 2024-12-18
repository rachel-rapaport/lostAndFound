import { create } from "zustand";
import { FoundItemStore } from "../types/store/foundItemStore";
import { Types } from "mongoose";

const useFoundItemStore = create<FoundItemStore>((set, get) => ({
    currentFoundItem: null,

    setCurrentFoundItem: (foundItem) => {
        set({ currentFoundItem: foundItem });
    },

    // filteredFoundItems: null,
    // After connecting, replace the static value of filteredFoundItems with the value returned from api/match/lost-found post request
    filteredFoundItems:
        [
            {
                "_id": new Types.ObjectId("675597dd940d164664f8d89d"),
                "subCategoryId": {
                    "_id": new Types.ObjectId("6756e1b48b5ba2d221f44704"),
                    "title": "אוזניות קשת"
                },
                "userId": {
                    "_id": new Types.ObjectId("67519b1b369b6e2d21f756bc"),
                    "fullName": "John Doe",
                    "email": "johndoe@example.com",
                    "password": "password1234",
                    "phone": "",
                },
                "colorId": {
                    "_id": new Types.ObjectId("675594a40f7ad3122ddce6d6"),
                    "name": "אדום",
                    "groupId": 1,
                    "hexadecimal": "#DE161D"
                },
                "postion": {
                    "latitude": 32.0729674,
                    "longitude": 34.8037545
                },
                "publicTransport": {
                    "typePublicTransportId": {
                        "_id": new Types.ObjectId("675596d90f7ad3122ddce6fb"),
                        "title": "אוטובוס עירוני"
                    },
                    "city": "Jerusalem",
                    "line": "1234"
                },
                "image": "https://example22222.com/image.jpg",
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
                        "answers": ["כן", "לא"]
                    }
                ],
                "descripition": "",
            },
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
