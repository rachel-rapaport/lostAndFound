<<<<<<< HEAD
import React from 'react';
import ShowQuestions from '@/app/components/lostItem/ShowQuestions';
=======
import ShowQuestions from '@/app/components/foundItem/ShowQuestions'
import React from 'react'
>>>>>>> f21b2c3bdffc65881e63a1e6bab5218582f82c17

const Page = ({ params }: { params: { id: string } }) => {

    const { id } = params; //67569d8e8e3789e32a84ad16

    return (
        <div>
            <ShowQuestions id={id}></ShowQuestions>
        </div>
    )
}

export default Page;
