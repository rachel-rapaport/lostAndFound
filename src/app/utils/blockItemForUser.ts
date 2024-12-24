import { updateUserById } from "../services/api/userService"
import { FoundItem } from "../types/props/foundItem";
import { User } from "../types/props/user";

export const blockItemForUser = async (currentUser: User, foundItemToBlock: FoundItem, setCurrentFoundItem: (foundItem: FoundItem | null) => void) => {

    setCurrentFoundItem(null);

    const isItemBlocked = currentUser && foundItemToBlock && currentUser.blockedItems && currentUser.blockedItems.some(
        (item) => {
            return item.toString() === foundItemToBlock._id.toString();
        }
    );

    if (isItemBlocked) {
        console.log("Item is already blocked");
        return;
    }
    console.log("in block item for user");
    const updatedUser: User = {
        ...currentUser,
        blockedItems: [...currentUser.blockedItems || [], foundItemToBlock]
    }
    if (currentUser._id) {
        const response = await updateUserById(currentUser._id.toString(), updatedUser);
        if (response) {
            return response;
        } else {
            throw new Error("Failed to update user");
        }
    }

}