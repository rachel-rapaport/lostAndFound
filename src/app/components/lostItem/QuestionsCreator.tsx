'use client';
import React, { useState } from 'react';
import { Question } from '@/app/types/props/question';
import { createQuestions } from '@/app/utils/createQuestions';
import { useRouter } from 'next/navigation';

const QuestionsCreator = () => {
    const maxNumOfQuestions = 3, maxNumOfAnswers = 3;
    const [questions, setQuestions] = useState<Question[]>([{ question: "", answers: [""] }]);
    const router = useRouter();

    const addQuestion = () => {
        if (questions.length < maxNumOfQuestions) {
            // Creating a copy of the array
            const updatedQuestions = [...questions];
            updatedQuestions.push({ question: "", answers: [""] });
            setQuestions(updatedQuestions);
        }
    }

    const addAnswer = (index: number) => {
        if (questions[index].answers.length < maxNumOfAnswers) {
            const updatedQuestions = [...questions];
            updatedQuestions[index].answers.push("");
            setQuestions(updatedQuestions);
        }
    }

    const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].question = e.target.value;
        setQuestions(updatedQuestions);
    }

    const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>, questionIndex: number, answerIndex: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].answers[answerIndex] = e.target.value;
        setQuestions(updatedQuestions);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createQuestions(questions);
        router.push('/insert-item-details');
    }

    return (
        <div className='flex flex-col w-[50%] mx-auto justify-center items-center'>
            <strong className='font-semibold pb-12'>כתוב סימנים עבור אימות מול המאבד לגבי הפריט שמצאת: </strong>
            <form onSubmit={handleSubmit} className='flex flex-col w-full gap-10'>
                {[...Array(questions.length)].map((_, questionIndex) => (
                    <div key={questionIndex} className='flex flex-col gap-5'>
                        <div>
                            <input
                                type="text"
                                value={questions[questionIndex].question}
                                placeholder={`שאלה ${questionIndex + 1}`}
                                className='w-full text-center'
                                onChange={(e) => handleChangeQuestion(e, questionIndex)}
                            />
                        </div>
                        <div className='flex items-center'>
                            {[...Array(questions[questionIndex].answers.length)].map((_, answerIndex) => (
                                <span key={answerIndex} className="flex-1">
                                    <input
                                        type="text"
                                        value={questions[questionIndex].answers[answerIndex]}
                                        placeholder={answerIndex === 0 ? 'התשובה הנכונה' : `תשובה לא נכונה ${answerIndex}`}
                                        onChange={(e) => handleChangeAnswer(e, questionIndex, answerIndex)}
                                        className='w-full text-center'
                                    />
                                </span>
                            ))}
                            <button type="button" onClick={() => addAnswer(questionIndex)} title='הוסף תשובה'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={`${questions[questionIndex].answers.length < maxNumOfAnswers ? 'currentColor' : '#B8B8B8'}`} className="size-6">
                                    <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    className={`flex text-white justify-center text-sm p-[5px] gap-2 rounded-md ${questions.length < maxNumOfQuestions ? 'bg-secondary' : 'bg-[#B8B8B8] cursor-not-allowed'}`}
                    onClick={addQuestion}
                    title='הוסף שאלה'
                >
                    הוסף שאלה
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-5">
                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clip-rule="evenodd" />
                    </svg>
                </button>
                <br></br>
                <button type="submit" className='primary-btn' title='שלח'>שלח</button>
            </form>
        </div>
    )
}

export default QuestionsCreator;