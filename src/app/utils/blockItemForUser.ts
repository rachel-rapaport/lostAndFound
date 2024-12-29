import { updateUserById } from "../services/api/userService"
import useFoundItemStore from "../store/foundItemStore";
import userStore from "../store/userStore";
import { User } from "../types/props/user";

export const blockItemForUser = async () => {

    const { user } = userStore.getState();
    const { setUser } = userStore.getState();
    const { currentFoundItem } = useFoundItemStore.getState();
    const { setCurrentFoundItem } = useFoundItemStore.getState();

    setCurrentFoundItem(null);

    const isItemBlocked = user && currentFoundItem && user.blockedItems && user.blockedItems.some(
        (item) => {
            return item.toString() === currentFoundItem._id.toString();
        }
    );

    if (isItemBlocked) {
        return { message: "Item is already blocked" };
    }

    if (user && currentFoundItem) {
        const updatedUser: User = {
            ...user,
            blockedItems: [...user.blockedItems || [], currentFoundItem]
        }
        // update store current user
        setUser(updatedUser);
        // update in db
        const response = await updateUserById(user._id.toString(), updatedUser);
        if (response) {
            return response;
        } else {
            throw new Error("Failed to update user");
        }
    }
}