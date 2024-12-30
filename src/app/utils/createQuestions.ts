import { updateFoundItemById } from "../services/api/foundItemsService";
import useFoundItemStore from "../store/foundItemStore";
import { FoundItem } from "../types/props/foundItem";
import { Question } from "../types/props/question";

export const createQuestions = async (questions: Question[]) => {
    const { currentFoundItem } = useFoundItemStore.getState();
    const { setCurrentFoundItem } = useFoundItemStore.getState();

    if (currentFoundItem) {
        const updatedFoundItem: FoundItem = { ...currentFoundItem, questions };

        // Update store
        setCurrentFoundItem(updatedFoundItem);

        // Update db
        const response = await updateFoundItemById(String(currentFoundItem?._id), updatedFoundItem);
        if (response) {
            return response;
        } else {
            throw new Error("Failed to update found item");
        }
    }
}