import { create } from "zustand";
import { FoundItemStore } from "../types/store/foundItemStore";
import { FoundItem } from "../types/props/foundItem";

export const useFoundItemStore = create<FoundItemStore>((set) => ({
    currentFoundItem: null,
    // currentFoundItem: {
    //     _id: new Types.ObjectId("67569d8e8e3789e32a84ad16"),
    //     subCategoryId: {
    //         _id: new Types.ObjectId("6756e1b48b5ba2d221f44704"),
    //         title: "אוזניות קשת"
    //     },
    //     userId: {
    //         _id: new Types.ObjectId("67519b1b369b6e2d21f756bc"),
    //         fullName: "John Doe",
    //         email: "johndoe@example.com",
    //         password: "password1234",
    //         phone: "",
    //     },
    //     colorId: {
    //         _id: new Types.ObjectId("675594a40f7ad3122ddce6d6"),
    //         name: "אדום",
    //         groupId: 1,
    //         hexadecimal: ""
    //     },
    //     postion: {
    //         latitude: 31.7683,
    //         longitude: 35.2137
    //     },
    //     publicTransport: {
    //         typePublicTransportId: {
    //             _id: new Types.ObjectId("675596d90f7ad3122ddce6fb"),
    //             title: "אוטובוס עירוני"
    //         },
    //         city: "Jerusalem",
    //         line: "1234"
    //     },
    //     image: "https://example22222.com/image.jpg",
    //     descripition: "hi",
    //     questions: [
    //         {
    //             question: "האם האוזניות הן גם אוזניות בלוטוס?",
    //             answers: ["כן", "לא"]
    //         },
    //         {
    //             question: "איזו דוגמה יש על האוזניות?",
    //             answers: ["כוכבים", "פרפרים", "לבבות"]
    //         },
    //         {
    //             question: "מאיזה חומר החלק הפנימי של האוזניות?",
    //             answers: ["גומי", "ריפוד", "פלסטיק"]
    //         }
    //     ]
    // },

    setCurrentFoundItem: (foundItem: FoundItem) => {
        set({ currentFoundItem: foundItem });
    }
}))
 