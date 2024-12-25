'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import { sendEmailToAdmin } from '../services/api/sendEmailService';

const ContactTheAdmin = () => {

    const emailSchema = z.object({
        name: z.string().min(2, "קצר מידי").nonempty("שדה חובה"),
        email: z.string().email("אימייל לא תקין").nonempty("שדה חובה"),
        content: z.string().min(20, "נדרשים לפחות 20 תווים לתוכן ההודעה").nonempty("שדה חובה")
    });
    const [formData, setFormData] = useState<z.infer<typeof emailSchema>>({ name: "", email: "", content: "" });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            emailSchema.parse(formData);
            setErrors({});
            setFormData({ name: "", email: "", content: "" });
            // Send email
            sendEmailToAdmin(formData.email, `נשלח ע"י האתר מהלקוח: ${formData.name}`, formData.content);
        }
        catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors: { [key: string]: string } = {};
                error.errors.forEach((error: {
                    path: { toString: () => string | number }[]; message: string;
                }) => {
                    if (error.path[0]) {
                        fieldErrors[error.path[0].toString()] = error.message;
                    }
                });
                setErrors(fieldErrors);
            }
            else {
                console.log("Error in completing email data");
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className='flex w-[800px] min-h[300px] justify-between bg-secondary p-[50px] shadow-md'>
            <div className='flex flex-col w-[80%]'>
                <input type="text" placeholder='שם מלא' name='name' value={formData.name} onChange={handleChange} className='contact-input' />
                {errors.name && <p className='error-message'>{errors.name}</p>}
                <input type="text" placeholder='אימייל' name='email' value={formData.email} onChange={handleChange} className='contact-input' />
                {errors.email && <p className='error-message'>{errors.email}</p>}
                <input type="text" placeholder='היי, רציתי לפנות בנושא...' name='content' value={formData.content} onChange={handleChange} className='contact-input' />
                {errors.content && <p className='error-message'>{errors.content}</p>}
            </div>
            <button type='submit' className='flex bg-primary rounded-full h-[50px] min-w-[50px] self-end justify-center items-center' title='שלח'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 transform scale-x-[-1]">
                    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
            </button>
        </form >
    )
}

export default ContactTheAdmin;