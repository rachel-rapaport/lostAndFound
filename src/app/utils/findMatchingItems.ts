import FoundItemModel from "../lib/models/foundItem";
import { LostItem } from "../types/lostItem";

export default async function findMatchingItems(lostItem:LostItem) {
    try{
        const matchingItem = await FoundItemModel.find({

        })
    }catch{
        
    }
}

// async function findMatchingItems(lostItem) {
//     try {
//       const matchingItems = await FoundItem.find({
//         name: lostItem.name,
//         description: lostItem.description,
//         color: lostItem.color,
//       });
  
//       return matchingItems;
//     } catch (error) {
//       console.error('Error finding matching items:', error);
//       throw new Error('Error finding matching items');
//     }
//   }