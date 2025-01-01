'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import { maxNumOfChars, thankSchema } from '@/app/schemas/thankSchemaZod';
import { createThank } from '@/app/services/api/thankService';
import userStore from '@/app/store/userStore';
import { useRouter } from 'next/navigation';

const ThankForm = () => {
    const [formData, setFormData] = useState<z.infer<typeof thankSchema>>({ thank: "" });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const currentUser = userStore((state) => state.user);
    const [numOfChars, setNumOfChars] = useState(0);
    const router = useRouter();

    function countCharacters(str: string) {
        return str.length;
    }

    const handleChange = (content: string) => {
        setFormData({ thank: content });
        setNumOfChars(countCharacters(content));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            thankSchema.parse(formData);
            setErrors({});
            await createThank({ userName: currentUser?.fullName || "", content: formData.thank });
            router.push('/home');
        }
        catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors: { [key: string]: string } = {};
                error.errors.forEach((error) => {
                    const path = error.path[0]?.toString();
                    if (path) {
                        fieldErrors[path] = error.message;
                    }
                });
                setErrors(fieldErrors);
            }
            else {
                console.log("Error in submitting form:", error.message);
            }
        }
    }

    return (
        <div className=' flex flex-col text-center w-[50%] mx-auto min-h-[70vh] justify-center'>
            <div className='pb-[3vh]'>
                <h1>נהנית מהשירות שלנו? נמצאה אבידתך?</h1>
                <strong className='font-semibold'>נשמח שתספר כאן, ונפרסם באתר :)</strong>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col items-center gap-10'>
                <textarea rows={6} cols={50} maxLength={maxNumOfChars} name="thank" value={formData.thank} onChange={(e) => handleChange(e.target.value)} className="border border-gray-300 p-2 rounded-md"></textarea>
                <p>{numOfChars}/{maxNumOfChars}</p>
                {errors.thank && <p className="error-message">{errors.thank}</p>}
                <div className='w-[50%] flex justify-between'>
                    <button type="submit" className='primary-btn'>שלח</button>
                    <button type="button" className='secondary-btn' onClick={() => router.push('/home')}>מעדיף שלא</button>
                </div>
            </form>
        </div>
    )
}

export default ThankForm;