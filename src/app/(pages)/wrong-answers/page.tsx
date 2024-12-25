import ContactTheAdmin from '@/app/components/ContactTheAdmin';
import React from 'react'

const page = () => {
    return (
        <div className='flex h-[65vh]'>
            <div className='flex flex-col w-[50%] mx-auto justify-center items-center text-secondary'>
                <p>
                    <strong className='font-semibold'>טעית בתשובות, </strong>
                    פריט זה נחסם עבורך ולא יוצג לך יותר.
                </p>
                <p className='pb-[5vh]'>אם מדובר בפריט שלך- אנא פנה למנהל המערכת.</p>
                <ContactTheAdmin />
            </div>
        </div>
    )
}

export default page;