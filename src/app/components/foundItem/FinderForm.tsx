'use client';
import React, { useState } from 'react'
import { Question } from '@/app/types/props/question';
import QuestionsCreator from '../lostItem/QuestionsCreator';
import InsertFinderDetails from '../lostItem/InsertFinderDetails';
import { useRouter } from 'next/navigation';
// import { FoundItem } from '@/app/types/props/foundItem';
// import useFoundItemStore from '@/app/store/foundItemStore';
// import { createFoundItem } from '@/app/services/api/foundItemsService';
// import { Types } from 'mongoose';

const FinderForm = () => {
    const [questions, setQuestions] = useState<Question[]>([{ question: "", answers: [""] }]);
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    // const { setCurrentFoundItem } = useFoundItemStore.getState();

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newFoundItem = {
            descripition: description,
            image,
            questions
        }
        console.log("the item is:", newFoundItem);

        // למלא באובייקט החדש את שאר השדות ולפתוח את ההערה כדי להוסיף את הפריט החדש לסטור ולמונגו
        // const newFoundItem: FoundItem = {
        //     descripition: description,
        //     image,
        //     questions
        // }
        // // Update store
        // setCurrentFoundItem(newFoundItem);

        // // Update db
        // const response = await createFoundItem(newFoundItem);
        // if (response) {
        //     return response;
        // } else {
        //     throw new Error("Failed to create found item");
        // }
    }
    router.push('/'); // לנתב להמשך...

    return (
        <form onSubmit={handleSubmit} className='flex flex-col h-[100vh] justify-between items-center'>
            <QuestionsCreator questions={questions} setQuestions={setQuestions} />
            <hr className="hr" />
            <InsertFinderDetails setImage={setImage} description={description} setDescription={setDescription} />
            <hr className="hr" />
            <button type="submit" className='primary-btn' title='שלח'>שלח</button>
        </form>
    )
}

export default FinderForm;

