'use client';
import React from 'react'
import { blockItemForUser } from '../utils/blockItemForUser';
import userStore from '../store/userStore';
import useFoundItemStore from '../store/foundItemStore';
import Swal from 'sweetalert2';

const NotMineButton = () => {

    const currentUser = userStore((state) => state.user);
    const foundItemToBlock = useFoundItemStore((state) => state.currentFoundItem);
    const setCurrentFoundItem = useFoundItemStore((state) => state.setCurrentFoundItem);

    const handleNotMine = async () => {
        if (currentUser && foundItemToBlock) {
            try {
                const response = await blockItemForUser(currentUser, foundItemToBlock, setCurrentFoundItem);
                if (response) {
                    console.log("Block action succeeded:", response);
                }
            } catch (error) {
                console.error("Error blocking item:", error);
            }
        } else {
            console.error("User or found item missing");
        }
    };

    const confirmActionAlert = () => {
        Swal.fire({
            title: "האם אתה בטוח?",
            text: "חפץ זה לא יוצג לך יותר בשום שלב",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "כן, זה לא החפץ שלי",
            cancelButtonText: "ביטול",
            customClass: {
                confirmButton: "primary-btn",
                cancelButton: "delete-btn"
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "בוצע",
                    text: "המוצר סומן כלא שלך ולא יופיע עבורך יותר",
                    confirmButtonText: "אוקי",
                    icon: "success",
                    customClass: {
                        confirmButton: "secondary-btn"
                    }
                });
                handleNotMine();
            }
        });
    }


    return (
        <div>
            <button type='button' className='flex justify-between delete-btn w-[13vw]' onClick={confirmActionAlert}>
                זה לא החפץ שלי
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm-4.34 7.964a.75.75 0 0 1-1.061-1.06 5.236 5.236 0 0 1 3.73-1.538 5.236 5.236 0 0 1 3.695 1.538.75.75 0 1 1-1.061 1.06 3.736 3.736 0 0 0-2.639-1.098 3.736 3.736 0 0 0-2.664 1.098Z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    )
}

export default NotMineButton;