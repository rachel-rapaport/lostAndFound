'use client';
import axios from 'axios';

export default function GetCategories() {
    const uploadCategories = async () => {
        try {
            const response = await axios.post('/api/category/');
            const result = response.data;
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <button onClick={uploadCategories}>Upload Categories</button>
        </div>
    );
}
