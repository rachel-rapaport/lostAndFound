import ShowQuestions from '@/app/components/foundItem/ShowQuestions'
import React from 'react'

const Page = ({ params }: { params: { id: string } }) => {

    const { id } = params; //67569d8e8e3789e32a84ad16

    return (
        <div>
            <ShowQuestions id={id}></ShowQuestions>
        </div>
    )
}

export default Page;