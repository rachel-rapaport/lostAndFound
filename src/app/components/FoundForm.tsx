'use client';

import axios from "axios";
import { useState } from "react";

const FoundForm = () => {

    const [category, setCategory] = useState("מוצרי חשמל");
    const [subcategory, setSubcategory] = useState("נגן");
    const [color, setColor] = useState(["ורוד"]);
    const [city, setCity] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");

    const func = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newFoundItem = {
            category: category, subCategory: subcategory, color: color, city: city, image: image, description: description
        }
        axios.post('http://localhost:3000/api/found-item', newFoundItem)
            .then((response) => console.log(response.data))
            .catch((error) => console.error("Error creating found item", error))
    }

    return (
        <form onSubmit={func}>
            <input type="text" placeholder="קטגוריה" value={category} onChange={(e) => setCategory(e.target.value)} />
            <input type="text" placeholder="תת קטגוריה" value={subcategory} onChange={(e) => setSubcategory(e.target.value)} />
            {/* <input type="text" placeholder="צבע" value={color} onChange={(e) => setColor(e.target.value)} /> */}
            <input type="text" placeholder="עיר" value={city} onChange={(e) => setCity(e.target.value)} />
            <input type="text" placeholder="תמונה" value={image} onChange={(e) => setImage(e.target.value)} />
            <input type="text" placeholder="תיאור" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="submit" value="המשך" />
        </form>
    )
}

export default FoundForm;