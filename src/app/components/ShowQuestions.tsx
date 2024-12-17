'use client';
import React from 'react';
import { useFoundItemStore } from '../store/foundItemStore';

const ShowQuestions = () => {
    const { currentFoundItem } = useFoundItemStore();

    const handleSubmit = () => {
        console.log("submit");
    }

    return (
        // Assuming that every question, and every answer per question, is unique
        <div className='flex flex-col w-[50%] mx-auto text-secondary'>
            <h1 className='font-semibold pb-12'>ענה על הסימנים הבאים: </h1>
            <form onSubmit={handleSubmit}>
                {
                    currentFoundItem && currentFoundItem.questions.map((question, index) => (
                        <div key={question.question} className='w-full pb-7'>
                            <span className='flex'>
                                <p className='ml-2'>{index + 1}. </p>
                                <h2 className='font-fredoka'>{question.question}</h2>
                            </span>
                            {question.answers.map((answer) => (
                                <div key={answer}>
                                    <span className='flex'>
                                        <input
                                            type='radio'
                                            name={question.question}
                                            id={answer}
                                            value={answer}
                                            className="state"
                                        />

                                        <label htmlFor={answer} className='label'>
                                            <div className='indicator fill-secondary'>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-4">
                                                    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className='text'>{answer}</span>
                                        </label>
                                    </span>
                                    <hr className="w-[calc(100%-20px)] border-secondary-500" />
                                </div>
                            ))}
                        </div>
                    ))
                }
                <div className="flex justify-end my-20">
                    <button type="submit" className="secondary-btn">בדוק התאמה</button>
                </div>
            </form>
        </div>)
}

export default ShowQuestions;