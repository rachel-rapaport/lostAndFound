'use client';
import { useRouter } from "next/navigation";
import { getCategories } from "../services/categoryService";

const Homepage = () => {
    const router = useRouter();

    return (
        <>
            <h1 className="text-center text-[5vh] font-semibold mb-[5vh]">אתר מציאון</h1>
            <div className="flex w-[20%] mx-auto justify-between flex-grow">
                <button className="btn" onClick={() => router.push('/report-found')}>מצאתי אבידה</button>
                <button className="btn" onClick={() => router.push('/###')}>אבד לי משהו</button>
                <button onClick={getCategories}>get categories</button>
            </div>
        </>)
}

export default Homepage;